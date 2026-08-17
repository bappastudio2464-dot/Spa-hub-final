import { MediaVaultItem } from '../types';

const DB_NAME = 'SpaHubVaultDB_v1';
const STORE_NAME = 'spa_media_vault';
const DB_VERSION = 1;

// Initialize IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Get all media items
export async function getAllMediaItems(): Promise<MediaVaultItem[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const result = (request.result || []) as MediaVaultItem[];
        // Sort newest first
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        resolve(result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (e) {
    console.warn('IndexedDB read fallback to localStorage', e);
    const saved = localStorage.getItem('spa_hub_media_vault_fallback');
    return saved ? JSON.parse(saved) : [];
  }
}

// Save or update a media item
export async function saveMediaItem(item: MediaVaultItem): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put(item);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.warn('IndexedDB write fallback to localStorage', e);
    const existing = await getAllMediaItems();
    const filtered = existing.filter(i => i.id !== item.id);
    const updated = [item, ...filtered];
    try {
      localStorage.setItem('spa_hub_media_vault_fallback', JSON.stringify(updated));
    } catch (lsErr) {
      console.error('LocalStorage quota exceeded for media', lsErr);
    }
  }
}

// Delete a media item
export async function deleteMediaItem(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    console.warn('IndexedDB delete fallback', e);
    const existing = await getAllMediaItems();
    const updated = existing.filter(i => i.id !== id);
    localStorage.setItem('spa_hub_media_vault_fallback', JSON.stringify(updated));
  }
}

// Convert File to Base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

// Full App Data Bundle Export
export interface FullAppDataBundle {
  appName: string;
  version: string;
  exportedAt: string;
  appState: any;
  mediaItems: MediaVaultItem[];
}

export async function exportFullAppBundle(): Promise<string> {
  const localAppState = localStorage.getItem('spa_hub_training_state_v1');
  const appState = localAppState ? JSON.parse(localAppState) : {};
  const mediaItems = await getAllMediaItems();

  const bundle: FullAppDataBundle = {
    appName: 'Spa Hub Training Platform',
    version: '2.0',
    exportedAt: new Date().toISOString(),
    appState,
    mediaItems,
  };

  return JSON.stringify(bundle, null, 2);
}

export async function importFullAppBundle(jsonContent: string): Promise<{ success: boolean; message: string; itemCount: number }> {
  try {
    const bundle: FullAppDataBundle = JSON.parse(jsonContent);
    if (!bundle.appName || !bundle.appState) {
      throw new Error('Invalid Spa Hub bundle format.');
    }

    // Save app state
    localStorage.setItem('spa_hub_training_state_v1', JSON.stringify(bundle.appState));

    // Save all media items into IndexedDB
    if (Array.isArray(bundle.mediaItems) && bundle.mediaItems.length > 0) {
      for (const item of bundle.mediaItems) {
        await saveMediaItem(item);
      }
    }

    return {
      success: true,
      message: 'Portfolio & Course data imported successfully!',
      itemCount: bundle.mediaItems ? bundle.mediaItems.length : 0,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Failed to import bundle.',
      itemCount: 0,
    };
  }
}
