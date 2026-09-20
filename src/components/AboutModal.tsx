import React from 'react';
import { Shield, Lock, EyeOff, FileText, AlertTriangle, ExternalLink } from 'lucide-react';
import { SupportedLanguage } from '../types.ts';
import { TRANSLATIONS } from '../utils/i18n.ts';

interface AboutModalProps {
  simpleMode: boolean;
  language: SupportedLanguage;
}

export const AboutModal: React.FC<AboutModalProps> = ({ simpleMode, language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.English;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-2">
          <Shield className="w-7 h-7" />
        </div>
        <h1
          className={`font-black text-slate-900 ${
            simpleMode ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'
          }`}
        >
          {t.aboutTitle}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          {t.aboutSubtitle}
        </p>
      </div>

      {/* 4 Pillars of Privacy & Trust */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">{t.pillar1Title}</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t.pillar1Desc}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">{t.pillar2Title}</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t.pillar2Desc}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">{t.pillar3Title}</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t.pillar3Desc}
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">{t.pillar4Title}</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t.pillar4Desc}
          </p>
        </div>
      </div>

      {/* Official Legal Disclaimer */}
      <div className="bg-slate-50 border border-slate-300 rounded-3xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>{t.disclaimerTitle}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t.disclaimerP1}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t.disclaimerP2}
        </p>
        <div className="pt-2">
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 underline"
          >
            cybercrime.gov.in <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
