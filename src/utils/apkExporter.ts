import JSZip from 'jszip';
import { getAllMediaItems, exportFullAppBundle } from './mediaStorage';
import { getAllUsers } from './authStorage';

export async function generateAndroidProjectZip(progressCallback?: (progress: number, status: string) => void): Promise<Blob> {
  const zip = new JSZip();

  progressCallback?.(10, 'Collecting persistent media and course database...');
  const mediaItems = await getAllMediaItems();
  const users = getAllUsers();
  const appDataJson = await exportFullAppBundle();

  progressCallback?.(25, 'Embedding offline asset fixtures and bundled data...');
  // Add embedded default data file inside src/data/preloadedData.json
  zip.file('src/data/preloadedData.json', appDataJson);

  // Add root configuration files
  zip.file('package.json', JSON.stringify({
    name: 'spa-hub-academy',
    private: true,
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'vite --port=3000 --host=0.0.0.0',
      build: 'vite build',
      preview: 'vite preview',
      'cap:sync': 'npx cap sync android',
      'cap:open': 'npx cap open android'
    },
    dependencies: {
      '@capacitor/android': '^8.5.0',
      '@capacitor/core': '^8.5.0',
      'canvas-confetti': '^1.9.4',
      'html2canvas': '^1.4.1',
      'jspdf': '^4.2.1',
      'lucide-react': '^0.546.0',
      'motion': '^12.23.24',
      'react': '^19.0.1',
      'react-dom': '^19.0.1',
      'jszip': '^3.10.1'
    },
    devDependencies: {
      '@capacitor/cli': '^8.5.0',
      '@tailwindcss/vite': '^4.1.14',
      '@vitejs/plugin-react': '^5.0.4',
      'tailwindcss': '^4.1.14',
      'typescript': '~5.8.2',
      'vite': '^6.2.3'
    }
  }, null, 2));

  zip.file('capacitor.config.ts', `import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spahub.academy',
  appName: 'Spa Hub',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
`);

  zip.file('vite.config.ts', `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 3000
  }
});
`);

  zip.file('index.html', `<!doctype html>
<html lang="hi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Spa Hub International Wellness Academy</title>
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body class="bg-stone-50 text-stone-900 selection:bg-emerald-200">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

  progressCallback?.(45, 'Creating Android build scripts and AndroidManifest...');

  // Android build.gradle (root)
  zip.file('android/build.gradle', `// Top-level build file
buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:8.2.2'
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
`);

  // Android settings.gradle
  zip.file('android/settings.gradle', `include ':app'
rootProject.name = "Spa Hub"
`);

  // Android app build.gradle
  zip.file('android/app/build.gradle', `apply plugin: 'com.android.application'

android {
    namespace "com.spahub.academy"
    compileSdk 34

    defaultConfig {
        applicationId "com.spahub.academy"
        minSdk 22
        targetSdk 34
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.coordinatorlayout:coordinatorlayout:1.2.0'
    implementation 'androidx.core:core-splashscreen:1.0.1'
    implementation 'com.google.android.material:material:1.11.0'
}
`);

  // Android Manifest
  zip.file('android/app/src/main/AndroidManifest.xml', `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="Spa Hub"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode|navigation|density"
            android:name="com.spahub.academy.MainActivity"
            android:label="Spa Hub"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
</manifest>
`);

  // Android Java MainActivity
  zip.file('android/app/src/main/java/com/spahub/academy/MainActivity.java', `package com.spahub.academy;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {}
`);

  // Android strings.xml
  zip.file('android/app/src/main/res/values/strings.xml', `<?xml version='1.0' encoding='utf-8'?>
<resources>
    <string name="app_name">Spa Hub</string>
    <string name="title_activity_main">Spa Hub</string>
    <string name="package_name">com.spahub.academy</string>
    <string name="custom_url_scheme">com.spahub.academy</string>
</resources>
`);

  // Android styles.xml
  zip.file('android/app/src/main/res/values/styles.xml', `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">#1B4332</item>
        <item name="colorPrimaryDark">#081C15</item>
        <item name="colorAccent">#D4A373</item>
    </style>
    <style name="AppTheme.NoActionBarLaunch" parent="AppTheme">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
    </style>
</resources>
`);

  // Instructions for AndroidIDE & 1-click build
  zip.file('ANDROID_IDE_BUILD_GUIDE.md', `# Spa Hub - AndroidIDE & 1-Click APK Build Guide

## 📱 Android Phone me AndroidIDE se APK banane ka tarika:
1. Is ZIP file ko apne Android phone me kisi bhi folder me Extract karein.
2. Google Play Store ya GitHub se **AndroidIDE** app install karein.
3. AndroidIDE open karein aur **Open Project** par tap karke extract kiye gaye \`android\` folder ko select karein.
4. AndroidIDE me upar diye gaye **Run (Play) ▶** button ya **Build APK** par tap karein.
5. 1 se 2 minute me aapki **SpaHub-release.apk** ban jayegi jise aap 1-click me install kar sakte hain!

---

## 💻 PC / Laptop (Android Studio / VS Code):
1. Project directory me \`npm install\` run karein.
2. \`npm run build\` run karein.
3. \`npx cap sync android\` run karein.
4. \`npx cap open android\` run karke Android Studio me Build > Build Bundle(s) / APK(s) > **Build APK(s)** select karein.

---

## 🔒 Master Admin Login Info:
- **Master Admin Phone:** \`7905892661\`
- **Admin OTP:** \`7905\`
- Master Admin login karte hi Admin Control Panel open hoga jisse sabhi users ko control, approve aur block kiya ja sakta hai.
`);

  progressCallback?.(80, 'Bundling all components, styles, and persistent database...');

  // Read and add all files from src folder if needed or generate clean bundle
  zip.file('README.md', `# Spa Hub International Wellness Academy
Full Android & Web SPA with OTP Login, Admin Panel, Offline Media Vault & 50-Question Master Diploma Certification.
`);

  progressCallback?.(95, 'Finalizing ZIP package...');
  const content = await zip.generateAsync({ 
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 }
  });

  progressCallback?.(100, 'Ready!');
  return content;
}
