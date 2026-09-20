import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { ScamChecker } from './components/ScamChecker.tsx';
import { ResultView } from './components/ResultView.tsx';
import { LearnPage } from './components/LearnPage.tsx';
import { HistoryPage } from './components/HistoryPage.tsx';
import { AboutModal } from './components/AboutModal.tsx';
import { EmergencyModal } from './components/EmergencyModal.tsx';
import { AnalysisResult, SupportedLanguage } from './types.ts';
import { TRANSLATIONS } from './utils/i18n.ts';
import { PhoneCall, Shield, HeartHandshake, ExternalLink, AlertTriangle } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'check' | 'learn' | 'history' | 'about'>('check');
  const [language, setLanguage] = useState<SupportedLanguage>('English');
  const [simpleMode, setSimpleMode] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);

  const [activeResult, setActiveResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Persistent browser local history
  const [history, setHistory] = useState<AnalysisResult[]>(() => {
    try {
      const saved = localStorage.getItem('rakshak_checks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save history on change
  useEffect(() => {
    try {
      localStorage.setItem('rakshak_checks', JSON.stringify(history));
    } catch (e) {
      console.error('Failed to write history to localStorage', e);
    }
  }, [history]);

  const saveToHistory = (result: AnalysisResult) => {
    setHistory((prev) => [result, ...prev.filter((item) => item.id !== result.id)].slice(0, 30));
  };

  // Analyze text
  const handleAnalyzeText = async (content: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/analyze/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, language }),
      });
      if (!res.ok) {
        throw new Error('Failed to analyze text message. Please try again.');
      }
      const data: AnalysisResult = await res.json();
      setActiveResult(data);
      saveToHistory(data);
      setCurrentTab('check');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while analyzing.');
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze image
  const handleAnalyzeImage = async (file: File, base64: string, previewUrl: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/analyze/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          imageMimeType: file.type || 'image/jpeg',
          language,
        }),
      });
      if (!res.ok) {
        throw new Error('Failed to process image through OCR pipeline.');
      }
      const data: AnalysisResult = await res.json();
      data.imageUrl = previewUrl; // Store local preview for display
      setActiveResult(data);
      saveToHistory(data);
      setCurrentTab('check');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Image analysis failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze URL
  const handleAnalyzeUrl = async (url: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/analyze/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, language }),
      });
      if (!res.ok) {
        throw new Error('Failed to analyze URL link.');
      }
      const data: AnalysisResult = await res.json();
      setActiveResult(data);
      saveToHistory(data);
      setCurrentTab('check');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || 'URL inspection failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze Voice
  const handleAnalyzeVoice = async (transcript: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/analyze/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript, language }),
      });
      if (!res.ok) {
        throw new Error('Failed to analyze voice call transcript.');
      }
      const data: AnalysisResult = await res.json();
      setActiveResult(data);
      saveToHistory(data);
      setCurrentTab('check');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setErrorMessage(err.message || 'Voice analysis failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('rakshak_checks');
  };

  const handleDeleteSingleHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        simpleMode ? 'text-lg bg-amber-50/30' : 'text-slate-800 bg-slate-50/70'
      }`}
    >
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'check') {
            // Keep active result or reset
          }
        }}
        language={language}
        setLanguage={setLanguage}
        simpleMode={simpleMode}
        setSimpleMode={setSimpleMode}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        historyCount={history.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {errorMessage && (
          <div className="max-w-3xl mx-auto mt-4 px-4">
            <div className="p-4 bg-rose-50 border border-rose-300 rounded-2xl flex items-center justify-between text-rose-900 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-xs uppercase font-bold text-rose-700 hover:text-rose-900"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Check Scam */}
        {currentTab === 'check' && (
          <>
            {activeResult ? (
              <ResultView
                result={activeResult}
                onReset={() => setActiveResult(null)}
                simpleMode={simpleMode}
                onOpenEmergency={() => setIsEmergencyOpen(true)}
                currentLanguage={language}
              />
            ) : (
              <ScamChecker
                onAnalyzeText={handleAnalyzeText}
                onAnalyzeImage={handleAnalyzeImage}
                onAnalyzeUrl={handleAnalyzeUrl}
                onAnalyzeVoice={handleAnalyzeVoice}
                isLoading={isLoading}
                language={language}
                simpleMode={simpleMode}
              />
            )}
          </>
        )}

        {/* Tab 2: Learn About Scams */}
        {currentTab === 'learn' && (
          <LearnPage
            simpleMode={simpleMode}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
            language={language}
          />
        )}

        {/* Tab 3: My Checks History */}
        {currentTab === 'history' && (
          <HistoryPage
            history={history}
            onSelectResult={(item) => {
              setActiveResult(item);
              setCurrentTab('check');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClearHistory={handleClearHistory}
            onDeleteSingle={handleDeleteSingleHistory}
            simpleMode={simpleMode}
            language={language}
          />
        )}

        {/* Tab 4: About & Privacy */}
        {currentTab === 'about' && <AboutModal simpleMode={simpleMode} language={language} />}
      </main>

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        simpleMode={simpleMode}
        language={language}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Identity */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-lg">Rakshak • रक्षाक</h3>
                  <p className="text-xs text-slate-400">“{TRANSLATIONS[language]?.tagline || "Is this a scam? Don't guess. Check it."}”</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                {TRANSLATIONS[language]?.heroSubtitle || "Built for Indian families, elderly parents, and smartphone users to verify suspicious WhatsApp messages, calls, SMS, and UPI requests."}
              </p>
            </div>

            {/* Quick Emergency Hotlines */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                {TRANSLATIONS[language]?.emergencyHelplineTitle || "Emergency Assistance"}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="tel:1930"
                    className="font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> 1930 — {TRANSLATIONS[language]?.dial1930Btn || "National Cyber Helpline"}
                  </a>
                </li>
                <li>
                  <a href="tel:112" className="hover:text-white flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5" /> 112 — National Emergency Service
                  </a>
                </li>
                <li>
                  <a href="tel:100" className="hover:text-white flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5" /> 100 — Police Assistance
                  </a>
                </li>
                <li>
                  <a
                    href="https://cybercrime.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white flex items-center gap-1.5 text-blue-400"
                  >
                    cybercrime.gov.in <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Official Indian Resources */}
            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                Official Safety Portals
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <a
                    href="https://rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    RBI Kehta Hai (Consumer Awareness)
                  </a>
                </li>
                <li>
                  <a
                    href="https://npci.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    NPCI UPI Safety Guidelines
                  </a>
                </li>
                <li>
                  <a
                    href="https://sancharsaathi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Sanchar Saathi (Chakshu Fraud Reporting)
                  </a>
                </li>
                <li>
                  <a
                    href="https://cert-in.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    CERT-In (Computer Emergency Response Team)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              © {new Date().getFullYear()} Rakshak Scam Detection Initiative. For educational and citizen awareness purposes.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setCurrentTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-slate-300 cursor-pointer"
              >
                {TRANSLATIONS[language]?.navAbout || "About & Privacy"}
              </button>
              <span>•</span>
              <button
                onClick={() => setIsEmergencyOpen(true)}
                className="hover:text-amber-400 font-bold cursor-pointer"
              >
                {TRANSLATIONS[language]?.dial1930Btn || "Emergency: 1930"}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
