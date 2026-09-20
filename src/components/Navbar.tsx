import React from 'react';
import { Shield, PhoneCall, Globe, Sparkles, BookOpen, Clock, HeartHandshake, Eye } from 'lucide-react';
import { SupportedLanguage } from '../types.ts';
import { TRANSLATIONS } from '../utils/i18n.ts';

interface NavbarProps {
  currentTab: 'check' | 'learn' | 'history' | 'about';
  setCurrentTab: (tab: 'check' | 'learn' | 'history' | 'about') => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  simpleMode: boolean;
  setSimpleMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenEmergency: () => void;
  historyCount: number;
}

const LANGUAGES: { code: SupportedLanguage; label: string; native: string }[] = [
  { code: 'English', label: 'English', native: 'English' },
  { code: 'Hindi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'Kannada', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'Tamil', label: 'Tamil', native: 'தமிழ்' },
  { code: 'Telugu', label: 'Telugu', native: 'తెలుగు' },
  { code: 'Malayalam', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'Marathi', label: 'Marathi', native: 'मराठी' },
  { code: 'Bengali', label: 'Bengali', native: 'বাংলা' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  simpleMode,
  setSimpleMode,
  onOpenEmergency,
  historyCount,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notification Banner for Indian Citizens */}
      <div className="bg-slate-900 text-slate-100 text-xs sm:text-sm px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-200">
            {t.topBannerHelpline}
          </span>
          <a
            href="tel:1930"
            className="font-bold text-amber-300 hover:text-amber-200 underline decoration-amber-400 inline-flex items-center gap-1"
          >
            <PhoneCall className="w-3.5 h-3.5 inline" /> 1930 (Toll-Free)
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenEmergency}
            className="text-xs bg-rose-600 hover:bg-rose-500 text-white font-semibold px-2.5 py-0.5 rounded-full transition-colors cursor-pointer"
          >
            {t.topBannerMoneySent}
          </button>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-300 text-xs">
            {t.topBannerPortal} <strong className="text-white">cybercrime.gov.in</strong>
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Identity */}
          <div
            onClick={() => setCurrentTab('check')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-700 via-blue-700 to-emerald-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                  Rakshak
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 hidden sm:inline-block">
                  AI Scam Shield
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.subTagline}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setCurrentTab('check')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                currentTab === 'check'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {t.navCheck}
            </button>
            <button
              onClick={() => setCurrentTab('learn')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentTab === 'learn'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" /> {t.navLearn}
            </button>
            <button
              onClick={() => setCurrentTab('history')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors relative cursor-pointer ${
                currentTab === 'history'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-4 h-4" /> {t.navHistory}
              {historyCount > 0 && (
                <span className="ml-1 text-xs px-1.5 py-0.2 bg-blue-600 text-white rounded-full font-bold">
                  {historyCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentTab('about')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentTab === 'about'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HeartHandshake className="w-4 h-4" /> {t.navAbout}
            </button>
          </nav>

          {/* Controls: Elderly Mode & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Elderly / Simple Mode Toggle */}
            <button
              onClick={() => setSimpleMode((prev) => !prev)}
              aria-pressed={simpleMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                simpleMode
                  ? 'bg-amber-100 text-amber-900 border-amber-400 shadow-xs ring-2 ring-amber-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
              title="Toggle Elderly / Simple Mode"
            >
              <span className="text-base">👵</span>
              <span className="hidden sm:inline">
                {simpleMode ? t.simpleModeOn : t.simpleModeOff}
              </span>
              <span className="sm:hidden">{simpleMode ? 'Simple ON' : 'Simple'}</span>
            </button>

            {/* Language Selector */}
            <div className="relative flex items-center">
              <label htmlFor="language-select" className="sr-only">Select Language</label>
              <Globe className="w-4 h-4 text-slate-500 absolute left-2.5 pointer-events-none" />
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="pl-8 pr-7 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl appearance-none cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native} ({l.label})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => setCurrentTab('check')}
            className={`flex flex-col items-center py-1 px-3 rounded-lg font-semibold cursor-pointer ${
              currentTab === 'check' ? 'text-blue-600' : 'text-slate-600'
            }`}
          >
            <Shield className="w-4 h-4 mb-0.5" />
            <span>{t.navCheck}</span>
          </button>
          <button
            onClick={() => setCurrentTab('learn')}
            className={`flex flex-col items-center py-1 px-3 rounded-lg font-semibold cursor-pointer ${
              currentTab === 'learn' ? 'text-blue-600' : 'text-slate-600'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span>{t.navLearn}</span>
          </button>
          <button
            onClick={() => setCurrentTab('history')}
            className={`flex flex-col items-center py-1 px-3 rounded-lg font-semibold relative cursor-pointer ${
              currentTab === 'history' ? 'text-blue-600' : 'text-slate-600'
            }`}
          >
            <Clock className="w-4 h-4 mb-0.5" />
            <span>{t.navHistory}</span>
            {historyCount > 0 && (
              <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-blue-600" />
            )}
          </button>
          <button
            onClick={() => setCurrentTab('about')}
            className={`flex flex-col items-center py-1 px-3 rounded-lg font-semibold cursor-pointer ${
              currentTab === 'about' ? 'text-blue-600' : 'text-slate-600'
            }`}
          >
            <HeartHandshake className="w-4 h-4 mb-0.5" />
            <span>{t.navAbout}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
