import { Chapter } from '../types';

export const chaptersData: Chapter[] = [
  {
    id: 'ch-1',
    chapterNumber: 1,
    title: 'Introduction to Spa & Wellness Industry, Ethics & Etiquette',
    titleHi: 'स्पा और वेलनेस उद्योग का परिचय, आचार संहिता और शिष्टाचार',
    subtitle: 'History, professional standards, therapist posture & spa environment setup',
    subtitleHi: 'इतिहास, व्यावसायिक मानक, थेरेपिस्ट का पोस्चर और स्पा वातावरण की तैयारी',
    category: 'Fundamentals',
    estimatedReadTime: '12 mins',
    iconName: 'Sparkles',
    summary: 'Master the core foundations of the modern wellness spa industry. Understand professional therapist ethics, hygiene, consultation protocols, room ambience, and ergonomic body mechanics.',
    summaryHi: 'आधुनिक स्पा उद्योग की बुनियादी बातों को समझें। पेशेवर आचार संहिता, स्वच्छता, क्लाइंट कंसल्टेशन, कमरे का माहौल और थेरेपिस्ट के सही बॉडी पोस्चर की जानकारी प्राप्त करें।',
    sections: [
      {
        id: 'sec-1-1',
        title: 'Evolution of Spa & Meaning of "Sanitas Per Aquam"',
        titleHi: 'स्पा का इतिहास और "Sanitas Per Aquam" का अर्थ',
        content: 'The word "SPA" originates from the Latin phrase "Sanitas Per Aquam" (Health Through Water) as well as the Belgian town of Spa known for thermal mineral baths. Today, the global spa industry spans Day Spas, Resort/Hotel Spas, Ayurvedic & Holistic Retreats, Medical Spas, and Wellness Destination Centers. As a professional spa therapist, your role merges anatomical science with healing touch.',
        contentHi: 'स्पा (SPA) शब्द लैटिन वाक्यांश "सैनिटास पर एक्वाम" (जल द्वारा स्वास्थ्य) और बेल्जियम के प्रसिद्ध खनिज जल शहर "स्पा" से उत्पन्न हुआ है। आज स्पा उद्योग डे स्पा, रिज़ॉर्ट स्पा, आयुर्वेदिक और हॉलिस्टिक रिट्रीट तथा मेडिकल स्पा तक फैला हुआ है। एक पेशेवर थेरेपिस्ट के रूप में आपका कार्य शारीरिक विज्ञान और आरामदायक स्पर्श का संतुलन बनाना है।',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Luxury Sanctuary Atmosphere: Dim ambient lighting, warm linens, and natural wood architecture.',
        imageCaptionHi: 'लक्ज़री स्पा वातावरण: हल्की गर्म रोशनी, मुलायम चादरें और शांत प्राकृतिक इंटीरियर।',
        bulletPoints: [
          { en: 'Day Spa: Provides beauty and relaxation treatments without overnight stay.', hi: 'डे स्पा: बिना रात्रि विश्राम के 1 से 3 घंटे के रिलैक्सेशन और ब्यूटी ट्रीटमेंट्स प्रदान करता है।' },
          { en: 'Resort/Hotel Spa: Luxury hospitality wellness integrated with vacations.', hi: 'होटल / रिज़ॉर्ट स्पा: छुट्टियों के साथ लक्जरी वेलनेस और डी-स्ट्रेस पैकेज।' },
          { en: 'Ayurvedic & Holistic Spa: Uses ancient herbal oils, dosha balancing, and marma points.', hi: 'आयुर्वेदिक व हॉलिस्टिक स्पा: प्राचीन जड़ी-बूटी तेल, त्रिदोष संतुलन और मर्म बिंदु।' },
          { en: 'Medical / Wellness Spa: Clinical therapies under doctor supervision.', hi: 'मेडिकल स्पा: डॉक्टर्स की निगरानी में क्लिनिकल और स्किन रिपेयर थेरेपी।' }
        ]
      },
      {
        id: 'sec-1-2',
        title: 'Spa Ambience: The 5 Sensory Elements (पंचेंद्रिय वातावरण)',
        titleHi: 'स्पा का वातावरण: 5 संवेदी तत्व',
        content: 'A client starts relaxing the moment they step into the treatment room. The 5 sensory elements create a sanctuary away from daily stress:',
        contentHi: 'क्लाइंट कमरे में कदम रखते ही तनावमुक्त महसूस करना चाहिए। स्पा के 5 संवेदी तत्व इस प्रकार तैयार किए जाते हैं:',
        imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Sensory Alignment: Fresh towels, botanical flowers, burning aromatherapy oils, and calming natural textures.',
        imageCaptionHi: 'संवेदी संतुलन: ताजे तौलिए, सुगंधित फूल, डिफ्यूजर और प्राकृतिक शांत वातावरण।',
        bulletPoints: [
          { en: 'Sight (दृष्टि): Warm, dim amber lighting (2700K), flickering safe candles, clean earth tones, clutter-free stations.', hi: 'दृष्टि: हल्की गर्म पीली रोशनी (2700K), मोमबत्तियां, शांत प्राकृतिक रंग और साफ-सुथरी व्यवस्था।' },
          { en: 'Sound (श्रवण): Soft binaural beats, bamboo flute, flowing water fountain (432Hz ambient frequency, 40-50 dB max).', hi: 'श्रवण: धीमी गति का शांत संगीत, बांसुरी या बहते पानी की ध्वनि (40-50 डेसिबल)।' },
          { en: 'Scent (गंध): Subtle diffusion of lemongrass, lavender, or eucalyptus (never overpowering).', hi: 'गंध: लेमनग्रास, लैवेंडर या नीलगिरी का हल्का डिफ्यूजन।' },
          { en: 'Touch (स्पर्श): High GSM plush cotton towels, heated massage bed (38°C), smooth silk draping.', hi: 'स्पर्श: मुलायम गर्म तौलिए, गर्म मसाज बेड और आरामदायक शीट्स।' },
          { en: 'Taste (स्वाद): Post-treatment warm herbal ginger-honey tea or infused detox cucumber-mint water.', hi: 'स्वाद: थेरेपी के बाद गर्म अदरक-शहद की हर्बल चाय या डिटॉक्स वॉटर।' }
        ]
      },
      {
        id: 'sec-1-3',
        title: 'Therapist Body Mechanics & Ergonomics (थेरेपिस्ट का पोस्चर)',
        titleHi: 'थेरेपिस्ट का सही पोस्चर और शारीरिक मुद्रा',
        content: 'Therapists often suffer wrist, thumb, and lower back fatigue if relying on arm strength. Proper body mechanics uses body weight and hip leverage, not arm muscular effort.',
        contentHi: 'यदि थेरेपिस्ट केवल बाहों की ताकत से दबाव डालेगा, तो कलाई और कमर में दर्द हो सकता है। सही तकनीक में शरीर के वजन और पैरों के संतुलन (हिप्स और लेग्स) का उपयोग किया जाता है।',
        techniques: [
          {
            stepNumber: 1,
            title: 'Archer / Lunge Stance (धनुर्धारी मुद्रा)',
            titleHi: 'आर्चर / लंज स्टांस',
            description: 'Place lead foot forward pointing toward stroke direction. Back foot angled at 45 degrees. Shift weight from back leg to front leg to generate deep gliding pressure smoothly.',
            descriptionHi: 'आगे का पैर स्ट्रोक की दिशा में रखें और पिछला पैर 45 डिग्री पर। आगे-पीछे वजन शिफ्ट करके स्ट्रोक में दबाव डालें।',
            handPosition: 'Neutral wrist, arms relaxed at 120-140 degrees angle.',
            handPositionHi: 'कलाई सीधी, कोहनी हल्की मुड़ी हुई और कंधे ढीले।',
            pressureLevel: 'Medium (3/5)',
            imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Archer Lunge: Back leg straight, front knee bent, driving smooth long strokes with body mass.',
            imageCaptionHi: 'आर्चर स्टांस: पिछला पैर सीधा, आगे का घुटना मुड़ा हुआ, शरीर के वजन से स्ट्रोक लगाना।',
            tip: 'Keep your spine straight. Bend at the knees and hips, never round your lumbar spine.',
            tipHi: 'कमर सीधी रखें। हमेशा घुटनों से झुकें, पीठ को न मोड़ें।'
          },
          {
            stepNumber: 2,
            title: 'Horse Stance (अश्व मुद्रा / चौकोर स्टांस)',
            titleHi: 'हॉर्स स्टांस (पैरों की चौड़ी मुद्रा)',
            description: 'Feet shoulder-width apart, knees slightly bent. Best for cross-fiber friction, kneading (Petrissage) across the back and thighs.',
            descriptionHi: 'पैरों को कंधों की चौड़ाई के बराबर खोलें और घुटने हल्के मोड़ें। यह पीठ और जांघों पर गूंधने (kneading) के लिए सर्वोत्तम है।',
            handPosition: 'Palms flat or soft loose fists.',
            handPositionHi: 'हथेलियां सपाट या ढीली मुट्ठी।',
            pressureLevel: 'Medium (3/5)',
            imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Horse Stance: Centered weight distribution for stable bilateral kneading.',
            imageCaptionHi: 'हॉर्स स्टांस: दोनों पैरों पर बराबर वजन रखकर दो-हाथी गूंधने की क्रिया।'
          }
        ]
      },
      {
        id: 'sec-1-4',
        title: 'Client Draping & Modesty Protocols',
        titleHi: 'क्लाइंट ड्रेपिंग और प्राइवेसी के नियम',
        content: 'Professional draping ensures the client feels 100% secure, warm, and respected at all times. Only the body part currently being massaged is exposed. Private areas remain securely covered with fresh towels throughout the session.',
        contentHi: 'पेशेवर ड्रेपिंग क्लाइंट को पूरी तरह सुरक्षित, सम्मानित और गर्म महसूस कराती है। केवल वही अंग खोला जाता है जिसकी मसाज की जा रही हो। बाकी शरीर तौलिये से ढका रहता है।',
        imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Safe Draping: Full body blanket coverage with precision towel tucking around the treatment zone.',
        imageCaptionHi: 'सुरक्षित ड्रेपिंग: शरीर पूरी तरह ढका हुआ, केवल ट्रीटमेंट वाले भाग पर तौलिया मोड़ना।'
      }
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'What is the root Latin meaning of SPA?',
        questionHi: 'SPA शब्द का मूल लैटिन अर्थ क्या है?',
        options: ['Sanitas Per Aquam (Health through water)', 'Special Physical Action', 'Soothing Personal Aroma', 'Safe Pressure Application'],
        optionsHi: ['सैनिटास पर एक्वाम (जल द्वारा स्वास्थ्य)', 'स्पेशल फिजिकल एक्शन', 'सूदिंग पर्सनल अरोमा', 'सेफ प्रेशर एप्लीकेशन'],
        correctIndex: 0,
        explanation: 'SPA originates from "Sanitas Per Aquam", meaning health or healing achieved through water.',
        explanationHi: 'SPA की उत्पत्ति लैटिन भाषा के शब्द "Sanitas Per Aquam" से हुई है जिसका अर्थ जल द्वारा उपचार है।'
      },
      {
        id: 'q1-2',
        question: 'Which stance should a therapist use for long gliding strokes along the spine?',
        questionHi: 'रीढ़ की हड्डी पर लंबे ग्लाइडिंग स्ट्रोक के लिए थेरेपिस्ट को कौन सा स्टांस लेना चाहिए?',
        options: ['Archer / Lunge Stance', 'Sitting on a high stool', 'Bending lower back 90 degrees', 'Horse stance with locked knees'],
        optionsHi: ['आर्चर / लंज स्टांस', 'ऊंचे स्टूल पर बैठना', 'कमर को 90 डिग्री झुकाना', 'घुटने सीधे रखकर खड़ा होना'],
        correctIndex: 0,
        explanation: 'Archer / Lunge stance allows shifting bodyweight forward smoothly without lumbar strain.',
        explanationHi: 'आर्चर स्टांस से शरीर का वजन आगे बढ़ता है और कमर पर दबाव नहीं पड़ता।'
      }
    ],
    practicalAssignment: {
      title: 'Practice Stance Ergonomics & Seamless Draping',
      titleHi: 'आर्चर स्टांस और ड्रेपिंग का व्यावहारिक अभ्यास',
      instructions: [
        'Practice shifting body weight in Archer Stance along an empty massage bed for 5 minutes.',
        'Execute a full client turn (Prone to Supine) maintaining the privacy boundary sheet taut.',
        'Warm 10ml of almond oil in palms without splashing and perform initial palming contact.'
      ],
      instructionsHi: [
        'खाली मसाज टेबल के पास 5 मिनट तक आर्चर स्टांस में वजन शिफ्ट करने का अभ्यास करें।',
        'क्लाइंट को पेट के बल से पीठ के बल मोड़ते समय चादर से पूरी प्राइवेसी बनाए रखने का अभ्यास करें।',
        'हथेलियों में 10ml बादाम तेल को बिना गिराए गर्म करके शुरुआती स्पर्श का अभ्यास करें।'
      ],
      timeRequired: '25 minutes'
    }
  },
  {
    id: 'ch-2',
    chapterNumber: 2,
    title: 'Anatomy, Muscular System & Biomechanics for Massage',
    titleHi: 'शरीर रचना विज्ञान (एनाटॉमी), मांसपेशियां और बायोमैकेनिक्स',
    subtitle: 'Skeletal landmarks, muscle origins/insertions & kinetic movement',
    subtitleHi: 'कंकाल के मुख्य बिंदु, मांसपेशियों की उत्पत्ति और शारीरिक गतिशीलता',
    category: 'Fundamentals',
    estimatedReadTime: '18 mins',
    iconName: 'Activity',
    summary: 'Develop deep anatomical knowledge of muscle layers, bony landmarks, joints, and trigger point palpation to deliver targeted, pain-relieving treatments with confidence.',
    summaryHi: 'मांसपेशियों की परतों, हड्डियों के मुख्य जोड़ों और ट्रिगर पॉइंट्स को पहचानना सीखें ताकि आप सटीक और दर्द निवारक मसाज दे सकें।',
    sections: [
      {
        id: 'sec-2-1',
        title: 'Major Muscle Groups of the Back & Neck',
        titleHi: 'पीठ और गर्दन की मुख्य मांसपेशियां',
        content: 'The back contains multi-layered musculature. Superficial layers include the Trapezius and Latissimus Dorsi. Intermediate layers house the Rhomboids and Levator Scapulae. Deep paraspinal layers feature the Erector Spinae (Iliocostalis, Longissimus, Spinalis) and Multifidus. Working sequentially from superficial to deep prevents protective muscle spasms.',
        contentHi: 'पीठ में मांसपेशियों की कई परतें होती हैं। ऊपरी परत में ट्रेपेजियस और लैटिसिमस डोर्सी होती हैं। मध्यम परत में रोम्बॉइड्स और लेवेटर स्कैपुला होते हैं। गहरी परत में इरेक्टर स्पाइनी होती है। हमेशा ऊपरी परत को गर्म करने के बाद ही गहरी परत पर काम करें।',
        imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Anatomical Precision: Understanding muscle fiber orientation from cervical spine down to sacrum.',
        imageCaptionHi: 'शारीरिक रचना की सटीकता: गर्दन से लेकर रीढ़ के निचले हिस्से तक मांसपेशियों की दिशा समझना।',
        keyTerms: [
          { term: 'Trapezius', meaning: 'Kite-shaped upper back muscle holding neck and shoulder blade tension.', meaningHi: 'गर्दन और कंधे को जोड़ने वाली बड़ी पतंग के आकार की मांसपेशी।' },
          { term: 'Erector Spinae', meaning: 'Paraspinal column of muscles that extends the back and supports upright posture.', meaningHi: 'रीढ़ की हड्डी के दोनों ओर स्थित मांसपेशियां जो पीठ को सीधा रखती हैं।' },
          { term: 'Rhomboids', meaning: 'Retracts scapula toward spine; frequently loaded with knots in desk workers.', meaningHi: 'कंधे की हड्डी (Scapula) को रीढ़ की तरफ खींचने वाली मांसपेशियां।' }
        ]
      },
      {
        id: 'sec-2-2',
        title: 'Bony Landmarks & Danger Zones (Endangerment Sites)',
        titleHi: 'हड्डियों के मुख्य बिंदु और खतरनाक क्षेत्र (Endangerment Sites)',
        content: 'Certain anatomical regions contain superficial nerves, major blood vessels, and unpadded organs. Direct heavy pressure in these areas is strictly contraindicated:',
        contentHi: 'शरीर के कुछ हिस्सों में महत्वपूर्ण नसें, रक्त धमनियां और संवेदनशील अंग होते हैं। इन जगहों पर कभी भी तेज दबाव नहीं देना चाहिए:',
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Endangerment Sites Safety: Always avoid direct downward compression on popliteal fossa, spine, and anterior neck.',
        imageCaptionHi: 'सुरक्षा नियम: घुटने के पीछे, रीढ़ की हड्डी के मनकों और गर्दन के अगले भाग पर कभी भारी दबाव न दें।',
        bulletPoints: [
          { en: 'Anterior Neck (Carotid Triangle): Contains carotid artery, internal jugular vein, and vagus nerve. NEVER apply deep pressure here.', hi: 'गर्दन का अगला भाग (कैरोटिड ट्राइएंगल): यहां मुख्य रक्त धमनियां होती हैं। यहां कभी गहरा दबाव न दें।' },
          { en: 'Axilla (Armpit): Brachial plexus nerves and axillary artery.', hi: 'कांख (Axilla): यहां नसों का गुच्छा और मुख्य धमनी होती है।' },
          { en: 'Cubital Fossa (Elbow Crease): Brachial artery and median nerve.', hi: 'कोहनी का भीतरी मोड़: यहां हाथ की मुख्य नसें होती हैं।' },
          { en: 'Popliteal Fossa (Behind the Knee): Popliteal artery, vein, and tibial nerve.', hi: 'घुटने का पिछला हिस्सा: यहां कभी तेज अंगूठा या कोहनी न दबाएं।' },
          { en: 'Kidney Area (Lower Ribs / T12-L3): Flank region with unpadded renal organs; use light effleurage only, never percussion.', hi: 'किडनी का क्षेत्र (निचली पसलियां): यहां केवल हल्का ग्लाइडिंग स्ट्रोक करें, कभी मुक्का या कपिंग न करें।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'Which of the following is an endangerment site where heavy pressure must be avoided?',
        questionHi: 'निम्नलिखित में से कौन सा खतरनाक क्षेत्र (Endangerment Site) है जहां तेज दबाव वर्जित है?',
        options: ['Popliteal Fossa (back of knee)', 'Center of Gluteus Maximus', 'Upper Trapezius muscle belly', 'Plantar arch of foot'],
        optionsHi: ['घुटने का पिछला हिस्सा (Popliteal Fossa)', 'नितंब की मुख्य मांसपेशी', 'कंधे की ऊपरी मांसपेशी', 'पैर का तलवा'],
        correctIndex: 0,
        explanation: 'The popliteal fossa houses the popliteal artery, vein, and tibial nerve without protective muscle padding.',
        explanationHi: 'घुटने के पीछे मुख्य रक्त धमनी और नसें होती हैं जिन्हें चोट से बचाना जरूरी है।'
      }
    ],
    practicalAssignment: {
      title: 'Palpation & Anatomical Landmark Mapping',
      titleHi: 'मांसपेशियों और हड्डियों के मुख्य बिंदुओं को छूकर पहचानने का अभ्यास',
      instructions: [
        'Locate the Spine of Scapula and trace the superior angle to find the levator scapulae attachment.',
        'Palpate the Erector Spinae muscles running parallel 1 inch lateral to the spinous processes.',
        'Locate the Popliteal space and practice gentle upward effleurage bypassing deep vascular structures.'
      ],
      instructionsHi: [
        'कंधे की हड्डी (Scapula) के ऊपरी कोने को छूकर लेवेटर स्कैपुला की पहचान करें।',
        'रीढ़ की हड्डी से 1 इंच बगल में इरेक्टर स्पाइनी मांसपेशियों को महसूस करें।',
        'घुटने के पीछे हल्के हाथों से ऊपर की ओर सुरक्षित ग्लाइड करने का अभ्यास करें।'
      ],
      timeRequired: '30 minutes'
    }
  },
  {
    id: 'ch-3',
    chapterNumber: 3,
    title: 'Swedish Massage Master Protocol: The 5 Classical Strokes',
    titleHi: 'स्वीडिश मसाज मास्टर प्रोटोकॉल: 5 शास्त्रीय स्ट्रोक का संपूर्ण अभ्यास',
    subtitle: 'Effleurage, Pétrissage, Friction, Tapotement & Vibration',
    subtitleHi: 'एफ्लूराज, पेट्रिसाज, फ्रिक्शन, टपोटमेंट और वाइब्रेशन',
    category: 'Massage Therapies',
    estimatedReadTime: '20 mins',
    iconName: 'Heart',
    summary: 'The cornerstone of modern spa therapy. Master Pehr Henrik Ling’s 5 classical Swedish techniques to improve blood and lymph circulation, relieve muscular soreness, and deeply calm the nervous system.',
    summaryHi: 'आधुनिक स्पा थेरेपी की नींव। 5 स्वीडिश तकनीकों का अभ्यास करें जिससे रक्त संचार सुधरता है, मांसपेशियों का दर्द दूर होता है और नर्वस सिस्टम शांत होता है।',
    sections: [
      {
        id: 'sec-3-1',
        title: 'The 5 Classical Swedish Strokes Breakdown',
        titleHi: '5 शास्त्रीय स्वीडिश स्ट्रोक का विवरण',
        content: 'Swedish massage is designed in a therapeutic crescendo: starting with gentle warming glides, advancing to deep tissue kneading and friction, invigorating with percussion, and resolving into soothing nerve strokes.',
        contentHi: 'स्वीडिश मसाज एक क्रमबद्ध प्रवाह में की जाती है: पहले हल्के वार्मिंग स्ट्रोक, फिर गहरी गूंधने की क्रिया और घर्षण, उसके बाद थपथपाना और अंत में शांत नर्व स्ट्रोक।',
        imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Continuous Flow: Effleurage glides toward the heart (centripetal direction) supporting venous return.',
        imageCaptionHi: 'हृदय की दिशा में निरंतर ग्लाइडिंग: खून के संचार को दिल की तरफ बढ़ावा देने वाला एफ्लूराज स्ट्रोक।',
        techniques: [
          {
            stepNumber: 1,
            title: 'Effleurage (लंबे ग्लाइडिंग स्ट्रोक)',
            titleHi: 'एफ्लूराज (Effleurage)',
            description: 'Long, soothing, continuous gliding strokes applied with palms, forearms, or thumbs. Always performed in the direction of venous blood flow (toward the heart).',
            descriptionHi: 'हथेलियों या फोरआर्म से लगाए जाने वाले लंबे और आरामदायक ग्लाइडिंग स्ट्रोक। यह हमेशा दिल की दिशा में लगाए जाते हैं।',
            handPosition: 'Flat relaxed hands molding to body contours.',
            handPositionHi: 'शरीर के आकार के अनुसार मुड़ी हुई ढीली हथेलियां।',
            pressureLevel: 'Gentle (1-2/5)',
            imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Step 1: Long spinal effleurage moving smoothly from sacrum up to neck crest.',
            imageCaptionHi: 'स्टेप 1: रीढ़ के निचले हिस्से से गर्दन तक लंबा एफ्लूराज स्ट्रोक लगाना।'
          },
          {
            stepNumber: 2,
            title: 'Pétrissage (गूंधना और मसलना)',
            titleHi: 'पेट्रिसाज (Pétrissage)',
            description: 'Lifting, squeezing, rolling, and compressing muscle bellies like bread dough. Flushes lactic acid and breaks soft tissue adhesions.',
            descriptionHi: 'मांसपेशियों को आटे की तरह उठाना, दबाना और रोल करना। यह लैक्टिक एसिड को बाहर निकालता है।',
            handPosition: 'Two-handed alternating C-clamp grasp using palmar pads and thumbs.',
            handPositionHi: 'दोनों हाथों से बारी-बारी सी-आकार की पकड़ बनाकर दबाना।',
            pressureLevel: 'Medium (3/5)',
            imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Step 2: Two-handed pétrissage kneading on upper trapezius and latissimus.',
            imageCaptionHi: 'स्टेप 2: कंधे और पीठ की चौड़ी मांसपेशियों पर दो-हाथों से गूंधने का अभ्यास।'
          },
          {
            stepNumber: 3,
            title: 'Friction (गहरा घर्षण)',
            titleHi: 'फ्रिक्शन (Friction)',
            description: 'Small, focused circular or cross-fiber rubbing movements across tendon junctions and stubborn knots to realign collagen fibers.',
            descriptionHi: 'जिद्दी गांठों और जोड़ों के पास उंगलियों या अंगूठे से गोल या आर-पार गहरा घर्षण करना।',
            handPosition: 'Reinforced thumbs or stacked fingertips.',
            handPositionHi: 'एक अंगूठे के ऊपर दूसरा अंगूठा रखकर सहारा देना।',
            pressureLevel: 'Firm/Deep (4-5/5)',
            imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Step 3: Cross-fiber friction on rhomboid knots and scapular margins.',
            imageCaptionHi: 'स्टेप 3: कंधे की हड्डी के पास गांठों पर अंगूठे से फ्रिक्शन स्ट्रोक लगाना।'
          },
          {
            stepNumber: 4,
            title: 'Tapotement (तालबद्ध थपथपाना)',
            titleHi: 'टपोटमेंट (Tapotement)',
            description: 'Rapid, rhythmic percussive strikes: Cupping (cupped hands creating suction), Hacking (ulnar borders), and Pummelling (soft loose fists).',
            descriptionHi: 'तेज और तालबद्ध थपथपाना: कपिंग (हथेली की कटोरी बनाकर), हैकिंग (हाथ के किनारे से) और पमलिंग (ढीली मुट्ठी से)।',
            handPosition: 'Loose, springy wrists; hands rebound instantly off tissue.',
            handPositionHi: 'कलाई को बिल्कुल ढीला रखें ताकि हाथ तुरंत उछलकर वापस आए।',
            pressureLevel: 'Medium (3/5)',
            imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Step 4: Rhythmic cupping tapotement stimulating circulation across back muscles.',
            imageCaptionHi: 'स्टेप 4: पीठ की मांसपेशियों पर तालबद्ध कपिंग टपोटमेंट द्वारा रक्त संचार बढ़ाना।'
          },
          {
            stepNumber: 5,
            title: 'Vibration & Nerve Strokes (कंपन व समापन)',
            titleHi: 'वाइब्रेशन और नर्व स्ट्रोक',
            description: 'Fine oscillatory shaking of tissues followed by feather-light fingertip brushing to quiet the nervous system at sequence closure.',
            descriptionHi: 'मांसपेशियों में हल्का कंपन पैदा करना और अंत में उंगलियों के पोरों से बिल्कुल हल्का स्पर्श करके सत्र समाप्त करना।',
            handPosition: 'Light relaxed fingertips sweeping lightly down the body.',
            handPositionHi: 'उंगलियों के पोरों से हल्का और शांत स्पर्श।',
            pressureLevel: 'Gentle (1-2/5)',
            imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Step 5: Feather-light finishing nerve strokes quieting parasympathetic nervous system.',
            imageCaptionHi: 'स्टेप 5: सत्र समापन पर उंगलियों के पोरों से शांत नर्व स्ट्रोक लगाना।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'In what direction should Swedish effleurage strokes primarily be directed?',
        questionHi: 'स्वीडिश एफ्लूराज स्ट्रोक मुख्य रूप से किस दिशा में लगाए जाने चाहिए?',
        options: ['Centripetally toward the heart to assist venous return', 'Downwards toward the toes only', 'In random zigzag patterns', 'Strictly across the ribs horizontally'],
        optionsHi: ['हृदय की ओर (सेंट्रिपेटल) ताकि नसों का रक्त प्रवाह सुधरे', 'केवल पैरों के पंजों की ओर', 'टेढ़े-मेढ़े किसी भी दिशा में', 'केवल पसलियों के आर-पार'],
        correctIndex: 0,
        explanation: 'Centripetal strokes move with the venous valves back toward the right atrium of the heart.',
        explanationHi: 'हृदय की दिशा में स्ट्रोक लगाने से खून का प्रवाह दिल की ओर सुचारू होता है।'
      }
    ],
    practicalAssignment: {
      title: 'Full 60-Minute Back Swedish Sequence Flow',
      titleHi: 'पीठ पर 60 मिनट के स्वीडिश मसाज क्रम का अभ्यास',
      instructions: [
        'Perform 3 minutes of initial warming effleurage covering lower, middle, and upper back.',
        'Execute 5 minutes of bilateral pétrissage on the latissimus dorsi and gluteals.',
        'Perform 2 minutes of reinforced thumb friction on rhomboids medial to scapula.',
        'Execute 2 minutes of cupping tapotement across fleshy areas (avoid kidneys).',
        'Close with 1 minute of feather-light descending nerve strokes.'
      ],
      instructionsHi: [
        'पीठ के पूरे हिस्से पर 3 मिनट का वार्मिंग एफ्लूराज करें।',
        'पीठ की चौड़ी मांसपेशियों पर 5 मिनट तक दोनों हाथों से पेट्रिसाज गूंधने का अभ्यास करें।',
        'कंधे की हड्डी के पास 2 मिनट तक अंगूठे से फ्रिक्शन करें।',
        'मांसपेशियों वाले भाग पर 2 मिनट कपिंग टपोटमेंट करें (किडनी के हिस्से को छोड़ें)।',
        '1 मिनट हल्के नर्व स्ट्रोक के साथ समापन करें।'
      ],
      timeRequired: '45 minutes'
    }
  },
  {
    id: 'ch-4',
    chapterNumber: 4,
    title: 'Deep Tissue, Myofascial Release & Trigger Point Deactivation',
    titleHi: 'डीप टिश्यू मसाज, मायोफेशियल रिलीज और ट्रिगर पॉइंट थेरेपी',
    subtitle: 'Cross-fiber friction, ischemic compression & forearm mechanics',
    subtitleHi: 'क्रॉस-फाइबर फ्रिक्शन, इस्केमिक कम्प्रेशन और फोरआर्म का सही उपयोग',
    category: 'Massage Therapies',
    estimatedReadTime: '22 mins',
    iconName: 'ShieldCheck',
    summary: 'Master the art of melting deep muscular tension without causing bruising or client pain. Learn forearm stripping, elbow tool calibration, and ischemic compression to deactivate hyper-irritable trigger nodules.',
    summaryHi: 'बिना दर्द दिए और बिना चोट पहुंचाए गहरी मांसपेशियों की गांठों को खोलना सीखें। फोरआर्म, कोहनी और इस्केमिक कम्प्रेशन के सही उपयोग से जिद्दी दर्द से राहत दिलाएं।',
    sections: [
      {
        id: 'sec-4-1',
        title: 'Deep Tissue Fundamentals: Sinking vs Forcing',
        titleHi: 'डीप टिश्यू के बुनियादी नियम: गहराई में उतरना बनाम जबरदस्ती दबाव',
        content: 'Deep tissue is NOT about brute force; it is about slowing down. You must sink slowly through superficial fascia until tissue naturally yields. Moving too quickly causes reflexive muscle guarding. Standard speed is 1 to 2 inches per second synced with client exhalation.',
        contentHi: 'डीप टिश्यू का मतलब जबरदस्ती ताकत लगाना नहीं है; इसका अर्थ है गति को धीमा करना। सांस छोड़ने के साथ धीरे-धीरे मांसपेशियों की गहराई में उतरें। गति 1 से 2 इंच प्रति सेकंड होनी चाहिए।',
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Ulna Forearm Glide: Applying bodyweight smoothly along the paraspinal groove.',
        imageCaptionHi: 'फोरआर्म ग्लाइड: रीढ़ के किनारे शरीर के वजन से धीमा और गहरा दबाव देना।',
        techniques: [
          {
            stepNumber: 1,
            title: 'Forearm Stripping (फोरआर्म स्ट्रिपिंग)',
            titleHi: 'फोरआर्म स्ट्रिपिंग तकनीक',
            description: 'Using the flat fleshy ulna bone of the forearm to glide slowly along the paraspinal groove from sacrum to shoulders.',
            descriptionHi: 'फोरआर्म के सपाट हिस्से का उपयोग करके रीढ़ के दोनों ओर नीचे से ऊपर की ओर धीरे-धीरे ग्लाइड करना।',
            handPosition: 'Forearm flat at 30-45 degree angle to table surface.',
            handPositionHi: 'फोरआर्म टेबल से 30-45 डिग्री के कोण पर झुका हुआ।',
            pressureLevel: 'Firm/Deep (4-5/5)',
            tip: 'Never use the sharp olecranon tip directly on bone; use the broad ulna shaft.',
            tipHi: 'हड्डी पर कभी नुकीली कोहनी न गड़ाएं; हमेशा फोरआर्म के चौड़े हिस्से का उपयोग करें।'
          },
          {
            stepNumber: 2,
            title: 'Ischemic Trigger Point Compression (ट्रिगर पॉइंट कम्प्रेशन)',
            titleHi: 'इस्केमिक ट्रिगर पॉइंट कम्प्रेशन',
            description: 'Locate hyper-irritable muscle knot. Apply steady, direct pressure with reinforced thumb or soft knuckle for 8 to 12 seconds until knot releases.',
            descriptionHi: 'मांसपेशी की गांठ पर अंगूठे या नकल से 8 से 12 सेकंड तक स्थिर दबाव बनाए रखें जब तक कि गांठ ढीली न हो जाए।',
            handPosition: 'Reinforced thumb supported by opposite index finger.',
            handPositionHi: 'दूसरे हाथ की उंगली से अंगूठे को सहारा देकर स्थिर रखना।',
            pressureLevel: 'Firm/Deep (4-5/5)',
            imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Step 2: Direct thumb trigger point compression on tight trapezius nodules.',
            imageCaptionHi: 'स्टेप 2: कंधे की सख्त गांठ पर अंगूठे से ट्रिगर पॉइंट दबाव देना।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q4-1',
        question: 'What is the optimal speed for delivering deep tissue myofascial stripping?',
        questionHi: 'डीप टिश्यू मायोफेशियल स्ट्रिपिंग करते समय गति कितनी होनी चाहिए?',
        options: ['1 to 2 inches per second, moving with client exhalation', 'Fast rapid scrubbing at 10 inches per second', 'Stationary without moving for 30 minutes', 'Sudden jerky thrusts'],
        optionsHi: ['1 से 2 इंच प्रति सेकंड, क्लाइंट के सांस छोड़ने के साथ', 'तेज रगड़ 10 इंच प्रति सेकंड', '30 मिनट तक बिना हिले खड़े रहना', 'अचानक झटकेदार दबाव'],
        correctIndex: 0,
        explanation: 'Slow speeds allow the viscoelastic collagen fibers of fascia to soften and release without defensive contraction.',
        explanationHi: 'धीमी गति से फेशिया के रेशे बिना किसी खिंचाव या दर्द के आसानी से खुलते हैं।'
      }
    ],
    practicalAssignment: {
      title: 'Upper Trapezius Trigger Point Release Protocol',
      titleHi: 'कंधे की ट्रेपेजियस गांठों को खोलने का प्रैक्टिकल अभ्यास',
      instructions: [
        'Warm the shoulder crest with 2 minutes of broad forearm effleurage.',
        'Pincer palpate the upper trapezius belly to locate taut trigger nodules.',
        'Apply 10 seconds of steady ischemic pressure on the knot while client takes 2 deep belly breaths.',
        'Flush the released knot with 3 long soothing strokes toward the axillary lymph nodes.'
      ],
      instructionsHi: [
        'फोरआर्म से 2 मिनट तक कंधे के हिस्से को गर्म करें।',
        'अंगूठे और उंगलियों से पकड़कर ट्रेपेजियस की सख्त गांठ को पहचानें।',
        'गांठ पर 10 सेकंड तक स्थिर दबाव दें जबकि क्लाइंट गहरी सांस ले रहा हो।',
        'गांठ खुलने के बाद 3 लंबे आरामदायक स्ट्रोक लगाकर लैक्टिक एसिड को बाहर निकालें।'
      ],
      timeRequired: '25 minutes'
    }
  },
  {
    id: 'ch-5',
    chapterNumber: 5,
    title: 'Hot Stone Therapy & Thermal Basalt Applications',
    titleHi: 'हॉट स्टोन थेरेपी और बेसाल्ट पत्थरों का थर्मल प्रयोग',
    subtitle: 'Basalt stone selection, heating protocols, chakra layout & stone glides',
    subtitleHi: 'बेसाल्ट पत्थरों का चयन, हीटिंग तापमान, चक्र लेआउट और स्टोन ग्लाइड्स',
    category: 'Specialty Treatments',
    estimatedReadTime: '16 mins',
    iconName: 'Droplet',
    summary: 'Harness the ancient therapeutic power of volcanic basalt stones. Learn temperature calibration (52°C-57°C), spinal chakra balancing placement, and dynamic stone gliding strokes for ultimate relaxation.',
    summaryHi: 'ज्वालामुखीय बेसाल्ट पत्थरों की प्राकृतिक गर्माहट से उपचार सीखें। तापमान नियंत्रण (52°C-57°C), रीढ़ के चक्रों पर पत्थरों को सजाना और पत्थरों से फिसलते हुए स्ट्रोक लगाना।',
    sections: [
      {
        id: 'sec-5-1',
        title: 'Properties of Volcanic Basalt Stones & Heating Safety',
        titleHi: 'बेसाल्ट पत्थरों की विशेषताएं और हीटिंग सुरक्षा',
        content: 'Basalt is volcanic igneous rock rich in iron and magnesium, allowing it to retain radiant heat for up to 45 minutes. Water heater must be calibrated to 125°F-135°F (52°C-57°C). Non-negotiable safety rule: ALWAYS test stone temperature on your inner forearm before placing on client skin.',
        contentHi: 'बेसाल्ट ज्वालामुखीय पत्थर होते हैं जिनमें आयरन और मैग्नीशियम अधिक होने के कारण 45 मिनट तक गर्माहट बनी रहती है। हीटर का तापमान 52°C-57°C होना चाहिए। क्लाइंट पर रखने से पहले हमेशा अपनी कलाई पर तापमान की जांच करें।',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Heated Basalt Stones: Smooth water-tumbled volcanic stones retaining therapeutic warmth.',
        imageCaptionHi: 'गर्म बेसाल्ट पत्थर: चिकने ज्वालामुखीय पत्थर जो गहरी और सुखद गर्माहट प्रदान करते हैं।',
        techniques: [
          {
            stepNumber: 1,
            title: 'Chakra Energy Spinal Layout (चक्र प्लेसमेंट)',
            titleHi: 'रीढ़ के चक्रों पर स्टोन प्लेसमेंट',
            description: 'Place insulated warm basalt stones along the 7 spinal chakra centers on a flannel towel runner to melt central nervous tension.',
            descriptionHi: 'रीढ़ की हड्डी के 7 चक्रों पर तौलिए के ऊपर गर्म पत्थर रखें जिससे नर्वस सिस्टम तुरंत शांत हो जाता है।',
            handPosition: 'Careful 2-hand placement over protective barrier cloth.',
            handPositionHi: 'कपड़े के ऊपर दोनों हाथों से सावधानी से पत्थर रखना।',
            pressureLevel: 'Gentle (1-2/5)',
            imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Spinal Chakra Alignment: Heated stones radiating grounding warmth along the back.',
            imageCaptionHi: 'रीढ़ पर चक्र संरेखण: गर्म पत्थरों से पीठ की नसों को मिलने वाली गहरी गर्माहट।'
          },
          {
            stepNumber: 2,
            title: 'Dynamic Figure-8 Stone Effleurage (फिगर-8 स्टोन ग्लाइड)',
            titleHi: 'फिगर-8 स्टोन ग्लाइडिंग स्ट्रोक',
            description: 'Holding two oiled medium stones, glide smoothly in continuous figure-8 patterns over hamstrings, calves, and back.',
            descriptionHi: 'दो चिकने गर्म पत्थरों को तेल लगाकर पीठ और पैरों पर अंग्रेजी के अंक 8 के आकार में लगातार घुमाना।',
            handPosition: 'Stone cradled securely in palm with fingers wrapping edges.',
            handPositionHi: 'पत्थर को हथेली में मजबूती से पकड़ना ताकि वह फिसले नहीं।',
            pressureLevel: 'Medium (3/5)',
            imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Step 2: Continuous figure-8 hot stone glides releasing deep back tension.',
            imageCaptionHi: 'स्टेप 2: गर्म पत्थरों से पीठ पर फिगर-8 आकार में सुखद मालिश स्ट्रोक लगाना।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q5-1',
        question: 'What is the safe operating temperature for a basalt stone heater water bath?',
        questionHi: 'हॉट स्टोन हीटर के पानी का सुरक्षित तापमान कितना होना चाहिए?',
        options: ['125°F - 135°F (52°C - 57°C)', '212°F (100°C boiling water)', '70°F (21°C room temperature)', '180°F (82°C)'],
        optionsHi: ['52°C से 57°C (125°F - 135°F)', '100°C उबलता पानी', '21°C कमरे का तापमान', '82°C अत्यधिक गर्म'],
        correctIndex: 0,
        explanation: '52°C to 57°C delivers deep thermal penetration through muscles without risking thermal skin burns.',
        explanationHi: '52°C से 57°C तापमान मांसपेशियों को गहराई तक आराम देता है और त्वचा के जलने का कोई खतरा नहीं रहता।'
      }
    ],
    practicalAssignment: {
      title: 'Hot Stone Calibration, Forearm Safety Test & Back Glides',
      titleHi: 'हॉट स्टोन तापमान जांच और पीठ पर ग्लाइडिंग का अभ्यास',
      instructions: [
        'Check water heater temperature with a thermometer and verify it sits between 52°C and 55°C.',
        'Remove 2 working stones with slotted spoon, dry thoroughly on a clean towel, and perform the inner wrist safety test.',
        'Apply 10ml heat-stable carrier oil (grapeseed/sesame) to back and execute 10 minutes of figure-8 stone glides.'
      ],
      instructionsHi: [
        'थर्मामीटर से पानी का तापमान 52°C से 55°C के बीच जांचें।',
        'चम्मच से 2 पत्थर निकालकर तौलिए से अच्छी तरह सुखाएं और कलाई पर रखकर तापमान जांचें।',
        'पीठ पर तेल लगाकर 10 मिनट तक फिगर-8 स्टोन ग्लाइड्स का अभ्यास करें।'
      ],
      timeRequired: '35 minutes'
    }
  },
  {
    id: 'ch-6',
    chapterNumber: 6,
    title: 'Traditional Thai Massage, Sen Lines & Assisted Yoga Stretches',
    titleHi: 'पारंपरिक थाई मसाज, 10 सेन रेखाएं और पैसिव योगा स्ट्रेच',
    subtitle: 'Nuad Boran floor mat work, Sen Sib energy lines & joint mobilization',
    subtitleHi: 'नुआड बोरान फ्लोर मैट तकनीक, सेन सिब ऊर्जा रेखाएं और जोड़ों का लचीलापन',
    category: 'Massage Therapies',
    estimatedReadTime: '24 mins',
    iconName: 'Activity',
    summary: 'Explore the 2,500-year-old healing art of Nuad Boran. Practice rhythmic palm walking along the 10 Sen Sib energy lines and execute assisted yoga stretches to restore full-body mobility.',
    summaryHi: '2,500 वर्ष पुरानी थाई हीलिंग कला का अभ्यास करें। फ्लोर मैट पर पाम वॉकिंग, 10 सेन ऊर्जा रेखाओं पर एक्यूप्रेशर और योग जैसे खिंचाव के साथ शरीर को लचीला बनाना सीखें।',
    sections: [
      {
        id: 'sec-6-1',
        title: 'Floor Mat Ergonomics & The 10 Sen Lines (Sen Sib)',
        titleHi: 'फ्लोर मैट व्यवस्था और 10 सेन रेखाएं (Sen Sib)',
        content: 'Thai massage is performed on a firm floor futon mattress with client fully clothed in loose cotton attire. No oil is used. Therapists use palms, thumbs, forearms, knees, and feet to apply rhythmic bodyweight compressions along the 10 major Sen energy channels.',
        contentHi: 'थाई मसाज जमीन पर गद्दे पर की जाती है जिसमें क्लाइंट ढीले सूती कपड़े पहने रहता है। इसमें तेल का प्रयोग नहीं होता। थेरेपिस्ट हथेलियों, अंगूठों, घुटनों और पैरों के वजन से 10 सेन रेखाओं पर दबाव डालते हैं।',
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Thai Floor Mat Therapy: Assisted hip opening and hamstring traction on comfortable futon mattress.',
        imageCaptionHi: 'थाई फ्लोर मैट थेरेपी: गद्दे पर पैरों की स्ट्रेचिंग और हिप्स के जोड़ों को खोलने का अभ्यास।',
        techniques: [
          {
            stepNumber: 1,
            title: 'Palm Walking along Sen Ittha & Pingkhala (पाम वॉकिंग)',
            titleHi: 'सेन रेखाओं पर पाम वॉकिंग',
            description: 'Progressively press down along the inner leg energy lines with flat palms, rocking bodyweight forward from the hips with locked straight arms.',
            descriptionHi: 'सीधी बाहों और शरीर के वजन से पैरों की अंदरूनी रेखाओं पर हथेलियों से धीरे-धीरे दबाते हुए आगे बढ़ना।',
            handPosition: 'Open soft palms pressing perpendicularly.',
            handPositionHi: 'सपाट हथेलियां 90 डिग्री के कोण पर दबाव डालते हुए।',
            pressureLevel: 'Medium (3/5)',
            tip: 'Never push with arm muscle strength; lock elbows and let your body weight lean in.',
            tipHi: 'हाथ की ताकत से न दबाएं; कोहनी सीधी रखकर शरीर का वजन आगे झुकाएं।'
          },
          {
            stepNumber: 2,
            title: 'Assisted Cobra Spinal Back Stretch (कोबरा स्पाइनल स्ट्रेच)',
            titleHi: 'असिस्टेड कोबरा स्पाइनल स्ट्रेच',
            description: 'Anchor client pelvis gently, support their wrists or forearms, and guide them into a smooth backward chest-opening arch during exhalation.',
            descriptionHi: 'क्लाइंट की कलाई को सहारा देकर सांस छोड़ते समय पीछे की ओर धीरे से उठाना जिससे छाती और फेफड़े पूरी तरह खुलते हैं।',
            handPosition: 'Firm wrist lock support.',
            handPositionHi: 'कलाई की मजबूत पकड़।',
            pressureLevel: 'Medium (3/5)',
            imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Step 2: Assisted back arch stretch opening the thoracic spine and ribcage.',
            imageCaptionHi: 'स्टेप 2: थाई योगा कोबरा स्ट्रेच द्वारा रीढ़ की हड्डी और छाती को खोलना।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q6-1',
        question: 'What type of attire and setup is traditionally used in Authentic Thai Massage?',
        questionHi: 'पारंपरिक थाई मसाज में किस प्रकार के कपड़े और सेटअप का उपयोग होता है?',
        options: ['Loose comfortable cotton clothing on a firm floor mat without oils', 'Bare skin with 100ml heavy oil on a high table', 'Tight synthetic spandex suits', 'Submerged in a hot tub'],
        optionsHi: ['ढीले सूती कपड़े और जमीन पर गद्दे का सेटअप (बिना तेल के)', 'बिना कपड़ों के टेबल पर भारी तेल', 'टाइट सिंथेटिक कपड़े', 'पानी के टब में'],
        correctIndex: 0,
        explanation: 'Thai massage requires loose clothing to permit full dynamic joint range of motion and stretching on a floor futon.',
        explanationHi: 'ढीले कपड़े और फर्श का गद्दा शरीर के जोड़ों को बिना किसी रुकावट के पूरी तरह खींचने और मोड़ने में मदद करते हैं।'
      }
    ],
    practicalAssignment: {
      title: 'Floor Mat Palm Walking & Assisted Hamstring Traction',
      titleHi: 'फ्लोर मैट पर पाम वॉकिंग और हैमस्ट्रिंग स्ट्रेचिंग का अभ्यास',
      instructions: [
        'Set up a comfortable floor mat with bolster under client knees.',
        'Perform 5 minutes of bilateral rhythmic palm walking on inner and outer leg Sen lines.',
        'Execute single-leg 90-degree hamstring traction supporting client heel with locked arms for 3 deep breath cycles.'
      ],
      instructionsHi: [
        'जमीन पर आरामदायक गद्दे की व्यवस्था करें और घुटनों के नीचे गोल तकिया लगाएं।',
        'पैरों की अंदरूनी और बाहरी सेन लाइनों पर 5 मिनट तक पाम वॉकिंग करें।',
        'सीधी बाहों से पैर की एड़ी को पकड़कर 3 गहरी सांसों तक हैमस्ट्रिंग स्ट्रेच का अभ्यास करें।'
      ],
      timeRequired: '30 minutes'
    }
  },
  {
    id: 'ch-7',
    chapterNumber: 7,
    title: 'Aromatherapy & Essential Oils: Blending, Safety & Therapeutic Chemistry',
    titleHi: 'अरोमाथेरेपी और एसेंशियल ऑयल्स: ब्लेंडिंग, सुरक्षा और केमिकल प्रोफाइल',
    subtitle: 'Olfactory pyramid (Top, Middle, Base notes), carrier dilution math & patch testing',
    subtitleHi: 'गंध के 3 स्तर (टॉप, मिडिल, बेस नोट्स), कैरियर ऑयल डायल्यूशन और सुरक्षा नियम',
    category: 'Specialty Treatments',
    estimatedReadTime: '18 mins',
    iconName: 'Droplet',
    summary: 'Unlock the botanical healing science of pure plant essences. Learn the 2% dilution standard, synergy formulation, scent profiles for stress and muscle relief, and contraindications.',
    summaryHi: 'पौधों के शुद्ध अर्क के औषधीय गुणों को समझें। 2% का सुरक्षित मिश्रण तैयार करना, तनाव और दर्द निवारक तेलों का संयोजन और त्वचा की सुरक्षा के नियम।',
    sections: [
      {
        id: 'sec-7-1',
        title: 'The Olfactory Pyramid & Safe 2% Dilution Formula',
        titleHi: 'ऑलफैक्ट्री पिरामिड और 2% सुरक्षित डायल्यूशन फॉर्मूला',
        content: 'Essential oils are ultra-concentrated botanical distillates that should never be used neat (undiluted) on skin. The international standard for adult full-body massage is 2% dilution (10-12 drops per 30ml carrier oil).',
        contentHi: 'एसेंशियल ऑयल पौधों का अत्यधिक शक्तिशाली अर्क होते हैं जिन्हें कभी सीधे त्वचा पर नहीं लगाना चाहिए। फुल बॉडी मसाज के लिए मानक 2% का अनुपात है (प्रति 30ml कैरियर तेल में 10 से 12 बूंदें)।',
        imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Botanical Blending: Amber dropper bottles, sweet almond carrier base, and pure floral essential oils.',
        imageCaptionHi: 'प्राकृतिक ब्लेंडिंग: भूरी कांच की शीशियां, बादाम कैरियर तेल और शुद्ध खुशबूदार एसेंशियल ऑयल्स।',
        bulletPoints: [
          { en: 'Top Notes (Light & Fast): Eucalyptus, Bergamot, Sweet Orange. Uplifting and energizing.', hi: 'टॉप नोट्स (हल्की खुशबू): नीलगिरी, बर्गमॉट, संतरा। यह तुरंत ताजगी और ऊर्जा देते हैं।' },
          { en: 'Middle Notes (Heart of Blend): Lavender, Roman Chamomile, Rosemary. Balancing and therapeutic.', hi: 'मिडिल नोट्स (मुख्य खुशबू): लैवेंडर, कैमोमाइल, रोज़मेरी। यह तनाव कम करते हैं और मांसपेशियों को आराम देते हैं।' },
          { en: 'Base Notes (Deep & Grounding): Frankincense, Sandalwood, Cedarwood. Deep calming and meditative.', hi: 'बेस नोट्स (गहरी खुशबू): लोबान (Frankincense), चंदन, देवदार। यह गहरी शांति और ध्यान में सहायक हैं।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q7-1',
        question: 'How many drops of essential oil should be blended in a 30ml carrier bottle for a safe 2% body massage blend?',
        questionHi: '30ml कैरियर तेल में 2% सुरक्षित बॉडी मसाज मिश्रण बनाने के लिए कितनी बूंदें एसेंशियल ऑयल मिलाना चाहिए?',
        options: ['10 to 12 drops total', '50 to 60 drops', '1 drop only', '100 drops pure oil'],
        optionsHi: ['कुल 10 से 12 बूंदें', '50 से 60 बूंदें', 'केवल 1 बूंद', '100 बूंदें'],
        correctIndex: 0,
        explanation: '30ml equals approximately 600 drops of carrier oil; 2% equates to 12 drops of essential oil.',
        explanationHi: '30ml में लगभग 600 बूंदें कैरियर तेल होता है; 2% के हिसाब से 12 बूंदें एसेंशियल ऑयल सबसे सुरक्षित है।'
      }
    ],
    practicalAssignment: {
      title: 'Formulating a Custom "De-Stress Lavender & Sweet Orange" 30ml Blend',
      titleHi: '30ml "तनाव मुक्ति लैवेंडर व संतरा" ब्लेंड तैयार करने का अभ्यास',
      instructions: [
        'Measure 30ml of Sweet Almond carrier oil into a sterile amber glass bottle with pipette.',
        'Add 6 drops French Lavender (Middle note) + 4 drops Sweet Orange (Top note) + 2 drops Frankincense (Base note).',
        'Cap securely and roll bottle between warm palms for 30 seconds to harmonize the botanical synergies.'
      ],
      instructionsHi: [
        'कांच की शीशी में 30ml बादाम कैरियर तेल नापकर डालें।',
        'इसमें 6 बूंदें लैवेंडर + 4 बूंदें संतरा + 2 बूंदें लोबान (Frankincense) मिलाएं।',
        'शीशी को बंद करके 30 सेकंड तक हथेलियों के बीच घुमाकर अच्छी तरह मिलाएं।'
      ],
      timeRequired: '20 minutes'
    }
  },
  {
    id: 'ch-8',
    chapterNumber: 8,
    title: 'Ayurvedic Shiroabhyanga, Kansa Wand Facial & Marma Points',
    titleHi: 'आयुर्वेदिक शिरोअभ्यंग, कांसा वैंड फेशियल और मर्म बिंदु',
    subtitle: 'Indian head massage, bronze kansa wand mechanics & 107 marma energy points',
    subtitleHi: 'भारतीय हेड मसाज, कांसा वैंड तकनीक और 107 मर्म ऊर्जा बिंदु',
    category: 'Specialty Treatments',
    estimatedReadTime: '17 mins',
    iconName: 'Sparkles',
    summary: 'Integrate the 5,000-year-old Vedic wisdom of Marma points, warm herbal oil head massage (Shiroabhyanga), and bronze Kansa wand lymphatic facial sculpting for radiant skin and mental clarity.',
    summaryHi: '5,000 वर्ष पुराने वैदिक मर्म बिंदु, गुनगुने ब्राह्मी तेल से सिर की मालिश (शिरोअभ्यंग) और कांसे की कटोरी (कांसा वैंड) से चेहरे पर चमक लाने की कला सीखें।',
    sections: [
      {
        id: 'sec-8-1',
        title: 'Shiroabhyanga & Head Marma Points',
        titleHi: 'शिरोअभ्यंग और सिर के मुख्य मर्म बिंदु',
        content: 'Shiroabhyanga works on the head, neck, and shoulders where stress frequently crystallizes. Warm sesame or Brahmi herbal oil is applied to the crown (Adhipati Marma) and massaged using rhythmic friction and scalp traction to nourish hair roots and calm the mind.',
        contentHi: 'शिरोअभ्यंग सिर, गर्दन और कंधों पर किया जाता है जहां तनाव सबसे ज्यादा जमता है। गुनगुने ब्राह्मी या तिल के तेल को सिर के तालू (अधिपति मर्म) पर लगाकर उंगलियों से मालिश की जाती है।',
        imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Ayurvedic Marma Healing: Gentle circular pressure on cranial crown and temple points.',
        imageCaptionHi: 'आयुर्वेदिक मर्म चिकित्सा: सिर के तालू और कनपटी के मर्म बिंदुओं पर हल्का गोल दबाव देना।',
        techniques: [
          {
            stepNumber: 1,
            title: 'Adhipati Crown Marma Stimulation (अधिपति मर्म दबाव)',
            titleHi: 'अधिपति मर्म बिंदु पर तेल मालिश',
            description: 'Apply warm herbal Brahmi oil directly to crown vortex. Perform 21 gentle rhythmic clockwise thumb rotations.',
            descriptionHi: 'सिर के शीर्ष तालू पर गुनगुना ब्राह्मी तेल लगाएं और अंगूठे से 21 बार दक्षिणावर्त गोल घुमाएं।',
            handPosition: 'Thumb pad contact with relaxed fingers cradling the skull.',
            handPositionHi: 'अंगूठे का पोर मर्म बिंदु पर और उंगलियां सिर को सहारा देते हुए।',
            pressureLevel: 'Gentle (1-2/5)',
            imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Step 1: Warm herbal Brahmi oil applied to Adhipati crown marma point.',
            imageCaptionHi: 'स्टेप 1: सिर के तालू पर औषधीय तेल लगाकर अधिपति मर्म बिंदु को उत्तेजित करना।'
          },
          {
            stepNumber: 2,
            title: 'Bronze Kansa Wand Lymphatic Sculpting (कांसा वैंड फेशियल)',
            titleHi: 'कांसा वैंड से चेहरे पर लिम्फैटिक ड्रेनेज स्ट्रोक',
            description: 'Apply 3 drops saffron facial oil. Sweep bronze cup along jawline and cheeks in figure-8 motions to extract acidity and boost glow.',
            descriptionHi: 'चेहरे पर 3 बूंदें कुमकुमादि तेल लगाकर कांसे की कटोरी से जबड़े और गालों पर अंग्रेजी के 8 के आकार में स्ट्रोक लगाएं।',
            handPosition: 'Holding wooden handle with light feather-touch pressure.',
            handPositionHi: 'लकड़ी के हैंडल को पकड़कर बिल्कुल हल्का स्पर्श दबाव बनाए रखें।',
            pressureLevel: 'Gentle (1-2/5)',
            imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
            imageCaption: 'Step 2: Bronze Kansa cup contouring cheekbones and releasing facial tension.',
            imageCaptionHi: 'स्टेप 2: कांसे की कटोरी से चेहरे की मांसपेशियों को आराम और प्राकृतिक चमक देना।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'q8-1',
        question: 'What is the sacred metal composition of an Ayurvedic Kansa Wand?',
        questionHi: 'आयुर्वेदिक कांसा वैंड (Kansa Wand) में कौन सी पवित्र धातुओं का मिश्रण होता है?',
        options: ['Copper (तांबा) and Tin (टिन) bronze alloy', 'Iron and Zinc', 'Pure Aluminum', 'Lead and Nickel'],
        optionsHi: ['तांबा (Copper) और टिन (Tin) का कांस्य मिश्रण', 'लोहा और जस्ता', 'शुद्ध एल्युमीनियम', 'सीसा और निकल'],
        correctIndex: 0,
        explanation: 'Kansa is an alkaline bronze alloy of pure copper and tin that naturally balances skin pH and draws out cellular heat.',
        explanationHi: 'कांसा तांबे और टिन का मिश्रण होता है जो त्वचा की गर्मी सोखता है और प्राकृतिक निखार लाता है।'
      }
    ],
    practicalAssignment: {
      title: '15-Minute Ayurvedic Head Scalp & Kansa Face Protocol',
      titleHi: '15 मिनट के शिरोअभ्यंग और कांसा फेशियल का अभ्यास',
      instructions: [
        'Warm 15ml of Brahmi herbal oil and apply to crown Adhipati marma point with gentle thumb circles.',
        'Execute 5 minutes of rhythmic scalp friction moving from occiput to hairline.',
        'Apply 3 drops Kumkumadi saffron oil to face and perform 5 minutes of figure-8 sweeps with the bronze Kansa wand.'
      ],
      instructionsHi: [
        '15ml ब्राह्मी तेल को हल्का गर्म करके सिर के तालू पर लगाएं और अंगूठे से गोल घुमाएं।',
        'गर्दन के पीछे से माथे की ओर 5 मिनट तक उंगलियों से स्कैल्प फ्रिक्शन करें।',
        'चेहरे पर 3 बूंदें कुमकुमादि तेल लगाकर 5 मिनट तक कांसा वैंड से गोल स्ट्रोक लगाएं।'
      ],
      timeRequired: '25 minutes'
    }
  },
  {
    id: 'ch-9',
    chapterNumber: 9,
    title: 'Spa Sanitation, Hygiene, Client Consultation & Safety Protocols',
    titleHi: 'स्पा स्वच्छता, क्लाइंट हेल्थ कंसल्टेशन और सुरक्षा नियम',
    subtitle: 'CIDESCO hygiene standards, 60°C linen sterilization & contraindications',
    subtitleHi: 'CIDESCO स्वच्छता मानक, 60°C पर तौलियों की धुलाई और स्वास्थ्य सुरक्षा नियम',
    category: 'Hygiene & Safety',
    estimatedReadTime: '15 mins',
    iconName: 'ShieldCheck',
    summary: 'Hygiene is the non-negotiable foundation of any 5-star spa. Master room turnaround sanitization, 60°C linen sterilization, infection control, client intake forms, and absolute contraindications.',
    summaryHi: 'स्वच्छता 5-स्टार स्पा की पहली शर्त है। हर क्लाइंट के बाद कमरे का डिसइंफेक्शन, 60°C पर तौलियों की धुलाई, हेल्थ कंसल्टेशन फॉर्म और पूर्ण वर्जित बीमारियों की जानकारी लें।',
    sections: [
      {
        id: 'sec-9-1',
        title: 'CIDESCO 5-Star Spa Sanitation Standards',
        titleHi: 'CIDESCO 5-स्टार स्पा स्वच्छता और डिसइंफेक्शन मानक',
        content: 'Every surface a guest touches must be clinically sanitized. Massage vinyl beds and face cradles must be disinfected with hospital-grade virucidal spray (3-minute wet dwell time). Linens must be washed at minimum 60°C with sanitizing detergent. Never reuse linens or bolsters between guests under any circumstance.',
        contentHi: 'मसाज बेड और फेस क्रैडल को हर क्लाइंट के बाद एंटीबैक्टीरियल स्प्रे से साफ किया जाना चाहिए। तौलियों और चादरों को कम से कम 60°C गर्म पानी में धोना अनिवार्य है। किसी भी स्थिति में बिना धोए तौलिए दोबारा इस्तेमाल न करें।',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Hospital-Grade Hygiene: Fresh sanitized linens, sealed face covers, and sterilized accessories.',
        imageCaptionHi: 'क्लीनिकल स्वच्छता: 60°C पर धुले तौलिए, नया डिस्पोजेबल फेस कवर और साफ कमरे की व्यवस्था।'
      }
    ],
    quiz: [
      {
        id: 'q9-1',
        question: 'Why should massage linens be laundered at minimum 60°C?',
        questionHi: 'स्पा की चादरों और तौलियों को कम से कम 60°C गर्म पानी में क्यों धोना चाहिए?',
        options: ['To destroy fungal spores, bacteria, and viral pathogens completely', 'To save on water bills', 'To make them shrink faster', 'To remove perfume scents only'],
        optionsHi: ['फंगल स्पोर्स, बैक्टीरिया और वायरस को पूरी तरह नष्ट करने के लिए', 'पानी का बिल बचाने के लिए', 'तौलिए को छोटा करने के लिए', 'केवल खुशबू हटाने के लिए'],
        correctIndex: 0,
        explanation: 'Thermal washing at 60°C is required to achieve complete microbiological sterilization of porous cotton fibers.',
        explanationHi: '60°C का गर्म पानी तौलियों के रेशों से सभी प्रकार के कीटाणुओं और फंगस को पूरी तरह खत्म कर देता है।'
      }
    ],
    practicalAssignment: {
      title: 'Complete 10-Minute Treatment Room Turnaround & Health Intake',
      titleHi: '10 मिनट में ट्रीटमेंट रूम रीसेट और हेल्थ फॉर्म का अभ्यास',
      instructions: [
        'Strip linens into laundry bag, disinfect bed with virucidal spray, and wait 3 minutes before wiping dry.',
        'Fit fresh fleece pad, cotton sheet with hospital corners, and install a fresh disposable face cradle cover.',
        'Conduct a 5-minute mock client health intake verifying allergies, surgeries, and contraindications.'
      ],
      instructionsHi: [
        'गंदे तौलिए हटाएं, बेड पर सैनिटाइजिंग स्प्रे करें और 3 मिनट बाद साफ तौलिए से पोंछें।',
        'नई चादर बिछाएं और फेस क्रैडल पर नया डिस्पोजेबल कवर लगाएं।',
        '5 मिनट के मॉक हेल्थ कंसल्टेशन फॉर्म भरने का अभ्यास करें।'
      ],
      timeRequired: '25 minutes'
    }
  },
  {
    id: 'ch-10',
    chapterNumber: 10,
    title: 'Professional Spa Career, Service Menu Design & Therapist Wellness',
    titleHi: 'प्रोफेशनल स्पा करियर, सर्विस मेन्यू डिजाइन और थेरेपिस्ट वेलनेस',
    subtitle: 'Pricing psychology, signature rituals, client retention & preventing burnout',
    subtitleHi: 'प्राइसिंग रणनीति, सिग्नेचर स्पा पैकेज, क्लाइंट्स को दोबारा बुलाना और खुद की फिटनेस',
    category: 'Business & Marketing',
    estimatedReadTime: '15 mins',
    iconName: 'Briefcase',
    summary: 'Turn your healing craft into a prosperous career. Learn spa service pricing, curated menu design, client rebooking strategies, inventory management, and daily therapist self-care to avoid burnout.',
    summaryHi: 'अपनी स्किल को एक सफल बिजनेस या करियर में बदलें। सर्विस मेन्यू तैयार करना, उचित रेट तय करना, संतुष्ट क्लाइंट्स को दोबारा बुलाने की रणनीति और थेरेपिस्ट का अपना स्वास्थ्य बनाए रखना।',
    sections: [
      {
        id: 'sec-10-1',
        title: 'Designing a High-Value Spa Service Menu',
        titleHi: 'आकर्षक स्पा सर्विस मेन्यू कैसे तैयार करें',
        content: 'Structure your offerings clearly into: Signature Relaxation (Swedish/Aroma 60/90 mins), Deep Healing (Deep Tissue/Trigger 60/90 mins), Ritual Packages (Foot scrub + Hot stone + Head scalp massage 120 mins).',
        contentHi: 'मेन्यू में रिलैक्सेशन, डीप हीलिंग और कॉम्बो पैकेजेस (जैसे हॉट स्टोन + फुट रिफ्लेक्सोलॉजी + हेड मसाज) को स्पष्ट समय और मूल्य के साथ प्रस्तुत करें।',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'High-Value Menu Presentation: Clean typography, transparent duration, and clear benefits.',
        imageCaptionHi: 'आकर्षक मेन्यू कार्ड: स्पष्ट समय, मूल्य और हर थेरेपी के स्वास्थ्य लाभों का विवरण।'
      }
    ],
    quiz: [
      {
        id: 'q10-1',
        question: 'What is the most effective way to build long-term repeat client relationships?',
        questionHi: 'लंबे समय तक वफादार क्लाइंट्स बनाने का सबसे प्रभावी तरीका क्या है?',
        options: ['Flawless hygiene, attentive listening during consultation, and personalized home-care advice', 'Offering random discounts every day without quality control', 'Talking non-stop during the massage session', 'Using cheap synthetic oils without telling them'],
        optionsHi: ['उत्कृष्ट स्वच्छता, क्लाइंट की बात ध्यान से सुनना और थेरेपी के बाद घरेलू देखभाल की सही सलाह देना', 'गुणवत्ता घटाकर भारी छूट देना', 'मसाज के दौरान लगातार बातें करना', 'सस्ते सिंथेटिक तेल का उपयोग करना'],
        correctIndex: 0,
        explanation: 'Professionalism, consistent hygiene, exceptional technical skill, and thoughtful aftercare recommendations build lifelong client trust.',
        explanationHi: 'सच्ची ईमानदारी, बेहतरीन स्वच्छता और प्रोफेशनल केयर से ही क्लाइंट हमेशा आपके पास वापस आते हैं।'
      }
    ],
    practicalAssignment: {
      title: 'Create Your Personal Spa Menu & Price Card',
      titleHi: 'अपना व्यक्तिगत स्पा मेन्यू और प्राइस कार्ड तैयार करें',
      instructions: [
        'Draft 4 signature treatments with treatment duration (60/90 min), target benefits, and pricing.',
        'Calculate cost per session (linens, oil 30ml, electricity, amenities).',
        'Create a 5-minute daily morning therapist stretching routine for wrists, forearms, and lower back.'
      ],
      instructionsHi: [
        '4 मुख्य थेरेपी के नाम, समय और लाभ का मेन्यू कार्ड तैयार करें।',
        'प्रति सेशन खर्च (तेल, तौलिया, बिजली) का हिसाब लगाएं।',
        'अपनी कलाई और पीठ के लिए 5 मिनट का दैनिक मॉर्निंग स्ट्रेच रूटीन बनाएं।'
      ],
      timeRequired: '30 minutes'
    }
  },
  {
    id: 'ch-11',
    chapterNumber: 11,
    title: 'Spa Business Setup, Legal Licensing, High Profit Margins & Digital Marketing Blueprint',
    titleHi: 'स्पा सेंटर बिज़नेस: कानूनी दस्तावेज, लाइसेंस, प्रॉफिट मार्जिन, क्लाइंट कैसे लाएं और डिजिटल मार्केटिंग',
    subtitle: 'Government licenses, 80%+ profit breakdown, high-ticket client acquisition & Google/Meta ads master blueprint',
    subtitleHi: 'सरकारी लाइसेंस, 80%+ का मुनाफा, नए क्लाइंट लाने के अचूक तरीके और गूगल/मेटा एड्स का संपूर्ण डिजिटल मार्केटिंग फॉर्मूला',
    category: 'Business & Marketing',
    estimatedReadTime: '25 mins',
    iconName: 'Briefcase',
    summary: 'A complete master guide to launching and scaling a highly profitable luxury spa center. Learn all mandatory legal documents, licensing protocols, equipment investments, 80%+ profit margins, corporate client funnels, local SEO Google My Business dominance, and high-converting Instagram/WhatsApp marketing campaigns.',
    summaryHi: 'एक अत्यधिक लाभदायक लक्ज़री स्पा सेंटर शुरू करने और उसे तेजी से बढ़ाने की संपूर्ण गाइड। सभी आवश्यक कानूनी लाइसेंस, कमरे का सेटअप, 80%+ का भारी मुनाफा, नए अमीर क्लाइंट्स को आकर्षित करने की तकनीकें और गूगल मैप्स व इंस्टाग्राम पर डिजिटल मार्केटिंग का मास्टर प्लान।',
    sections: [
      {
        id: 'sec-11-1',
        title: 'Mandatory Legal Documents & Government Licenses (आवश्यक कानूनी दस्तावेज व लाइसेंस)',
        titleHi: 'स्पा सेंटर खोलने के लिए आवश्यक कानूनी दस्तावेज और सरकारी लाइसेंस',
        content: 'Operating a legal, compliant, and harassment-free spa business requires obtaining the proper commercial licenses before opening your doors. Here is the comprehensive checklist required by municipal corporations, health departments, and commercial authorities:',
        contentHi: 'बिना किसी कानूनी अड़चन और पुलिस या प्रशासनिक परेशानी के एक सम्मानित स्पा सेंटर चलाने के लिए आवश्यक सभी कानूनी दस्तावेजों और लाइसेंसों की सूची:',
        imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Legal Compliance: Registered commercial licensing, health inspections, and certified therapist credentials.',
        imageCaptionHi: 'कानूनी मान्यता: ट्रेड लाइसेंस, स्वास्थ्य विभाग अनापत्ति प्रमाण पत्र और प्रशिक्षित थेरेपिस्ट सर्टिफिकेट।',
        bulletPoints: [
          { en: '1. Shop & Establishment Act Registration (गुमाश्ता / दुकान स्थापना प्रमाण पत्र): Mandatory commercial registration from the State Labour Department defining operational hours, employee welfare, and center address.', hi: '1. शॉप एंड एस्टेब्लिशमेंट एक्ट (गुमाश्ता): श्रम विभाग द्वारा जारी कमर्शियल रजिस्ट्रेशन जो स्पा का पता, खुलने का समय और स्टाफ के अधिकारों को प्रमाणित करता है।' },
          { en: '2. Municipal Health Trade License (नगर निगम हेल्थ ट्रेड लाइसेंस): Issued by the local Municipal Corporation (MCD/BMC/BBMP/Nagar Nigam) certifying that the premises adhere to public health and hygiene norms.', hi: '2. हेल्थ ट्रेड लाइसेंस: स्थानीय नगर निगम द्वारा जारी लाइसेंस जो स्पा की स्वच्छता और सार्वजनिक स्वास्थ्य सुरक्षा की पुष्टि करता है।' },
          { en: '3. Sanitary NOC (स्वास्थ्य एवं स्वच्छता अनापत्ति प्रमाण पत्र): Issued by the Chief Medical Officer (CMO) or Health Inspector after verifying clean water, proper drainage, pest control, and hygienic washroom/shower amenities.', hi: '3. सेनेटरी NOC: स्वास्थ्य अधिकारी द्वारा पानी की शुद्धता, ड्रेनेज, पेस्ट कंट्रोल और स्वच्छ शावर की जांच के बाद जारी प्रमाण पत्र।' },
          { en: '4. Fire Safety NOC & Building Clearance: Mandatory for premises with electrical equipment (sauna, steam generators, geysers) verifying fire extinguishers and emergency exit routes.', hi: '4. फायर सेफ्टी NOC: स्टीम, सौना और गीजर जैसे उपकरणों के सुरक्षित संचालन और आग बुझाने के यंत्रों के लिए अनापत्ति प्रमाण पत्र।' },
          { en: '5. Police Intimation / Character Verification of Staff: Written intimation to the local police station with ID and address proof of all therapists and staff to maintain complete transparent legitimacy.', hi: '5. पुलिस वेरिफिकेशन व सूचना: सभी थेरेपिस्ट और स्टाफ के आधार कार्ड व पते का पुलिस सत्यापन ताकि कोई असामाजिक गतिविधि न हो।' },
          { en: '6. GST Registration (वस्तु एवं सेवा कर): Mandatory when annual turnover crosses standard thresholds (₹20/40 Lakhs) for issuing valid tax invoices to clients and corporate tie-ups.', hi: '6. GST रजिस्ट्रेशन: लीगल बिलिंग, कॉर्पोरेट बुकिंग और इनपुट टैक्स क्रेडिट का लाभ उठाने के लिए।' },
          { en: '7. Music Public Performance License (PPL & IPRS): Required to legally broadcast copyrighted ambient background relaxation music in commercial public spaces.', hi: '7. म्यूजिक लाइसेंस (PPL व IPRS): स्पा लाउंज में कानूनी रूप से शांतिदायक बैकग्राउंड म्यूजिक बजाने का अधिकार।' },
          { en: '8. Professional Therapist Certifications (CIDESCO / Spa Hub Verified): Displaying framed certifications of your therapists in the reception area builds 100% client confidence.', hi: '8. थेरेपिस्ट सर्टिफिकेशन: रिसेप्शन पर प्रशिक्षित थेरेपिस्ट के सर्टिफिकेट फ्रेम करके लगाने से क्लाइंट का भरोसा 100% बढ़ जाता है।' }
        ]
      },
      {
        id: 'sec-11-2',
        title: 'Spa Business Profit Margins & Cost Breakdown (बिजनेस के फायदे और भारी मुनाफा)',
        titleHi: 'स्पा बिजनेस के फायदे, लागत और 80%+ का बंपर मुनाफा',
        content: 'Wellness and luxury massage services are among the highest profit margin businesses in the service economy. Unlike restaurants or retail stores with high perishable raw materials, a massage treatment consumes very low material cost per guest, resulting in 75% to 85% gross operating margins.',
        contentHi: 'स्पा और वेलनेस बिजनेस में अन्य व्यापारों की तुलना में सबसे ज्यादा मुनाफा होता है। एक मसाज में तेल और तौलियों का खर्च बहुत कम आता है, जिससे 75% से 85% तक का शुद्ध मुनाफा बचता है।',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'High Margin Economics: ₹200 consumable cost vs ₹2,500 service ticket = 88% gross margin.',
        imageCaptionHi: 'शानदार मुनाफा: प्रति सेशन मात्र ₹200 का सामान खर्च और ₹2,500 का बिल = 88% ग्रॉस मार्जिन।',
        bulletPoints: [
          { en: 'Consumables Cost per 60-min Massage: Almond/Jojoba Oil (30ml) = ₹45, Essential oil drops = ₹25, Laundry & sanitizer = ₹40, Disposable underwear & amenities = ₹30, Welcome herbal tea = ₹15. Total Material Cost = ~₹155 only!', hi: 'प्रति 60 मिनट मसाज का कच्चा खर्च: बादाम/जोजोबा तेल (30ml) = ₹45, एसेंशियल ऑयल = ₹25, तौलिया धुलाई = ₹40, डिस्पोजेबल किट = ₹30, हर्बल चाय = ₹15। कुल खर्च मात्र ~₹155!' },
          { en: 'Service Selling Price: Swedish Massage (60 min) = ₹2,200 to ₹3,500; Deep Tissue / Hot Stone (90 min) = ₹3,500 to ₹5,500.', hi: 'सर्विस का मूल्य: स्वीडिश मसाज = ₹2,200 से ₹3,500; डीप टिश्यू / हॉट स्टोन = ₹3,500 से ₹5,500।' },
          { en: 'Gross Profit per Client: ₹2,500 - ₹155 = ₹2,345 Gross Margin (93% Material Margin)!', hi: 'प्रति क्लाइंट कमाई: ₹2,500 में से ₹155 घटाने पर ₹2,345 का ग्रॉस मार्जिन (93% मुनाफा)!' },
          { en: 'Monthly Projections (4-Room Center with 8 clients/day): 240 clients/month × ₹2,800 avg ticket = ₹6,72,000 Revenue. After rent (₹70k), staff salaries (₹1.5L), electricity & marketing (₹60k), net monthly take-home profit is ₹3,50,000 to ₹4,20,000!', hi: '4-कमरे के स्पा की मासिक कमाई (रोजाना 8 क्लाइंट्स): 240 क्लाइंट्स × ₹2,800 = ₹6,72,000 की कुल बिक्री। किराया, स्टाफ की सैलरी और बिजली का बिल काटकर हर महीने ₹3.5 से ₹4.2 लाख का शुद्ध मुनाफा!' },
          { en: 'Retail Product Upsell Margins: Selling organic face serums, body butters, and aromatic diffusers at reception gives 40% to 50% extra direct retail margin without extra therapist labor.', hi: 'रिटेल प्रोडक्ट्स की बिक्री: रिसेप्शन पर बॉडी बटर, एसेंशियल ऑयल और सीरम बेचकर 40% से 50% अतिरिक्त शुद्ध मुनाफा।' }
        ]
      },
      {
        id: 'sec-11-3',
        title: 'Sales Strategy, Client Acquisition & Retaining High-Paying Clients',
        titleHi: 'क्लाइंट कैसे लाएं: नए ग्राहक आकर्षित करने और उन्हें पक्का करने का फॉर्मूला',
        content: 'A successful spa does not wait for random walk-ins. You must create proactive client acquisition channels, corporate tie-ups, bridal wellness packages, and irresistible recurring membership clubs.',
        contentHi: 'एक सफल स्पा केवल राह चलते ग्राहकों के भरोसे नहीं रहता। नए क्लाइंट्स लाने, अमीरों को आकर्षित करने और मेंबरशिप पैकेज बेचने की रणनीति:',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'VIP Client Retention: Seamless reception welcome, personalized intake, and loyalty memberships.',
        imageCaptionHi: 'वीआईपी क्लाइंट रिटेंशन: रिसेप्शन पर सम्मानजनक स्वागत और एनुअल मेंबरशिप पैकेज।'
      },
      {
        id: 'sec-11-4',
        title: 'Step-by-Step Digital Marketing Blueprint for Spas (डिजिटल मार्केटिंग कैसे करें)',
        titleHi: 'स्पा की डिजिटल मार्केटिंग का संपूर्ण ब्लूप्रिंट (गूगल, फेसबुक, इंस्टाग्राम व व्हाट्सएप)',
        content: 'Digital marketing is the #1 growth driver for modern spas. By dominating local search engine results and running targeted social media ads, your appointment calendar will stay booked 2 weeks in advance.',
        contentHi: 'डिजिटल मार्केटिंग आज के समय में नए क्लाइंट्स लाने का सबसे तेज और असरदार तरीका है। गूगल मैप्स और सोशल मीडिया विज्ञापनों से आप अपने स्पा को हर समय फुल बुक रख सकते हैं:',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        imageCaption: 'Digital Growth Engine: Google Local SEO #1 ranking, Meta geo-targeted ads, and automated WhatsApp CRM.',
        imageCaptionHi: 'डिजिटल मार्केटिंग इंजन: गूगल मैप्स पर नंबर-1 रैंकिंग, फेसबुक/इंस्टाग्राम एड्स और व्हाट्सएप ऑटोमेशन।',
        bulletPoints: [
          { en: '1. Google My Business (Google Maps Local SEO #1 Rank): Claim your profile with high-res photos of pristine treatment rooms, correct categories ("Day Spa", "Massage Therapist", "Wellness Center"), and systematically collect 5-star verified reviews from happy clients with automated review QR cards.', hi: '1. गूगल माय बिजनेस (Google Maps पर #1 रैंक): सुंदर कमरों की फोटो डालें, सही कैटेगरी चुनें और हर क्लाइंट से क्यूआर कोड स्कैन कराकर 5-स्टार गूगल रिव्यूज प्राप्त करें। "स्पा नियर मी" सर्च करने पर आपका स्पा सबसे ऊपर दिखेगा।' },
          { en: '2. Meta Ads (Facebook & Instagram Geo-Fenced Campaigns): Run radius ads targeting affluent neighborhoods within 5-7 km. Target demographics aged 26-55 with interests in "Luxury Lifestyle, Yoga, Wellness, Fitness, Travel". Offer an irresistible hook: "Introductory 90-Min Signature Swedish + Hot Stone Ritual @ ₹1,999 (First 50 Clients Only)". Lead cost will be under ₹120-₹180 per booking!', hi: '2. इंस्टाग्राम और फेसबुक एड्स: स्पा के 5 से 7 किलोमीटर के दायरे में रहने वाले संपन्न लोगों को विज्ञापन दिखाएं। "पहला विजिट ऑफर: 90 मिनट स्वीडिश + हॉट स्टोन मात्र ₹1,999" जैसे आकर्षक ऑफर चलाएं।' },
          { en: '3. Aesthetic Instagram Reels & Local Influencer Collabs: Invite top local lifestyle and food creators for a complimentary 60-minute VIP spa day in exchange for 2 aesthetic cinematic Reels showcasing the welcome tea, foot soak, heated bed, and relaxing ambience.', hi: '3. इंस्टाग्राम रील्स और लोकल इन्फ्लुएंसर्स: शहर के लोकप्रिय इन्फ्लुएंसर्स को फ्री स्पा सेशन देकर उनसे कमरे और माहौल की सुंदर रील्स बनवाएं जिससे तुरंत सैकड़ों फॉलोअर्स और बुकिंग्स मिलती हैं।' },
          { en: '4. Automated WhatsApp CRM for Booking Reminders & Birthday Offers: Integrate WhatsApp Business API to send instant automated booking confirmations, Google Maps directions, appointment reminders 2 hours prior (reduces no-shows by 70%), and personalized Birthday 25% discount coupons.', hi: '4. व्हाट्सएप ऑटोमेशन (CRM): बुकिंग होते ही तुरंत कन्फर्मेशन और लोकेशन भेजें, आने से 2 घंटे पहले रिमाइंडर भेजें और जन्मदिन/सालगिरह पर 25% डिस्काउंट का स्पेशल कूपन भेजें।' },
          { en: '5. Corporate Wellness Partnerships & Luxury Hotel Concierge Tie-ups: Partner with nearby 4-star and 5-star boutique hotels without in-house spas by offering the hotel reception a 20% referral commission for sending luxury guests to your center.', hi: '5. होटल और कॉर्पोरेट टाइ-अप: नजदीकी होटलों के रिसेप्शन के साथ टाई-अप करें और उनके मेहमानों को स्पा भेजने पर होटल को 20% कमीशन दें।' }
        ]
      }
    ],
    quiz: [
      {
        id: 'q11-1',
        question: 'What is the mandatory municipal registration required under labor laws to operate a commercial spa?',
        questionHi: 'कमर्शियल स्पा सेंटर संचालित करने के लिए श्रम कानूनों के तहत कौन सा पंजीकरण अनिवार्य है?',
        options: ['Shop & Establishment Act (गुमाश्ता) Registration and Municipal Health Trade License', 'Mining permit', 'Agricultural seed license', 'Informal handwritten paper'],
        optionsHi: ['शॉप एंड एस्टेब्लिशमेंट एक्ट (गुमाश्ता) और म्युनिसिपल हेल्थ ट्रेड लाइसेंस', 'खनन परमिट', 'कृषि बीज लाइसेंस', 'सादा कागज'],
        correctIndex: 0,
        explanation: 'Shop Act and Health Trade Licenses establish legal commercial operation and municipal hygiene compliance.',
        explanationHi: 'शॉप एक्ट और हेल्थ ट्रेड लाइसेंस स्पा की कानूनी वैधता और स्वच्छता प्रमाणित करते हैं।'
      },
      {
        id: 'q11-2',
        question: 'What is the average Gross Profit Margin on single massage therapy services when consumables are controlled?',
        questionHi: 'सही इन्वेंट्री के साथ स्पा मसाज सर्विस पर औसत ग्रॉस प्रॉफिट मार्जिन कितना होता है?',
        options: ['75% to 85% gross profit margin', '5% only', 'Negative margin', '0% break-even'],
        optionsHi: ['75% से 85% ग्रॉस प्रॉफिट मार्जिन', 'केवल 5%', 'नकारात्मक', '0%'],
        correctIndex: 0,
        explanation: 'Consumables (oil, linen washing, disposable kit) cost only ₹150-₹300 on a ₹2,500 ticket, enabling 75-85% margins.',
        explanationHi: 'सामग्री की लागत मात्र ₹150-₹300 आती है, जिससे 75-85% तक का शुद्ध मुनाफा बचता है।'
      },
      {
        id: 'q11-3',
        question: 'What is the most effective digital channel for capturing high-intent local clients searching for a spa nearby?',
        questionHi: 'आसपास स्पा खोजने वाले स्थानीय ग्राहकों को आकर्षित करने का सबसे असरदार डिजिटल माध्यम कौन सा है?',
        options: ['Google My Business (Google Maps Local SEO) with 5-star verified reviews', 'Spam SMS at 3 AM', 'Billboard in another city', 'Radio ads without phone number'],
        optionsHi: ['गूगल माय बिजनेस (Google Maps Local SEO) 5-स्टार रिव्यूज के साथ', 'रात 3 बजे स्पैम मैसेज', 'दूसरे शहर में होर्डिंग', 'बिना फोन नंबर का रेडियो विज्ञापन'],
        correctIndex: 0,
        explanation: 'Over 80% of local wellness clients search "luxury spa near me" and convert through top Google Maps listings.',
        explanationHi: '80% से ज्यादा ग्राहक गूगल मैप्स पर रिव्यूज और रेटिंग देखकर सीधे बुकिंग करते हैं।'
      }
    ],
    practicalAssignment: {
      title: 'Drafting Your Spa Business Setup & Digital Marketing Plan',
      titleHi: 'अपने स्पा सेंटर का बिज़नेस व डिजिटल मार्केटिंग प्लान तैयार करें',
      instructions: [
        'List the 6 mandatory licenses and prepare a checklist for your local municipality.',
        'Calculate your monthly projected profit based on 4 treatment rooms and ₹2,500 average ticket size.',
        'Write an irresistible introductory Meta ad copy and design your 5-point Google review collection strategy.'
      ],
      instructionsHi: [
        'अपने शहर के अनुसार 6 आवश्यक सरकारी लाइसेंसों की चेकलिस्ट तैयार करें।',
        '4 कमरों के आधार पर मासिक खर्च और शुद्ध मुनाफे का वित्तीय हिसाब लगाएं।',
        'इंस्टाग्राम एड्स के लिए एक आकर्षक ऑफर और गूगल रिव्यूज बढ़ाने की रणनीति लिखें।'
      ],
      timeRequired: '40 minutes'
    }
  }
];
