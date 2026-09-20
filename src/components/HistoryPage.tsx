import React from 'react';
import { Clock, Trash2, ArrowRight, ShieldCheck, ShieldAlert, AlertTriangle, Lock } from 'lucide-react';
import { AnalysisResult, SupportedLanguage } from '../types.ts';
import { TRANSLATIONS } from '../utils/i18n.ts';

interface HistoryPageProps {
  history: AnalysisResult[];
  onSelectResult: (result: AnalysisResult) => void;
  onClearHistory: () => void;
  onDeleteSingle: (id: string) => void;
  simpleMode: boolean;
  language: SupportedLanguage;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onSelectResult,
  onClearHistory,
  onDeleteSingle,
  simpleMode,
  language,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.English;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {t.historyPrivacyTitle}
          </span>
          <h1
            className={`font-black text-slate-900 ${
              simpleMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            {t.historyTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.historySubtitle}
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Clear history?')) {
                onClearHistory();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> {t.clearAllHistoryBtn}
          </button>
        )}
      </div>

      {/* Privacy Guarantee Card */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
        <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">{t.historyPrivacyTitle}</strong>
          <p className="text-xs text-emerald-800 mt-0.5">
            {t.historyPrivacyDesc}
          </p>
        </div>
      </div>

      {/* History Items List */}
      {history.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-slate-800 text-lg">{t.noHistoryTitle}</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            {t.noHistoryDesc}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => {
            const verdictTheme = {
              SCAM: {
                badge: 'bg-rose-100 text-rose-800 border-rose-200',
                icon: <ShieldAlert className="w-4 h-4 text-rose-600" />,
                label: t.scamVerdict,
              },
              SUSPICIOUS: {
                badge: 'bg-amber-100 text-amber-800 border-amber-200',
                icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
                label: t.suspiciousVerdict,
              },
              SAFE: {
                badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
                label: t.safeVerdict,
              },
            }[item.verdict];

            const formattedDate = new Date(item.timestamp).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-blue-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-black uppercase px-2.5 py-0.5 rounded-full border ${verdictTheme.badge}`}
                    >
                      {verdictTheme.icon}
                      <span>{verdictTheme.label}</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      • {formattedDate}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {item.scamType}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 font-medium line-clamp-2">
                    "{item.originalContent || 'Screenshot Image Analysis'}"
                  </p>

                  <div className="text-[11px] text-slate-500 flex items-center gap-3">
                    <span>{t.riskScoreText}: <strong className="text-slate-900">{item.riskScore}/100</strong></span>
                    <span>{t.redFlagsTitle}: <strong className="text-slate-900">{item.redFlags.length}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <button
                    onClick={() => onSelectResult(item)}
                    className="flex items-center gap-1 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <span>{t.viewAnalysisBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteSingle(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Delete this record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
