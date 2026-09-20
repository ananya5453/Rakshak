import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Volume2,
  VolumeX,
  CheckCircle,
  XCircle,
  ExternalLink,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Check,
  FileText,
  Image as ImageIcon,
  Share2
} from 'lucide-react';
import { AnalysisResult, SupportedLanguage } from '../types.ts';
import { TRANSLATIONS } from '../utils/i18n.ts';

interface ResultViewProps {
  result: AnalysisResult;
  onReset: () => void;
  simpleMode: boolean;
  onOpenEmergency: () => void;
  currentLanguage: SupportedLanguage;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onReset,
  simpleMode,
  onOpenEmergency,
  currentLanguage,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS[result.language] || TRANSLATIONS.English;
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportText, setReportText] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Web Speech API for Text-To-Speech (Elderly friendly)
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const verdictSpoken =
      result.verdict === 'SCAM'
        ? t.scamVerdict
        : result.verdict === 'SUSPICIOUS'
        ? t.suspiciousVerdict
        : t.safeVerdict;

    const actionsSpoken = result.recommendedActions.doThis.slice(0, 2).join('. ');
    const dontsSpoken = result.recommendedActions.dontDoThis.slice(0, 2).join('. ');

    const fullSpeech = `${verdictSpoken}. ${result.elderlyExplanation}. ${t.likelyGoalTitle}: ${result.likelyGoal}. ${t.doThisTitle}: ${actionsSpoken}. ${t.dontDoThisTitle}: ${dontsSpoken}.`;

    const utterance = new SpeechSynthesisUtterance(fullSpeech);
    utterance.rate = simpleMode ? 0.85 : 0.95; // Slower cadence for elderly mode

    // Match appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    const langCodeMap: Record<SupportedLanguage, string> = {
      English: 'en',
      Hindi: 'hi',
      Kannada: 'kn',
      Tamil: 'ta',
      Telugu: 'te',
      Malayalam: 'ml',
      Marathi: 'mr',
      Bengali: 'bn',
    };
    const targetLangCode = langCodeMap[currentLanguage] || 'en';
    const matchedVoice = voices.find((v) => v.lang.startsWith(targetLangCode));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (helpful: boolean) => {
    setFeedbackGiven(helpful ? 'yes' : 'no');
    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        analysisId: result.id,
        helpful,
      }),
    }).catch((e) => console.error(e));
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        analysisId: result.id,
        helpful: false,
        comments: reportText,
      }),
    }).catch((e) => console.error(e));
  };

  // Visual Theme Setup based on Verdict
  const verdictConfig = {
    SCAM: {
      bg: 'bg-rose-50 border-rose-300 text-rose-950',
      badge: 'bg-rose-600 text-white',
      border: 'border-rose-300',
      icon: <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 text-rose-600" />,
      label: '🔴 ' + t.scamVerdict,
      riskBadgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    },
    SUSPICIOUS: {
      bg: 'bg-amber-50 border-amber-300 text-amber-950',
      badge: 'bg-amber-600 text-white',
      border: 'border-amber-300',
      icon: <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600" />,
      label: '🟡 ' + t.suspiciousVerdict,
      riskBadgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    },
    SAFE: {
      bg: 'bg-emerald-50 border-emerald-300 text-emerald-950',
      badge: 'bg-emerald-600 text-white',
      border: 'border-emerald-300',
      icon: <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />,
      label: '🟢 ' + t.safeVerdict,
      riskBadgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
  }[result.verdict];

  // Highlight suspicious phrases in original content
  const renderHighlightedContent = () => {
    let raw = result.originalContent || '';
    if (!result.redFlags || result.redFlags.length === 0) {
      return <span className="text-slate-800">{raw}</span>;
    }

    // Collect red flag snippets to highlight
    const snippets = result.redFlags
      .map((rf) => rf.text)
      .filter((txt) => txt && txt.trim().length > 2 && raw.toLowerCase().includes(txt.toLowerCase()));

    if (snippets.length === 0) {
      return <span className="text-slate-800">{raw}</span>;
    }

    // Replace snippets with highlighted marks
    const regex = new RegExp(`(${snippets.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = raw.split(regex);

    return parts.map((part, i) => {
      const matchRf = result.redFlags.find((rf) => rf.text.toLowerCase() === part.toLowerCase());
      if (matchRf) {
        return (
          <mark
            key={i}
            className="bg-rose-200 text-rose-950 font-bold px-1.5 py-0.5 rounded-md mx-0.5 border border-rose-300 relative group cursor-help inline-flex items-center gap-1"
            title={`${matchRf.category.toUpperCase()}: ${matchRf.reason}`}
          >
            <span>{part}</span>
            <span className="text-[10px] uppercase font-extrabold bg-rose-700 text-white px-1 rounded-sm">
              Flag
            </span>
          </mark>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 animate-fadeIn">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-bold text-sm transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" /> {t.checkAnotherBtn}
        </button>

        <div className="flex items-center gap-2">
          {/* Read Aloud Button (Elderly friendly) */}
          <button
            onClick={handleToggleSpeech}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-600 text-white shadow-md animate-pulse'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlayingAudio ? t.stopAudioBtn : t.readAloudBtn}</span>
          </button>

          {/* Share/Copy */}
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm cursor-pointer"
            title="Copy check link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 1. Main Verdict Banner */}
      <section
        className={`p-6 sm:p-8 rounded-3xl border-3 ${verdictConfig.bg} ${verdictConfig.border} shadow-lg relative overflow-hidden`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2 sm:p-3 bg-white/90 rounded-2xl shadow-xs shrink-0">
              {verdictConfig.icon}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900/10 text-slate-800">
                  {t.scamCategoryText}
                </span>
                <span className="font-extrabold text-sm text-slate-800 bg-white/80 px-2.5 py-0.5 rounded-md border border-slate-300">
                  {result.scamType}
                </span>
              </div>

              <h1
                className={`font-black tracking-tight text-slate-900 ${
                  simpleMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
                }`}
              >
                {verdictConfig.label}
              </h1>

              {/* Non-Absolute Confidence & Probabilistic Framing */}
              <p
                className={`text-slate-700 mt-2 font-medium max-w-2xl ${
                  simpleMode ? 'text-lg leading-relaxed' : 'text-sm sm:text-base'
                }`}
              >
                {result.summary}
              </p>
            </div>
          </div>

          {/* Risk Level & Scoring Gauge */}
          <div className="w-full sm:w-auto bg-white/95 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-slate-300/80 shadow-xs flex sm:flex-col items-center justify-between sm:justify-center text-center gap-2">
            <div>
              <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                {t.riskLevelText}
              </span>
              <div className="flex items-center justify-center gap-1.5 mt-0.5">
                <span
                  className={`text-lg sm:text-xl font-extrabold px-3 py-1 rounded-xl border ${verdictConfig.riskBadgeBg}`}
                >
                  {result.riskLevel}
                </span>
              </div>
            </div>

            <div className="sm:border-t sm:border-slate-200 sm:pt-2 sm:w-full">
              <span className="text-[11px] font-semibold text-slate-500">{t.riskScoreText}</span>
              <div className="text-2xl font-black text-slate-900">{result.riskScore} <span className="text-xs font-normal text-slate-400">/ 100</span></div>
            </div>
          </div>
        </div>

        {/* Elderly Mode Plain-Language Highlight */}
        <div className="mt-6 pt-5 border-t border-slate-300/60 bg-white/60 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👵</span>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {t.elderlyExplanationLabel}:
              </h2>
              <p
                className={`font-semibold text-slate-900 mt-0.5 ${
                  simpleMode ? 'text-xl leading-relaxed text-slate-950' : 'text-base'
                }`}
              >
                {result.elderlyExplanation}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Original Message & Screenshot OCR View */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
          <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            {t.originalContentTitle}
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
            Input: {result.inputType.toUpperCase()}
          </span>
        </div>

        {/* If Image was uploaded: show Screenshot + OCR Text Side-by-Side */}
        {result.inputType === 'image' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
              <h3 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-600" /> {t.originalScreenshotTitle}
              </h3>
              <div className="rounded-xl overflow-hidden bg-slate-200 max-h-80 flex items-center justify-center p-2">
                <img
                  src={result.imageUrl || '/assets/placeholder-scan.png'}
                  alt="Submitted screenshot"
                  className="max-h-72 object-contain rounded-lg shadow-sm"
                  onError={(e) => {
                    // Fallback visual if preview is too long
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <p className="text-xs text-slate-500 text-center py-6">
                  Screenshot received and processed through Rakshak OCR pipeline.
                </p>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
              <h3 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" /> {t.detectedOcrTitle}
              </h3>
              <div className="p-4 bg-white rounded-xl border border-slate-200 font-mono text-xs sm:text-sm leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap">
                {renderHighlightedContent()}
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                {t.ocrCompareNote}
              </p>
            </div>
          </div>
        ) : (
          /* Text or URL input: show highlighted text snippet */
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 leading-relaxed text-sm sm:text-base font-normal">
            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              {t.submittedMessageHighlighted}:
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 font-sans">
              {renderHighlightedContent()}
            </div>
          </div>
        )}

        {/* URL Analysis Panel if URL was analyzed */}
        {result.urlAnalysis && (
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-blue-600" /> {t.urlInspectionTitle}
              </h3>
              <span
                className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                  result.urlAnalysis.brandMismatch || result.urlAnalysis.hasSuspiciousTld
                    ? 'bg-rose-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {result.urlAnalysis.brandMismatch ? 'Domain Mismatch' : 'Domain Checked'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                <span className="text-slate-500">{t.targetHostname}:</span>{' '}
                <strong className="font-mono text-slate-900">{result.urlAnalysis.domain}</strong>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-blue-100">
                <span className="text-slate-500">{t.encryptionStatus}:</span>{' '}
                <strong>{result.urlAnalysis.isHttps ? '✅ Secure HTTPS' : '❌ Insecure (HTTP)'}</strong>
              </div>
            </div>
            {result.urlAnalysis.notes.length > 0 && (
              <ul className="text-xs text-blue-900 space-y-1 list-disc list-inside pt-1">
                {result.urlAnalysis.notes.map((note, nIdx) => (
                  <li key={nIdx}>{note}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* 3. Red Flags Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-slate-900 text-xl sm:text-2xl flex items-center gap-2">
            <Flag className="w-6 h-6 text-rose-600" />
            {t.redFlagsTitle} ({result.redFlags.length})
          </h2>
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            {t.redFlagsSubtitle}
          </span>
        </div>

        {result.redFlags.length === 0 ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-sm flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>{t.noRedFlagsFound}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.redFlags.map((flag) => {
              const severityBadge = {
                high: 'bg-rose-100 text-rose-800 border-rose-200',
                medium: 'bg-amber-100 text-amber-800 border-amber-200',
                low: 'bg-blue-100 text-blue-800 border-blue-200',
              }[flag.severity];

              return (
                <div
                  key={flag.id}
                  className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between gap-3 hover:border-slate-300 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {flag.category}
                      </span>
                      <span
                        className={`text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${severityBadge}`}
                      >
                        {flag.severity} risk
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      ⚠️ "{flag.text}"
                    </h3>
                    <p className={`text-slate-600 ${simpleMode ? 'text-base' : 'text-xs sm:text-sm'}`}>
                      {flag.reason}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. "What is the Scammer Trying to Do?" */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shrink-0">
            🎯
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {t.likelyGoalHeader}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold">{t.likelyGoalTitle}</h2>
          </div>
        </div>

        <div className="p-4 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/10">
          <p className="text-lg sm:text-xl font-bold text-amber-200">
            "{result.likelyGoal}"
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {t.tacticsUsedTitle}:
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-200">
            {result.scammerTactics.map((tactic, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white/5 p-2.5 rounded-xl">
                <span className="text-amber-400 font-bold">•</span>
                <span>{tactic}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. "What Could Happen?" (Visual Flowchart) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {t.whatCouldHappenHeader}
          </span>
          <h2 className="font-extrabold text-slate-900 text-xl sm:text-2xl">
            {t.whatCouldHappenTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.whatCouldHappenSubtitle}
          </p>
        </div>

        {/* 4-Step Consequence Flowchart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {result.scenarioFlow.map((step, idx) => {
            const stepColors = {
              trigger: 'border-blue-300 bg-blue-50/50 text-blue-900',
              trap: 'border-amber-300 bg-amber-50/50 text-amber-950',
              exploitation: 'border-orange-300 bg-orange-50/50 text-orange-950',
              consequence: 'border-rose-400 bg-rose-50 text-rose-950',
            }[step.stage] || 'border-slate-200 bg-slate-50 text-slate-900';

            const stageLabel = {
              trigger: t.stageTrigger,
              trap: t.stageTrap,
              exploitation: t.stageExploitation,
              consequence: t.stageConsequence,
            }[step.stage] || step.stage;

            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border-2 ${stepColors} flex flex-col justify-between relative shadow-xs`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center">
                      {step.step}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                      {stageLabel}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base mb-1.5">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-700">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. "What Should I Do?" (Do's and Don'ts) */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            {t.whatToDoHeader}
          </span>
          <h2 className="font-extrabold text-slate-900 text-xl sm:text-2xl">
            {t.whatToDoTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ Do This */}
          <div className="bg-emerald-50/80 border-2 border-emerald-300 rounded-3xl p-6 sm:p-7 shadow-xs">
            <h3 className="font-black text-emerald-950 text-lg flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              {t.doThisTitle}
            </h3>
            <ul className="space-y-3">
              {result.recommendedActions.doThis.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-3 p-3 bg-white rounded-xl border border-emerald-200 text-emerald-950 font-medium ${
                    simpleMode ? 'text-base' : 'text-sm'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ❌ Don't Do This */}
          <div className="bg-rose-50/80 border-2 border-rose-300 rounded-3xl p-6 sm:p-7 shadow-xs">
            <h3 className="font-black text-rose-950 text-lg flex items-center gap-2 mb-4">
              <XCircle className="w-6 h-6 text-rose-600" />
              {t.dontDoThisTitle}
            </h3>
            <ul className="space-y-3">
              {result.recommendedActions.dontDoThis.map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-3 p-3 bg-white rounded-xl border border-rose-200 text-rose-950 font-medium ${
                    simpleMode ? 'text-base' : 'text-sm'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✕
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Emergency Action Box */}
      <section className="p-6 bg-gradient-to-r from-rose-900 to-red-900 text-white rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-xs font-extrabold uppercase tracking-wider">
            Crisis Protection
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-1">{t.moneySentTitle}</h2>
          <p className="text-rose-100 text-xs sm:text-sm mt-1 max-w-xl">
            {t.moneySentDesc}
          </p>
        </div>
        <button
          onClick={onOpenEmergency}
          className="w-full sm:w-auto px-6 py-3.5 bg-white text-rose-900 hover:bg-rose-50 font-black rounded-2xl shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2 shrink-0"
        >
          <span>🚨 {t.moneySentBtn}</span>
        </button>
      </section>

      {/* 8. Feedback & Community Correction */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">{t.feedbackQuestion}</h3>
          <p className="text-xs text-slate-500">
            {t.feedbackHelpText}
          </p>
        </div>

        {feedbackGiven ? (
          <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
            {t.feedbackRecorded}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleFeedback(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <ThumbsUp className="w-3.5 h-3.5" /> {t.feedbackYes}
            </button>
            <button
              onClick={() => {
                handleFeedback(false);
                setShowReportDialog(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <ThumbsDown className="w-3.5 h-3.5" /> {t.feedbackNo}
            </button>
          </div>
        )}
      </section>

      {/* Report Issue Modal */}
      {showReportDialog && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-issue-modal-title"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 id="report-issue-modal-title" className="font-bold text-slate-900 text-base mb-2">
              {t.reportIssueTitle}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {t.reportIssueDesc}
            </p>
            {reportSubmitted ? (
              <div className="p-4 bg-emerald-50 rounded-xl text-emerald-800 text-xs font-bold mb-4">
                {t.reportSuccess}
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3">
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder={t.reportPlaceholder}
                  className="w-full h-24 p-3 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReportDialog(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    {t.cancelBtn}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                  >
                    {t.submitReportBtn}
                  </button>
                </div>
              </form>
            )}
            {reportSubmitted && (
              <div className="flex justify-end">
                <button
                  onClick={() => setShowReportDialog(false)}
                  className="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-xl"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
