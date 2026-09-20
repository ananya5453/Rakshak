export type ScamVerdict = 'SAFE' | 'SUSPICIOUS' | 'SCAM';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type ScamCategory =
  | 'Bank / KYC Scam'
  | 'UPI / Payment Scam'
  | 'Courier / Parcel Scam'
  | 'Job / Work-from-Home Scam'
  | 'Electricity / Utility Bill Scam'
  | 'Digital Arrest / Police Impersonation'
  | 'Investment / Crypto Scam'
  | 'Instant Loan Scam'
  | 'Customer Care Impersonation'
  | 'Phishing Link / Malicious APK'
  | 'Lottery / Prize Scam'
  | 'SIM / FASTag Deactivation'
  | 'Legitimate / Safe Notification'
  | 'Unknown / Other';

export type SupportedLanguage =
  | 'English'
  | 'Hindi'
  | 'Kannada'
  | 'Tamil'
  | 'Telugu'
  | 'Malayalam'
  | 'Marathi'
  | 'Bengali';

export interface RedFlag {
  id: string;
  text: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  category: 'urgency' | 'link' | 'sensitive_data' | 'impersonation' | 'money_request' | 'threat' | 'apk';
}

export interface SimulationStep {
  step: number;
  title: string;
  description: string;
  stage: 'trigger' | 'trap' | 'exploitation' | 'consequence';
}

export interface UrlAnalysis {
  url: string;
  domain: string;
  isHttps: boolean;
  hasSuspiciousTld: boolean;
  isShortened: boolean;
  isIpAddress: boolean;
  brandMismatch: boolean;
  claimedBrand?: string;
  notes: string[];
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  inputType: 'text' | 'image' | 'url' | 'voice';
  verdict: ScamVerdict;
  riskLevel: RiskLevel;
  riskScore: number; // 0 to 100
  confidence: number; // e.g. 0.92
  scamType: ScamCategory;
  summary: string;
  elderlyExplanation: string;
  originalContent: string;
  extractedOcrText?: string;
  imageUrl?: string;
  submittedUrl?: string;
  redFlags: RedFlag[];
  likelyGoal: string;
  scammerTactics: string[];
  scenarioFlow: SimulationStep[];
  recommendedActions: {
    doThis: string[];
    dontDoThis: string[];
  };
  emergencyGuidance?: {
    cyberHelpline: string;
    nationalPortal: string;
    immediateSteps: string[];
  };
  urlAnalysis?: UrlAnalysis;
  language: SupportedLanguage;
  factors: {
    factor: string;
    points: number;
    description: string;
  }[];
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  inputType: 'text' | 'image' | 'url' | 'voice';
  previewText: string;
  verdict: ScamVerdict;
  riskLevel: RiskLevel;
  riskScore: number;
  scamType: ScamCategory;
  result: AnalysisResult;
}

export interface EducationalArticle {
  id: string;
  title: string;
  category: string;
  iconName: string;
  tag: string;
  quickSummary: string;
  howItWorks: string[];
  warningSigns: string[];
  whatTheyAskFor: string[];
  howToProtect: string[];
  whatToDoIfTrapped: string[];
  realExample: string;
}

export interface DemoExample {
  id: string;
  title: string;
  category: ScamCategory;
  inputType: 'text' | 'url' | 'image';
  snippet: string;
  content: string;
  language: SupportedLanguage;
  senderLabel: string;
  expectedVerdict: ScamVerdict;
}

export type DemoScenario = DemoExample;
