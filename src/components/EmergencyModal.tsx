import React from 'react';
import { AlertOctagon, PhoneCall, ShieldAlert, X, ExternalLink, FileWarning } from 'lucide-react';
import { SupportedLanguage } from '../types.ts';
import { TRANSLATIONS } from '../utils/i18n.ts';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  simpleMode: boolean;
  language: SupportedLanguage;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, simpleMode, language }) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language] || TRANSLATIONS.English;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
    >
      <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-rose-500 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Banner */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 border border-rose-300 flex items-center justify-center shrink-0">
            <AlertOctagon className="w-8 h-8 text-rose-600 animate-bounce" />
          </div>
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-600 text-white mb-1">
              {t.emergencyModalBadge || 'Urgent Golden Hour Action'}
            </span>
            <h2 id="emergency-modal-title" className={`font-extrabold text-slate-900 ${simpleMode ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
              {t.emergencyModalTitle}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {t.emergencyModalSubtitle}
            </p>
          </div>
        </div>

        {/* Helpline Action Card */}
        <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-rose-950 text-base flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-rose-600" />
              {t.emergencyStep2Title}
            </h3>
            <p className="text-xs text-rose-800 mt-0.5">
              {t.emergencyStep2Desc}
            </p>
          </div>
          <a
            href="tel:1930"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-lg shadow-md transition-transform hover:scale-105 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-5 h-5" /> {t.dial1930Btn}
          </a>
        </div>

        {/* Immediate 5 Action Steps */}
        <div className="space-y-3 mb-6">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            {t.trappedActionHeader || 'Immediate Steps To Execute:'}
          </h3>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{t.emergencyStep1Title}</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {t.emergencyStep1Desc}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{t.emergencyStep2Title}</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {t.emergencyStep2Desc}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{t.emergencyStep3Title}</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {t.emergencyStep3Desc}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              4
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{t.emergencyStep4Title}</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {t.emergencyStep4Desc}
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              5
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{t.emergencyStep5Title}</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {t.emergencyStep5Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Realism Notice */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
          <FileWarning className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            {t.disclaimerP1}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5 cursor-pointer"
          >
            {t.visitPortalLink} <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
