import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { analyzeContentWithGemini } from './src/server/services/geminiService.ts';
import { DEMO_EXAMPLES, getLocalizedDemoExamples } from './src/server/data/demoExamples.ts';
import { EDUCATIONAL_ARTICLES, getLocalizedEducationalArticles } from './src/server/data/educationalContent.ts';
import { SupportedLanguage } from './src/types.ts';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON with support for base64 image uploads
  app.use(express.json({ limit: '25mb' }));

  // API Route: Health check
  app.get('/api/health', (req: Request, res: Response) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
    res.json({
      status: 'ok',
      service: 'Rakshak Scam Detection Engine',
      aiConfigured: hasKey,
      model: 'gemini-3.1-flash-lite',
      fallbackAvailable: true,
      timestamp: new Date().toISOString(),
    });
  });

  // API Route: Get scam types and categories
  app.get('/api/scam-types', (req: Request, res: Response) => {
    const categories = [
      'Bank / KYC Scam',
      'UPI / Payment Scam',
      'Courier / Parcel Scam',
      'Job / Work-from-Home Scam',
      'Electricity / Utility Bill Scam',
      'Digital Arrest / Police Impersonation',
      'Investment / Crypto Scam',
      'Instant Loan Scam',
      'Customer Care Impersonation',
      'Phishing Link / Malicious APK',
      'Lottery / Prize Scam',
      'SIM / FASTag Deactivation',
      'Legitimate / Safe Notification',
      'Unknown / Other',
    ];
    res.json({ categories });
  });

  // API Route: Get curated demo examples
  app.get('/api/examples', (req: Request, res: Response) => {
    const lang = (req.query.lang as SupportedLanguage) || 'English';
    res.json({ examples: getLocalizedDemoExamples(lang) });
  });

  // API Route: Get educational scam awareness articles
  app.get('/api/learn', (req: Request, res: Response) => {
    const lang = (req.query.lang as SupportedLanguage) || 'English';
    res.json({ articles: getLocalizedEducationalArticles(lang) });
  });

  // API Route: Analyze text message
  app.post('/api/analyze/text', async (req: Request, res: Response) => {
    try {
      const { content, language = 'English' } = req.body;
      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        return res.status(400).json({ error: 'Please enter or paste a message to analyze.' });
      }

      const result = await analyzeContentWithGemini({
        content: content.trim(),
        inputType: 'text',
        language: language as SupportedLanguage,
      });

      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/analyze/text:', err);
      res.status(500).json({ error: 'Unable to analyze message at this moment. Please try again.' });
    }
  });

  // API Route: Analyze screenshot image
  app.post('/api/analyze/image', async (req: Request, res: Response) => {
    try {
      const { imageBase64, imageMimeType = 'image/jpeg', language = 'English', manualText } = req.body;
      if (!imageBase64 && !manualText) {
        return res.status(400).json({ error: 'Please upload an image screenshot to analyze.' });
      }

      const result = await analyzeContentWithGemini({
        content: manualText || '',
        inputType: 'image',
        language: language as SupportedLanguage,
        imageBase64,
        imageMimeType,
      });

      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/analyze/image:', err);
      res.status(500).json({ error: 'Unable to process image. Please try uploading a clear image format.' });
    }
  });

  // API Route: Check suspicious URL
  app.post('/api/analyze/url', async (req: Request, res: Response) => {
    try {
      const { url, language = 'English' } = req.body;
      if (!url || typeof url !== 'string' || url.trim().length === 0) {
        return res.status(400).json({ error: 'Please enter a valid website link (URL).' });
      }

      const result = await analyzeContentWithGemini({
        content: url.trim(),
        inputType: 'url',
        language: language as SupportedLanguage,
      });

      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/analyze/url:', err);
      res.status(500).json({ error: 'Unable to inspect the provided URL.' });
    }
  });

  // API Route: Voice transcript analysis
  app.post('/api/analyze/voice', async (req: Request, res: Response) => {
    try {
      const { transcript, language = 'English' } = req.body;
      if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
        return res.status(400).json({ error: 'No speech transcript received.' });
      }

      const result = await analyzeContentWithGemini({
        content: transcript.trim(),
        inputType: 'voice',
        language: language as SupportedLanguage,
      });

      res.json(result);
    } catch (err: any) {
      console.error('Error in /api/analyze/voice:', err);
      res.status(500).json({ error: 'Unable to analyze speech recording.' });
    }
  });

  // API Route: User feedback
  app.post('/api/feedback', (req: Request, res: Response) => {
    const { analysisId, helpful, comments } = req.body;
    // Log safe telemetry without recording sensitive text
    console.log(`[Feedback] ID: ${analysisId}, Helpful: ${helpful}, Notes: ${comments || 'None'}`);
    res.json({ success: true, message: 'Thank you for helping keep Indian citizens safe!' });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🛡️ Rakshak Scam Detection server running at http://localhost:${PORT}`);
  });
}

startServer();
