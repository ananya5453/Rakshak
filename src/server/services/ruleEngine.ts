import { RedFlag, ScamCategory, ScamVerdict, SimulationStep } from '../../types.ts';
import { analyzeUrl } from './urlAnalyzer.ts';

export interface HeuristicAnalysis {
  verdict: ScamVerdict;
  riskScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence: number;
  scamType: ScamCategory;
  summary: string;
  elderlyExplanation: string;
  redFlags: RedFlag[];
  likelyGoal: string;
  scammerTactics: string[];
  scenarioFlow: SimulationStep[];
  factors: { factor: string; points: number; description: string }[];
  recommendedActions: {
    doThis: string[];
    dontDoThis: string[];
  };
}

export function evaluateHeuristics(content: string, urlCandidate?: string): HeuristicAnalysis {
  const text = (content + ' ' + (urlCandidate || '')).toLowerCase();
  const redFlags: RedFlag[] = [];
  const factors: { factor: string; points: number; description: string }[] = [];
  let score = 5; // Baseline low risk for unknown normal input

  // Check 1: Threats and Fake Deadlines (Urgency)
  const urgencyPatterns = [
    { regex: /(blocked|deactivated|suspended|closed) (today|immediately|within \d+ hours?|tonight)/i, label: 'Immediate threat of account block', points: 28 },
    { regex: /power supply will be disconnected|electricity (will be |)disconnected/i, label: 'Threat of power/utility disconnection', points: 30 },
    { regex: /urgent|immediately|act now|last warning|final notice/i, label: 'Artificial urgency pressure tactic', points: 15 },
    { regex: /digital arrest|cbi|police notice|customs parcel seizure|narcotics/i, label: 'Law enforcement intimidation (Digital Arrest scam)', points: 35 }
  ];

  for (const p of urgencyPatterns) {
    const match = content.match(p.regex);
    if (match) {
      score += p.points;
      redFlags.push({
        id: `urgency-${Date.now()}-${Math.random()}`,
        text: match[0],
        reason: p.label,
        severity: p.points > 25 ? 'high' : 'medium',
        category: 'urgency'
      });
      factors.push({
        factor: 'Urgency / Intimidation',
        points: p.points,
        description: p.label
      });
      break;
    }
  }

  // Check 2: KYC & Banking Traps
  const kycPatterns = [
    { regex: /(complete|update|submit|verify) (your |)kyc/i, label: 'Unsolicited request to update or verify KYC', points: 25 },
    { regex: /(pan card|aadhaar) (will be |is |)blocked|link pan with aadhaar/i, label: 'False claim that PAN/Aadhaar is deactivated', points: 25 },
    { regex: /sbi|hdfc|icici|axis|pnb|canara|bank of baroda|kotak/i, label: 'Claims to represent a major Indian commercial bank', points: 10 }
  ];

  let isKycOrBank = false;
  for (const p of kycPatterns) {
    const match = content.match(p.regex);
    if (match) {
      isKycOrBank = true;
      score += p.points;
      redFlags.push({
        id: `kyc-${Date.now()}-${Math.random()}`,
        text: match[0],
        reason: p.label,
        severity: p.points > 20 ? 'high' : 'medium',
        category: 'sensitive_data'
      });
      factors.push({
        factor: 'Banking & KYC Manipulation',
        points: p.points,
        description: p.label
      });
    }
  }

  // Check 3: Sensitive Credentials (OTP, PIN, Password)
  const credentialPatterns = [
    { regex: /share (your |the |)otp|send otp|provide (the |)otp|tell me otp/i, label: 'Demanding One-Time Password (OTP)', points: 35 },
    { regex: /enter (your |)upi pin to (receive|credit|accept)|upi pin/i, label: 'Misleading claim that UPI PIN is needed to receive money', points: 35 },
    { regex: /cvv|atm pin|netbanking password/i, label: 'Request for highly sensitive banking security keys', points: 30 }
  ];

  for (const p of credentialPatterns) {
    const match = content.match(p.regex);
    if (match) {
      score += p.points;
      redFlags.push({
        id: `cred-${Date.now()}-${Math.random()}`,
        text: match[0],
        reason: p.label,
        severity: 'high',
        category: 'sensitive_data'
      });
      factors.push({
        factor: 'Sensitive Credential Theft Risk',
        points: p.points,
        description: p.label
      });
    }
  }

  // Check 4: Courier / Parcel scams
  const parcelPatterns = [
    { regex: /parcel (is |)held|package (cannot be |failed to be )delivered|incomplete address/i, label: 'Fake undelivered courier / parcel alert', points: 28 },
    { regex: /pay ₹?\s*(5|10|15|20|25|50|100) (update|redelivery|handling|clearance) fee/i, label: 'Micro-fee trick to siphon debit/credit card details', points: 30 },
    { regex: /india post|speed post|bluedart|delhivery|dtdc/i, label: 'Impersonation of postal or courier service', points: 10 }
  ];

  let isCourier = false;
  for (const p of parcelPatterns) {
    const match = content.match(p.regex);
    if (match) {
      isCourier = true;
      score += p.points;
      redFlags.push({
        id: `courier-${Date.now()}-${Math.random()}`,
        text: match[0],
        reason: p.label,
        severity: 'high',
        category: 'money_request'
      });
      factors.push({
        factor: 'Courier / Delivery Pretext',
        points: p.points,
        description: p.label
      });
    }
  }

  // Check 5: Job & Task Scams
  const jobPatterns = [
    { regex: /work from home|part[- ]time job|earn (₹|rs\.?)\s*\d+[,0-9]*\s*(daily|per day|hourly)/i, label: 'Unrealistic work-from-home earnings promise', points: 25 },
    { regex: /like (youtube |)videos|telegram task|registration fee ₹?\s*\d+/i, label: 'Task-based commission scam or upfront registration fee', points: 30 }
  ];

  let isJob = false;
  for (const p of jobPatterns) {
    const match = content.match(p.regex);
    if (match) {
      isJob = true;
      score += p.points;
      redFlags.push({
        id: `job-${Date.now()}-${Math.random()}`,
        text: match[0],
        reason: p.label,
        severity: 'high',
        category: 'money_request'
      });
      factors.push({
        factor: 'Fake Employment / Task Scheme',
        points: p.points,
        description: p.label
      });
    }
  }

  // Check 6: Remote Access & APKs
  const apkPatterns = [
    { regex: /\.apk|download app|install apk|install anydesk|teamviewer|rustdesk|quicksupport/i, label: 'Attempt to install remote access tool or untrusted APK file', points: 35 }
  ];
  for (const p of apkPatterns) {
    const match = content.match(p.regex);
    if (match) {
      score += p.points;
      redFlags.push({
        id: `apk-${Date.now()}-${Math.random()}`,
        text: match[0],
        reason: p.label,
        severity: 'high',
        category: 'apk'
      });
      factors.push({
        factor: 'Malware / Remote Screen Control Risk',
        points: p.points,
        description: p.label
      });
    }
  }

  // Check 7: URLs present in content
  const foundUrls = content.match(/https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.(?:xyz|top|site|click|live|work|link|online|club)[^\s]*/gi);
  if (foundUrls && foundUrls.length > 0) {
    for (const u of foundUrls) {
      const urlInfo = analyzeUrl(u, content);
      if (urlInfo.brandMismatch) {
        score += 30;
        redFlags.push({
          id: `url-mismatch-${Date.now()}`,
          text: u,
          reason: `Brand / domain mismatch: The domain does not belong to the official entity referenced.`,
          severity: 'high',
          category: 'link'
        });
        factors.push({
          factor: 'Deceptive Domain Link',
          points: 30,
          description: urlInfo.notes[0] || 'Brand domain mismatch'
        });
      } else if (urlInfo.hasSuspiciousTld || urlInfo.isShortened || urlInfo.isIpAddress) {
        score += 20;
        redFlags.push({
          id: `url-risky-${Date.now()}`,
          text: u,
          reason: urlInfo.notes[0] || 'Suspicious or shortened destination link',
          severity: 'medium',
          category: 'link'
        });
        factors.push({
          factor: 'Suspicious / Shortened Link',
          points: 20,
          description: 'Uses an obscured or low-reputation web address'
        });
      }
    }
  }

  // Detect legitimate indicators to balance false positives
  const safePatterns = [
    /this otp is valid for|do not share this otp with anyone|never share your upi pin|sent from your bank's official number/i,
    /transaction of inr \d+ was made on your card ending in \d{4}/i,
    /official communication from rbi/i
  ];
  let isInformationalOtp = false;
  if (!text.includes('click here') && !text.includes('update') && !text.includes('blocked') && !text.includes('http')) {
    for (const sp of safePatterns) {
      if (content.match(sp)) {
        isInformationalOtp = true;
        score = Math.max(5, score - 25);
        break;
      }
    }
  }

  // Cap score between 5 and 98 (Never 100% certainty)
  const finalScore = Math.min(96, Math.max(5, score));

  // Determine Verdict & Risk Level
  let verdict: ScamVerdict = 'SAFE';
  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';

  if (finalScore >= 66) {
    verdict = 'SCAM';
    riskLevel = 'HIGH';
  } else if (finalScore >= 31) {
    verdict = 'SUSPICIOUS';
    riskLevel = 'MEDIUM';
  } else {
    verdict = 'SAFE';
    riskLevel = 'LOW';
  }

  // Determine Scam Category
  let scamType: ScamCategory = 'Unknown / Other';
  if (text.includes('electricity') || text.includes('bescom') || text.includes('power supply')) {
    scamType = 'Electricity / Utility Bill Scam';
  } else if (text.includes('digital arrest') || text.includes('cbi') || text.includes('police')) {
    scamType = 'Digital Arrest / Police Impersonation';
  } else if (isCourier || text.includes('parcel') || text.includes('speed post')) {
    scamType = 'Courier / Parcel Scam';
  } else if (isJob || text.includes('telegram task') || text.includes('part-time job')) {
    scamType = 'Job / Work-from-Home Scam';
  } else if (text.includes('upi') || text.includes('gpay') || text.includes('phonepe') || text.includes('enter upi pin')) {
    scamType = 'UPI / Payment Scam';
  } else if (isKycOrBank || text.includes('sbi') || text.includes('kyc') || text.includes('pan')) {
    scamType = 'Bank / KYC Scam';
  } else if (text.includes('.apk') || text.includes('download')) {
    scamType = 'Phishing Link / Malicious APK';
  } else if (text.includes('lottery') || text.includes('won') || text.includes('prize')) {
    scamType = 'Lottery / Prize Scam';
  } else if (isInformationalOtp || verdict === 'SAFE') {
    scamType = 'Legitimate / Safe Notification';
  }

  // Goals and tactics
  let likelyGoal = 'Gather information or assess your responsiveness.';
  const scammerTactics: string[] = [];

  if (verdict === 'SCAM') {
    if (scamType === 'Bank / KYC Scam') {
      likelyGoal = 'Steal your netbanking credentials, debit card number, and OTP to drain your bank account.';
      scammerTactics.push('Fabricates urgent panic that your bank account will be blocked today.');
      scammerTactics.push('Directs you to a fake phishing website mimicking your bank.');
      scammerTactics.push('Prompts you to enter your User ID, password, and OTP.');
    } else if (scamType === 'Electricity / Utility Bill Scam') {
      likelyGoal = 'Trick you into making a small payment or downloading a screen-sharing app to take over your phone.';
      scammerTactics.push('Threatens imminent power disconnection tonight at a specific hour.');
      scammerTactics.push('Provides a fake officer phone number or fraudulent APK link.');
      scammerTactics.push('Instructs you to pay a nominal fee through an unverified portal to capture credentials.');
    } else if (scamType === 'Courier / Parcel Scam') {
      likelyGoal = 'Harvest your debit/credit card details and OTP disguised as a ₹25 address redelivery fee.';
      scammerTactics.push('Claims an undelivered parcel has incomplete address information.');
      scammerTactics.push('Demands a nominal payment of ₹25 or ₹50 to trick you into entering card information.');
      scammerTactics.push('Submits an unauthorized transaction using the card details and intercepted OTP.');
    } else if (scamType === 'Job / Work-from-Home Scam') {
      likelyGoal = 'Trap you in an advance-fee cycle where you pay "registration" or "security deposits" you will never recover.';
      scammerTactics.push('Promises exorbitant pay (₹3,000–₹5,000 daily) for effortless tasks like liking videos.');
      scammerTactics.push('Adds you to a manipulated Telegram group with fake testimonials.');
      scammerTactics.push('Demands fees for "upgrading VIP accounts" or "clearing locked earnings".');
    } else if (scamType === 'Digital Arrest / Police Impersonation') {
      likelyGoal = 'Extort large sums of money by threatening false criminal charges or immediate arrest.';
      scammerTactics.push('Claims illegal narcotics or passports were found in a courier sent in your name.');
      scammerTactics.push('Presents counterfeit police badges, FIR copies, or video calls in fake police station backdrops.');
      scammerTactics.push('Demands you transfer funds to a "government verification account".');
    } else {
      likelyGoal = 'Gain unauthorized access to your funds or sensitive identity documents.';
      scammerTactics.push('Uses psychological manipulation and urgency.');
      scammerTactics.push('Directs you away from official, verified customer service channels.');
    }
  } else if (verdict === 'SUSPICIOUS') {
    likelyGoal = 'Unverified sender attempting to prompt you to click a link or reply with contact details.';
    scammerTactics.push('Unverified sender identity.');
    scammerTactics.push('Includes external links or requests personal details.');
  } else {
    likelyGoal = 'Normal informational notification or standard transaction record.';
    scammerTactics.push('Standard banking or service format without pressure tactics.');
  }

  // Visual Scenario Flowchart
  const scenarioFlow: SimulationStep[] = [
    {
      step: 1,
      title: 'Suspicious Message Received',
      description: 'You receive an urgent message creating panic or offering an enticing prize.',
      stage: 'trigger'
    },
    {
      step: 2,
      title: 'Deceptive Link or Call',
      description: 'The sender prompts you to click a link, call a fake number, or download an APK.',
      stage: 'trap'
    },
    {
      step: 3,
      title: 'Credential or Payment Request',
      description: 'A fraudulent page asks for your bank password, OTP, UPI PIN, or a small fee.',
      stage: 'exploitation'
    },
    {
      step: 4,
      title: 'Potential Financial Loss',
      description: 'The scammer accesses your accounts or initiates unauthorized transfers.',
      stage: 'consequence'
    }
  ];

  // Action recommendations
  const doThis = [
    'Verify independently: Open your official bank app or official website directly.',
    'Check official contact numbers printed on the back of your debit card or official bill.',
    'If in doubt, call the National Cyber Crime Helpline at 1930 immediately.',
    'Delete or block the suspicious sender number or email.'
  ];

  const dontDoThis = [
    'Do NOT click any link in the message or download any attached .apk files.',
    'Do NOT share your OTP, UPI PIN, ATM PIN, CVV, or passwords under any circumstances.',
    'Do NOT call the phone number provided inside the message.',
    'Do NOT install screen-sharing software (like AnyDesk, TeamViewer, or QuickSupport).',
    'Do NOT transfer money under urgent pressure from an unknown person.'
  ];

  // Plain-language elderly summary
  let elderlyExplanation = '';
  if (verdict === 'SCAM') {
    elderlyExplanation =
      '⚠️ Warning: This looks like a trap. Someone is pretending to be an official authority or bank to trick you into giving away your money or secret passwords. Please do not touch any link or answer them.';
  } else if (verdict === 'SUSPICIOUS') {
    elderlyExplanation =
      '⚠️ Caution: We are not sure this is safe. The message has signs that require caution. Do not click links or send any money until you talk to a family member or call your official bank branch.';
  } else {
    elderlyExplanation =
      '✅ This message appears to be a standard notification. Remember: Even for safe messages, never share secret OTPs or bank passwords with anyone over the phone.';
  }

  const summary =
    verdict === 'SCAM'
      ? 'This message shows several strong characteristics commonly associated with scams in India, including high artificial urgency and credential requests.'
      : verdict === 'SUSPICIOUS'
      ? 'This message shows warning signs that warrant high caution before taking any action or clicking links.'
      : 'This communication does not show common red flags of known scam templates, though general safety precautions still apply.';

  return {
    verdict,
    riskScore: finalScore,
    riskLevel,
    confidence: verdict === 'SCAM' ? 0.92 : verdict === 'SUSPICIOUS' ? 0.74 : 0.88,
    scamType,
    summary,
    elderlyExplanation,
    redFlags,
    likelyGoal,
    scammerTactics,
    scenarioFlow,
    factors,
    recommendedActions: {
      doThis,
      dontDoThis
    }
  };
}
