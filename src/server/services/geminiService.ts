import { GoogleGenAI, Type } from '@google/genai';
import { AnalysisResult, SupportedLanguage } from '../../types.ts';
import { evaluateHeuristics } from './ruleEngine.ts';
import { analyzeUrl } from './urlAnalyzer.ts';
import { redactSensitiveData } from './redactService.ts';

let aiInstance: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiInstance;
}

export async function analyzeContentWithGemini(params: {
  content: string;
  inputType: 'text' | 'image' | 'url' | 'voice';
  language: SupportedLanguage;
  imageBase64?: string;
  imageMimeType?: string;
}): Promise<AnalysisResult> {
  const { content, inputType, language, imageBase64, imageMimeType } = params;

  // First, sanitize the content from sensitive private data
  const sanitizedContent = redactSensitiveData(content);

  // Extract URL if present
  let urlAnalysisResult;
  const urlMatch = sanitizedContent.match(/https?:\/\/[^\s]+|[a-zA-Z0-9-]+\.(?:xyz|top|site|click|live|work|link|online|club|com|in|co\.in)[^\s]*/i);
  if (urlMatch || inputType === 'url') {
    const rawUrl = inputType === 'url' ? sanitizedContent : urlMatch ? urlMatch[0] : '';
    if (rawUrl) {
      urlAnalysisResult = analyzeUrl(rawUrl, sanitizedContent);
    }
  }

  const ai = getAiClient();

  // If Gemini client is available, perform deep multimodal / reasoning analysis
  if (ai) {
    const CANDIDATE_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
    const systemInstruction = `You are Rakshak AI, an elite cybersecurity scam detection expert and digital consumer safety investigator specializing in Indian cyber frauds (UPI scams, fake KYC, electricity disconnection, digital arrest, courier parcels, APK malware, job tasks).
Analyze the provided user submission (which may be text, a screenshot, a URL, or a spoken query).
IMPORTANT GUIDELINES:
1. Return exactly one verdict: 'SAFE', 'SUSPICIOUS', or 'SCAM'.
2. DO NOT claim 100% certainty. Use probabilistic, objective language (e.g. "This message shows several characteristics commonly associated with scams").
3. Assign riskLevel: 'LOW', 'MEDIUM', or 'HIGH'.
4. Calculate a riskScore from 0 to 100 (0-30 SAFE, 31-65 SUSPICIOUS, 66-100 SCAM).
5. Extract exact red flags: quote the suspicious text snippet, explain the threat/pressure tactic, and categorize it (urgency, link, sensitive_data, impersonation, money_request, threat, or apk).
6. State the scammer's likely goal and tactics in clear, simple terms.
7. Outline a 4-step flowchart showing what happens if someone follows the instructions.
8. Provide actionable Do's and Don'ts.
9. For elderly users, write a warm, simple, jargon-free summary (elderlyExplanation).
10. All explanations, summaries, red flags, and action points MUST be delivered in the requested language: ${language}.
11. If the input is an image, perform full OCR on the text, extract every word into 'extractedOcrText', and analyze visual warning signs (e.g. counterfeit logos, forged seals, spelling mistakes, suspicious sender numbers).`;

    const promptText = `Analyze this ${inputType} submission for Indian cyber fraud:
${sanitizedContent ? `Submitted Text / Content: "${sanitizedContent}"` : 'Analyze the attached screenshot image and detect any scam patterns.'}
Preferred output language: ${language}.`;

    let contentsPayload: any;
    if (imageBase64) {
      contentsPayload = {
        parts: [
          {
            inlineData: {
              data: imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, ''),
              mimeType: imageMimeType || 'image/jpeg',
            },
          },
          {
            text: promptText,
          },
        ],
      };
    } else {
      contentsPayload = promptText;
    }

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        verdict: { type: Type.STRING, description: "'SAFE', 'SUSPICIOUS', or 'SCAM'" },
        riskLevel: { type: Type.STRING, description: "'LOW', 'MEDIUM', or 'HIGH'" },
        riskScore: { type: Type.INTEGER, description: 'Score between 0 and 100' },
        confidence: { type: Type.NUMBER, description: 'Confidence between 0.50 and 0.99' },
        scamType: { type: Type.STRING, description: 'Category of scam or legitimate notification' },
        summary: { type: Type.STRING, description: 'Clear professional summary in selected language' },
        elderlyExplanation: { type: Type.STRING, description: 'Very simple, jargon-free explanation for elderly users' },
        extractedOcrText: { type: Type.STRING, description: 'Text extracted from image via OCR, if applicable' },
        redFlags: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              reason: { type: Type.STRING },
              severity: { type: Type.STRING, description: "'low', 'medium', or 'high'" },
              category: { type: Type.STRING, description: "'urgency', 'link', 'sensitive_data', 'impersonation', 'money_request', 'threat', 'apk'" },
            },
            required: ['text', 'reason', 'severity', 'category'],
          },
        },
        likelyGoal: { type: Type.STRING, description: 'What the scammer is trying to achieve' },
        scammerTactics: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        scenarioFlow: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              step: { type: Type.INTEGER },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              stage: { type: Type.STRING, description: "'trigger', 'trap', 'exploitation', or 'consequence'" },
            },
            required: ['step', 'title', 'description', 'stage'],
          },
        },
        doThis: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        dontDoThis: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        factors: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              factor: { type: Type.STRING },
              points: { type: Type.INTEGER },
              description: { type: Type.STRING },
            },
            required: ['factor', 'points', 'description'],
          },
        },
      },
      required: [
        'verdict',
        'riskLevel',
        'riskScore',
        'confidence',
        'scamType',
        'summary',
        'elderlyExplanation',
        'redFlags',
        'likelyGoal',
        'scammerTactics',
        'scenarioFlow',
        'doThis',
        'dontDoThis',
        'factors',
      ],
    };

    // Iterate across candidate models with automatic failover
    for (const modelName of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contentsPayload,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema,
          },
        });

        const parsed = JSON.parse(response.text || '{}');

        // Normalize verdict to allowed enum
        let normalizedVerdict: 'SAFE' | 'SUSPICIOUS' | 'SCAM' = 'SUSPICIOUS';
        const rawVerdictUpper = String(parsed.verdict || '').toUpperCase();
        if (rawVerdictUpper.includes('SCAM') || rawVerdictUpper.includes('MALICIOUS')) {
          normalizedVerdict = 'SCAM';
        } else if (rawVerdictUpper.includes('SAFE') || rawVerdictUpper.includes('LEGITIMATE')) {
          normalizedVerdict = 'SAFE';
        }

        const resultId = `rakshak-${Date.now()}`;
        return {
          id: resultId,
          timestamp: new Date().toISOString(),
          inputType,
          verdict: normalizedVerdict,
          riskLevel: (['LOW', 'MEDIUM', 'HIGH'].includes(parsed.riskLevel) ? parsed.riskLevel : (normalizedVerdict === 'SCAM' ? 'HIGH' : normalizedVerdict === 'SAFE' ? 'LOW' : 'MEDIUM')) as any,
          riskScore: typeof parsed.riskScore === 'number' ? Math.min(98, Math.max(5, parsed.riskScore)) : (normalizedVerdict === 'SCAM' ? 88 : normalizedVerdict === 'SAFE' ? 12 : 55),
          confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.88,
          scamType: parsed.scamType || 'Unknown / Other',
          summary: parsed.summary || 'Analysis complete.',
          elderlyExplanation: parsed.elderlyExplanation || 'Please be careful with unverified messages.',
          originalContent: sanitizedContent || parsed.extractedOcrText || 'Image submission',
          extractedOcrText: parsed.extractedOcrText || (imageBase64 ? sanitizedContent : undefined),
          imageUrl: imageBase64 ? imageBase64.slice(0, 100) + '...' : undefined,
          submittedUrl: inputType === 'url' ? sanitizedContent : undefined,
          redFlags: (parsed.redFlags || []).map((rf: any, index: number) => ({
            id: `rf-${index}-${Date.now()}`,
            text: rf.text || '',
            reason: rf.reason || '',
            severity: rf.severity || 'high',
            category: rf.category || 'urgency',
          })),
          likelyGoal: parsed.likelyGoal || 'Attempting to induce urgent action.',
          scammerTactics: parsed.scammerTactics || ['Creates false urgency', 'Directs to unverified platforms'],
          scenarioFlow: (parsed.scenarioFlow || []).map((s: any, idx: number) => ({
            step: s.step || idx + 1,
            title: s.title || `Step ${idx + 1}`,
            description: s.description || '',
            stage: s.stage || 'trap',
          })),
          recommendedActions: {
            doThis: parsed.doThis || ['Verify through official app/portal.', 'Report incident to 1930.'],
            dontDoThis: parsed.dontDoThis || ['Do not share OTP.', 'Do not click untrusted links.'],
          },
          emergencyGuidance: {
            cyberHelpline: '1930',
            nationalPortal: 'https://cybercrime.gov.in',
            immediateSteps: [
              'Call 1930 (Citizen Financial Cyber Fraud Reporting System) immediately.',
              'Contact your bank / payment app helpline to freeze affected accounts or block UPI IDs.',
              'Change netbanking passwords and UPI PINs.',
              'Save transaction IDs, SMS records, and screenshots for legal evidence.',
            ],
          },
          urlAnalysis: urlAnalysisResult,
          language,
          factors: parsed.factors || [],
        };
      } catch (err: any) {
        // If the current model is overloaded (503/429), try the next candidate model
        continue;
      }
    }
  }

  // Graceful Fallback: Heuristic rule-based cyber intelligence engine
  const heuristic = evaluateHeuristics(sanitizedContent);
  const resultId = `rakshak-heur-${Date.now()}`;

  return {
    id: resultId,
    timestamp: new Date().toISOString(),
    inputType,
    verdict: heuristic.verdict,
    riskLevel: heuristic.riskLevel,
    riskScore: heuristic.riskScore,
    confidence: heuristic.confidence,
    scamType: heuristic.scamType,
    summary: heuristic.summary,
    elderlyExplanation: heuristic.elderlyExplanation,
    originalContent: sanitizedContent || 'Uploaded screenshot or query',
    extractedOcrText: inputType === 'image' ? (sanitizedContent || 'Image processed by Rakshak OCR pipeline.') : undefined,
    submittedUrl: inputType === 'url' ? sanitizedContent : undefined,
    redFlags: heuristic.redFlags,
    likelyGoal: heuristic.likelyGoal,
    scammerTactics: heuristic.scammerTactics,
    scenarioFlow: heuristic.scenarioFlow,
    recommendedActions: heuristic.recommendedActions,
    emergencyGuidance: {
      cyberHelpline: '1930',
      nationalPortal: 'https://cybercrime.gov.in',
      immediateSteps: [
        'Dial 1930 (National Cyber Crime Reporting Helpline) within golden hours.',
        'Inform your bank immediately to block your debit/credit card and freeze account debit transactions.',
        'Log in to your genuine netbanking portal from a safe device and change your login and transaction passwords.',
        'File a formal report on cybercrime.gov.in with screenshots, transaction UTR numbers, and sender details.',
      ],
    },
    urlAnalysis: urlAnalysisResult,
    language,
    factors: heuristic.factors,
  };
}
