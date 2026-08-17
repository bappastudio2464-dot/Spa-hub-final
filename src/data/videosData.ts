import { VideoTutorial } from '../types';

export const videosData: VideoTutorial[] = [
  {
    id: 'vid-full-masterclass',
    title: 'Complete 360° Luxury Spa Services Training Course: Full Practical Protocol',
    titleHi: 'संपूर्ण 360° लक्ज़री स्पा सर्विसेज मास्टरक्लास: परिचर्चा से समापन तक फुल ट्रेनिंग',
    category: 'Full Course Masterclass',
    duration: '48:30',
    durationSeconds: 2910,
    level: 'Master Protocol',
    instructor: 'Grand Master Somchai Prakan & Elena Roy (CIDESCO)',
    instructorRole: 'International CIDESCO Head Educator & Luxury Spa Master Trainer',
    thumbnailGradient: 'from-[#0D2818] via-[#1B4332] to-[#2D6A4F]',
    previewAnimationType: 'fullmasterclass',
    description: 'The definitive end-to-end masterclass covering every stage of a 5-star international luxury spa protocol. From welcoming floral foot soak rituals, client draping, 5 Swedish classical glides on back and glutes, deep tissue trigger knot release, heated basalt chakra placement, assisted Thai yoga stretches, reflexology zone walking, Ayurvedic scalp massage, to post-treatment herbal tea closure.',
    descriptionHi: 'अंतरराष्ट्रीय 5-स्टार लक्ज़री स्पा का संपूर्ण प्रैक्टिकल ट्रेनिंग वीडियो। इसमें क्लाइंट का स्वागत, गुलाब जल और एप्सम साल्ट से पैरों की सफाई, 5 स्वीडिश स्ट्रोक, डीप टिश्यू गांठों को खोलना, गर्म बेसाल्ट पत्थरों का चक्र प्लेसमेंट, थाई योगा स्ट्रेचिंग, फुट रिफ्लेक्सोलॉजी, आयुर्वेदिक हेड मसाज और हर्बल चाय के साथ सम्मानजनक समापन का पूरा 360° अभ्यास शामिल है।',
    keyTimestamps: [
      { time: '00:00', seconds: 0, label: '1. Welcome Ritual & Floral Foot Bath Soak', labelHi: '1. स्वागत अनुष्ठान व पुष्प पाद प्रक्षालन', description: 'Warm Himalayan salt soak with rose petals, lavender drops, and gentle effleurage foot cleanse.' },
      { time: '05:15', seconds: 315, label: '2. Professional Draping & Swedish Oil Warming', labelHi: '2. क्लाइंट ड्रेपिंग व तेल का वार्मिंग ग्लाइड', description: 'Testing warmed almond-jojoba blend and beginning initial rhythmic palming.' },
      { time: '11:30', seconds: 690, label: '3. Swedish 5 Classic Strokes (Back, Shoulders & Glutes)', labelHi: '3. स्वीडिश 5 शास्त्रीय स्ट्रोक (पीठ व नितंब)', description: 'Effleurage, Pétrissage, Friction, Tapotement cupping, and nerve strokes.' },
      { time: '18:45', seconds: 1125, label: '4. Deep Tissue Knots & Scapular Trigger Point Release', labelHi: '4. डीप टिश्यू गांठे व ट्रेपेजियस ट्रिगर पॉइंट्स', description: 'Ischemic thumb compression and slow ulna stripping at 1-2 inches per second.' },
      { time: '26:10', seconds: 1570, label: '5. Basalt Hot Stones Chakra Placement & Gliding', labelHi: '5. गर्म बेसाल्ट पत्थर चक्र प्लेसमेंट व ग्लाइडिंग', description: 'Placing heated stones along spinal chakra energy centers and warm stone effleurage.' },
      { time: '33:20', seconds: 2000, label: '6. Thai Passive Yoga Stretches & Sen Line Acupressure', labelHi: '6. थाई पैसिव योगा स्ट्रेच व सेन लाइन एक्यूप्रेशर', description: 'Cobra spinal back extension, hamstring traction, and palm walking.' },
      { time: '39:00', seconds: 2340, label: '7. Foot Reflexology Zone Walking & Solar Plexus Press', labelHi: '7. फुट रिफ्लेक्सोलॉजी जोन वॉकिंग', description: 'Thumb caterpillar walking across spine, liver, and lung organ reflex zones.' },
      { time: '43:15', seconds: 2595, label: '8. Ayurvedic Scalp Massage & Kansa Wand Face Glow', labelHi: '8. आयुर्वेदिक शिरोअभ्यंग व कांसा वैंड फेशियल', description: 'Warm sesame oil crown marma stimulation and bronze kansa wand circular sweeps.' },
      { time: '46:30', seconds: 2790, label: '9. Warm Towel Compression & Herbal Ginger Tea Debrief', labelHi: '9. गर्म तौलिया सिकाई व हर्बल चाय समापन', description: 'Removing excess surface oil with steamed mint towels and post-care hydration advice.' }
    ],
    practiceChecklist: [
      { id: 'c0-1', text: 'Performed complete 5-point client consultation intake prior to room entry', textHi: 'कमरे में प्रवेश से पहले 5-पॉइंट का हेल्थ कंसल्टेशन फॉर्म भरवाया' },
      { id: 'c0-2', text: 'Prepared foot basin at 38°C with Epsom salts and organic rose petals', textHi: '38°C गुनगुने पानी में एप्सम साल्ट और गुलाब की पत्तियों का फुट सोक तैयार किया' },
      { id: 'c0-3', text: 'Practiced Archer posture for continuous back glides saving spine', textHi: 'कमर को सुरक्षित रखते हुए आर्चर स्टांस में लंबे ग्लाइडिंग स्ट्रोक लगाए' },
      { id: 'c0-4', text: 'Tested basalt stone temperature on therapist inner wrist before client contact', textHi: 'क्लाइंट पर रखने से पहले गर्म पत्थरों का तापमान अपनी कलाई पर जांचा' },
      { id: 'c0-5', text: 'Maintained seamless draping boundaries exposing only the treated zone', textHi: 'केवल मसाज वाले हिस्से को खोलकर बाकी शरीर को सुरक्षित ढका रखा' },
      { id: 'c0-6', text: 'Served fresh warm ginger-honey detox tea with personalized homecare advice', textHi: 'समापन पर गर्म अदरक-शहद की हर्बल चाय दी और घरेलू देखभाल की सलाह दी' }
    ],
    targetMuscles: ['Full Body System', 'Trapezius', 'Erector Spinae', 'Gluteus Medius', 'Hamstrings', 'Soleus & Plantar Fascia', 'Galea Aponeurotica'],
    recommendedOils: ['30ml Sweet Almond Base', '4 drops French Lavender', '2 drops Australian Eucalyptus', '2 drops Frankincense'],
    contraindications: ['High-grade fever (>38°C)', 'Suspected DVT or severe calf swelling', 'First trimester pregnancy without MD clearance', 'Open skin lesions']
  },
  {
    id: 'vid-1',
    title: 'Swedish Massage Full Back Masterclass: 5 Classical Strokes',
    titleHi: 'स्वीडिश मसाज फुल बैक मास्टरक्लास: 5 शास्त्रीय स्ट्रोक का अभ्यास',
    category: 'Swedish',
    duration: '18:45',
    durationSeconds: 1125,
    level: 'Beginner',
    instructor: 'Master Instructor Elena Roy',
    instructorRole: 'International CIDESCO Certified Spa Educator',
    thumbnailGradient: 'from-[#1B4332] to-[#2D6A4F]',
    previewAnimationType: 'effleurage',
    description: 'A complete step-by-step clinical demonstration of back Swedish massage. Learn how to connect long spinal effleurage glides, two-handed muscle kneading on the latissimus, rhythmic friction across scapular borders, and gentle tapotement without breaking therapist-client contact.',
    descriptionHi: 'पीठ पर स्वीडिश मसाज का संपूर्ण प्रैक्टिकल प्रदर्शन। रीढ़ पर लंबे एफ्लूराज ग्लाइड, पीठ की चौड़ी मांसपेशियों पर दो-हाथों से गूंधने की विधि, कंधे की हड्डी के पास घर्षण और बिना संपर्क तोड़े पूरे प्रवाह का अभ्यास करें।',
    keyTimestamps: [
      { time: '00:00', seconds: 0, label: 'Table Ergonomics & Oil Warming', labelHi: 'टेबल पोस्चर और तेल गर्म करना', description: 'Applying warmed oil and introductory breathing sync.' },
      { time: '02:30', seconds: 150, label: 'Long Spinal Effleurage (Sacrum to Neck)', labelHi: 'लंबा स्पाइनल एफ्लूराज', description: 'Gliding along both sides of spinal groove using body weight.' },
      { time: '06:15', seconds: 375, label: 'Alternating Pétrissage (Kneading)', labelHi: 'दो हाथों से गूंधना (पेट्रिसाज)', description: 'Lifting and compressing the muscle belly with C-grip.' },
      { time: '10:40', seconds: 640, label: 'Scapular Friction & Rhomboid Release', labelHi: 'कंधे की हड्डी के पास फ्रिक्शन', description: 'Targeting stubborn trigger points with reinforced thumbs.' },
      { time: '14:20', seconds: 860, label: 'Tapotement (Cupping & Hacking)', labelHi: 'टपोटमेंट (कपिंग व हैकिंग)', description: 'Rhythmic percussive stimulation across fleshy areas.' },
      { time: '17:00', seconds: 1020, label: 'Feather-light Nerve Strokes & Closure', labelHi: 'नर्व स्ट्रोक और समापन', description: 'Calming the sensory nervous system to close.' }
    ],
    practiceChecklist: [
      { id: 'c1-1', text: 'Checked table height at knuckles line', textHi: 'टेबल की ऊंचाई अपनी मुट्ठियों के स्तर पर जांची' },
      { id: 'c1-2', text: 'Tested oil temperature on inner wrist before applying', textHi: 'क्लाइंट पर लगाने से पहले तेल का तापमान कलाई पर चेक किया' },
      { id: 'c1-3', text: 'Maintained unbroken physical contact throughout transitions', textHi: 'स्ट्रोक बदलते समय हाथ का निरंतर संपर्क बनाए रखा' },
      { id: 'c1-4', text: 'Used Archer stance with straight spine on glides', textHi: 'ग्लाइड करते समय कमर सीधी और आर्चर स्टांस रखा' },
      { id: 'c1-5', text: 'Avoided direct pressure on spine vertebrae and kidneys', textHi: 'रीढ़ की हड्डियों और किडनी के क्षेत्र पर दबाव नहीं दिया' }
    ],
    targetMuscles: ['Trapezius', 'Latissimus Dorsi', 'Rhomboids', 'Erector Spinae', 'Infraspinatus'],
    recommendedOils: ['Sweet Almond Carrier Oil', '3 drops Lavender Essential Oil', '2 drops Roman Chamomile'],
    contraindications: ['Severe back inflammation or fever', 'Spinal fusion surgery < 6 months', 'Open wounds / sunburn']
  },
  {
    id: 'vid-2',
    title: 'Deep Tissue: Neck & Upper Trapezius Trigger Point Release',
    titleHi: 'डीप टिश्यू: गर्दन और कंधों की जिद्दी गांठों (Knots) का निवारण',
    category: 'Deep Tissue',
    duration: '15:20',
    durationSeconds: 920,
    level: 'Intermediate',
    instructor: 'David Vance, LMT',
    instructorRole: 'Orthopedic & Deep Tissue Sports Specialist',
    thumbnailGradient: 'from-[#2C3E50] to-[#34495E]',
    previewAnimationType: 'kneading',
    description: 'Learn precision techniques to melt desk-worker neck stiffness and tension headaches. Discover how to use reinforced thumbs, soft knuckles, and ulna forearms to deactivate levator scapulae and trapezius trigger points safely.',
    descriptionHi: 'कंप्यूटर और डेस्क पर काम करने से होने वाले गर्दन और कंधे के दर्द को दूर करने की डीप टिश्यू विधि। अंगूठे के जोड़ों को सुरक्षित रखते हुए नकल और कोहनी के सही उपयोग से ट्रिगर पॉइंट्स खोलें।',
    keyTimestamps: [
      { time: '00:00', seconds: 0, label: 'Palpating Taut Muscle Bands', labelHi: 'गांठों की पहचान (पालपेशन)', description: 'Locating hyper-irritable trigger nodules along upper shoulders.' },
      { time: '03:10', seconds: 190, label: 'Ischemic Compression Protocol', labelHi: 'स्थिर अंगूठे का दबाव (Ischemic Compression)', description: 'Applying steady 8-10 second pressure while client breathes out.' },
      { time: '07:45', seconds: 465, label: 'Slow Ulna Forearm Stripping', labelHi: 'फोरआर्म स्ट्रिपिंग', description: 'Gliding along the medial scapular border at 1 inch per second.' },
      { time: '12:00', seconds: 720, label: 'Suboccipital Base Decompression', labelHi: 'सिर के पिछले हिस्से का खिंचाव', description: 'Gentle traction at the base of the skull.' }
    ],
    practiceChecklist: [
      { id: 'c2-1', text: 'Checked client pain scale (ensured level 6-7/10)', textHi: 'क्लाइंट से दर्द का स्तर पूछा (6-7/10 बनाए रखा)' },
      { id: 'c2-2', text: 'Applied pressure only on exhalation', textHi: 'सांस छोड़ने पर ही दबाव बढ़ाया' },
      { id: 'c2-3', text: 'Protected thumb joints with reinforced thumb grip', textHi: 'दूसरे हाथ का सहारा देकर अंगूठे के जोड़ को सुरक्षित रखा' },
      { id: 'c2-4', text: 'Avoided anterior neck carotid artery danger zone', textHi: 'गर्दन के अगले हिस्से (कैरोटिड धमनी) को पूरी तरह छोड़ा' }
    ],
    targetMuscles: ['Upper Trapezius', 'Levator Scapulae', 'Rhomboid Minor & Major', 'Suboccipitals'],
    recommendedOils: ['Jojoba Oil', 'Eucalyptus Globulus (2 drops)', 'Peppermint (2 drops)'],
    contraindications: ['Acute whiplash injury < 72 hours', 'Severe cervical disc herniation', 'Carotid artery disease']
  },
  {
    id: 'vid-3',
    title: 'Hot Stone Therapy: Basalt Stone Placement & Gliding Flow',
    titleHi: 'हॉट स्टोन थेरेपी: बेसाल्ट पत्थरों का सही प्लेसमेंट और ग्लाइडिंग',
    category: 'Hot Stone',
    duration: '21:10',
    durationSeconds: 1270,
    level: 'Intermediate',
    instructor: 'Aanya Sharma',
    instructorRole: 'Ayurvedic & Thermal Spa Specialist',
    thumbnailGradient: 'from-[#8B4513] to-[#A0522D]',
    previewAnimationType: 'hotstone',
    description: 'Learn how to heat, test, place, and glide volcanic basalt stones across the human body. Includes spinal layout on energy chakras, palm warmers, and dynamic stone effleurage on calves and hamstrings.',
    descriptionHi: 'ज्वालामुखीय बेसाल्ट पत्थरों को गर्म करने, तापमान जांचने और रीढ़ के सातों चक्रों पर सजाने की कला। पैरों और पीठ पर गर्म पत्थरों से फिसलते हुए स्ट्रोक लगाने का व्यावहारिक प्रशिक्षण।',
    keyTimestamps: [
      { time: '00:00', seconds: 0, label: 'Water Heater Setup (54°C / 130°F)', labelHi: 'हीटर तापमान सेट करना', description: 'Calibrating stone heater and towel preparation.' },
      { time: '04:15', seconds: 255, label: 'Forearm Temperature Testing', labelHi: 'कलाई पर तापमान की जांच', description: 'The non-negotiable safety step before touching the client.' },
      { time: '07:30', seconds: 450, label: 'Spinal Alignment Stone Layout', labelHi: 'रीढ़ पर स्टोन प्लेसमेंट', description: 'Placing insulated basalt stones along spinal columns.' },
      { time: '12:40', seconds: 760, label: 'Dynamic Figure-8 Stone Glides', labelHi: 'फिगर-8 स्टोन ग्लाइड्स', description: 'Gliding two stones smoothly over hamstrings and back.' }
    ],
    practiceChecklist: [
      { id: 'c3-1', text: 'Confirmed stone water bath temperature between 50°C and 55°C', textHi: 'पानी का तापमान 50°C से 55°C के बीच जांचा' },
      { id: 'c3-2', text: 'Towel-dried stones thoroughly to prevent scalding drips', textHi: 'पत्थरों को तौलिए से अच्छी तरह सुखाया ताकि गर्म पानी न टपके' },
      { id: 'c3-3', text: 'Tested stone heat on my own inner wrist', textHi: 'अपनी कलाई पर पत्थर की गर्माहट जांची' },
      { id: 'c3-4', text: 'Kept stones in motion during glides without parking on bare skin', textHi: 'बिना तौलिए के पत्थर को त्वचा पर एक जगह स्थिर नहीं छोड़ा' }
    ],
    targetMuscles: ['Erector Spinae', 'Gluteals', 'Hamstrings', 'Quadriceps'],
    recommendedOils: ['Sesame / Grapeseed base (heat stable)', 'Cedarwood', 'Sweet Orange'],
    contraindications: ['Peripheral neuropathy / loss of sensation', 'Uncontrolled hypertension', 'Varicose veins on legs', 'Pregnancy']
  },
  {
    id: 'vid-4',
    title: 'Traditional Thai Massage: Assisted Yoga Stretches & Sen Sib Lines',
    titleHi: 'पारंपरिक थाई मसाज: पैसिव योग स्ट्रेच और 10 मुख्य ऊर्जा रेखाएं',
    category: 'Thai & Stretch',
    duration: '24:00',
    durationSeconds: 1440,
    level: 'Advanced',
    instructor: 'Master Somchai Prakan',
    instructorRole: 'Wat Pho Certified Master Instructor, Bangkok',
    thumbnailGradient: 'from-[#7B2CBF] to-[#5A189A]',
    previewAnimationType: 'thai',
    description: 'Floor mat based Thai bodywork using rhythmic palm walking, thumb pressure on Sen lines, and assisted yoga traction to open tight hips, hamstrings, and thoracic spine.',
    descriptionHi: 'फ्लोर मैट पर की जाने वाली पारंपरिक थाई मसाज। पाम वॉकिंग, 10 सेन लाइनों पर दबाव और योग जैसे खिंचाव के साथ कमर, हिप्स और रीढ़ को पूरी तरह लचीला बनाने की विधि।',
    keyTimestamps: [
      { time: '00:00', seconds: 0, label: 'Floor Mat Ergonomics & Centering', labelHi: 'मैट व्यवस्था और ब्रीदिंग', description: 'Therapist positioning and respectful Wai greeting.' },
      { time: '03:40', seconds: 220, label: 'Sen Ittha & Pingkhala (Inner Thigh Palm Walking)', labelHi: 'सेन रेखाओं पर पाम वॉकिंग', description: 'Progressive bodyweight palm pressing along inner leg lines.' },
      { time: '11:15', seconds: 675, label: 'Single Leg Hamstring Traction', labelHi: 'हैमस्ट्रिंग ट्रैक्शन खिंचाव', description: 'Lifting leg to 90 degrees with anchored foot.' },
      { time: '18:00', seconds: 1080, label: 'Assisted Cobra Spinal Arch', labelHi: 'कोबरा स्पाइनल बैक स्ट्रेच', description: 'Supporting client thoracic spine for safe lung expansion.' }
    ],
    practiceChecklist: [
      { id: 'c4-1', text: 'Verified client has no knee/hip replacements or acute disc herniation', textHi: 'जांचा कि क्लाइंट का कोई जॉइंट रिप्लेसमेंट या स्लिप डिस्क तो नहीं है' },
      { id: 'c4-2', text: 'Kept arms locked straight to use bodyweight instead of muscle strength', textHi: 'ताकत के बजाय अपने शरीर के वजन का उपयोग करने के लिए कोहनी सीधी रखी' },
      { id: 'c4-3', text: 'Synchronized stretches strictly with client exhalation', textHi: 'क्लाइंट के सांस छोड़ने के साथ ही खिंचाव दिया' }
    ],
    targetMuscles: ['Adductors', 'Hamstrings', 'Iliopsoas', 'Quadratus Lumborum', 'Piriformis'],
    recommendedOils: ['No oil used (Dry mat therapy with loose cotton clothing)'],
    contraindications: ['Osteoporosis / brittle bones', 'Recent abdominal surgery', 'Joint dislocations']
  },
  {
    id: 'vid-5',
    title: 'Foot Reflexology: 10 Organ Zones & Pressure Calibration',
    titleHi: 'फुट रिफ्लेक्सोलॉजी: तलवों के 10 ऑर्गन जोन्स और सटीक थंब वॉकिंग',
    category: 'Reflexology',
    duration: '16:40',
    durationSeconds: 1000,
    level: 'Beginner',
    instructor: 'Mei Lin Zhou, R.Ac',
    instructorRole: 'Holistic Zone Therapist & Reflexology Master',
    thumbnailGradient: 'from-[#0077B6] to-[#023E8A]',
    previewAnimationType: 'acupressure',
    description: 'Learn how to stimulate internal organs via nerve reflexes in the feet. Master caterpillar thumb walking across the spinal column line, solar plexus relaxation point, and lymphatic drainage strokes.',
    descriptionHi: 'पैरों के तलवों में मौजूद रिफ्लेक्स पॉइंट्स द्वारा आंतरिक अंगों को स्वस्थ करने का प्रशिक्षण। रीढ़ की रेखा, सोलर प्लेक्सस और लिम्फ पॉइंट्स पर कैटरपिलर थंब वॉकिंग सीखें।',
    keyTimestamps: [
      { time: '00:00', seconds: 0, label: 'Warm Foot Wipe & Ankle Loosening', labelHi: 'पैरों की सफाई व एंकल रोटेशन', description: 'Steamed towel prep and gentle joint warm-up.' },
      { time: '03:10', seconds: 190, label: 'Solar Plexus Deep Breath Induction', labelHi: 'सोलर प्लेक्सस पॉइंट दबाना', description: 'Calming the diaphragm and heart rate.' },
      { time: '07:20', seconds: 440, label: 'Medial Spinal Ridge Thumb Walking', labelHi: 'रीढ़ की रेखा पर थंब वॉकिंग', description: 'Micro-stepping from heel (sacrum) to big toe (cervical).' },
      { time: '12:30', seconds: 750, label: 'Lymphatic Drainage Foot Sweeps', labelHi: 'लिम्फैटिक ड्रेनेज स्ट्रोक', description: 'Upward gentle strokes toward malleolus ankles.' }
    ],
    practiceChecklist: [
      { id: 'c5-1', text: 'Bent first knuckle at 45° angle during thumb walking', textHi: 'थंब वॉकिंग करते समय अंगूठे का पहला जोड़ 45 डिग्री मोड़ा' },
      { id: 'c5-2', text: 'Applied firm but comfortable pressure without digging nails', textHi: 'नाखून चुभाए बिना अंगूठे के पैड से ठोस और आरामदायक दबाव दिया' },
      { id: 'c5-3', text: 'Supported the back of the foot with non-working hand', textHi: 'काम न कर रहे दूसरे हाथ से पैर के ऊपरी हिस्से को सहारा दिया' }
    ],
    targetMuscles: ['Plantar Fascia', 'Flexor Digitorum Brevis', 'Abductor Hallucis', 'Achilles Tendon'],
    recommendedOils: ['Peppermint & Tea Tree Foot Balm', 'Coconut Carrier Oil'],
    contraindications: ['Severe athlete foot / fungal infection', 'Gout flare-up on big toe', 'Recent foot fractures']
  },
  {
    id: 'vid-6',
    title: 'Indian Head Scalp (Shiroabhyanga) & Ayurvedic Kansa Facial',
    titleHi: 'शिरोअभ्यंग (हेड मसाज) और आयुर्वेदिक कांसा वैंड फेशियल',
    category: 'Facial & Head',
    duration: '19:30',
    durationSeconds: 1170,
    level: 'Intermediate',
    instructor: 'Priya Namboodiri',
    instructorRole: 'Senior Ayurvedic Vaidya & Spa Director, Kerala',
    thumbnailGradient: 'from-[#C1121F] to-[#780000]',
    previewAnimationType: 'acupressure',
    description: 'A deeply meditative head, neck, and facial protocol. Combines warm Brahmi herbal oil scalp friction, Crown Adhipati marma stimulation, and cooling bronze Kansa wand lymphatic drainage.',
    descriptionHi: 'सिर, गर्दन और चेहरे की गहरी शांति देने वाली थेरेपी। ब्राह्मी तेल से सिर की मालिश, अधिपति मर्म बिंदु का उद्दीपन और कांसे की कटोरी (कांसा वैंड) से चेहरे पर चमक लाने की विधि।',
    keyTimestamps: [
      { time: '00:00', seconds: 0, label: 'Warming Herbal Brahmi/Sesame Oil', labelHi: 'ब्राह्मी तेल गर्म करना', description: 'Preparing authentic Ayurvedic oil.' },
      { time: '03:30', seconds: 210, label: 'Crown Adhipati & Simantaka Marma Activation', labelHi: 'अधिपति व सीमंतक मर्म बिंदु', description: 'Gentle circular pressure on cranial suture intersections.' },
      { time: '09:15', seconds: 555, label: 'Hair Root Friction & Neck Traction', labelHi: 'बालों की जड़ों में फ्रिक्शन', description: 'Stimulating micro-circulation to the hair follicles.' },
      { time: '14:00', seconds: 840, label: 'Kansa Wand Figure-8 Facial Sculpting', labelHi: 'कांसा वैंड से चेहरे की मसाज', description: 'Balancing skin pH and reducing facial puffiness.' }
    ],
    practiceChecklist: [
      { id: 'c6-1', text: 'Checked for hair extensions or sensitive scalp before beginning', textHi: 'शुरू करने से पहले स्कैल्प की संवेदनशीलता जांची' },
      { id: 'c6-2', text: 'Maintained slow, fluid circular motions with the Kansa bronze bowl', textHi: 'कांसा वैंड को चेहरे पर बिना खींचे धीरे-धीरे गोल घुमाया' },
      { id: 'c6-3', text: 'Kept oil strictly away from eyes', textHi: 'तेल को आंखों में जाने से पूरी तरह बचाया' }
    ],
    targetMuscles: ['Temporalis', 'Frontalis', 'Occipitalis', 'Masseter', 'Sternocleidomastoid'],
    recommendedOils: ['Warm Brahmi Sesame Oil (Scalp)', 'Pure Saffron Kumkumadi Tailam (Face)'],
    contraindications: ['Recent cranial surgery', 'Severe migraine during acute aura', 'Active acne flare-ups']
  },
  {
    id: 'vid-7',
    title: 'Essential Oil Blending & Aromatherapy Diffusion Masterclass',
    titleHi: 'एसेंशियल ऑयल ब्लेंडिंग और अरोमाथेरेपी डिफ्यूजन मास्टरक्लास',
    category: 'Aromatherapy & Oils',
    duration: '14:15',
    durationSeconds: 855,
    level: 'Beginner',
    instructor: 'Dr. Celine Laurent',
    instructorRole: 'French Clinical Aromatherapist & Formulation Chemist',
    thumbnailGradient: 'from-[#386641] to-[#6A994E]',
    previewAnimationType: 'oils',
    description: 'Learn how to formulate custom 2% synergistic massage oil blends. Understand top, middle, and base olfactory notes, correct drop calculation for 30ml bottles, and safe room diffusion protocols.',
    descriptionHi: 'क्लाइंट के मूड के अनुसार 2% सुरक्षित तेल मिश्रण तैयार करने की कला। टॉप, मिडिल और बेस नोट्स का संतुलन, 30ml बोतल में सही बूंदों का हिसाब और कमरे को महकाने के नियम।',
    keyTimestamps: [
      { time: '00:00', seconds: 0, label: 'The 3 Olfactory Pyramid Notes (Top, Middle, Base)', labelHi: '3 गंध के स्तर (नोट्स)', description: 'Understanding evaporation rates of botanical essences.' },
      { time: '04:00', seconds: 240, label: '2% Drop Formulation Math for 30ml Base', labelHi: '30ml में बूंदों का सही गणित', description: 'Accurate ratio calculation (10-12 drops per ounce).' },
      { time: '08:30', seconds: 510, label: 'Anti-Stress Synergy: Lavender + Sweet Orange + Frankincense', labelHi: 'तनाव मुक्ति ब्लेंड रेसिपी', description: 'Compounding the 5-star spa signature blend.' },
      { time: '11:45', seconds: 705, label: 'Ultrasonic Diffuser Safe Room Protocol', labelHi: 'अल्ट्रासोनिक डिफ्यूजर का सही उपयोग', description: 'Diffusing for 30 mins max before client arrival.' }
    ],
    practiceChecklist: [
      { id: 'c7-1', text: 'Performed inner elbow patch test for sensitive clients', textHi: 'संवेदनशील क्लाइंट के लिए कोहनी के अंदर पैच टेस्ट किया' },
      { id: 'c7-2', text: 'Stored essential oils in dark amber UV-protective glass bottles', textHi: 'एसेंशियल तेलों को धूप से बचाने के लिए भूरी कांच की शीशियों में रखा' },
      { id: 'c7-3', text: 'Never applied undiluted essential oils directly on skin', textHi: 'बिना कैरियर ऑयल मिलाए सीधे त्वचा पर एसेंशियल तेल कभी नहीं लगाया' }
    ],
    targetMuscles: ['Olfactory System & Limbic Emotional Brain'],
    recommendedOils: ['Jojoba / Sweet Almond Carrier', 'French Lavender', 'Bergamot FCF', 'Atlas Cedarwood'],
    contraindications: ['Severe bronchial asthma to strong scents', 'First trimester pregnancy', 'Known plant allergies']
  },
  {
    id: 'vid-8',
    title: 'Spa Sanitation, Treatment Room Setup & CIDESCO Hygiene Standards',
    titleHi: 'स्पा स्वच्छता, ट्रीटमेंट रूम सेटअप और CIDESCO हाइजीन मानक',
    category: 'Hygiene & Setup',
    duration: '17:50',
    durationSeconds: 1070,
    level: 'Beginner',
    instructor: 'Elena Roy & Spa Hub Faculty',
    instructorRole: 'Hospitality Hygiene & Inspection Lead',
    thumbnailGradient: 'from-[#4A5568] to-[#2D3748]',
    previewAnimationType: 'effleurage',
    description: 'Master the 5-star operational standard for sanitizing beds, changing linens between guests, regulating room lighting, heating bolsters, preparing herbal tea stations, and avoiding cross-contamination.',
    descriptionHi: 'हर गेस्ट के बाद बेड को सैनिटाइज करने, 60°C पर धुली हुई नई चादरें बिछाने, कमरे की रोशनी, संगीत और तापमान को सेट करने तथा 5-स्टार हाइजीन बनाए रखने की संपूर्ण प्रक्रिया।',
    keyTimestamps: [
      { time: '00:00', seconds: 0, label: 'The 10-Minute Room Turnaround Protocol', labelHi: '10 मिनट में कमरे की सफाई व रीसेट', description: 'Stripping dirty linens directly into closed laundry bags.' },
      { time: '04:15', seconds: 255, label: 'Surface Disinfection of Massage Bed & Face Cradle', labelHi: 'बेड और फेस क्रैडल का डिसइंफेक्शन', description: 'Hospital-grade sanitizing spray with 3-minute dwell time.' },
      { time: '08:30', seconds: 510, label: 'Bed Layering: Fleece, Fitted Sheet & Bolster Pillow', labelHi: 'परफेक्ट बेड मेकिंग व चादर बिछाना', description: 'Hospital corners tucking and cozy plush finish.' },
      { time: '13:20', seconds: 800, label: 'Ambience Check: 2700K Amber Light, 432Hz Music & Scent', labelHi: 'रोशनी, संगीत और सुगंध की जांच', description: 'Final inspection checklist before ringing the reception.' }
    ],
    practiceChecklist: [
      { id: 'c8-1', text: 'Disinfected face cradle and vinyl bed with certified virucidal spray', textHi: 'फेस क्रैडल और बेड को प्रमाणित कीटाणुनाशक स्प्रे से साफ किया' },
      { id: 'c8-2', text: 'Placed fresh disposable face cradle cover for every client', textHi: 'हर क्लाइंट के लिए नया डिस्पोजेबल फेस कवर लगाया' },
      { id: 'c8-3', text: 'Washed hands with antibacterial soap for 20 seconds before greeting', textHi: 'क्लाइंट से मिलने से पहले 20 सेकंड तक साबुन से हाथ धोए' }
    ],
    targetMuscles: ['Professional Spa Operations & Safety Systems'],
    recommendedOils: ['Lemongrass & Tea Tree Sanitizing Spritz'],
    contraindications: ['Never compromise on fresh linens under any circumstance']
  }
];
