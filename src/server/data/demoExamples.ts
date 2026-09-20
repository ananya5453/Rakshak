import { DemoExample, SupportedLanguage } from '../../types.ts';

const ENGLISH_DEMOS: DemoExample[] = [
  {
    id: 'demo-kyc-sbi',
    title: 'Urgent SBI Bank KYC Deactivation SMS',
    category: 'Bank / KYC Scam',
    inputType: 'text',
    senderLabel: 'VM-SBIBNK (Spoofed Header)',
    language: 'English',
    expectedVerdict: 'SCAM',
    snippet: 'Dear Customer, Your SBI account will be BLOCKED TODAY due to incomplete PAN/KYC...',
    content:
      'Dear SBI Customer, Your SBI Bank account will be BLOCKED TODAY within 2 hours because your PAN/KYC is expired. Please complete your KYC verification immediately to avoid stoppage of services. Click link: http://sbi-kyc-update-portal.xyz/verify',
  },
  {
    id: 'demo-speedpost-parcel',
    title: 'India Post / SpeedPost Held Parcel Alert',
    category: 'Courier / Parcel Scam',
    inputType: 'text',
    senderLabel: '+91 98712 34567 (Random Mobile Number)',
    language: 'English',
    expectedVerdict: 'SCAM',
    snippet: 'India Post: Your package #IN892182 is on hold due to incorrect house number. Pay ₹25...',
    content:
      'India Post Alert: Your parcel consignment #IN98217392 has failed delivery today due to incomplete address details. Please update your delivery address and pay the pending redelivery fee of ₹25 within 24 hours or parcel will be returned: http://indiapost-redelivery.site/track',
  },
  {
    id: 'demo-bescom-electricity',
    title: 'BESCOM / Discom Electricity Disconnection Tonight',
    category: 'Electricity / Utility Bill Scam',
    inputType: 'text',
    senderLabel: '+91 93120 44521',
    language: 'English',
    expectedVerdict: 'SCAM',
    snippet: 'Dear Consumer, Your electricity power supply will be DISCONNECTED TONIGHT at 9:30 PM...',
    content:
      'Dear Consumer, Your electricity power supply will be DISCONNECTED TONIGHT at 9:30 PM from the electricity head office because your previous month bill was not updated. Please immediately contact our electricity officer Mr. Sharma at 9876543210 or install our official support app: http://electricity-bill-pay.click/update.apk',
  },
  {
    id: 'demo-telegram-wfh-job',
    title: 'Work-From-Home YouTube Like & Subscribe Job',
    category: 'Job / Work-from-Home Scam',
    inputType: 'text',
    senderLabel: 'WhatsApp Business: Global HR Sonia',
    language: 'English',
    expectedVerdict: 'SCAM',
    snippet: 'Part-time opportunity! Earn ₹3,000 - ₹8,000 daily from home just by liking YouTube videos...',
    content:
      'Hello! I am Sonia from HR Dept. We have an urgent work-from-home part-time opportunity. You can earn ₹3,500 to ₹8,500 per day by just liking YouTube videos and rating Google Maps places. No experience needed. Immediate payout to your UPI ID. Join our official Telegram task group now and pay ₹999 refundable registration deposit to start: http://t.me/wfh_daily_payout_tasks',
  },
  {
    id: 'demo-upi-refund-trap',
    title: 'Fake UPI Refund Request ("Enter PIN to Receive ₹4,500")',
    category: 'UPI / Payment Scam',
    inputType: 'text',
    senderLabel: 'PhonePe / GPay Collect Request',
    language: 'English',
    expectedVerdict: 'SCAM',
    snippet: 'You have received a cash refund of ₹4,500 from Meesho. Accept collect request and enter UPI PIN...',
    content:
      'You have received a cash refund approval of ₹4,500 from Meesho Customer Support. To credit this money into your bank account immediately, approve the PhonePe Collect Request and enter your 4 or 6-digit UPI PIN to confirm receipt.',
  },
  {
    id: 'demo-digital-arrest-call',
    title: 'Mumbai Police CBI Drugs Parcel Threat ("Digital Arrest")',
    category: 'Digital Arrest / Police Impersonation',
    inputType: 'text',
    senderLabel: 'Police Call Transcript',
    language: 'English',
    expectedVerdict: 'SCAM',
    snippet: 'This is Inspector Vikram from Crime Branch Mumbai. A FedEx parcel sent in your name to Thailand...',
    content:
      'This is Inspector Vikram from Crime Branch Mumbai. A FedEx parcel sent in your name to Thailand has been seized with 140 grams of MDMA drugs and 5 fake passports. An arrest warrant has been issued by the magistrate. You must immediately connect on Skype video call for digital arrest interrogation and transfer your funds to the RBI verification safety account or police will reach your house in 30 minutes.',
  },
];

const HINDI_DEMOS: DemoExample[] = [
  {
    id: 'demo-kyc-sbi',
    title: 'SBI बैंक KYC बंद होने का तत्काल SMS',
    category: 'Bank / KYC Scam',
    inputType: 'text',
    senderLabel: 'VM-SBIBNK (फर्जी बैंक हेडर)',
    language: 'Hindi',
    expectedVerdict: 'SCAM',
    snippet: 'प्रिय ग्राहक, आपका SBI खाता आज ब्लॉक कर दिया जाएगा क्योंकि पैन/KYC समाप्त हो गया है...',
    content:
      'प्रिय SBI ग्राहक, आपका SBI बैंक खाता आज 2 घंटे के भीतर ब्लॉक कर दिया जाएगा क्योंकि आपका पैन/KYC अपडेट नहीं है। सेवाओं को चालू रखने के लिए कृपया तुरंत सत्यापन पूरा करें। लिंक पर क्लिक करें: http://sbi-kyc-update-portal.xyz/verify',
  },
  {
    id: 'demo-speedpost-parcel',
    title: 'इंडिया पोस्ट पार्सल रुकावट चेतावनी',
    category: 'Courier / Parcel Scam',
    inputType: 'text',
    senderLabel: '+91 98712 34567 (अज्ञात मोबाइल नंबर)',
    language: 'Hindi',
    expectedVerdict: 'SCAM',
    snippet: 'इंडिया पोस्ट: पता अधूरा होने के कारण आपका पार्सल #IN892182 रुका हुआ है। ₹25 भरें...',
    content:
      'इंडिया पोस्ट सूचना: आपका पार्सल कन्साइनमेंट #IN98217392 गलत पते के कारण नहीं पहुंच सका। कृपया 24 घंटे के भीतर पता अपडेट करें और ₹25 का डिलीवरी शुल्क भरें अन्यथा पार्सल वापस लौटा दिया जाएगा: http://indiapost-redelivery.site/track',
  },
  {
    id: 'demo-bescom-electricity',
    title: 'बिजली कटने की फर्जी रात 9:30 बजे की धमकी',
    category: 'Electricity / Utility Bill Scam',
    inputType: 'text',
    senderLabel: '+91 93120 44521',
    language: 'Hindi',
    expectedVerdict: 'SCAM',
    snippet: 'प्रिय उपभोक्ता, आपकी बिजली आपूर्ति आज रात 9:30 बजे काट दी जाएगी...',
    content:
      'प्रिय उपभोक्ता, आपकी बिजली आपूर्ति आज रात 9:30 बजे बिजली कार्यालय द्वारा काट दी जाएगी क्योंकि पिछले महीने का बिल अपडेट नहीं हुआ है। कृपया तुरंत हमारे बिजली अधिकारी श्री शर्मा से 9876543210 पर संपर्क करें या ऐप डाउनलोड करें: http://electricity-bill-pay.click/update.apk',
  },
  {
    id: 'demo-telegram-wfh-job',
    title: 'घर बैठे यूट्यूब लाइक व टेलीग्राम कमाई का झांसा',
    category: 'Job / Work-from-Home Scam',
    inputType: 'text',
    senderLabel: 'WhatsApp बिजनेस: सोनिया (HR)',
    language: 'Hindi',
    expectedVerdict: 'SCAM',
    snippet: 'पार्ट-टाइम नौकरी! यूट्यूब वीडियो लाइक करके घर बैठे रोजाना ₹3,000 - ₹8,000 कमाएं...',
    content:
      'नमस्ते! मैं HR से सोनिया हूँ। हमारे पास घर बैठे पार्ट-टाइम काम का अवसर है। आप सिर्फ यूट्यूब वीडियो लाइक करके रोजाना ₹3,500 से ₹8,500 कमा सकते हैं। तुरंत UPI भुगतान। काम शुरू करने के लिए हमारे टेलीग्राम ग्रुप से जुड़ें और ₹999 की रिफंडेबल डिपॉजिट जमा करें: http://t.me/wfh_daily_payout_tasks',
  },
  {
    id: 'demo-upi-refund-trap',
    title: 'फर्जी UPI रिफंड ("₹4,500 पाने के लिए पिन डालें")',
    category: 'UPI / Payment Scam',
    inputType: 'text',
    senderLabel: 'PhonePe / GPay कलेक्ट रिक्वेस्ट',
    language: 'Hindi',
    expectedVerdict: 'SCAM',
    snippet: 'मीशो से ₹4,500 का रिफंड मिला है। कलेक्ट रिक्वेस्ट स्वीकार करें और UPI पिन डालें...',
    content:
      'मीशो कस्टमर सपोर्ट से आपको ₹4,500 का नकद रिफंड स्वीकृत हुआ है। इस राशि को सीधे अपने बैंक खाते में जमा करने के लिए PhonePe कलेक्ट रिक्वेस्ट स्वीकार करें और पुष्टि के लिए अपना 4 या 6 अंकों का UPI PIN दर्ज करें।',
  },
  {
    id: 'demo-digital-arrest-call',
    title: 'मुंबई पुलिस/CBI ड्रग पार्सल व डिजिटल अरेस्ट धमकी',
    category: 'Digital Arrest / Police Impersonation',
    inputType: 'text',
    senderLabel: 'कॉल का विवरण',
    language: 'Hindi',
    expectedVerdict: 'SCAM',
    snippet: 'मैं क्राइम ब्रांच मुंबई से इंस्पेक्टर विक्रम बोल रहा हूँ। आपके नाम से थाईलैंड भेजा गया पार्सल...',
    content:
      'मैं क्राइम ब्रांच मुंबई से इंस्पेक्टर विक्रम बोल रहा हूँ। आपके नाम से थाईलैंड भेजे गए एक कूरियर में 140 ग्राम नशीले पदार्थ और 5 फर्जी पासपोर्ट जब्त किए गए हैं। मजिस्ट्रेट ने गिरफ्तारी वारंट जारी किया है। आपको डिजिटल अरेस्ट के तहत पूछताछ के लिए तुरंत स्काइप वीडियो कॉल से जुड़ना होगा और पैसे सुरक्षा खाते में ट्रांसफर करने होंगे।',
  },
];

const KANNADA_DEMOS: DemoExample[] = [
  {
    id: 'demo-kyc-sbi',
    title: 'SBI ಬ್ಯಾಂಕ್ KYC ರದ್ದಾಗುವ ತುರ್ತು SMS',
    category: 'Bank / KYC Scam',
    inputType: 'text',
    senderLabel: 'VM-SBIBNK (ನಕಲಿ ಬ್ಯಾಂಕ್ ಹೆಡರ್)',
    language: 'Kannada',
    expectedVerdict: 'SCAM',
    snippet: 'ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ ಪ್ಯಾನ್/ಕೆವೈಸಿ ಮುಗಿದಿರುವುದರಿಂದ ಇಂದು ನಿಮ್ಮ SBI ಖಾತೆ ರದ್ದಾಗುತ್ತದೆ...',
    content:
      'ಆತ್ಮೀಯ ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ ಪ್ಯಾನ್/ಕೆವೈಸಿ ಅವಧಿ ಮುಗಿದಿರುವುದರಿಂದ ನಿಮ್ಮ SBI ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ಇಂದು 2 ಗಂಟೆಗಳಲ್ಲಿ ರದ್ದುಗೊಳಿಸಲಾಗುವುದು. ಸೇವೆಗಳು ಸ್ಥಗಿತಗೊಳ್ಳದಂತೆ ತಕ್ಷಣ ಕೆವೈಸಿ ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಳಿಸಿ: http://sbi-kyc-update-portal.xyz/verify',
  },
  {
    id: 'demo-speedpost-parcel',
    title: 'ಇಂಡಿಯಾ ಪೋಸ್ಟ್ ಪಾರ್ಸೆಲ್ ವಿಳಾಸ ತಿದ್ದುಪಡಿ ವಂಚನೆ',
    category: 'Courier / Parcel Scam',
    inputType: 'text',
    senderLabel: '+91 98712 34567 (ಅಪರಿಚಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ)',
    language: 'Kannada',
    expectedVerdict: 'SCAM',
    snippet: 'ಇಂಡಿಯಾ ಪೋಸ್ಟ್: ವಿಳಾಸ ತಪ್ಪಾಗಿರುವುದರಿಂದ ಪಾರ್ಸೆಲ್ ಹಿಂತಿರುಗುತ್ತಿದೆ. ₹25 ಪಾವತಿಸಿ...',
    content:
      'ಇಂಡಿಯಾ ಪೋಸ್ಟ್ ಎಚ್ಚರಿಕೆ: ವಿಳಾಸ ತಪ್ಪಾಗಿರುವುದರಿಂದ ನಿಮ್ಮ ಪಾರ್ಸೆಲ್ ತಲುಪಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. 24 ಗಂಟೆಗಳಲ್ಲಿ ವಿಳಾಸ ಸರಿಪಡಿಸಿ ₹25 ಮರು-ವಿತರಣಾ ಶುಲ್ಕ ಪಾವತಿಸಿ, ಇಲ್ಲದಿದ್ದರೆ ಪಾರ್ಸೆಲ್ ವಾಪಸ್ ಹೋಗುತ್ತದೆ: http://indiapost-redelivery.site/track',
  },
  {
    id: 'demo-bescom-electricity',
    title: 'ಬೆಸ್ಕಾಂ / ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತದ ಸುಳ್ಳು ಬೆದರಿಕೆ',
    category: 'Electricity / Utility Bill Scam',
    inputType: 'text',
    senderLabel: '+91 93120 44521',
    language: 'Kannada',
    expectedVerdict: 'SCAM',
    snippet: 'ಗ್ರಾಹಕರೇ, ಬಿಲ್ ಪಾವತಿಯಾಗದ ಕಾರಣ ಇಂದು ರಾತ್ರಿ 9:30 ಕ್ಕೆ ಕರೆಂಟ್ ಕಟ್ ಮಾಡಲಾಗುತ್ತದೆ...',
    content:
      'ಆತ್ಮೀಯ ಗ್ರಾಹಕರೇ, ಕಳೆದ ತಿಂಗಳ ಬಿಲ್ ಅಪ್‌ಡೇಟ್ ಆಗದ ಕಾರಣ ಇಂದು ರಾತ್ರಿ 9:30 ಕ್ಕೆ ನಿಮ್ಮ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸಲಾಗುವುದು. ತಕ್ಷಣ ನಮ್ಮ ವಿದ್ಯುತ್ ಅಧಿಕಾರಿ ಶರ್ಮಾ ಅವರ ನಂಬರ್ 9876543210 ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ಆಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ: http://electricity-bill-pay.click/update.apk',
  },
  {
    id: 'demo-telegram-wfh-job',
    title: 'ಮನೆಯಿಂದಲೇ ಕೆಲಸ ಮತ್ತು ಯೂಟ್ಯೂಬ್ ಲೈಕ್ ಜಾಬ್ ಸ್ಕ್ಯಾಮ್',
    category: 'Job / Work-from-Home Scam',
    inputType: 'text',
    senderLabel: 'WhatsApp Business: ಸೋನಿಯಾ HR',
    language: 'Kannada',
    expectedVerdict: 'SCAM',
    snippet: 'ಪಾರ್ಟ್ ಟೈಮ್ ಕೆಲಸ! ಯೂಟ್ಯೂಬ್ ವಿಡಿಯೋ ಲೈಕ್ ಮಾಡಿ ದಿನಕ್ಕೆ ₹3,000 - ₹8,000 ಗಳಿಸಿ...',
    content:
      'ನಮಸ್ಕಾರ! ನಾನು ಹೆಚ್.ಆರ್ ಸೋನಿಯಾ. ಕೇವಲ ಯೂಟ್ಯೂಬ್ ವಿಡಿಯೋ ಲೈಕ್ ಮಾಡುವ ಮೂಲಕ ಪ್ರತಿದಿನ ₹3,500 ರಿಂದ ₹8,500 ಗಳಿಸುವ ಸುಲಭ ಅವಕಾಶವಿದೆ. ನಿಮ್ಮ UPI ಖಾತೆಗೆ ತಕ್ಷಣ ಹಣ ಪಾವತಿ. ಈಗಲೇ ನಮ್ಮ ಟೆಲಿಗ್ರಾಂ ಗ್ರೂಪ್‌ಗೆ ಸೇರಿ ₹999 ನೋಂದಣಿ ಠೇವಣಿ ಕಟ್ಟಿ ಕೆಲಸ ಪ್ರಾರಂಭಿಸಿ: http://t.me/wfh_daily_payout_tasks',
  },
  {
    id: 'demo-upi-refund-trap',
    title: 'ನಕಲಿ UPI ಮರುಪಾವತಿ ("ಹಣ ಪಡೆಯಲು PIN ಹಾಕಿ")',
    category: 'UPI / Payment Scam',
    inputType: 'text',
    senderLabel: 'PhonePe / GPay ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್',
    language: 'Kannada',
    expectedVerdict: 'SCAM',
    snippet: 'ನಿಮಗೆ ₹4,500 ಕ್ಯಾಶ್‌ಬ್ಯಾಕ್ ಬಂದಿದೆ. ಸ್ವೀಕರಿಸಲು PhonePe ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್‌ನಲ್ಲಿ PIN ನಮೂದಿಸಿ...',
    content:
      'ನಿಮ್ಮ ಖಾತೆಗೆ ₹4,500 ಮರುಪಾವತಿ ಜಮೆಯಾಗಲು ಅನುಮೋದಿಸಲಾಗಿದೆ. ಈ ಹಣವನ್ನು ತಕ್ಷಣ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಪಡೆಯಲು PhonePe ಕಲೆಕ್ಟ್ ವಿನಂತಿಯನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಿ ಮತ್ತು 4 ಅಥವಾ 6 ಅಂಕಿಯ UPI PIN ನಮೂದಿಸಿ.',
  },
  {
    id: 'demo-digital-arrest-call',
    title: 'ಮುಂಬೈ ಪೊಲೀಸ್ / ಡ್ರಗ್ಸ್ ಪಾರ್ಸೆಲ್ ಬೆದರಿಕೆ (ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್)',
    category: 'Digital Arrest / Police Impersonation',
    inputType: 'text',
    senderLabel: 'ಪೊಲೀಸ್ ಕರೆ ವಿವರ',
    language: 'Kannada',
    expectedVerdict: 'SCAM',
    snippet: 'ನಾನು ಮುಂಬೈ ಕ್ರೈಮ್ ಬ್ರಾಂಚ್ ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ವಿಕ್ರಮ್. ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಡ್ರಗ್ಸ್ ಪಾರ್ಸೆಲ್ ಸಿಕ್ಕಿಬಿದ್ದಿದೆ...',
    content:
      'ನಾನು ಮುಂಬೈ ಕ್ರೈಮ್ ಬ್ರಾಂಚ್ ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ವಿಕ್ರಮ್. ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ವಿದೇಶಕ್ಕೆ ಕಳುಹಿಸಲಾಗುತ್ತಿದ್ದ ಪಾರ್ಸೆಲ್‌ನಲ್ಲಿ ಡ್ರಗ್ಸ್ ಮತ್ತು ನಕಲಿ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಳು ಪತ್ತೆಯಾಗಿವೆ. ನ್ಯಾಯಾಲಯದಿಂದ ವಾರಂಟ್ ಜಾರಿಯಾಗಿದೆ. ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ವಿಚಾರಣೆಗೆ ಸ್ಕೈಪ್ ವಿಡಿಯೋ ಕಾಲ್‌ನಲ್ಲಿ ಬನ್ನಿ ಮತ್ತು ಪರಿಶೀಲನೆಗಾಗಿ ಹಣವನ್ನು ಆರ್‌ಬಿಐ ಸುರಕ್ಷತಾ ಖಾತೆಗೆ ವರ್ಗಾಯಿಸಿ.',
  },
];

export function getLocalizedDemoExamples(lang: SupportedLanguage): DemoExample[] {
  if (lang === 'Hindi') {
    return HINDI_DEMOS;
  }
  if (lang === 'Kannada') {
    return KANNADA_DEMOS;
  }
  if (lang === 'Tamil') {
    return HINDI_DEMOS.map((d, i) => ({
      ...d,
      language: 'Tamil',
      title: [
        'SBI வங்கி KYC முடக்கம் அவசர SMS',
        'இந்தியா போஸ்ட் பார்சல் முகவரி மோசடி',
        'மின்சார துண்டிப்பு போலி இரவு 9:30 எச்சரிக்கை',
        'வீட்டிலிருந்தே வேலை யூடியூப் லைக் மோசடி',
        'போலி UPI ரீஃபண்ட் ("பணம் பெற PIN போடவும்")',
        'மும்பை போலீஸ் போதைப்பொருள் பார்சல் டிஜிட்டல் அரெஸ்ட்',
      ][i] || d.title,
    }));
  }
  if (lang === 'Telugu') {
    return HINDI_DEMOS.map((d, i) => ({
      ...d,
      language: 'Telugu',
      title: [
        'SBI బ్యాంక్ KYC నిలిపివేత అత్యవసర SMS',
        'ఇండియా పోస్ట్ పార్శిల్ చిరునామా మోసం',
        'విద్యుత్ సరఫరా రాత్రి 9:30 నిలిపివేత బెదిరింపు',
        'వర్క్ ఫ్రమ్ హోమ్ యూట్యూబ్ లైక్ మోసం',
        'నకిలీ UPI రీఫండ్ ("డబ్బులు రావడానికి PIN నొక్కండి")',
        'ముంబై పోలీస్ డ్రగ్స్ పార్శిల్ డిజిటల్ అరెస్ట్',
      ][i] || d.title,
    }));
  }
  if (lang === 'Malayalam') {
    return HINDI_DEMOS.map((d, i) => ({
      ...d,
      language: 'Malayalam',
      title: [
        'SBI ബാങ്ക് KYC ബ്ലോക്കിംഗ് വ്യാജ SMS',
        'ഇന്ത്യ പോസ്റ്റ് പാഴ്സൽ വ്യാജ മുന്നറിയിപ്പ്',
        'വൈദ്യുതി മുടങ്ങുമെന്ന വ്യാജ ഭീഷണി',
        'വർക്ക് ഫ്രം ഹോം യൂട്യൂബ് ലൈക്ക് തട്ടിപ്പ്',
        'വ്യാജ UPI റീഫണ്ട് ("പണം ലഭിക്കാൻ PIN അടിക്കുക")',
        'മുംബൈ പോലീസ് ഡ്രഗ്സ് പാഴ്സൽ ഭീഷണി',
      ][i] || d.title,
    }));
  }
  if (lang === 'Marathi') {
    return HINDI_DEMOS.map((d, i) => ({
      ...d,
      language: 'Marathi',
      title: [
        'SBI बँक केवायसी (KYC) ब्लॉक तातडीचा SMS',
        'इंडिया पोस्ट पार्सल पत्ता घोटाळा',
        'रात्री ९:३० वाजता वीज तोडण्याची बनावट धमकी',
        'वर्क-फ्रॉम-होम यूट्यूब लाइक नोकरी फसवणूक',
        'बनावट UPI रिफंड ("पैसे मिळवण्यासाठी पिन टाका")',
        'मुंबई पोलीस ड्रग्स पार्सल व डिजिटल अरेस्ट धमकी',
      ][i] || d.title,
    }));
  }
  if (lang === 'Bengali') {
    return HINDI_DEMOS.map((d, i) => ({
      ...d,
      language: 'Bengali',
      title: [
        'SBI ব্যাংক KYC ব্লক হওয়ার জরুরি SMS',
        'ইন্ডিয়া পোস্ট পার্সেল ডেলিভারি প্রতারণা',
        'বিদ্যুৎ সংযোগ রাত ৯:৩০ এ কাটার মিথ্যা হুমকি',
        'ঘরে বসে কাজ ইউটিউব লাইক চাকরি ফাঁদ',
        'ভুয়ো UPI রিফান্ড ("টাকা পেতে পিন দিন")',
        'মুম্বাই পুলিশ মাদক পার্সেল ডিজিটাল অ্যারেস্ট হুমকি',
      ][i] || d.title,
    }));
  }
  return ENGLISH_DEMOS;
}

export const DEMO_EXAMPLES: DemoExample[] = ENGLISH_DEMOS;
