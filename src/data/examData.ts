import { QuizQuestion } from '../types';

export const certificationExamQuestions: QuizQuestion[] = [
  {
    id: 'exam-1',
    question: 'What does the Latin acronym "SPA" originally signify?',
    questionHi: 'लैटिन शब्द "SPA" का मूल अर्थ क्या है?',
    options: [
      'Sanitas Per Aquam (Health Through Water)',
      'Specific Pressure Application',
      'Systematic Physical Alignment',
      'Somatic Pain Alleviation'
    ],
    optionsHi: [
      'सैनिटास पर एक्वाम (जल द्वारा स्वास्थ्य)',
      'स्पेसिफिक प्रेशर एप्लीकेशन',
      'सिस्टेमैटिक फिजिकल अलाइनमेंट',
      'सोमैटिक पेन एलिविएशन'
    ],
    correctIndex: 0,
    explanation: 'SPA stands for Sanitas Per Aquam, historically referencing mineral bath healing.',
    explanationHi: 'SPA की उत्पत्ति लैटिन भाषा के शब्द "Sanitas Per Aquam" से हुई है जिसका अर्थ जल द्वारा स्वास्थ्य लाभ है।'
  },
  {
    id: 'exam-2',
    question: 'Which condition is an ABSOLUTE contraindication where massage is strictly forbidden?',
    questionHi: 'निम्नलिखित में से कौन सी स्थिति पूर्ण वर्जित (Absolute Contraindication) है जहां मसाज करना सख्त मना है?',
    options: [
      'Suspected Deep Vein Thrombosis (DVT) with calf pain and swelling',
      'Mild shoulder stiffness after desktop work',
      'Dry skin on feet',
      'Mental stress after a busy workday'
    ],
    optionsHi: [
      'पिंडली में सूजन और दर्द के साथ डीप वेन थ्रोम्बोसिस (DVT/खून का थक्का)',
      'डेस्क पर काम करने के बाद कंधे में हल्का तनाव',
      'पैरों की सूखी त्वचा',
      'व्यस्त दिन के बाद सामान्य मानसिक थकान'
    ],
    correctIndex: 0,
    explanation: 'DVT presents a severe risk of dislodging a thrombus into the lungs, creating a fatal pulmonary embolism.',
    explanationHi: 'DVT में नस का थक्का छूटकर फेफड़ों तक पहुंच सकता है जो जानलेवा साबित हो सकता है।'
  },
  {
    id: 'exam-3',
    question: 'Which Swedish massage stroke translates as "kneading" and flushes metabolic waste from muscle bellies?',
    questionHi: 'किस स्वीडिश स्ट्रोक का अर्थ "गूंधना" है जो मांसपेशियों से लैक्टिक एसिड को बाहर निकालता है?',
    options: ['Pétrissage', 'Effleurage', 'Tapotement', 'Vibration'],
    optionsHi: ['पेट्रिसाज (Pétrissage)', 'एफ्लूराज (Effleurage)', 'टपोटमेंट (Tapotement)', 'वाइब्रेशन (Vibration)'],
    correctIndex: 0,
    explanation: 'Pétrissage rhythmically compresses, lifts, and rolls muscle tissue to promote cellular clearance.',
    explanationHi: 'पेट्रिसाज मांसपेशियों को उठाकर गूंधने की क्रिया है जिससे लैक्टिक एसिड साफ होता है।'
  },
  {
    id: 'exam-4',
    question: 'Why should deep physical pressure NEVER be applied to the anterior neck triangle (Carotid triangle)?',
    questionHi: 'गर्दन के अगले भाग (कैरोटिड ट्राइएंगल) में तेज दबाव कभी क्यों नहीं देना चाहिए?',
    options: [
      'It contains the carotid artery, internal jugular vein, and vagus nerve',
      'It makes the client cough from dry air',
      'The skin there cannot absorb carrier oils',
      'It causes thumb strain for the therapist'
    ],
    optionsHi: [
      'वहां कैरोटिड धमनी, जुगुलर नस और वेगस नर्व स्थित होती हैं',
      'क्लाइंट को सूखी खांसी आने लगती है',
      'वहां की त्वचा तेल नहीं सोखती',
      'थेरेपिस्ट के अंगूठे में दर्द होने लगता है'
    ],
    correctIndex: 0,
    explanation: 'The anterior neck contains delicate vascular structures that can cause fainting or vascular damage if compressed.',
    explanationHi: 'गर्दन के अगले हिस्से में मुख्य रक्त धमनियां होती हैं जहां दबाव से चक्कर या चोट आ सकती है।'
  },
  {
    id: 'exam-5',
    question: 'What is the standard, globally accepted safe dilution percentage of essential oil in carrier oil for full-body relaxation?',
    questionHi: 'फुल बॉडी रिलैक्सेशन मसाज के लिए आवश्यक तेल का मानक सुरक्षित डायल्यूशन अनुपात कितना होना चाहिए?',
    options: [
      '2% (approx 10-12 drops per 30ml carrier oil)',
      '25% essential oil blend',
      '100% pure undiluted essential oil directly on skin',
      '0.01% trace drops'
    ],
    optionsHi: [
      '2% (लगभग 10-12 बूंदें प्रति 30ml कैरियर तेल)',
      '25% मिश्रण',
      '100% बिना मिलाए सीधे त्वचा पर',
      '0.01% अंश मात्र'
    ],
    correctIndex: 0,
    explanation: '2% dilution gives optimal therapeutic and aromatic benefits without triggering contact sensitization.',
    explanationHi: '2% का अनुपात त्वचा के लिए सबसे सुरक्षित और आरामदायक माना जाता है।'
  },
  {
    id: 'exam-6',
    question: 'What is the safe operating water temperature range for a professional basalt hot stone warmer?',
    questionHi: 'हॉट स्टोन हीटर का सुरक्षित पानी का तापमान कितना होना चाहिए?',
    options: [
      '125°F - 135°F (52°C - 57°C)',
      '212°F (100°C boiling water)',
      '70°F (21°C room temperature)',
      '180°F - 200°F (82°C - 93°C)'
    ],
    optionsHi: [
      '52°C से 57°C (125°F - 135°F)',
      '100°C उबलता पानी',
      '21°C कमरे का तापमान',
      '82°C से 93°C'
    ],
    correctIndex: 0,
    explanation: 'Basalt stones are heated between 52°C and 57°C and always forearm-tested prior to client contact.',
    explanationHi: 'पत्थरों का तापमान 52°C से 57°C के बीच रखा जाता है और हमेशा पहले अपनी कलाई पर जांचा जाता है।'
  },
  {
    id: 'exam-7',
    question: 'Which stance should a therapist use to deliver long, continuous spinal glides without lower back strain?',
    questionHi: 'बिना कमर दर्द के लंबे ग्लाइडिंग स्ट्रोक लगाने के लिए थेरेपिस्ट को कौन सा स्टांस लेना चाहिए?',
    options: [
      'Archer / Lunge Stance shifting body weight from back to front foot',
      'Standing with straight locked knees and bending the lower back',
      'Sitting on a rigid high stool',
      'Balancing on tiptoes with arms extended'
    ],
    optionsHi: [
      'आर्चर / लंज स्टांस जिसमें पिछले पैर से अगले पैर पर वजन बदला जाता है',
      'घुटनों को सीधा रखकर केवल कमर झुकाना',
      'ऊंचे स्टूल पर बैठना',
      'पंजों के बल खड़े होकर झुकना'
    ],
    correctIndex: 0,
    explanation: 'Archer stance allows smooth kinetic transfer of body mass through relaxed arms, saving spine and wrists.',
    explanationHi: 'आर्चर स्टांस से शरीर का वजन आगे बढ़ता है और कमर व कलाई सुरक्षित रहती है।'
  },
  {
    id: 'exam-8',
    question: 'In Traditional Thai Massage, along what primary energy channels are acupressure and palm walking applied?',
    questionHi: 'पारंपरिक थाई मसाज में एक्यूप्रेशर और पाम वॉकिंग किन मुख्य ऊर्जा चैनलों पर की जाती है?',
    options: ['10 Sen Lines (Sen Sib)', 'Meridian 99 lines', 'Venous valves', 'Lymph capillaries only'],
    optionsHi: ['10 सेन रेखाएं (Sen Sib Lines)', 'मेरिडियन 99 रेखाएं', 'केवल नसों के वाल्व', 'लिम्फ नलिकाएं'],
    correctIndex: 0,
    explanation: 'Traditional Thai medicine utilizes the 10 major Sen lines (Sen Sib) for energy harmonization.',
    explanationHi: 'थाई चिकित्सा 10 प्रमुख सेन रेखाओं के माध्यम से ऊर्जा प्रवाह को संतुलित करती है।'
  },
  {
    id: 'exam-9',
    question: 'In Foot Reflexology, what technique delivers continuous, non-fatiguing micro-pressure across reflex zones?',
    questionHi: 'फुट रिफ्लेक्सोलॉजी में तलवों पर बिना थके निरंतर सूक्ष्म दबाव देने के लिए किस तकनीक का उपयोग होता है?',
    options: ['Caterpillar Thumb Walking', 'Heavy elbow dropping', 'Fist pounding', 'Vigorous towel slapping'],
    optionsHi: ['कैटरपिलर थंब वॉकिंग (Thumb Walking)', 'कोहनी गिराना', 'मुक्का मारना', 'तौलिया थपथपाना'],
    correctIndex: 0,
    explanation: 'Thumb walking bends the first knuckle joint at 45 degrees, advancing in 2mm incremental steps.',
    explanationHi: 'कैटरपिलर थंब वॉकिंग से अंगूठे के जोड़ पर जोर नहीं पड़ता और सटीक दबाव मिलता है।'
  },
  {
    id: 'exam-10',
    question: 'Which essential oil is celebrated as the universal "Queen of Aromatherapy" for insomnia, nervous tension, and skin soothing?',
    questionHi: 'अनिद्रा, मानसिक तनाव और त्वचा को आराम देने के लिए किस तेल को "क्वीन ऑफ अरोमाथेरेपी" कहा जाता है?',
    options: ['French Lavender (Lavandula angustifolia)', 'Black Pepper Oil', 'Cinnamon Bark Oil', 'Oregano Oil'],
    optionsHi: ['फ्रेंच लैवेंडर (Lavender)', 'काली मिर्च का तेल', 'दालचीनी का तेल', 'अजवाइन का तेल'],
    correctIndex: 0,
    explanation: 'Lavender contains high concentrations of linalool and linalyl acetate, proven to calm the central nervous system.',
    explanationHi: 'लैवेंडर मस्तिष्क को शांत करने और तनाव मिटाने के लिए विश्व प्रसिद्ध है।'
  },
  {
    id: 'exam-11',
    question: 'What is the master Acupressure / Marma point located in the webbing between thumb and index finger (LI-4 Hegu)?',
    questionHi: 'हाथ के अंगूठे और पहली उंगली के बीच स्थित शक्तिशाली दर्द निवारक बिंदु कौन सा है?',
    options: [
      'LI-4 (Hegu) - relieves headaches and facial tension, but CONTRAINDICATED in pregnancy',
      'GB-21 located on the foot sole',
      'BL-57 located on the eyebrow',
      'LU-1 located on the knee cap'
    ],
    optionsHi: [
      'LI-4 (हेगू) - सिरदर्द और दर्द निवारक, लेकिन गर्भावस्था में वर्जित',
      'पैर के तलवे पर GB-21',
      'भौंहों पर BL-57',
      'घुटने पर LU-1'
    ],
    correctIndex: 0,
    explanation: 'LI-4 Hegu releases endorphins for cranial pain relief, but stimulates uterine contractions and must be avoided during pregnancy.',
    explanationHi: 'हेगू (LI-4) सिरदर्द में चमत्कारी है किंतु गर्भवती महिलाओं में इसका उपयोग सख्त मना है।'
  },
  {
    id: 'exam-12',
    question: 'How should massage linens and towels be laundered for 5-star professional hygiene?',
    questionHi: '5-स्टार स्पा में तौलियों और बेडशीट को किस प्रकार धोना चाहिए?',
    options: [
      'Washed at minimum 60°C with sanitizing detergent and dried completely before folding',
      'Rinsed quickly in cold tap water once a week',
      'Reused across 5 different clients if no visible oil stains appear',
      'Spritzed with room perfume without washing'
    ],
    optionsHi: [
      'कम से कम 60°C गर्म पानी और सैनिटाइजिंग डिटर्जेंट से धोकर पूरी तरह सुखाना',
      'हफ्ते में एक बार ठंडे पानी से खंगालना',
      'बिना धोए 5 क्लाइंट्स पर दोबारा इस्तेमाल करना',
      'धोने के बजाय सिर्फ परफ्यूम छिड़कना'
    ],
    correctIndex: 0,
    explanation: 'Thermal washing at 60°C destroys dermatological bacteria, fungal spores, and viral pathogens.',
    explanationHi: '60°C गर्म पानी में धोने से सभी कीटाणु और बैक्टीरिया पूरी तरह नष्ट हो जाते हैं।'
  },
  {
    id: 'exam-13',
    question: 'When performing Deep Tissue work, at what speed should therapist tools (forearm, knuckles) glide?',
    questionHi: 'डीप टिश्यू मसाज करते समय फोरआर्म या नकल को किस गति से आगे बढ़ाना चाहिए?',
    options: [
      'Very slow: approximately 1 to 2 inches per second synced with client exhalations',
      'Fast and aggressive like rapid scrubbing',
      'Sudden jerky bounces',
      'Instantaneous pounding at 100 strikes per minute'
    ],
    optionsHi: [
      'बहुत धीमी गति: क्लाइंट की सांस के साथ लगभग 1-2 इंच प्रति सेकंड',
      'तेज और आक्रामक रगड़',
      'अचानक झटकेदार उछाल',
      'प्रति मिनट 100 बार थपथपाना'
    ],
    correctIndex: 0,
    explanation: 'Slow, steady sinking allows the protective nervous system to yield, preventing involuntary muscle guarding.',
    explanationHi: 'धीमी गति से मांसपेशियों की रक्षात्मक जकड़न खुलती है और गहरी राहत मिलती है।'
  },
  {
    id: 'exam-14',
    question: 'What is the core purpose of professional Client Draping?',
    questionHi: 'पेशेवर क्लाइंट ड्रेपिंग (तौलिए से ढकने) का मुख्य उद्देश्य क्या है?',
    options: [
      'To protect client modesty, maintain body warmth, and ensure 100% emotional security',
      'To make the massage room look darker',
      'To hide therapist mistakes',
      'To prevent massage oil from ever touching skin'
    ],
    optionsHi: [
      'क्लाइंट की प्राइवेसी बनाए रखना, शरीर को गर्म रखना और पूर्ण सुरक्षा का एहसास कराना',
      'कमरे को केवल अंधेरा दिखाना',
      'गलतियों को छिपाना',
      'तेल को त्वचा पर लगने से रोकना'
    ],
    correctIndex: 0,
    explanation: 'Proper draping creates an impenetrable boundary of safety, privacy, warmth, and ethical boundaries.',
    explanationHi: 'ड्रेपिंग से क्लाइंट सुरक्षित, सम्मानित और गर्म महसूस करता है।'
  },
  {
    id: 'exam-15',
    question: 'What should a therapist do immediately if a client reports sudden sharp or shooting electrical pain?',
    questionHi: 'यदि मसाज के दौरान क्लाइंट को अचानक तेज या बिजली जैसा चुभने वाला दर्द महसूस हो तो थेरेपिस्ट को क्या करना चाहिए?',
    options: [
      'Immediately ease off pressure, reposition hands, and verify comfort',
      'Push twice as hard to break the nerve',
      'Ignore the client and keep working',
      'Increase the music volume'
    ],
    optionsHi: [
      'तुरंत दबाव कम करें, हाथ की स्थिति बदलें और आराम की पुष्टि करें',
      'दबाव को दोगुना कर दें',
      'क्लाइंट की बात अनसुनी कर दें',
      'म्यूजिक की आवाज बढ़ा दें'
    ],
    correctIndex: 0,
    explanation: 'Sharp or radiating pain indicates nerve impingement or excessive force; the therapist must immediately release and reposition.',
    explanationHi: 'बिजली जैसा दर्द नस पर दबाव का संकेत है; तुरंत हाथ हटाकर आराम सुनिश्चित करना चाहिए।'
  },
  {
    id: 'exam-16',
    question: 'Which legal registration is mandatory under municipal laws to operate a commercial spa or wellness center in an Indian city?',
    questionHi: 'भारत में कमर्शियल स्पा सेंटर चलाने के लिए नगर निगम और श्रम विभाग के तहत कौन सा पंजीकरण अनिवार्य है?',
    options: [
      'Shop & Establishment Act Registration and Municipal Health Trade License',
      'Only an informal handwritten diary',
      'Mining concession permit',
      'Agricultural land clearance'
    ],
    optionsHi: [
      'शॉप एंड एस्टेब्लिशमेंट एक्ट (गुमाश्ता) और म्युनिसिपल हेल्थ ट्रेड लाइसेंस',
      'केवल एक साधारण डायरी',
      'खनन विभाग की अनुमति',
      'कृषि भूमि अनापत्ति'
    ],
    correctIndex: 0,
    explanation: 'Shop & Establishment Act and Municipal Health Trade License regulate commercial operations, hygiene compliance, and employee conditions.',
    explanationHi: 'शॉप एक्ट और हेल्थ ट्रेड लाइसेंस स्पा की कानूनी मान्यता, स्वच्छता और कर्मचारियों के नियमों के लिए आवश्यक हैं।'
  },
  {
    id: 'exam-17',
    question: 'Why is a Sanitary NOC (No Objection Certificate) required from the Local Health Inspector for a spa facility?',
    questionHi: 'स्पा सेंटर के लिए स्थानीय स्वास्थ्य अधिकारी से सेनेटरी NOC (Sanitary NOC) क्यों जरूरी है?',
    options: [
      'To verify water purity, linen sterilization, pest control, and hygienic shower facilities',
      'To decide the price of coffee served in the lounge',
      'To select the uniform color of therapists',
      'To verify the sound system wattage'
    ],
    optionsHi: [
      'पानी की स्वच्छता, तौलियों का स्टरलाइजेशन, कीट नियंत्रण और शावर की स्वच्छता प्रमाणित करने के लिए',
      'लाउंज में कॉफी की कीमत तय करने के लिए',
      'थेरेपिस्ट की ड्रेस का रंग तय करने के लिए',
      'म्यूजिक सिस्टम की आवाज नापने के लिए'
    ],
    correctIndex: 0,
    explanation: 'Health inspectors verify sanitation, cross-infection prevention measures, and clean drainage prior to issuing a Sanitary NOC.',
    explanationHi: 'स्वास्थ्य विभाग संक्रमण की रोकथाम और कमरे की स्वच्छता की पुष्टि के बाद ही सेनेटरी NOC जारी करता है।'
  },
  {
    id: 'exam-18',
    question: 'What is the typical Gross Profit Margin on single spa massage services when managed with controlled inventory?',
    questionHi: 'सही इन्वेंट्री प्रबंधन के साथ स्पा मसाज सर्विस पर औसत ग्रॉस प्रॉफिट मार्जिन कितना होता है?',
    options: [
      '75% to 85% gross profit margin',
      'Only 5% to 8%',
      'Break-even with 0% margin',
      'Negative margin'
    ],
    optionsHi: [
      '75% से 85% ग्रॉस प्रॉफिट मार्जिन',
      'केवल 5% से 8%',
      'शून्य मार्जिन (नो प्रॉफिट)',
      'नकारात्मक मार्जिन'
    ],
    correctIndex: 0,
    explanation: 'Consumables (oil, linen washing, disposable innerwear) cost only ₹150-₹300 per session, allowing 75-85% gross margin on a ₹2,500 ticket.',
    explanationHi: '₹2,500 की मसाज में तेल और तौलियों का खर्च मात्र ₹150-₹300 आता है, जिससे 75-85% तक का मुनाफा होता है।'
  },
  {
    id: 'exam-19',
    question: 'What is the most cost-effective digital marketing channel for driving consistent local footfall to a new spa center?',
    questionHi: 'नए स्पा सेंटर में स्थानीय ग्राहकों को आकर्षित करने के लिए सबसे प्रभावी डिजिटल मार्केटिंग चैनल कौन सा है?',
    options: [
      'Google My Business (Local 3-Pack SEO) with verified reviews and high-resolution spa photos',
      'National TV broadcast commercials',
      'Random spam text messages at midnight',
      'Newspaper inserts in other states'
    ],
    optionsHi: [
      'गूगल माय बिजनेस (Google Maps Local SEO) जिसपर 5-स्टार रिव्यूज और सुंदर फोटो हों',
      'राष्ट्रीय टीवी चैनल पर विज्ञापन',
      'आधी रात को अनचाहे स्पैम मैसेज भेजना',
      'दूसरे राज्यों के अखबार में पर्चे बंटवाना'
    ],
    correctIndex: 0,
    explanation: '80% of high-intent spa searches ("luxury spa near me", "couples massage") convert directly through top 3 Google Maps listings.',
    explanationHi: '"स्पा नियर मी" सर्च करने वाले 80% ग्राहक गूगल मैप्स और रिव्यूज देखकर ही सीधे बुकिंग करते हैं।'
  },
  {
    id: 'exam-20',
    question: 'Why are Annual or Half-Yearly Spa Memberships crucial for a spa business cash flow?',
    questionHi: 'स्पा बिजनेस के कैश फ्लो और स्थिरता के लिए एनुअल/हाफ-ईयरली मेंबरशिप पैकेज क्यों जरूरी हैं?',
    options: [
      'They secure upfront upfront working capital and guarantee predictable monthly recurring revenue',
      'They eliminate the need to wash towels',
      'They allow therapists to skip consultation forms',
      'They decrease customer satisfaction'
    ],
    optionsHi: [
      'ये शुरुआत में ही एकमुश्त पूंजी लाते हैं और हर महीने तय आमदनी सुनिश्चित करते हैं',
      'इनसे तौलिए धोने की जरूरत खत्म हो जाती है',
      'इनसे फॉर्म भरने की जरूरत नहीं रहती',
      'इनसे ग्राहक असंतुष्ट होते हैं'
    ],
    correctIndex: 0,
    explanation: 'Memberships lock in repeat customer loyalty, raise client Lifetime Value (LTV), and stabilize operational expenses.',
    explanationHi: 'मेंबरशिप से ग्राहक बार-बार आते हैं, अग्रिम पैसा मिलता है और बिजनेस में कभी मंदी नहीं आती।'
  },
  {
    id: 'exam-21',
    question: 'Which music copyright licenses are required to legally play background ambient wellness music in an Indian commercial spa?',
    questionHi: 'कमर्शियल स्पा में बैकग्राउंड म्यूजिक बजाने के लिए भारत में कौन से कॉपीराइट लाइसेंस आवश्यक हैं?',
    options: [
      'PPL (Phonographic Performance Limited) and IPRS (Indian Performing Right Society) Public Performance License',
      'Driver license only',
      'No license needed for any recorded music',
      'Building tax receipt only'
    ],
    optionsHi: [
      'PPL (फोनोग्राफिक परफॉर्मेंस लिमिटेड) और IPRS का पब्लिक परफॉर्मेंस लाइसेंस',
      'केवल ड्राइविंग लाइसेंस',
      'किसी भी म्यूजिक के लिए लाइसेंस नहीं चाहिए',
      'केवल मकान टैक्स रसीद'
    ],
    correctIndex: 0,
    explanation: 'PPL and IPRS licenses grant the legal public performance rights for recorded and composed ambient music.',
    explanationHi: 'PPL और IPRS लाइसेंस स्पा में कानूनी रूप से शांतिदायक म्यूजिक बजाने के अधिकार देते हैं।'
  },
  {
    id: 'exam-22',
    question: 'When pitching an add-on product (upselling) like organic body butter or essential oil roll-ons, what is the best timing?',
    questionHi: 'क्लाइंट को बॉडी बटर या एसेंशियल ऑयल रोल-ऑन खरीदने का सुझाव देने (Upsell) का सबसे सही समय कौन सा है?',
    options: [
      'During the post-treatment consultation while serving herbal tea and explaining aftercare',
      'In the middle of the massage when the client is half-asleep',
      'Before they have even taken off their shoes',
      'By sneaking it into their bag without telling them'
    ],
    optionsHi: [
      'थेरेपी के बाद जब क्लाइंट हर्बल चाय पी रहा हो और आप होम-केयर की सलाह दे रहे हों',
      'मसाज के बीच में जब क्लाइंट गहरी नींद में हो',
      'जूते उतारने से पहले ही',
      'बिना बताए उनके बैग में रखकर'
    ],
    correctIndex: 0,
    explanation: 'Post-treatment debrief is the natural moment when clients are relaxed, appreciative, and eager to maintain their skin wellness at home.',
    explanationHi: 'थेरेपी के बाद क्लाइंट रिलेक्स होता है और अपनी त्वचा की देखभाल जारी रखने के लिए सलाह का स्वागत करता है।'
  },
  {
    id: 'exam-23',
    question: 'What is the primary muscle of the upper back that forms a kite-shape and carries common stress tension?',
    questionHi: 'पीठ के ऊपरी हिस्से की वह कौन सी पतंग के आकार की मुख्य मांसपेशी है जिसमें सबसे ज्यादा तनाव इकट्ठा होता है?',
    options: ['Trapezius muscle', 'Gastrocnemius', 'Rectus Abdominis', 'Tibialis anterior'],
    optionsHi: ['ट्रेपेजियस मांसपेशी (Trapezius)', 'गैस्ट्रोकनेमियस (पिंडली)', 'रेक्टस एब्डोमिनिस (पेट)', 'टिबियालिस'] ,
    correctIndex: 0,
    explanation: 'The trapezius extends from the occiput down to T12 and across to the clavicle and scapular spine.',
    explanationHi: 'ट्रेपेजियस गर्दन से पीठ के बीच तक फैली होती है और तनाव से सबसे पहले सख्त होती है।'
  },
  {
    id: 'exam-24',
    question: 'What is the function of the Erector Spinae muscle group along the spine?',
    questionHi: 'रीढ़ की हड्डी के दोनों तरफ स्थित इरेक्टर स्पाइनी (Erector Spinae) मांसपेशियों का क्या कार्य है?',
    options: [
      'Extending the vertebral column and maintaining upright posture',
      'Flexing the big toe only',
      'Digesting food proteins',
      'Producing saliva'
    ],
    optionsHi: [
      'रीढ़ की हड्डी को सीधा रखना और शरीर को झुकने व उठने में सहारा देना',
      'सिर्फ पैर का अंगूठा मोड़ना',
      'भोजन पचाना',
      'लार बनाना'
    ],
    correctIndex: 0,
    explanation: 'The erector spinae (iliocostalis, longissimus, spinalis) supports spinal posture and extension.',
    explanationHi: 'इरेक्टर स्पाइनी रीढ़ को सीधा रखने और झुककर खड़े होने में मुख्य भूमिका निभाती है।'
  },
  {
    id: 'exam-25',
    question: 'Why should a therapist avoid working directly on varicose veins?',
    questionHi: 'थेरेपिस्ट को वैरिकोज वेन्स (उभरी हुई नीली नसों) पर सीधे तेज दबाव क्यों नहीं देना चाहिए?',
    options: [
      'Risk of vein wall rupture and thrombus mobilization',
      'It makes the oil evaporate faster',
      'It changes the color of the towel',
      'Varicose veins are immune to touch'
    ],
    optionsHi: [
      'नस की दीवार फटने और खून का थक्का छूटने का खतरा होता है',
      'इससे तेल जल्दी सूख जाता है',
      'तौलिए का रंग बदल जाता है',
      'नसों पर कोई असर नहीं होता'
    ],
    correctIndex: 0,
    explanation: 'Damaged venous valves in varicose veins cannot withstand deep pressure; massage should be gentle and effleurage should glide proximally around them.',
    explanationHi: 'कमजोर नसों पर तेज दबाव से नस फट सकती है या सूजन बढ़ सकती है; केवल हल्का ग्लाइड पास से किया जाता है।'
  },
  {
    id: 'exam-26',
    question: 'In Ayurveda, what is the traditional warm herbal oil head pour therapy called?',
    questionHi: 'आयुर्वेद में माथे पर लगातार गर्म औषधीय तेल की धार डालने वाली प्रसिद्ध थेरेपी क्या कहलाती है?',
    options: ['Shirodhara', 'Udvartana', 'Netra Tarpana', 'Kati Basti'],
    optionsHi: ['शिरोधारा (Shirodhara)', 'उद्वर्तन (Udvartana)', 'नेत्र तर्पण', 'कटि बस्ती'],
    correctIndex: 0,
    explanation: 'Shirodhara involves pouring a rhythmic stream of warm herbal oil onto the "Ajna" chakra for profound mental peace.',
    explanationHi: 'शिरोधारा में माथे पर आज्ञा चक्र पर औषधीय तेल की धार डाली जाती है जिससे अनिद्रा और तनाव दूर होता है।'
  },
  {
    id: 'exam-27',
    question: 'What is a "Carrier Oil" in professional aromatherapy massage?',
    questionHi: 'प्रोफेशनल अरोमाथेरेपी मसाज में "कैरियर ऑयल" (Carrier Oil) किसे कहा जाता है?',
    options: [
      'A cold-pressed vegetable/plant oil (like Sweet Almond or Jojoba) used to dilute potent essential oils',
      'A mineral oil that smells like gasoline',
      'A chemical solvent used to clean floors',
      'Boiling hot water'
    ],
    optionsHi: [
      'कोल्ड-प्रेस्ड वनस्पति तेल (जैसे बादाम या जोजोबा तेल) जो तेज आवश्यक तेलों को मिलाने व फैलाने के काम आता है',
      'पेट्रोल जैसा गंध वाला मिनरल ऑयल',
      'फर्श साफ करने वाला केमिकल',
      'उबलता हुआ पानी'
    ],
    correctIndex: 0,
    explanation: 'Carrier oils safely carry volatile essential oils into the epidermis and provide glide lubrication.',
    explanationHi: 'कैरियर तेल त्वचा को पोषण देते हैं और तेज एसेंशियल तेल को सुरक्षित रूप से त्वचा में पहुंचाते हैं।'
  },
  {
    id: 'exam-28',
    question: 'Which carrier oil closely resembles human sebum and is non-comedogenic for all skin types?',
    questionHi: 'कौन सा कैरियर ऑयल मानव त्वचा के प्राकृतिक सीबम (तेल) जैसा होता है और चेहरे के रोमछिद्रों को बंद नहीं करता?',
    options: ['Golden Jojoba Oil', 'Heavy Castor Oil', 'Crude Petroleum Oil', 'Mustard seed pungent oil'],
    optionsHi: ['गोल्डन जोजोबा ऑयल (Jojoba)', 'गाढ़ा अरंडी का तेल (Castor)', 'कच्चा पेट्रोलियम', 'तीखा सरसों तेल'],
    correctIndex: 0,
    explanation: 'Jojoba is technically a liquid wax ester with a molecular profile almost identical to natural skin sebum.',
    explanationHi: 'जोजोबा ऑयल त्वचा के प्राकृतिक तेल जैसा होता है और चेहरे की मसाज के लिए सर्वश्रेष्ठ है।'
  },
  {
    id: 'exam-29',
    question: 'Which essential oil MUST be avoided on sun-exposed skin due to phototoxicity?',
    questionHi: 'धूप में निकलने से पहले किस एसेंशियल ऑयल का उपयोग त्वचा पर नहीं करना चाहिए क्योंकि यह फोटो-टॉक्सिक होता है?',
    options: ['Cold-pressed Bergamot / Citrus Oils', 'Pure Lavender', 'Sandalwood', 'Frankincense'],
    optionsHi: ['कोल्ड-प्रेस्ड बर्गमॉट / खट्टे नींबू-संतरे के तेल', 'शुद्ध लैवेंडर', 'चंदन (Sandalwood)', 'लोबान (Frankincense)'],
    correctIndex: 0,
    explanation: 'Citrus oils containing bergapten cause severe hyperpigmentation or blistering when exposed to UV sunlight.',
    explanationHi: 'सिट्रस और बर्गमॉट तेल धूप के संपर्क में आने पर त्वचा पर काले दाग या छाले पैदा कर सकते हैं।'
  },
  {
    id: 'exam-30',
    question: 'What is the ideal lighting and room temperature condition for a high-end luxury massage suite?',
    questionHi: 'एक उच्च स्तरीय लक्जरी स्पा ट्रीटमेंट रूम के लिए आदर्श रोशनी और तापमान कितना होना चाहिए?',
    options: [
      'Warm dim amber lighting (2700K) and comfortable 24°C - 26°C with heated blanket',
      'Harsh fluorescent white tubes (6500K) and freezing 15°C',
      'Complete pitch darkness with no exit signs and 38°C hot sauna heat',
      'Flashing disco lights'
    ],
    optionsHi: [
      'हल्की गर्म पीली रोशनी (2700K) और आरामदायक 24°C - 26°C तापमान के साथ वार्मर बेड',
      'तेज सफेद ट्यूबलाइट और 15°C की ठिठुरन',
      'पूरी तरह अंधेरा और 38°C की उमस',
      'चमकती डिस्को लाइट'
    ],
    correctIndex: 0,
    explanation: 'Clients experience metabolic slowdown during massage, so a cozy 24°C-26°C room prevents shivering while dim amber lighting promotes melatonin.',
    explanationHi: 'मसाज के दौरान शरीर का तापमान गिरता है, इसलिए 24°-26°C और गर्म पीली रोशनी क्लाइंट को गहरा आराम देती है।'
  },
  {
    id: 'exam-31',
    question: 'What should be written on a mandatory Client Health Consultation & Intake Form before starting any massage?',
    questionHi: 'मसाज शुरू करने से पहले क्लाइंट हेल्थ कंसल्टेशन फॉर्म में कौन सी जानकारियां लेना अनिवार्य है?',
    options: [
      'Medical history, allergies, surgeries, current medications, pregnancy status, and emergency contact',
      'Client social media passwords only',
      'Credit card PIN number',
      'Favorite movie genres'
    ],
    optionsHi: [
      'बीमारियों का इतिहास, एलर्जी, हालिया सर्जरी, दवाएं, गर्भावस्था और इमरजेंसी संपर्क नंबर',
      'सोशल मीडिया पासवर्ड',
      'क्रेडिट कार्ड का पिन',
      'पसंदीदा फिल्मों के नाम'
    ],
    correctIndex: 0,
    explanation: 'Health intake forms protect client safety and legally safeguard the spa against undisclosed contraindications.',
    explanationHi: 'हेल्थ फॉर्म क्लाइंट की सुरक्षा और स्पा की कानूनी सुरक्षा के लिए बेहद जरूरी दस्तावेज है।'
  },
  {
    id: 'exam-32',
    question: 'Which Acupressure point located on the shoulder crest (GB-21 Jianjing) helps relieve heavy shoulder tension but is strictly forbidden during pregnancy?',
    questionHi: 'कंधे के ऊपरी सिरे पर स्थित कौन सा एक्यूप्रेशर पॉइंट (GB-21) कंधे की जकड़न खोलता है लेकिन गर्भावस्था में वर्जित है?',
    options: ['GB-21 (Jianjing)', 'SP-6 (Sanyinjiao)', 'GV-20 (Baihui)', 'ST-36 (Zusanli)'],
    optionsHi: ['GB-21 (जियानजिंग)', 'SP-6 (सानयिनजियाओ)', 'GV-20 (बैहुई)', 'ST-36 (जुसानली)'],
    correctIndex: 0,
    explanation: 'GB-21 triggers descending energetic action and can stimulate uterine contractions during pregnancy.',
    explanationHi: 'GB-21 कंधे का दर्द मिटाता है परंतु गर्भावस्था में गर्भाशय संकुचन बढ़ा सकता है।'
  },
  {
    id: 'exam-33',
    question: 'What is the term for rhythmic percussive massage strikes including cupping, hacking, and pummelling?',
    questionHi: 'कपिंग, हैकिंग और थपथपाने वाले तालबद्ध प्रहारों को स्वीडिश मसाज में क्या कहा जाता है?',
    options: ['Tapotement', 'Effleurage', 'Petrissage', 'Passive Stretching'],
    optionsHi: ['टपोटमेंट (Tapotement)', 'एफ्लूराज (Effleurage)', 'पेट्रिसाज (Petrissage)', 'पैसिव स्ट्रेचिंग'],
    correctIndex: 0,
    explanation: 'Tapotement stimulates peripheral nerve endings, tonifies sluggish muscles, and loosens chest mucus.',
    explanationHi: 'टपोटमेंट नसों को सक्रिय करता है और मांसपेशियों में ताजगी लाता है।'
  },
  {
    id: 'exam-34',
    question: 'Why should therapists wash their hands with antibacterial soap immediately before AND after every client treatment?',
    questionHi: 'थेरेपिस्ट को हर क्लाइंट के ट्रीटमेंट से ठीक पहले और बाद में साबुन से हाथ क्यों धोना चाहिए?',
    options: [
      'To prevent pathogenic cross-contamination between clients and therapist',
      'To make hands cold and rigid',
      'To remove nail polish',
      'Only if the manager is standing nearby'
    ],
    optionsHi: [
      'क्लाइंट और थेरेपिस्ट के बीच किसी भी प्रकार के बैक्टीरिया व संक्रमण के फैलाव को रोकने के लिए',
      'हाथों को ठंडा और कठोर करने के लिए',
      'नेल पॉलिश हटाने के लिए',
      'सिर्फ जब मैनेजर देख रहा हो'
    ],
    correctIndex: 0,
    explanation: 'Hand hygiene with 20-second lathering is the universal medical and spa foundation for infection control.',
    explanationHi: '20 सेकंड तक हाथ धोना किसी भी स्पा में संक्रमण से बचाव का पहला और सबसे अहम नियम है।'
  },
  {
    id: 'exam-35',
    question: 'What is the maximum hands-on massage hours recommended per week for a full-time therapist to avoid joint burnout?',
    questionHi: 'थेरेपिस्ट को कलाई और रीढ़ की सुरक्षा के लिए प्रति सप्ताह अधिकतम कितने घंटे मसाज करनी चाहिए?',
    options: ['20 to 25 hands-on hours per week', '70 to 80 non-stop hours', '5 hours per month', '120 hours'],
    optionsHi: ['20 से 25 घंटे प्रति सप्ताह', '70 से 80 घंटे बिना रुके', 'महीने में केवल 5 घंटे', '120 घंटे'],
    correctIndex: 0,
    explanation: 'Limiting hands-on time to 20-25 hours protects cartilage, rotator cuffs, and thumb joints for long-term career longevity.',
    explanationHi: 'हफ्ते में 20-25 घंटे से अधिक भारी काम करने से थेरेपिस्ट की कलाई और जोड़ों में स्थाई चोट लग सकती है।'
  },
  {
    id: 'exam-36',
    question: 'In Deep Tissue therapy, what is an "Ischemic Compression" on a myofascial trigger point?',
    questionHi: 'डीप टिश्यू मसाज में मायोफेशियल ट्रिगर पॉइंट पर "इस्केमिक कम्प्रेशन" (Ischemic Compression) क्या होता है?',
    options: [
      'Sustained, static pressure applied to a taut knot for 8-12 seconds until tissue softens',
      'Slapping the muscle with a cold wet towel',
      'Rubbing ice rapidly for 20 minutes',
      'Stretching until the client screams'
    ],
    optionsHi: [
      'गांठ वाले बिंदु पर 8 से 12 सेकंड तक स्थिर दबाव बनाए रखना जब तक कि जकड़न ढीली न पड़ जाए',
      'गीले तौलिए से थप्पड़ मारना',
      '20 मिनट तक बर्फ रगड़ना',
      'चीख निकलने तक खींचना'
    ],
    correctIndex: 0,
    explanation: 'Static pressure temporarily blanches capillary blood flow; upon release, fresh oxygenated blood floods in to dissolve the spasm.',
    explanationHi: 'स्थिर दबाव से गांठ में खून का बहाव रुकता है और हाथ हटाते ही ताजा ऑक्सीजन युक्त खून आकर गांठ खोल देता है।'
  },
  {
    id: 'exam-37',
    question: 'What is the purpose of placing warm basalt stones along the 7 spinal Chakra energy centers?',
    questionHi: 'रीढ़ के 7 चक्रों पर गर्म बेसाल्ट पत्थर रखने का मुख्य उद्देश्य क्या है?',
    options: [
      'To deeply relax the central nervous system and balance bio-energetic flow before manual massage',
      'To weigh down the client so they cannot move',
      'To replace using any massage oil',
      'To decorate the massage bed only'
    ],
    optionsHi: [
      'नर्वस सिस्टम को शांत करना और मुख्य मसाज से पहले ऊर्जा चक्रों को संतुलित करना',
      'क्लाइंट को भारी बनाकर हिलाने से रोकना',
      'तेल लगाने से बचने के लिए',
      'सिर्फ बेड को सजाने के लिए'
    ],
    correctIndex: 0,
    explanation: 'Chakra stones radiate deep grounding heat into paraspinal ganglia, speeding parasympathetic induction.',
    explanationHi: 'गर्म पत्थर रीढ़ की नसों में गहराई तक गर्माहट पहुंचाकर तनाव को तुरंत पिघला देते हैं।'
  },
  {
    id: 'exam-38',
    question: 'What is the Ayurvedic "Kansa Wand" made of, and what is its therapeutic property?',
    questionHi: 'आयुर्वेदिक "कांसा वैंड" (Kansa Wand) किस धातु से बनता है और इसका क्या लाभ है?',
    options: [
      'A sacred bronze alloy of Copper and Tin that balances skin pH and draws out body toxins',
      'Pure synthetic plastic',
      'Rusting iron',
      'Lead and mercury'
    ],
    optionsHi: [
      'तांबे और टिन का कांस्य मिश्रण जो त्वचा का pH संतुलित करता है और विषाक्त पदार्थों को बाहर निकालता है',
      'सिंथेटिक प्लास्टिक',
      'जंग लगा लोहा',
      'सीसा और पारा'
    ],
    correctIndex: 0,
    explanation: 'Kansa (bronze) has alkaline and anti-inflammatory properties, revitalizing lymph flow during facial massage.',
    explanationHi: 'कांसा धातु चेहरे की गर्मी और एसिडिटी को सोखकर त्वचा में प्राकृतिक चमक लाती है।'
  },
  {
    id: 'exam-39',
    question: 'Which of the following is an effective client rebooking script to increase retention to 80%+?',
    questionHi: 'क्लाइंट्स की 80%+ री-बुकिंग (दोबारा आने) के लिए सबसे प्रभावी और पेशेवर तरीका कौन सा है?',
    options: [
      '"To keep your neck and shoulder stiffness from returning, I recommend our 3-week maintenance session. Shall we reserve your Friday morning slot today?"',
      '"You must pay for next month right now or do not come back"',
      '"I do not care when you return"',
      '"Never book again"'
    ],
    optionsHi: [
      '"आपके कंधे का दर्द दोबारा न लौटे, इसके लिए 3 हफ्ते बाद फॉलो-अप सेशन लेना बेहतर होगा। क्या मैं आपका शुक्रवार का स्लॉट अभी बुक कर दूं?"',
      '"अभी अगले महीने का पैसा दो नहीं तो मत आना"',
      '"मुझे फर्क नहीं पड़ता आप कब आते हैं"',
      '"दोबारा कभी मत आना"'
    ],
    correctIndex: 0,
    explanation: 'Framing rebooking as an aftercare health prescription creates genuine value and high client adherence.',
    explanationHi: 'क्लाइंट के स्वास्थ्य लाभ को ध्यान में रखकर अगली तारीख का सुझाव देने से वे खुशी-खुशी दोबारा आते हैं।'
  },
  {
    id: 'exam-40',
    question: 'How should a therapist communicate with a first-time spa guest who feels nervous or shy?',
    questionHi: 'पहली बार स्पा आने वाले घबराए हुए या झिझक रहे क्लाइंट से थेरेपिस्ट को कैसे बात करनी चाहिए?',
    options: [
      'Speak in a calm, soothing tone, explain the draping protocol clearly, and assure them they have complete control over pressure',
      'Laugh at their nervousness loudly',
      'Rush them into the room without explaining anything',
      'Leave the treatment door wide open'
    ],
    optionsHi: [
      'शांत और विनम्र आवाज में बात करें, ड्रेपिंग और कपड़ों के नियम समझाएं और बताएं कि वे जब चाहें दबाव बदलवा सकते हैं',
      'उनकी झिझक पर जोर से हंसना',
      'बिना कुछ बताए जल्दबाजी में कमरे में भेजना',
      'कमरे का दरवाजा खुला छोड़ देना'
    ],
    correctIndex: 0,
    explanation: 'Empowering the client with clear explanations and respectful boundaries relieves anxiety instantly.',
    explanationHi: 'सम्मानपूर्वक नियम समझाने और उनकी सुविधा का भरोसा दिलाने से क्लाइंट की झिझक तुरंत दूर हो जाती है।'
  },
  {
    id: 'exam-41',
    question: 'What is the term for the connective tissue web that envelopes all muscles, bones, and organs in the human body?',
    questionHi: 'मानव शरीर में सभी मांसपेशियों, हड्डियों और अंगों को ढकने वाले संयोजी ऊतक के जाल को क्या कहा जाता है?',
    options: ['Fascia (मायोफेशिया)', 'Epidermis only', 'Synovial fluid', 'Bone marrow'],
    optionsHi: ['फेशिया / मायोफेशिया (Fascia)', 'केवल ऊपरी त्वचा', 'साइनोवियल द्रव', 'अस्थि मज्जा'],
    correctIndex: 0,
    explanation: 'Fascia is an uninterrupted viscoelastic 3D matrix that responds to slow, sustained pressure and warmth.',
    explanationHi: 'फेशिया शरीर के अंदर सभी मांसपेशियों को आपस में जोड़े रखता है और धीमे दबाव से खुलता है।'
  },
  {
    id: 'exam-42',
    question: 'Which essential oil is best known for clearing nasal congestion and invigorating fatigued mental focus?',
    questionHi: 'बंद नाक खोलने और मानसिक सुस्ती दूर करने के लिए कौन सा एसेंशियल ऑयल सबसे प्रसिद्ध है?',
    options: ['Eucalyptus Globulus (नीलगिरी)', 'Chamomile', 'Ylang Ylang', 'Vanilla extract'],
    optionsHi: ['यूकेलिप्टस / नीलगिरी का तेल (Eucalyptus)', 'कैमोमाइल', 'यलांग यलांग', 'वैनिला'],
    correctIndex: 0,
    explanation: 'Eucalyptus contains eucalyptol (1,8-cineole), an expectorant and mental stimulant.',
    explanationHi: 'नीलगिरी का तेल श्वसन तंत्र को खोलता है और सिर में ताजगी भर देता है।'
  },
  {
    id: 'exam-43',
    question: 'What is the ideal thickness and foam density for a professional stationary spa massage table?',
    questionHi: 'एक आरामदायक और टिकाऊ प्रोफेशनल स्पा मसाज टेबल का गद्देदार फोम कितना मोटा होना चाहिए?',
    options: [
      '2.5 to 3.5 inches of multi-layer high-density memory foam',
      '0.2 inches of cardboard',
      '12 inches of sinking spring mattress',
      'Hard steel plate with no cushioning'
    ],
    optionsHi: [
      '2.5 से 3.5 इंच का मल्टी-लेयर हाई-डेंसिटी मेमोरी फोम',
      '0.2 इंच का गत्ता',
      '12 इंच का झूलने वाला स्प्रिंग गद्दा',
      'बिना गद्दे की लोहे की चादर'
    ],
    correctIndex: 0,
    explanation: '2.5-3.5 inch high-density foam supports client weight comfortably without bottoming out under pressure.',
    explanationHi: '2.5 से 3.5 इंच का डेंसिटी फोम दबाव सहने के लिए मजबूत और क्लाइंट के लिए बेहद आरामदायक होता है।'
  },
  {
    id: 'exam-44',
    question: 'Why should cold-pressed oils like Sesame or Mustard be warmed slightly before Ayurvedic Abhyanga massage?',
    questionHi: 'आयुर्वेदिक अभ्यंग मसाज में तिल के तेल को हल्का गर्म (गुनगुना) करके क्यों लगाया जाता है?',
    options: [
      'Warm oil dilates skin pores, improves transdermal absorption, and pacifies Vata dosha',
      'To burn the skin',
      'To make the oil sticky like glue',
      'To change the oil color'
    ],
    optionsHi: [
      'गुनगुना तेल रोमछिद्रों को खोलता है, त्वचा में गहराई तक समाता है और वात दोष को शांत करता है',
      'त्वचा को जलाने के लिए',
      'तेल को गोंद जैसा चिपचिपा करने के लिए',
      'तेल का रंग बदलने के लिए'
    ],
    correctIndex: 0,
    explanation: 'Warmth lowers viscosity, increases capillary micro-circulation, and soothes dry Vata imbalances.',
    explanationHi: 'हल्का गर्म तेल शरीर की जकड़न मिटाता है और नसों को तुरंत पोषण देता है।'
  },
  {
    id: 'exam-45',
    question: 'What is a "Spa Service Package Combo" strategy to increase Average Order Value (AOV)?',
    questionHi: 'प्रति बिल अधिक कमाई (AOV) बढ़ाने के लिए "स्पा सर्विस पैकेज कॉम्बो" की सबसे बेहतरीन रणनीति क्या है?',
    options: [
      'Combining a 60-min Full Body Massage + 30-min Hot Stone Back Focus + 15-min Scalp & Face Ritual into a single luxury ritual price',
      'Selling single 10-minute sessions only',
      'Refusing to let clients book multiple services',
      'Giving all services away for free'
    ],
    optionsHi: [
      '60 मिनट फुल बॉडी मसाज + 30 मिनट हॉट स्टोन बैक + 15 मिनट फेस रिचुअल को मिलाकर एक प्रीमियम पैकेज बनाना',
      'सिर्फ 10 मिनट के छोटे सेशन बेचना',
      'क्लाइंट्स को एक से अधिक सर्विस लेने से मना करना',
      'सब कुछ मुफ्त में देना'
    ],
    correctIndex: 0,
    explanation: 'Multi-service ritual bundles elevate perceived client indulgence while maximizing treatment room revenue per hour.',
    explanationHi: 'कॉम्बो पैकेज से क्लाइंट को पूरा रिलैक्सेशन मिलता है और स्पा को प्रति घंटे अधिक मुनाफा होता है।'
  },
  {
    id: 'exam-46',
    question: 'In digital marketing for spas, why is automated WhatsApp appointment confirmation and reminder critical?',
    questionHi: 'स्पा बिजनेस में व्हाट्सएप पर ऑटोमेटेड बुकिंग कन्फर्मेशन और रिमाइंडर भेजना क्यों जरूरी है?',
    options: [
      'It reduces appointment "No-Shows" by over 70% and creates effortless 2-way client communication',
      'It spams the client with 500 jokes daily',
      'It crashes the therapist phone',
      'It eliminates the need for any staff'
    ],
    optionsHi: [
      'यह क्लाइंट के न आने (No-Show) की संभावना को 70% तक घटाता है और समय पर आगमन सुनिश्चित करता है',
      'दिन भर जोक्स भेजने के लिए',
      'फोन क्रैश करने के लिए',
      'स्टाफ की जरूरत खत्म करने के लिए'
    ],
    correctIndex: 0,
    explanation: 'Automated 2-hour and 24-hour WhatsApp reminders eliminate lost revenue from empty treatment room slots.',
    explanationHi: 'रिमाइंडर मैसेज से क्लाइंट समय पर आते हैं और स्पा का समय और कमरा खाली नहीं रहता।'
  },
  {
    id: 'exam-47',
    question: 'What is the correct protocol for cleaning and sterilizing hot basalt stones after a treatment session?',
    questionHi: 'हॉट स्टोन सेशन के बाद पत्थरों को साफ और कीटाणुरहित करने की सही विधि क्या है?',
    options: [
      'Washed with antibacterial soap in hot running water, soaked in hospital-grade disinfectant for 10 mins, rinsed, and air-dried',
      'Wiping them with a dirty used towel and putting them back in the heater',
      'Leaving them on the floor',
      'Rinsing in cold tea'
    ],
    optionsHi: [
      'गर्म पानी और एंटीबैक्टीरियल साबुन से धोना, 10 मिनट डिसइंफेक्टेंट में भिगोना, साफ पानी से खंगालकर सुखाना',
      'गंदे तौलिए से पोंछकर सीधे हीटर में रख देना',
      'फर्श पर छोड़ देना',
      'ठंडी चाय से धोना'
    ],
    correctIndex: 0,
    explanation: 'Thorough soap washing strips body oils, followed by chemical disinfection to eliminate cross-client microbiological risks.',
    explanationHi: 'पत्थरों से तेल और बैक्टीरिया साफ करने के लिए साबुन और डिसइंफेक्टेंट से धोना अनिवार्य है।'
  },
  {
    id: 'exam-48',
    question: 'Which stroke is used to begin and conclude virtually every Swedish massage sequence smoothly?',
    questionHi: 'स्वीडिश मसाज के हर हिस्से को शुरू और समाप्त करने के लिए किस स्ट्रोक का उपयोग किया जाता है?',
    options: ['Effleurage (लंबे ग्लाइडिंग स्ट्रोक)', 'Sudden violent pinch', 'Rapid elbow thrust', 'Ice cube press'],
    optionsHi: ['एफ्लूराज - Effleurage (धीमे लंबे ग्लाइडिंग स्ट्रोक)', 'अचानक नोचना', 'कोहनी का झटका', 'बर्फ दबाना'],
    correctIndex: 0,
    explanation: 'Effleurage introduces touch, spreads warming oil, links techniques together, and concludes by soothing the nervous system.',
    explanationHi: 'एफ्लूराज से तेल फैलता है, मांसपेशियां गर्म होती हैं और मसाज का समापन शांति से होता है।'
  },
  {
    id: 'exam-49',
    question: 'What should a therapist do if a client falls asleep and begins snoring lightly during a massage?',
    questionHi: 'यदि मसाज के दौरान क्लाइंट सो जाए और हल्के खर्राटे लेने लगे तो थेरेपिस्ट को क्या करना चाहिए?',
    options: [
      'Continue the massage smoothly and quietly, maintaining rhythmic strokes without sudden noises',
      'Shake the client awake and shout',
      'Stop working and leave the room',
      'Turn off all lights and lock the door'
    ],
    optionsHi: [
      'शांतिपूर्वक और सुचारू रूप से मसाज जारी रखें, बिना कोई आवाज किए रिदम बनाए रखें',
      'क्लाइंट को झकझोर कर जगाना और चिल्लाना',
      'मसाज रोककर कमरे से बाहर चले जाना',
      'दरवाजा बंद करके भाग जाना'
    ],
    correctIndex: 0,
    explanation: 'Sleep signifies deep parasympathetic safety and trust; the therapist should maintain quiet, rhythmic flow.',
    explanationHi: 'क्लाइंट का सो जाना गहरे विश्वास और सुकून का प्रतीक है; थेरेपिस्ट को शांति से मसाज पूरी करनी चाहिए।'
  },
  {
    id: 'exam-50',
    question: 'What is the golden rule of professional spa therapist ethics and client confidentiality?',
    questionHi: 'एक पेशेवर स्पा थेरेपिस्ट की आचार संहिता और क्लाइंट की गोपनीयता का स्वर्णिम नियम क्या है?',
    options: [
      'Never disclose client personal information, medical status, or private conversations to anyone outside',
      'Post client photos and details on personal social media without consent',
      'Discuss client private health with other clients in the waiting area',
      'Sell client phone numbers to telemarketers'
    ],
    optionsHi: [
      'क्लाइंट की व्यक्तिगत जानकारी, बीमारी या बातचीत को कभी किसी तीसरे व्यक्ति के साथ साझा न करना (पूर्ण गोपनीयता)',
      'बिना पूछे क्लाइंट की फोटो सोशल मीडिया पर डालना',
      'वेटिंग एरिया में दूसरे लोगों से क्लाइंट की बीमारी पर चर्चा करना',
      'क्लाइंट के फोन नंबर बेचना'
    ],
    correctIndex: 0,
    explanation: 'Client confidentiality and unwavering ethical boundaries are the sacred pillars of professional wellness practice.',
    explanationHi: 'क्लाइंट की गोपनीयता का सम्मान करना और उनकी बातों को पूरी तरह गुप्त रखना सबसे बड़ा पेशेवर धर्म है।'
  }
];
