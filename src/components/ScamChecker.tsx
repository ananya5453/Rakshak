import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Mic,
  MicOff,
  UploadCloud,
  Sparkles,
  ArrowRight,
  Clipboard,
  AlertCircle,
  CheckCircle2,
  Loader2,
  HelpCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { SupportedLanguage, DemoScenario } from '../types.ts';
import { TRANSLATIONS } from '../utils/i18n.ts';
import { getLocalizedDemoExamples } from '../server/data/demoExamples.ts';

interface ScamCheckerProps {
  onAnalyzeText: (text: string) => Promise<void>;
  onAnalyzeImage: (file: File, base64: string, previewUrl: string) => Promise<void>;
  onAnalyzeUrl: (url: string) => Promise<void>;
  onAnalyzeVoice: (transcript: string) => Promise<void>;
  isLoading: boolean;
  language: SupportedLanguage;
  simpleMode: boolean;
}

export const ScamChecker: React.FC<ScamCheckerProps> = ({
  onAnalyzeText,
  onAnalyzeImage,
  onAnalyzeUrl,
  onAnalyzeVoice,
  isLoading,
  language,
  simpleMode,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.English;
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'url' | 'voice'>('text');

  // Text Tab State
  const [textContent, setTextContent] = useState('');

  // URL Tab State
  const [urlInput, setUrlInput] = useState('');

  // Image Tab State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice Tab State
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [recognitionSupported, setRecognitionSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API for voice input if available
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      // Map language code for recognition
      const langCodes: Record<SupportedLanguage, string> = {
        English: 'en-IN',
        Hindi: 'hi-IN',
        Kannada: 'kn-IN',
        Tamil: 'ta-IN',
        Telugu: 'te-IN',
        Malayalam: 'ml-IN',
        Marathi: 'mr-IN',
        Bengali: 'bn-IN',
      };
      recognition.lang = langCodes[language] || 'en-IN';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setVoiceTranscript((prev) => (prev ? `${prev} ${currentTranscript}` : currentTranscript));
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setRecognitionSupported(false);
    }
  }, [language]);

  const handleStartVoice = () => {
    if (recognitionRef.current) {
      try {
        setVoiceTranscript('');
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Speech Recognition is not supported on this browser. You can type the caller speech directly.');
    }
  };

  const handleStopVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  // Image Upload Handlers
  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, WebP).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      alert('File size too large. Please select an image under 15MB.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      const base64Data = result.split(',')[1];
      setImageBase64(base64Data);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setTextContent(text);
      }
    } catch {
      // Fallback
    }
  };

  // Quick Demo Scenario Selection
  const handleSelectDemo = (scenario: DemoScenario) => {
    if (scenario.inputType === 'url') {
      setActiveTab('url');
      setUrlInput(scenario.content);
      onAnalyzeUrl(scenario.content);
    } else {
      setActiveTab('text');
      setTextContent(scenario.content);
      onAnalyzeText(scenario.content);
    }
  };

  const demoScenarios = getLocalizedDemoExamples(language);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>{t.badgeAiShield}</span>
        </div>

        <h1
          className={`font-black tracking-tight text-slate-900 ${
            simpleMode ? 'text-4xl sm:text-5xl' : 'text-3xl sm:text-5xl'
          }`}
        >
          {t.heroTitle}
        </h1>

        <p
          className={`text-slate-600 leading-relaxed ${
            simpleMode ? 'text-lg sm:text-xl font-medium' : 'text-sm sm:text-base'
          }`}
        >
          {t.heroSubtitle}
        </p>
      </div>

      {/* Main Analysis Card Container */}
      <div className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-xl overflow-hidden">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1.5 text-xs sm:text-sm font-extrabold">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl transition-all cursor-pointer ${
              activeTab === 'text'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span>{t.pasteTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('image')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl transition-all cursor-pointer ${
              activeTab === 'image'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-indigo-600" />
            <span>{t.screenshotTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <LinkIcon className="w-4 h-4 text-emerald-600" />
            <span>{t.linkTab}</span>
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-2xl transition-all cursor-pointer ${
              activeTab === 'voice'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Mic className="w-4 h-4 text-rose-600" />
            <span>{t.voiceTab}</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-8">
          {/* 1. TEXT TAB */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-bold text-slate-700">
                  {t.pasteLabel}
                </label>
                <button
                  onClick={handlePasteClipboard}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                >
                  <Clipboard className="w-3.5 h-3.5" /> {t.pasteFromClipboard}
                </button>
              </div>

              <div className="relative">
                <textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder={t.pastePlaceholder}
                  rows={simpleMode ? 6 : 5}
                  className={`w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all text-slate-900 resize-none ${
                    simpleMode ? 'text-lg sm:text-xl leading-relaxed' : 'text-sm sm:text-base'
                  }`}
                />
                {textContent && (
                  <button
                    onClick={() => setTextContent('')}
                    className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 font-semibold cursor-pointer"
                  >
                    {t.clearBtn}
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t.privacyAutoRedactNotice}</span>
                </div>

                <button
                  disabled={isLoading || !textContent.trim()}
                  onClick={() => onAnalyzeText(textContent)}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-base shadow-lg transition-transform flex items-center justify-center gap-2 cursor-pointer ${
                    isLoading || !textContent.trim()
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-blue-600 hover:bg-blue-700 hover:scale-102 text-white shadow-blue-500/20'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.scanningText}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.analyzeBtn}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* 2. IMAGE SCREENSHOT TAB */}
          {activeTab === 'image' && (
            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {!imagePreview ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-3 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50/50'
                      : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-100/50'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-4">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg mb-1">
                    {t.dragDropTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                    {t.dragDropSubtitle}
                  </p>
                </div>
              ) : (
                <div className="border-2 border-slate-200 rounded-3xl p-4 sm:p-6 bg-slate-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-slate-800 text-sm">
                        {selectedFile?.name || 'Selected Screenshot'}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedFile(null);
                        setImagePreview(null);
                        setImageBase64(null);
                      }}
                      className="text-xs text-rose-600 hover:text-rose-800 font-bold cursor-pointer"
                    >
                      {t.clearBtn}
                    </button>
                  </div>

                  <div className="max-h-72 overflow-hidden rounded-2xl bg-slate-200 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-72 object-contain rounded-xl"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      disabled={isLoading || !selectedFile || !imageBase64}
                      onClick={() => {
                        if (selectedFile && imageBase64 && imagePreview) {
                          onAnalyzeImage(selectedFile, imageBase64, imagePreview);
                        }
                      }}
                      className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-base shadow-lg transition-transform flex items-center justify-center gap-2 cursor-pointer ${
                        isLoading
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-blue-600 hover:bg-blue-700 hover:scale-102 text-white shadow-blue-500/20'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>{t.scanningText}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.analyzeScreenshotBtn}</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. URL LINK TAB */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <label className="text-xs sm:text-sm font-bold text-slate-700">
                {t.linkInputLabel}
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <LinkIcon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder={t.linkPlaceholder}
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-hidden transition-all text-slate-900 ${
                      simpleMode ? 'text-lg font-mono' : 'text-sm font-mono'
                    }`}
                  />
                </div>

                <button
                  disabled={isLoading || !urlInput.trim()}
                  onClick={() => onAnalyzeUrl(urlInput)}
                  className={`px-8 py-3.5 rounded-2xl font-black text-base shadow-lg transition-transform flex items-center justify-center gap-2 cursor-pointer ${
                    isLoading || !urlInput.trim()
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 hover:scale-102 text-white shadow-emerald-500/20'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.scanningText}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.checkLinkBtn}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">{t.linkHelperTitle}</p>
                <p>{t.linkHelper1}</p>
                <p>{t.linkHelper2}</p>
                <p>{t.linkHelper3}</p>
              </div>
            </div>
          )}

          {/* 4. VOICE TAB ("Speak Instead") */}
          {activeTab === 'voice' && (
            <div className="space-y-4">
              <div className="p-5 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 text-center">
                <span className="text-2xl">🎙️</span>
                <h3 className="font-extrabold text-slate-900 text-base">
                  {t.voiceTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  {t.voiceDesc}
                </p>

                <div className="pt-3 flex justify-center">
                  {!isRecording ? (
                    <button
                      onClick={handleStartVoice}
                      className="px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-md transition-transform hover:scale-105 cursor-pointer"
                    >
                      <Mic className="w-5 h-5" /> {t.speakBtn}
                    </button>
                  ) : (
                    <button
                      onClick={handleStopVoice}
                      className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm flex items-center gap-2 shadow-md animate-pulse cursor-pointer"
                    >
                      <MicOff className="w-5 h-5 text-rose-400" /> {t.stopListeningBtn}
                    </button>
                  )}
                </div>

                {isRecording && (
                  <p className="text-xs font-bold text-rose-700 animate-pulse pt-2">
                    ● {t.listeningText}
                  </p>
                )}
              </div>

              {/* Transcript Textarea for Verification */}
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  {t.voiceTranscriptLabel}
                </label>
                <textarea
                  value={voiceTranscript}
                  onChange={(e) => setVoiceTranscript(e.target.value)}
                  placeholder={t.voiceTranscriptPlaceholder}
                  rows={4}
                  className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-hidden text-sm"
                />
              </div>

              <div className="flex justify-end">
                <button
                  disabled={isLoading || !voiceTranscript.trim()}
                  onClick={() => onAnalyzeVoice(voiceTranscript)}
                  className={`px-8 py-3.5 rounded-2xl font-black text-base shadow-lg transition-transform flex items-center justify-center gap-2 cursor-pointer ${
                    isLoading || !voiceTranscript.trim()
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 hover:scale-102 text-white'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{t.scanningText}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.analyzeVoiceBtn}</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demo Scenarios Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              {t.demoScenariosTitle}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {t.demoScenariosTitle}
            </h2>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            {t.demoScenariosSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {demoScenarios.map((scenario) => {
            const badgeColor = {
              SCAM: 'bg-rose-100 text-rose-800 border-rose-200',
              SUSPICIOUS: 'bg-amber-100 text-amber-800 border-amber-200',
              SAFE: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            }[scenario.expectedVerdict];

            const verdictLabel =
              scenario.expectedVerdict === 'SCAM'
                ? t.scamVerdict
                : scenario.expectedVerdict === 'SUSPICIOUS'
                ? t.suspiciousVerdict
                : t.safeVerdict;

            return (
              <div
                key={scenario.id}
                onClick={() => handleSelectDemo(scenario)}
                className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-3 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {scenario.title}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${badgeColor}`}
                    >
                      {verdictLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 italic">
                    "{scenario.content}"
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-bold text-blue-600 pt-2 border-t border-slate-100">
                  <span>{scenario.category}</span>
                  <span className="group-hover:translate-x-1 transition-transform">{t.testNow} →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
