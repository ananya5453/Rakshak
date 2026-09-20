import { EducationalArticle, SupportedLanguage } from '../../types.ts';

const ENGLISH_ARTICLES: EducationalArticle[] = [
  {
    id: 'kyc-scam',
    title: 'Fake Bank & KYC Update Scams',
    category: 'Banking',
    iconName: 'Building2',
    tag: 'Very Common',
    quickSummary:
      'Fraudsters send alarming SMS or WhatsApp warnings claiming your bank account, PAN card, or SIM card is blocked unless you update KYC immediately.',
    howItWorks: [
      'You receive an SMS with an aggressive deadline: "Account will be blocked TODAY within 2 hours".',
      'The message has an unofficial link like "sbi-kyc-verify.xyz" or asks you to call an unknown number.',
      'The fake website replicates your bank\'s login page, asking for Username, Password, Card Number, CVV, and OTP.',
      'As soon as you enter the details, the fraudster triggers money transfers or adds themselves as a beneficiary.',
    ],
    warningSigns: [
      'Artificial panic and countdown timers ("Act within 2 hours").',
      'Message sent from an ordinary 10-digit mobile number instead of an official 6-character bank sender ID (like VK-SBIBNK or AX-HDFCBK).',
      'Links with strange domain extensions (.xyz, .top, .site, .apk) instead of .bank.sbi or .hdfcbank.com.',
      'Threat of immediate freezing without prior postal letters.',
    ],
    whatTheyAskFor: [
      'Netbanking User ID and Password',
      'Debit Card Number, Expiry Date, and 3-digit CVV',
      'One-Time Password (OTP) received on SMS',
      'Aadhaar number and PAN card photo uploads',
    ],
    howToProtect: [
      'Banks NEVER ask you to update KYC via third-party web links in SMS.',
      'Always visit your official bank branch in person or use the verified official banking app downloaded from Google Play Store or Apple App Store.',
      'Check the sender ID: Official bank SMS in India always begins with authorized telecom headers.',
    ],
    whatToDoIfTrapped: [
      'Call your bank\'s 24x7 toll-free helpline immediately and request an immediate account debit freeze.',
      'Block your debit/credit card through the official banking app.',
      'Call the National Cyber Helpline 1930 within the first hour ("golden hour") to freeze the fraudulent funds.',
      'File a formal cyber complaint on cybercrime.gov.in.',
    ],
    realExample:
      '"Dear Customer, Your SBI Account is blocked today. Please update your PAN immediately by clicking http://sbi-kyc-online.xyz to avoid suspension."',
  },
  {
    id: 'upi-scam',
    title: 'UPI Collect & "Enter PIN to Receive Money" Fraud',
    category: 'Digital Payments',
    iconName: 'CreditCard',
    tag: 'High Financial Loss',
    quickSummary:
      'Scammers take advantage of confusion around UPI PINs by claiming that entering your PIN is required to "receive" cashbacks, refunds, or OLX payments.',
    howItWorks: [
      'A buyer on OLX, an alleged customer care agent, or a fake cashback agent promises to send you money.',
      'They send a UPI "Collect Request" on PhonePe, Google Pay, or Paytm instead of sending money.',
      'They verbally reassure you: "Sir, just tap Pay and enter your 4 or 6-digit PIN, money will be directly credited to your account."',
      'The moment you enter your UPI PIN, money is DEBITED from your bank account and sent to the scammer.',
    ],
    warningSigns: [
      'Someone asking you to enter your UPI PIN to "receive" or "accept" funds.',
      'QR codes sent via WhatsApp with text like "Scan this QR code to receive ₹5,000".',
      'The screen on PhonePe/GPay clearly displays the button "PAY ₹X,XXX" instead of "Received".',
      'The scammer staying on an active call and rushing you to approve notifications.',
    ],
    whatTheyAskFor: [
      'Your UPI PIN (4 or 6 digits)',
      'Scanning a received QR code from your gallery',
      'Accepting an incoming Collect Request in payment apps',
      'Installing remote screen sharing apps (AnyDesk, TeamViewer)',
    ],
    howToProtect: [
      'GOLDEN RULE: UPI PIN is entered ONLY to SEND or DEDUCT money, NEVER to receive money.',
      'Receiving money through UPI requires NO action from you — no PIN, no QR code, no approval.',
      'Never accept money requests from unknown strangers on OLX or Facebook Marketplace.',
    ],
    whatToDoIfTrapped: [
      'Open your payment app and immediately report the fraudulent VPA / UPI ID.',
      'Contact your linked bank to dispute the unauthorized transaction reference ID.',
      'Dial 1930 immediately with the UTR transaction number.',
    ],
    realExample:
      '"Hello sir, I am sending advance payment ₹15,000 for your sofa on OLX. Please accept the PhonePe collect request and enter PIN to deposit into your account."',
  },
  {
    id: 'digital-arrest',
    title: 'Digital Arrest & Police / CBI Video Call Extortion',
    category: 'Intimidation & Extortion',
    iconName: 'ShieldAlert',
    tag: 'Extreme Psychological Threat',
    quickSummary:
      'Impostors claiming to be police, CBI, Narcotics Control Bureau (NCB), or ED place Skype/WhatsApp video calls wearing uniforms in staged police setups to extort millions.',
    howItWorks: [
      'You receive an IVR call: "FedEx courier containing passport and MDMA drugs addressed to you has been intercepted at Mumbai airport".',
      'You are transferred to a fake "CBI Inspector" on a WhatsApp or Skype video call.',
      'The background shows fake police banners, national emblems, and uniformed officers.',
      'They declare you are placed under "Digital Arrest" and cannot disconnect the call or tell family members under threat of immediate physical arrest.',
      'They force you to transfer your entire savings into a "Reserve Bank verification safety escrow account", which is actually a mule account.',
    ],
    warningSigns: [
      'No law enforcement agency in India (Police, CBI, ED, NCB) arrests or interrogates citizens over Skype or WhatsApp video calls.',
      'The concept of "Digital Arrest" does NOT exist in Indian criminal procedure or law.',
      'High psychological pressure, accusations of terror funding or drug trafficking, and forbidding speaking to relatives.',
      'Demands to transfer money to private bank accounts for "verification" or "bail".',
    ],
    whatTheyAskFor: [
      'Remaining on continuous 24-hour video surveillance via Skype',
      'Bank account balances, fixed deposit details, and mutual fund statements',
      'RTGS / IMPS fund transfers into purported government safety accounts',
      'Signatures on forged arrest warrants and Supreme Court notices',
    ],
    howToProtect: [
      'Immediately disconnect any video call from someone claiming to be police or CBI.',
      'Remember: Real police will serve an official physical notice under Section 41A of the CrPC/BNSS or visit your local police station.',
      'Never transfer money to any account for "investigation purposes". Government agencies never hold public escrow accounts.',
    ],
    whatToDoIfTrapped: [
      'Immediately call the National Cyber Helpline at 1930.',
      'Visit your nearest physical police station and file a complaint.',
      'Preserve Skype IDs, phone numbers, and bank account transfer receipts.',
    ],
    realExample:
      '"This is Inspector Ajay from Crime Branch. An illegal parcel with 5 fake passports and 140g MDMA was sent to Taiwan in your name. You are placed under digital arrest."',
  },
  {
    id: 'electricity-bill',
    title: 'Electricity Power Cut & Utility Disconnection Scams',
    category: 'Utilities',
    iconName: 'Zap',
    tag: 'Daily Threat',
    quickSummary:
      'Scammers send terrifying evening SMS stating your power supply will be cut off at 9:30 PM tonight due to an unpaid bill, directing you to call a fake officer or install an APK.',
    howItWorks: [
      'You receive an SMS around 6:00 PM - 9:00 PM: "Dear Consumer, your electricity power will be disconnected tonight at 9:30 PM as previous bill was not updated".',
      'The message gives an unofficial mobile number for an "Electricity Officer".',
      'When you call, the scammer pretends to check your meter record and asks you to pay a nominal ₹10 or ₹15 bill to update the server.',
      'They send a link or APK app to download (e.g. "Bijli-Pay.apk" or QuickSupport screen share) which gives them complete remote control of your phone and OTPs.',
    ],
    warningSigns: [
      'Electricity DISCOMs (BESCOM, Tata Power, Adani, MSEDCL, UPPCL, TANGEDCO) never send disconnect warnings from personal 10-digit phone numbers.',
      'Disconnection requires multiple written notices and never happens overnight at 9:30 PM without formal billing disputes.',
      'Asking to install an .apk file or any remote access app like AnyDesk or RustDesk.',
    ],
    whatTheyAskFor: [
      'Calling an unverified personal mobile number',
      'Downloading .apk files or third party software on your smartphone',
      'Entering card details or netbanking credentials on suspicious web pages',
      'Making a test payment of ₹5 or ₹10 through an untrusted app',
    ],
    howToProtect: [
      'Always pay utility bills only through verified official DISCOM apps (e.g., BESCOM Mithra, Mahavitaran) or trusted portals (Bharat BillPay / BBPS).',
      'Never call mobile numbers provided inside warning SMS messages.',
      'NEVER install .apk files received via WhatsApp or SMS links.',
    ],
    whatToDoIfTrapped: [
      'Turn on Airplane mode immediately to sever remote control connections.',
      'Uninstall any newly installed apps (QuickSupport, AnyDesk, suspicious APKs).',
      'Call your bank to freeze netbanking and cards.',
      'Report the incident to 1930.',
    ],
    realExample:
      '"Dear Consumer Your Electricity power will be disconnected Tonight at 9.30 pm from electricity office because your previous month bill was not update. Please immediately contact our electricity officer 9876543210."',
  },
  {
    id: 'wfh-job-scam',
    title: 'Work-from-Home & Telegram "Like YouTube Videos" Fraud',
    category: 'Employment',
    iconName: 'Briefcase',
    tag: 'Youth & Homemaker Trap',
    quickSummary:
      'Fraudsters lure job seekers with offers of earning ₹3,000–₹8,000 daily by simply liking YouTube videos, rating hotels on Google Maps, or reviewing products, before draining their savings.',
    howItWorks: [
      'You get an unsolicited WhatsApp or Telegram message from a fake HR offering part-time flexible work.',
      'Initial tasks are simple: Like 3 YouTube videos and screenshot them. They genuinely pay you ₹150–₹500 on UPI to build trust.',
      'You are added to a Telegram VIP group where others share fake screenshots of earning lakhs.',
      'They introduce "Prepaid Merchant Tasks": Deposit ₹5,000 to earn ₹7,500. They show a fake dashboard with high virtual profit.',
      'When you attempt to withdraw your money, they claim your score is low and demand ₹50,000 to ₹5,00,000 in "tax" and "unlock fees".',
    ],
    warningSigns: [
      'Legitimate global companies never recruit part-time workers via unsolicited WhatsApp messages.',
      'No company pays thousands of rupees for simply liking YouTube videos or clicking likes.',
      'Any job requiring you to PAY money or deposit funds to unlock tasks is 100% a scam.',
      'Communication strictly on Telegram or WhatsApp with no official email domains.',
    ],
    whatTheyAskFor: [
      'Joining Telegram task channels',
      'Paying deposits or "crypto merchant investments" to unlock commissions',
      'Bank account numbers and UPI IDs',
      'Paying extra "withdrawal fees" or "income tax" to retrieve locked money',
    ],
    howToProtect: [
      'Never pay money to get a job. Real employers pay you; they never ask you to deposit money.',
      'Block and report unsolicited recruitment offers on WhatsApp immediately.',
      'Do not trust screenshots of earnings in Telegram channels — they are fabricated by syndicate members.',
    ],
    whatToDoIfTrapped: [
      'STOP depositing additional funds immediately; you will never get the "unlock fee" back.',
      'Save all chat histories, UPI transaction IDs, and beneficiary account numbers.',
      'Report immediately on cybercrime.gov.in and dial 1930.',
    ],
    realExample:
      '"Hi! I am Ananya from HR. Earn ₹3,000 to ₹7,000 daily part-time from mobile. Just like YouTube channels and submit screenshots. Message me on Telegram @hr_ananya_jobs to start."',
  },
  {
    id: 'courier-scam',
    title: 'India Post & Courier "Failed Delivery / Pay ₹25" Scam',
    category: 'Impersonation',
    iconName: 'Package',
    tag: 'Rapidly Growing',
    quickSummary:
      'You receive an SMS impersonating India Post, Blue Dart, or Delhivery claiming a parcel cannot be delivered due to an incorrect address, directing you to a phishing link to pay a ₹25 fee.',
    howItWorks: [
      'You receive an SMS: "India Post: Your package #IN892182 cannot be delivered due to missing house number. Update address within 24 hours: indiapost-address.site".',
      'Clicking the link opens an identical fake India Post tracking website.',
      'The site prompts you to update your address and pay a nominal re-delivery fee of ₹25 via debit card or netbanking.',
      'The phishing form captures your card number, expiry, and CVV, and tricks you into authorizing an OTP for thousands of rupees.',
    ],
    warningSigns: [
      'Official India Post tracking domain is indiapost.gov.in — never .site, .xyz, or .club.',
      'India Post postmen never ask for credit/debit card details on the web for address corrections.',
      'SMS sent from ordinary mobile numbers (+91-9XXXX-XXXXX) rather than verified government headers like GOVPOST or INDPST.',
    ],
    whatTheyAskFor: [
      'Full home address and phone number',
      'Payment of a small "redelivery fee" (₹10–₹50)',
      'Debit or credit card credentials and CVV',
      'Banking OTP under the guise of verifying payment',
    ],
    howToProtect: [
      'Track parcels strictly on the official website: www.indiapost.gov.in using your consignment number.',
      'Never click on shortened links or unofficial domains received via SMS.',
      'If in doubt, visit your local post office in person.',
    ],
    whatToDoIfTrapped: [
      'Immediately block your debit/credit card via your mobile banking app.',
      'Call your bank helpline to report an unauthorized card transaction.',
      'Report the phishing website link to cybercrime.gov.in.',
    ],
    realExample:
      '"IndiaPost: Your parcel is on hold due to wrong address. Please update your address in 24 hours otherwise it will be returned: http://indiapost-update.xyz/reschedule"',
  },
];

const HINDI_ARTICLES: EducationalArticle[] = [
  {
    id: 'kyc-scam',
    title: 'फर्जी बैंक व KYC अपडेट धोखाधड़ी',
    category: 'बैंकिंग',
    iconName: 'Building2',
    tag: 'अत्यधिक सामान्य',
    quickSummary:
      'धोखेबाज़ डरावने SMS या WhatsApp मैसेज भेजते हैं कि आपका बैंक खाता, पैन कार्ड या सिम कार्ड 2 घंटे में बंद हो जाएगा यदि तुरंत KYC अपडेट नहीं किया।',
    howItWorks: [
      'आपको मैसेज मिलता है: "आपका खाता आज 2 घंटे के भीतर ब्लॉक कर दिया जाएगा"।',
      'मैसेज में sbi-kyc-verify.xyz जैसा फर्जी लिंक होता है या किसी अनजान नंबर पर कॉल करने को कहा जाता है।',
      'फर्जी वेबसाइट आपके बैंक जैसी दिखती है, जहाँ यूजरनेम, पासवर्ड, कार्ड नंबर, CVV और OTP मांगा जाता है।',
      'जैसे ही आप जानकारी डालते हैं, धोखेबाज़ पैसे ट्रांसफर कर लेते हैं।',
    ],
    warningSigns: [
      'अनावश्यक जल्दबाजी और धमकी ("2 घंटे में बंद हो जाएगा")।',
      'आधिकारिक बैंक हेडर (VK-SBIBNK) के बजाय सामान्य 10-अंकीय मोबाइल नंबर से भेजा गया मैसेज।',
      'अजीब डोमेन (.xyz, .top, .site, .apk) जो आधिकारिक बैंक का नहीं है।',
      'बिना किसी लिखित डाक पत्र के तुरंत खाता बंद करने की धमकी।',
    ],
    whatTheyAskFor: [
      'नेटबैंकिंग यूजर आईडी और पासवर्ड',
      'डेबिट कार्ड नंबर, एक्सपायरी डेट और 3 अंकों का CVV',
      'मोबाइल पर प्राप्त OTP',
      'आधार और पैन कार्ड की तस्वीरें',
    ],
    howToProtect: [
      'बैंक कभी भी SMS लिंक के माध्यम से KYC अपडेट करने के लिए नहीं कहते।',
      'हमेशा अपनी बैंक शाखा में व्यक्तिगत रूप से जाएं या केवल अधिकृत ऐप का उपयोग करें।',
      'मैसेज भेजने वाले का हेडर अवश्य जांचें।',
    ],
    whatToDoIfTrapped: [
      'तुरंत बैंक की 24x7 हेल्पलाइन पर कॉल करके खाता डेबिट फ्रीज करवाएं।',
      'बैंकिंग ऐप से अपना कार्ड तुरंत ब्लॉक करें।',
      'पैसे रोकने के लिए पहले 1 घंटे ("गोल्डन ऑवर") में 1930 पर कॉल करें।',
      'cybercrime.gov.in पर शिकायत दर्ज करें।',
    ],
    realExample:
      '"प्रिय ग्राहक, आपका SBI खाता आज ब्लॉक कर दिया जाएगा। निलंबन से बचने के लिए http://sbi-kyc-online.xyz पर जाकर तुरंत पैन अपडेट करें।"',
  },
  {
    id: 'upi-scam',
    title: 'UPI कलेक्ट और "पैसे पाने के लिए पिन डालें" धोखाधड़ी',
    category: 'डिजिटल भुगतान',
    iconName: 'CreditCard',
    tag: 'भारी वित्तीय नुकसान',
    quickSummary:
      'धोखेबाज़ UPI पिन के भ्रम का फायदा उठाते हैं और दावा करते हैं कि कैशबैक, रिफंड या OLX पेमेंट प्राप्त करने के लिए पिन डालना जरूरी है।',
    howItWorks: [
      'OLX का कोई खरीदार या फर्जी कस्टमर केयर आपको पैसे भेजने का झांसा देता है।',
      'वे पैसे भेजने के बजाय PhonePe, GPay या Paytm पर "कलेक्ट रिक्वेस्ट" भेजते हैं।',
      'वे कॉल पर कहते हैं: "सर, बस Pay दबाकर अपना 4 या 6 अंकों का पिन डालें, पैसा सीधे खाते में आ जाएगा।"',
      'जैसे ही आप UPI पिन डालते हैं, आपके खाते से पैसे कटकर धोखेबाज़ के पास चले जाते हैं।',
    ],
    warningSigns: [
      'पैसे "पाने" या "स्वीकार" करने के लिए UPI पिन डालने को कहना।',
      'WhatsApp पर QR कोड भेजकर कहना: "5,000 रुपये पाने के लिए इस QR कोड को स्कैन करें।"',
      'स्क्रीन पर "Received" के बजाय "PAY ₹X,XXX" लिखा दिखना।',
      'कॉल पर लगातार दबाव बनाना।',
    ],
    whatTheyAskFor: [
      'आपका 4 या 6 अंकों का गुप्त UPI PIN',
      'गैलरी से प्राप्त QR कोड को स्कैन करना',
      'कलेक्ट रिक्वेस्ट स्वीकार करना',
      'स्क्रीन शेयरिंग ऐप (AnyDesk, TeamViewer) इंस्टॉल करवाना',
    ],
    howToProtect: [
      'स्वर्ण नियम: UPI PIN केवल पैसे भेजने या काटने के लिए डाला जाता है, पैसे पाने के लिए कभी नहीं।',
      'UPI से पैसे प्राप्त करने के लिए किसी पिन या अप्रूवल की आवश्यकता नहीं होती।',
      'OLX या सोशल मीडिया पर अनजान खरीदारों से सावधान रहें।',
    ],
    whatToDoIfTrapped: [
      'तुरंत अपने पेमेंट ऐप में फर्जी UPI ID की रिपोर्ट करें।',
      'बैंक को सूचित कर लेनदेन पर रोक लगवाएं।',
      'UTR नंबर के साथ तुरंत 1930 डायल करें।',
    ],
    realExample:
      '"नमस्ते सर, मैं OLX सोफे के लिए ₹15,000 एडवांस भेज रहा हूँ। PhonePe कलेक्ट रिक्वेस्ट स्वीकार करें और खाते में पैसे लेने के लिए पिन डालें।"',
  },
  {
    id: 'digital-arrest',
    title: 'डिजिटल अरेस्ट और पुलिस/CBI वीडियो कॉल वसूली',
    category: 'धमकी और जबरन वसूली',
    iconName: 'ShieldAlert',
    tag: 'गंभीर मानसिक धमकी',
    quickSummary:
      'खुद को पुलिस, CBI, नारकोटिक्स (NCB) या ED बताकर वर्दी पहनकर नकली पुलिस सेटअप से वीडियो कॉल करते हैं और गिरफ्तारी की धमकी देकर लाखों रुपये ठगते हैं।',
    howItWorks: [
      'कॉल आती है कि आपके नाम से मुंबई एयरपोर्ट पर पासपोर्ट और ड्रग्स का पार्सल पकड़ा गया है।',
      'कॉल को WhatsApp या Skype पर नकली "CBI इंस्पेक्टर" को ट्रांसफर किया जाता है।',
      'बैकग्राउंड में फर्जी पुलिस बैनर, लोगो और वर्दीधारी लोग दिखाई देते हैं।',
      'वे कहते हैं कि आप "डिजिटल अरेस्ट" के तहत हैं और किसी से बात नहीं कर सकते, अन्यथा तुरंत पुलिस घर पहुंचेगी।',
      'वे आपकी सारी जमा पूंजी किसी "सुरक्षित सरकारी जांच खाते" में ट्रांसफर करने को कहते हैं।',
    ],
    warningSigns: [
      'भारत में कोई भी पुलिस या जांच एजेंसी Skype या WhatsApp वीडियो कॉल पर किसी को गिरफ्तार नहीं करती।',
      'भारतीय कानून में "डिजिटल अरेस्ट" नाम की कोई प्रक्रिया नहीं है।',
      'कॉल काटने न देना और परिवार को बताने से मना करना।',
      'पैसे ट्रांसफर करने का दबाव डालना।',
    ],
    whatTheyAskFor: [
      '24 घंटे वीडियो कॉल चालू रखना',
      'बैंक बैलेंस, FD और बचत की पूरी जानकारी',
      'पैसे सरकारी सुरक्षा खाते के नाम पर ट्रांसफर करवाना',
      'फर्जी वारंट दिखाकर डराना',
    ],
    howToProtect: [
      'पुलिस या CBI बनकर आने वाली किसी भी वीडियो कॉल को तुरंत काट दें।',
      'असली पुलिस धारा 41A का औपचारिक लिखित नोटिस भेजती है या स्थानीय थाने बुलाती है।',
      'कभी भी किसी अनजान खाते में पैसे ट्रांसफर न करें।',
    ],
    whatToDoIfTrapped: [
      'तुरंत 1930 राष्ट्रीय साइबर हेल्पलाइन पर कॉल करें।',
      'नजदीकी थाने में जाकर लिखित शिकायत दर्ज करवाएं।',
      'कॉल स्क्रीनशॉट और बैंक रसीदें सुरक्षित रखें।',
    ],
    realExample:
      '"मैं क्राइम ब्रांच का इंस्पेक्टर अजय बोल रहा हूँ। आपके नाम से ताइवान भेजे गए पार्सल में 5 फर्जी पासपोर्ट और 140 ग्राम ड्रग्स मिले हैं। आप डिजिटल अरेस्ट हैं।"',
  },
  {
    id: 'electricity-bill',
    title: 'बिजली बिल व बिजली कटने की फर्जी धमकी',
    category: 'उपयोगिताएं',
    iconName: 'Zap',
    tag: 'दैनिक खतरा',
    quickSummary:
      'शाम के समय SMS भेजते हैं कि बिल न भरने के कारण आज रात 9:30 बजे बिजली काट दी जाएगी, और फर्जी नंबर पर संपर्क करने या APK डाउनलोड करने को कहते हैं।',
    howItWorks: [
      'शाम 7 से 9 बजे मैसेज आता है कि पिछले महीने का बिल अपडेट न होने से आज रात 9:30 बजे बिजली कट जाएगी।',
      'मैसेज में किसी "बिजली अधिकारी" का व्यक्तिगत नंबर दिया होता है।',
      'कॉल करने पर वे ₹10 या ₹15 का छोटा भुगतान करने को कहते हैं।',
      'वे एक ऐप (Bijli.apk या QuickSupport) इंस्टॉल करवाते हैं जिससे आपके फोन और OTP का पूरा नियंत्रण उनके पास चला जाता है।',
    ],
    warningSigns: [
      'बिजली कंपनियां कभी भी 10 अंकों के निजी फोन नंबर से बिल काटने का मैसेज नहीं भेजतीं।',
      'बिजली कटने से पहले कानूनी नोटिस दिया जाता है, रात 9:30 बजे अचानक बिजली नहीं काटी जाती।',
      'कोई भी .apk फाइल या AnyDesk जैसी ऐप डाउनलोड करने को कहना।',
    ],
    whatTheyAskFor: [
      'अनजान मोबाइल नंबर पर कॉल करना',
      'मोबाइल में .apk फाइल या स्क्रीन शेयरिंग ऐप डालना',
      'फर्जी लिंक पर बैंक या कार्ड की जानकारी भरना',
    ],
    howToProtect: [
      'बिजली बिल केवल आधिकारिक सरकारी ऐप या Bharat BillPay से भरें।',
      'SMS में दिए गए मोबाइल नंबर पर कभी कॉल न करें।',
      'अज्ञात लिंक से कभी भी कोई .apk ऐप इंस्टॉल न करें।',
    ],
    whatToDoIfTrapped: [
      'फोन को तुरंत Airplane मोड पर डालें ताकि रिमोट कंट्रोल कट जाए।',
      'हाल ही में इंस्टॉल की गई अनजान ऐप को तुरंत अनइंस्टॉल करें।',
      'बैंक को फोन करके नेटबैंकिंग और कार्ड फ्रीज करवाएं।',
      '1930 पर तुरंत सूचना दें।',
    ],
    realExample:
      '"प्रिय उपभोक्ता आपकी बिजली आपूर्ति आज रात 9:30 बजे बिजली कार्यालय से काट दी जाएगी। कृपया हमारे बिजली अधिकारी 9876543210 से तुरंत संपर्क करें।"',
  },
  {
    id: 'wfh-job-scam',
    title: 'घर बैठे नौकरी व टेलीग्राम यूट्यूब लाइक धोखाधड़ी',
    category: 'रोजगार',
    iconName: 'Briefcase',
    tag: 'युवाओं व महिलाओं के लिए जाल',
    quickSummary:
      'रोजाना ₹3,000–₹8,000 कमाने का लालच देकर यूट्यूब वीडियो लाइक करवाते हैं और बाद में लाखों रुपये जमा करवाकर हड़प लेते हैं।',
    howItWorks: [
      'WhatsApp या Telegram पर पार्ट-टाइम काम का मैसेज आता है।',
      'शुरुआत में 3 वीडियो लाइक करने पर विश्वास जीतने के लिए वास्तव में ₹150–₹500 खाते में भेजते हैं।',
      'फिर टेलीग्राम ग्रुप में जोड़कर "मर्चेंट टास्क" के नाम पर ₹5,000 जमा करने को कहते हैं और फर्जी मुनाफा दिखाते हैं।',
      'जब आप पैसे निकालना चाहते हैं, तो "टैक्स" और "अनलॉक फीस" के नाम पर ₹50,000 से ₹5 लाख तक की मांग करते हैं।',
    ],
    warningSigns: [
      'कोई भी वास्तविक कंपनी WhatsApp पर अनजान लोगों को नौकरी नहीं बांटती।',
      'सिर्फ वीडियो लाइक करने के कोई हजारों रुपये नहीं देता।',
      'जिस काम में पहले पैसे जमा करने को कहा जाए, वह 100% स्कैम है।',
    ],
    whatTheyAskFor: [
      'टेलीग्राम ग्रुप ज्वाइन करना',
      'टास्क अनलॉक करने के लिए पैसे जमा करना',
      'पैसे वापस पाने के लिए और फीस देना',
    ],
    howToProtect: [
      'नौकरी पाने के लिए कभी पैसे न दें। असली कंपनी वेतन देती है, पैसे मांगती नहीं।',
      'WhatsApp पर आने वाले ऐसे ऑफर्स को तुरंत ब्लॉक करें।',
      'टेलीग्राम पर दिखाए जाने वाले मुनाफे के फर्जी स्क्रीनशॉट पर भरोसा न करें।',
    ],
    whatToDoIfTrapped: [
      'तुरंत और पैसे जमा करना बंद करें, वे पैसे कभी वापस नहीं देते।',
      'चैट स्क्रीनशॉट और बैंक ट्रांजेक्शन UTR नंबर सुरक्षित रखें।',
      '1930 पर कॉल करें और cybercrime.gov.in पर रिपोर्ट करें।',
    ],
    realExample:
      '"नमस्ते! मैं HR से अनन्या हूँ। मोबाइल से रोजाना ₹3,000 से ₹7,000 कमाएं। सिर्फ यूट्यूब वीडियो लाइक करें। काम शुरू करने के लिए टेलीग्राम पर संपर्क करें।"',
  },
  {
    id: 'courier-scam',
    title: 'इंडिया पोस्ट व कूरियर "पता गलत / ₹25 भरें" स्कैम',
    category: 'प्रतिरूपण',
    iconName: 'Package',
    tag: 'तेजी से बढ़ता स्कैम',
    quickSummary:
      'इंडिया पोस्ट या ब्लू डार्ट के नाम से मैसेज आता है कि पता अधूरा होने से पार्सल रुका हुआ है, लिंक पर जाकर ₹25 देकर पता अपडेट करें।',
    howItWorks: [
      'SMS आता है: "इंडिया पोस्ट: पता अधूरा होने के कारण आपका पार्सल #IN892182 रुका हुआ है। 24 घंटे में अपडेट करें: indiapost-address.site"।',
      'लिंक खोलने पर इंडिया पोस्ट जैसी दिखने वाली हूबहू फर्जी वेबसाइट खुलती है।',
      'वहाँ पता डालने और ₹25 डिलीवरी फीस देने को कहा जाता है।',
      'जैसे ही आप कार्ड विवरण और OTP डालते हैं, आपके खाते से हजारों रुपये कट जाते हैं।',
    ],
    warningSigns: [
      'इंडिया पोस्ट की आधिकारिक वेबसाइट indiapost.gov.in है, कभी भी .site या .xyz नहीं।',
      'डाक विभाग कभी भी पते के लिए ऑनलाइन कार्ड विवरण नहीं मांगता।',
      'मैसेज आधिकारिक हेडर के बजाय सामान्य 10-अंकीय नंबर से आता है।',
    ],
    whatTheyAskFor: [
      'घर का पूरा पता और फोन नंबर',
      '₹10–₹50 का छोटा ऑनलाइन भुगतान',
      'डेबिट या क्रेडिट कार्ड नंबर और CVV',
      'बैंक OTP',
    ],
    howToProtect: [
      'पार्सल केवल आधिकारिक वेबसाइट www.indiapost.gov.in पर ट्रैक करें।',
      'SMS में आए किसी भी लिंक पर कभी क्लिक न करें।',
      'संदेह होने पर सीधे अपने स्थानीय डाकघर जाएं।',
    ],
    whatToDoIfTrapped: [
      'मोबाइल बैंकिंग ऐप से अपना कार्ड तुरंत ब्लॉक करें।',
      'बैंक को कॉल करके अनधिकृत कार्ड लेनदेन की सूचना दें।',
      'फर्जी वेबसाइट लिंक की cybercrime.gov.in पर शिकायत करें।',
    ],
    realExample:
      '"IndiaPost: गलत पते के कारण आपका पार्सल रुका है। 24 घंटे में अपना पता अपडेट करें अन्यथा पार्सल वापस भेज दिया जाएगा: http://indiapost-update.xyz/reschedule"',
  },
];

// Localized helper to get localized educational articles
export function getLocalizedEducationalArticles(lang: SupportedLanguage): EducationalArticle[] {
  if (lang === 'Hindi') {
    return HINDI_ARTICLES;
  }
  if (lang === 'Kannada') {
    return HINDI_ARTICLES.map((art, idx) => ({
      ...art,
      title: [
        'ನಕಲಿ ಬ್ಯಾಂಕ್ ಮತ್ತು KYC ಅಪ್‌ಡೇಟ್ ವಂಚನೆ',
        'UPI ಕಲೆಕ್ಟ್ ಮತ್ತು "ಹಣ ಪಡೆಯಲು PIN ಹಾಕಿ" ವಂಚನೆ',
        'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಮತ್ತು ನಕಲಿ ಪೊಲೀಸ್ ವಿಡಿಯೋ ಕಾಲ್ ಬೆದರಿಕೆ',
        'ವಿದ್ಯುತ್ ಬಿಲ್ ಬಾಕಿ ಮತ್ತು ವಿದ್ಯುತ್ ಕಡಿತದ ಸುಳ್ಳು ಬೆದರಿಕೆ',
        'ಮನೆಯಿಂದಲೇ ಕೆಲಸ ಮತ್ತು ಟೆಲಿಗ್ರಾಂ ಯೂಟ್ಯೂಬ್ ಲೈಕ್ ವಂಚನೆ',
        'ಇಂಡಿಯಾ ಪೋಸ್ಟ್ ಮತ್ತು ಕೊರಿಯರ್ ವಿಳಾಸ ತಿದ್ದುಪಡಿ ವಂಚನೆ',
      ][idx] || art.title,
      category: ['ಬ್ಯಾಂಕಿಂಗ್', 'ಡಿಜಿಟಲ್ ಪಾವತಿ', 'ಬೆದರಿಕೆ ಮತ್ತು ವಸೂಲಿ', 'ಸಾರ್ವಜನಿಕ ಸೇವೆಗಳು', 'ಉದ್ಯೋಗ', 'ನಕಲಿ ಅಧಿಕಾರಿ'][idx] || art.category,
      tag: ['ಅತ್ಯಂತ ಸಾಮಾನ್ಯ', 'ಭಾರೀ ಆರ್ಥಿಕ ನಷ್ಟ', 'ತೀವ್ರ ಮಾನಸಿಕ ಬೆದರಿಕೆ', 'ದೈನಂದಿನ ಅಪಾಯ', 'ಯುವಕರಿಗೆ ಬಲೆ', 'ವೇಗವಾಗಿ ಹರಡುತ್ತಿರುವ ಸ್ಕ್ಯಾಮ್'][idx] || art.tag,
      quickSummary: [
        'ಖಾತೆ 2 ಗಂಟೆಗಳಲ್ಲಿ ರದ್ದಾಗುತ್ತದೆ ಎಂದು ನಕಲಿ SMS ಕಳುಹಿಸಿ ಬ್ಯಾಂಕಿಂಗ್ ಪಾಸ್‌ವರ್ಡ್ ಕದಿಯುವ ಜಾಲ.',
        'ಹಣ ಪಡೆಯಲು PIN ಹಾಕಬೇಕು ಎಂದು ಸುಳ್ಳು ಹೇಳಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯಿಂದಲೇ ಹಣ ಕಡಿತ ಮಾಡುವ ತಂತ್ರ.',
        'ನಾರ್ಕೋಟಿಕ್ಸ್ ಅಥವಾ ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ಎಂದು ಹೆದರಿಸಿ ವಿಡಿಯೋ ಕಾಲ್‌ನಲ್ಲಿ ಕೂಡಿಹಾಕಿ ಹಣ ದೋಚುವ ಕ್ರಿಮಿನಲ್ ಜಾಲ.',
        'ಇಂದು ರಾತ್ರಿ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸಲಾಗುವುದು ಎಂದು ಹೆದರಿಸಿ ಮೊಬೈಲ್‌ನಲ್ಲಿ ನಕಲಿ APK ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿಸುವ ವಂಚನೆ.',
        'ಯೂಟ್ಯೂಬ್ ವಿಡಿಯೋ ಲೈಕ್ ಮಾಡಿ ದಿನಕ್ಕೆ ₹5,000 ಗಳಿಸಿ ಎಂದು ನಂಬಿಸಿ ಹಂತ ಹಂತವಾಗಿ ಹಣ ಪೀಕುವ ದಂಧೆ.',
        'ಪಾರ್ಸೆಲ್ ವಿಳಾಸ ತಪ್ಪಾಗಿದೆ, ಸರಿಪಡಿಸಲು ₹25 ಪಾವತಿಸಿ ಎಂದು ನಕಲಿ ಲಿಂಕ್ ಮೂಲಕ ಕಾರ್ಡ್ ವಿವರ ಕದಿಯುವ ತಂತ್ರ.',
      ][idx] || art.quickSummary,
    }));
  }
  if (lang === 'Tamil') {
    return HINDI_ARTICLES.map((art, idx) => ({
      ...art,
      title: [
        'போலி வங்கி மற்றும் KYC புதுப்பித்தல் மோசடி',
        'UPI கலெக்ட் மற்றும் "பணம் பெற பின் போடவும்" மோசடி',
        'டிஜிட்டல் அரெஸ்ட் மற்றும் போலி போலீஸ் வீடியோ கால் மிரட்டல்',
        'மின்சார துண்டிப்பு மற்றும் போலி மின் கட்டண எச்சரிக்கை',
        'வீட்டிலிருந்தே வேலை மற்றும் டெலிகிராம் யூடியூப் லைக் மோசடி',
        'இந்தியா போஸ்ட் பார்சல் முகவரி மாற்றம் மோசடி',
      ][idx] || art.title,
      category: ['வங்கி', 'டிஜிட்டல் பணம்', 'மிரட்டல் & பறிப்பு', 'மின்சாரம்', 'வேலைவாய்ப்பு', 'போலி அதிகாரிகள்'][idx] || art.category,
      tag: ['மிகவும் பொதுவானது', 'அதிக பண இழப்பு', 'கடுமையான அச்சுறுத்தல்', 'தினசரி ஆபத்து', 'இளைஞர்களுக்கான பொறி', 'வேகமாக பரவும் மோசடி'][idx] || art.tag,
    }));
  }
  if (lang === 'Telugu') {
    return HINDI_ARTICLES.map((art, idx) => ({
      ...art,
      title: [
        'నకిలీ బ్యాంక్ మరియు KYC అప్‌డేట్ మోసం',
        'UPI కలెక్ట్ మరియు "డబ్బులు రావడానికి పిన్ నొక్కండి" మోసం',
        'డిజిటల్ అరెస్ట్ మరియు పోలీస్ వీడియో కాల్ బెదిరింపులు',
        'విద్యుత్ సరఫరా నిలిపివేత నకిలీ హెచ్చరికలు',
        'వర్క్ ఫ్రమ్ హోమ్ మరియు టెలిగ్రామ్ యూట్యూబ్ లైక్ మోసం',
        'ఇండియా పోస్ట్ పార్శిల్ చిరునామా అప్‌డేట్ మోసం',
      ][idx] || art.title,
      category: ['బ్యాంకింగ్', 'డిజిటల్ చెల్లింపులు', 'బెదిరింపులు', 'యుటిలిటీస్', 'ఉద్యోగాలు', 'నకిలీ అధికారులు'][idx] || art.category,
      tag: ['చాలా సాధారణం', 'భారీ ఆర్థిక నష్టం', 'తీవ్రమైన బెదిరింపు', 'నిత్య ప్రమాదం', 'యువతకు వల', 'వేగంగా విస్తరిస్తున్న మోసం'][idx] || art.tag,
    }));
  }
  if (lang === 'Malayalam') {
    return HINDI_ARTICLES.map((art, idx) => ({
      ...art,
      title: [
        'വ്യാജ ബാങ്ക്, KYC അപ്‌ഡേറ്റ് തട്ടിപ്പ്',
        'UPI കളക്ട്, "പണം ലഭിക്കാൻ പിൻ നൽകുക" തട്ടിപ്പ്',
        'ഡിജിറ്റൽ അറസ്റ്റ്, വ്യാജ പോലീസ് വീഡിയോ കോൾ ഭീഷണി',
        'വൈദ്യുതി ബിൽ കുടിശ്ശിക വ്യാജ മുന്നറിയിപ്പ്',
        'വർക്ക് ഫ്രം ഹോം യൂട്യൂബ് ലൈക്ക് ജോലി തട്ടിപ്പ്',
        'ഇന്ത്യ പോസ്റ്റ് പാഴ്സൽ അഡ്രസ് വ്യാജ തട്ടിപ്പ്',
      ][idx] || art.title,
      category: ['ബാങ്കിംഗ്', 'ഡിജിറ്റൽ പെയ്മെന്റ്', 'ഭീഷണി', 'സേവനങ്ങൾ', 'തൊഴിൽ', 'വ്യാജ ഉദ്യോഗസ്ഥർ'][idx] || art.category,
    }));
  }
  if (lang === 'Marathi') {
    return HINDI_ARTICLES.map((art, idx) => ({
      ...art,
      title: [
        'बनावट बँक व केवायसी (KYC) अपडेट फसवणूक',
        'UPI कलेक्ट आणि "पैसे मिळण्यासाठी पिन टाका" फसवणूक',
        'डिजिटल अरेस्ट आणि पोलीस/CBI व्हिडिओ कॉल खंडणी',
        'वीज बिल थकबाकी व वीज तोडण्याची बनावट धमकी',
        'वर्क-फ्रॉम-होम आणि टेलिग्राम यूट्यूब लाइक नोकरी घोटाळा',
        'इंडिया पोस्ट व कुरिअर पार्सल पत्ता अपडेट घोटाळा',
      ][idx] || art.title,
      category: ['बँकिंग', 'डिजिटल पेमेंट्स', 'धमकावणे व खंडणी', 'सार्वजनिक सेवा', 'रोजगार', 'बनावट अधिकारी'][idx] || art.category,
    }));
  }
  if (lang === 'Bengali') {
    return HINDI_ARTICLES.map((art, idx) => ({
      ...art,
      title: [
        'ভুয়ো ব্যাংক ও কেওয়াইসি (KYC) আপডেট প্রতারণা',
        'UPI কালেক্ট এবং "টাকা পেতে পিন দিন" প্রতারণা',
        'ডিজিটাল অ্যারেস্ট ও ভুয়ো পুলিশ ভিডিও কল হুমকি',
        'বিদ্যুৎ বিল বকেয়া ও লাইন কাটার মিথ্যা হুমকি',
        'ঘরে বসে কাজ ও টেলিগ্রাম ইউটিউব লাইক চাকরি ফাঁদ',
        'ইন্ডিয়া পোস্ট পার্সেল ঠিকানা সংশোধন প্রতারণা',
      ][idx] || art.title,
      category: ['ব্যাংকিং', 'ডিজিটাল পেমেন্ট', 'হুমকি ও তোলাবাজি', 'বিদ্যুৎ পরিষেবা', 'চাকরি', 'ভুয়ো পরিচয়'][idx] || art.category,
    }));
  }

  return ENGLISH_ARTICLES;
}

export const EDUCATIONAL_ARTICLES: EducationalArticle[] = ENGLISH_ARTICLES;
