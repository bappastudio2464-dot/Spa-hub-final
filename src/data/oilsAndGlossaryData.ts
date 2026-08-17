import { EssentialOil } from '../types';

export const essentialOilsData: EssentialOil[] = [
  {
    id: 'oil-lavender',
    name: 'French Lavender',
    hindiName: 'लैवेंडर (Lavender)',
    botanicalName: 'Lavandula angustifolia',
    scentProfile: 'Floral, sweet, herbal, soothing, woody undertone',
    therapeuticGrade: 'Middle Note',
    primaryBenefits: [
      'Induces deep sleep and calms central nervous system',
      'Soothes muscular spasms and headaches',
      'Accelerates skin regeneration and minor burn healing'
    ],
    primaryBenefitsHi: [
      'गहरी नींद लाता है और तनाव को दूर करता है',
      'मांसपेशियों की ऐंठन और सिरदर्द में राहत देता है',
      'त्वचा को ठंडक और निखार प्रदान करता है'
    ],
    blendingNotes: 'Blends seamlessly with Sweet Orange, Bergamot, Roman Chamomile, Cedarwood, Frankincense.',
    recommendedCarriers: ['Sweet Almond', 'Jojoba', 'Grapeseed'],
    dilutionSafety: '2% for standard full body (10-12 drops per 30ml carrier oil)',
    dilutionSafetyHi: '30ml कैरियर ऑयल में 10-12 बूंदें मिलाएं',
    contraindications: ['Generally safe for all; avoid in early 1st trimester without doctor approval'],
    contraindicationsHi: ['सभी के लिए सुरक्षित; शुरुआती गर्भावस्था में डॉक्टर की सलाह लें'],
    color: '#8E7CC3'
  },
  {
    id: 'oil-eucalyptus',
    name: 'Eucalyptus Globulus',
    hindiName: 'नीलगिरी का तेल (Eucalyptus)',
    botanicalName: 'Eucalyptus globulus',
    scentProfile: 'Crisp, camphoraceous, fresh, piercing, medicinal',
    therapeuticGrade: 'Top Note',
    primaryBenefits: [
      'Powerful anti-inflammatory for joint pain & sore muscles',
      'Decongests respiratory airways and enhances oxygen intake',
      'Refreshes mental sluggishness and fatigue'
    ],
    primaryBenefitsHi: [
      'जोड़ों और मांसपेशियों के दर्द में शक्तिशाली असरदार',
      'सांस की नलियों को खोलता है और ताजगी देता है',
      'थकान और सुस्ती को तुरंत दूर करता है'
    ],
    blendingNotes: 'Blends with Peppermint, Rosemary, Lavender, Pine, Lemon.',
    recommendedCarriers: ['Sesame Seed', 'Sweet Almond', 'Mustard (for cold climates)'],
    dilutionSafety: '1.5% - 2% (8-10 drops per 30ml carrier)',
    dilutionSafetyHi: '30ml तेल में 8-10 बूंदें',
    contraindications: ['Do not use near face of infants or toddlers; avoid in epilepsy/seizure disorders'],
    contraindicationsHi: ['छोटे बच्चों के चेहरे पर न लगाएं; मिर्गी के रोगियों में बचें'],
    color: '#2D6A4F'
  },
  {
    id: 'oil-lemongrass',
    name: 'Indian Lemongrass',
    hindiName: 'लेमनग्रास (Lemongrass)',
    botanicalName: 'Cymbopogon flexuosus',
    scentProfile: 'Citrusy, sharp, earthy, uplifting, herbaceous',
    therapeuticGrade: 'Top / Middle Note',
    primaryBenefits: [
      'Stimulates lymphatic drainage and cellulite breakdown',
      'Invigorates tired mind and cleanses negative energy',
      'Natural antibacterial and antifungal deodorizer'
    ],
    primaryBenefitsHi: [
      'लिम्फेटिक ड्रेनेज तेज करता है और शरीर को डिटॉक्स करता है',
      'मन को नई ताजगी और ऊर्जा देता है',
      'प्राकृतिक एंटीबैक्टीरियल और दुर्गंध नाशक'
    ],
    blendingNotes: 'Blends with Ginger, Eucalyptus, Lavender, Patchouli.',
    recommendedCarriers: ['Coconut Oil', 'Jojoba Oil', 'Sweet Almond'],
    dilutionSafety: 'Max 1% (5 drops per 30ml carrier) - warm active oil',
    dilutionSafetyHi: 'अधिकतम 1% (30ml में 5 बूंदें) - यह तेज तासीर का तेल है',
    contraindications: ['Can cause skin irritation if overused; avoid on sensitive or broken skin'],
    contraindicationsHi: ['ज्यादा मात्रा में त्वचा में जलन कर सकता है'],
    color: '#E9C46A'
  },
  {
    id: 'oil-peppermint',
    name: 'Peppermint',
    hindiName: 'पुदीना (Peppermint)',
    botanicalName: 'Mentha piperita',
    scentProfile: 'Intense cooling menthol, crisp, sweet mint',
    therapeuticGrade: 'Top Note',
    primaryBenefits: [
      'Provides ice-hot thermal cooling sensation to inflamed tendons',
      'Alleviates tension headaches when massaged on temples',
      'Relieves tired swollen feet in foot reflexology'
    ],
    primaryBenefitsHi: [
      'मांसपेशियों को ठंडक और दर्द से तुरंत राहत देता है',
      'कनपटी पर लगाने से सिरदर्द ठीक करता है',
      'थके हुए पैरों और तलवों के लिए सर्वोत्तम'
    ],
    blendingNotes: 'Blends with Eucalyptus, Lavender, Rosemary, Tea Tree.',
    recommendedCarriers: ['Grapeseed', 'Coconut', 'Jojoba'],
    dilutionSafety: '1% - 1.5% (5-8 drops per 30ml carrier)',
    dilutionSafetyHi: '30ml में 5-8 बूंदें',
    contraindications: ['Avoid near eyes; avoid in nursing mothers (may reduce milk supply)'],
    contraindicationsHi: ['आंखों के पास न लगाएं; स्तनपान कराने वाली माताओं में बचें'],
    color: '#52B788'
  },
  {
    id: 'oil-frankincense',
    name: 'Sacred Frankincense',
    hindiName: 'लोबान (Frankincense / Olibanum)',
    botanicalName: 'Boswellia carterii',
    scentProfile: 'Warm, balsamic, resinous, spiritual, sweet pine',
    therapeuticGrade: 'Base Note',
    primaryBenefits: [
      'Deepens diaphragmatic breathing and induces meditative state',
      'Powerful anti-aging and cellular rejuvenation for mature skin',
      'Eases chronic arthritic joint stiffness'
    ],
    primaryBenefitsHi: [
      'गहरी सांस लेने और ध्यान की अवस्था में ले जाने में सहायक',
      'झुर्रियों को मिटाकर त्वचा को जवान बनाता है',
      'गठिया और जोड़ों के दर्द को शांत करता है'
    ],
    blendingNotes: 'Blends with Sandalwood, Myrrh, Rose, Sweet Orange, Lavender.',
    recommendedCarriers: ['Rosehip Seed', 'Argan Oil', 'Jojoba'],
    dilutionSafety: '2% (10-12 drops per 30ml carrier)',
    dilutionSafetyHi: '30ml में 10-12 बूंदें',
    contraindications: ['Extremely safe and gentle; suitable for sensitive skin'],
    contraindicationsHi: ['अत्यंत सौम्य और सुरक्षित'],
    color: '#D4A373'
  },
  {
    id: 'oil-teatree',
    name: 'Australian Tea Tree',
    hindiName: 'टी ट्री तेल (Tea Tree)',
    botanicalName: 'Melaleuca alternifolia',
    scentProfile: 'Fresh, medicinal, herbal, woody',
    therapeuticGrade: 'Top / Middle Note',
    primaryBenefits: [
      'Broad spectrum antifungal and antimicrobial action',
      'Ideal for foot detox soaks and oily/acne-prone back treatments',
      'Purifies spa air and prevents fungal spread'
    ],
    primaryBenefitsHi: [
      'फंगस और बैक्टीरिया का संपूर्ण खात्मा',
      'फुट स्पा और मुंहासों वाली त्वचा के लिए बेहतरीन',
      'स्पा वातावरण को कीटाणुरहित बनाता है'
    ],
    blendingNotes: 'Blends with Lavender, Lemon, Peppermint, Eucalyptus.',
    recommendedCarriers: ['Fractionated Coconut Oil', 'Jojoba'],
    dilutionSafety: '1% - 2% (6-10 drops per 30ml carrier)',
    dilutionSafetyHi: '30ml में 6-10 बूंदें',
    contraindications: ['Never ingest; avoid in household pets (toxic to cats/dogs)'],
    contraindicationsHi: ['पशुओं के संपर्क से दूर रखें; मुंह में न लें'],
    color: '#74C69D'
  }
];

export interface GlossaryTerm {
  term: string;
  termHi: string;
  category: string;
  definition: string;
  definitionHi: string;
}

export const spaGlossaryData: GlossaryTerm[] = [
  {
    term: 'Effleurage',
    termHi: 'एफ्लूराज',
    category: 'Strokes',
    definition: 'Continuous gliding stroke applied with flat hands over large body surfaces to warm tissues and introduce therapist touch.',
    definitionHi: 'हथेलियों से लगाया जाने वाला लंबा, चिकना ग्लाइडिंग स्ट्रोक जो मांसपेशियों को गर्म करता है और तेल फैलाता है।'
  },
  {
    term: 'Pétrissage',
    termHi: 'पेट्रिसाज',
    category: 'Strokes',
    definition: 'Kneading movement where muscles are lifted, squeezed, and rolled rhythmically to flush lactic acid.',
    definitionHi: 'आटे की तरह मांसपेशियों को गूंधने और दबाने की तकनीक जिससे लैक्टिक एसिड साफ होता है।'
  },
  {
    term: 'Tapotement',
    termHi: 'टपोटमेंट',
    category: 'Strokes',
    definition: 'Percussive rhythmic strikes including hacking, cupping, clapping, and tapping to stimulate nervous system and tone muscles.',
    definitionHi: 'हाथों से थपथपाने और कपिंग करने की विधि जो सुस्त नसों को सक्रिय करती है।'
  },
  {
    term: 'Draping',
    termHi: 'ड्रेपिंग',
    category: 'Ethics & Safety',
    definition: 'The professional practice of keeping the client modestly covered with sheets/towels, exposing only the active treatment zone.',
    definitionHi: 'क्लाइंट की प्राइवेसी और गर्माहट के लिए शरीर को तौलिए से ढक कर केवल आवश्यक अंग को ही खोलने का नियम।'
  },
  {
    term: 'Contraindication',
    termHi: 'कॉन्ट्राइंडिकेशन (वर्जनाएं)',
    category: 'Ethics & Safety',
    definition: 'A specific medical symptom or health condition that renders massage unsafe or potentially dangerous for the client.',
    definitionHi: 'वे चिकित्सीय स्थितियां (जैसे बुखार, DVT, ताजा चोट) जिनमें मसाज करना सख्त मना होता है।'
  },
  {
    term: 'Carrier Oil',
    termHi: 'कैरियर ऑयल (आधार तेल)',
    category: 'Aromatherapy',
    definition: 'Cold-pressed plant base oil (e.g., Jojoba, Sweet Almond, Coconut) used to dilute concentrated essential oils safely for skin application.',
    definitionHi: 'शुद्ध वनस्पति तेल (जैसे बादाम, जोजोबा, नारियल) जिसमें आवश्यक तेलों को सुरक्षित रूप से मिलाकर मसाज की जाती है।'
  },
  {
    term: 'Sen Lines',
    termHi: 'सेन ऊर्जा रेखाएं',
    category: 'Thai Massage',
    definition: 'In traditional Thai medicine, 10 primary energetic channels through which vital prana life force flows throughout the body.',
    definitionHi: 'थाई चिकित्सा के अनुसार शरीर की 10 मुख्य ऊर्जा रेखाएं जिन पर दबाव देकर तनाव मुक्त किया जाता है।'
  },
  {
    term: 'Trigger Point',
    termHi: 'ट्रिगर पॉइंट (मांसपेशी की गांठ)',
    category: 'Anatomy',
    definition: 'A hyper-irritable knot in skeletal muscle tissue that causes localized pain and referred radiating sensations.',
    definitionHi: 'मांसपेशी के रेशों में जकड़न की गांठ जो दबाने पर सिर या अन्य हिस्सों तक दर्द भेजती है।'
  },
  {
    term: 'Endangerment Site',
    termHi: 'डेंजर जोन (संवेदनशील खतरे वाले अंग)',
    category: 'Anatomy',
    definition: 'Anatomical regions with major superficial arteries, nerves, or unprotected organs (e.g. carotid triangle, popliteal fossa) where deep pressure is forbidden.',
    definitionHi: 'शरीर के वे नाजुक हिस्से (जैसे गर्दन का अगला भाग, घुटने का पिछला गड्ढा) जहां तेज दबाव देना मना है।'
  },
  {
    term: 'Sanitas Per Aquam',
    termHi: 'सैनिटास पर एक्वाम',
    category: 'Fundamentals',
    definition: 'Latin root phrase for SPA meaning "Health / Healing through Water".',
    definitionHi: 'लैटिन भाषा का मूल वाक्य जिसका अर्थ "जल द्वारा स्वास्थ्य लाभ" है।'
  }
];
