import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Building2,
  CreditCard,
  Briefcase,
  Package,
  Zap,
  ShieldAlert,
  HelpCircle,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  X,
  PhoneCall
} from 'lucide-react';
import { EducationalArticle, SupportedLanguage } from '../types.ts';
import { getLocalizedEducationalArticles } from '../server/data/educationalContent.ts';
import { TRANSLATIONS } from '../utils/i18n.ts';

interface LearnPageProps {
  simpleMode: boolean;
  onOpenEmergency: () => void;
  language: SupportedLanguage;
}

export const LearnPage: React.FC<LearnPageProps> = ({ simpleMode, onOpenEmergency, language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.English;
  const [articles, setArticles] = useState<EducationalArticle[]>(() => getLocalizedEducationalArticles(language));
  const [selectedArticle, setSelectedArticle] = useState<EducationalArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const localized = getLocalizedEducationalArticles(language);
    setArticles(localized);
    setSelectedCategory(t.allCategory);
    if (selectedArticle) {
      const refreshed = localized.find((a) => a.id === selectedArticle.id);
      if (refreshed) setSelectedArticle(refreshed);
    }
  }, [language]);

  const categories = [
    t.allCategory,
    ...Array.from(new Set(articles.map((a) => a.category)))
  ];

  const filteredArticles = articles.filter((a) => {
    const matchesCat = selectedCategory === t.allCategory || selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.quickSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'CreditCard':
        return <CreditCard className="w-6 h-6 text-indigo-600" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-amber-600" />;
      case 'Package':
        return <Package className="w-6 h-6 text-orange-600" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-yellow-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-rose-600" />;
      default:
        return <AlertTriangle className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
          {t.learnBadge}
        </span>
        <h1
          className={`font-black tracking-tight text-slate-900 ${
            simpleMode ? 'text-3xl sm:text-5xl' : 'text-3xl sm:text-4xl'
          }`}
        >
          {t.learnTitle}
        </h1>
        <p
          className={`text-slate-600 ${
            simpleMode ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'
          }`}
        >
          {t.learnSubtitle}
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 group-hover:scale-105 transition-transform">
                  {getIcon(article.iconName)}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  {article.tag}
                </span>
              </div>

              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                {article.category}
              </span>
              <h3
                className={`font-black text-slate-900 mt-1 mb-2 group-hover:text-blue-600 transition-colors ${
                  simpleMode ? 'text-xl' : 'text-lg'
                }`}
              >
                {article.title}
              </h3>

              <p
                className={`text-slate-600 leading-relaxed line-clamp-3 ${
                  simpleMode ? 'text-base' : 'text-xs sm:text-sm'
                }`}
              >
                {article.quickSummary}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 font-bold text-xs sm:text-sm">
              <span>{t.readGuideBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Article Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-50 rounded-2xl border border-blue-200">
                {getIcon(selectedArticle.iconName)}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {selectedArticle.category} • {selectedArticle.tag}
                </span>
                <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-black text-slate-900">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            {/* Quick Summary */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-sm sm:text-base font-medium mb-6">
              {selectedArticle.quickSummary}
            </div>

            {/* Simulated Real Example */}
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                {t.exampleScamMessage}
              </span>
              <p className="font-mono text-xs sm:text-sm text-rose-950 font-bold mt-1">
                {selectedArticle.realExample}
              </p>
            </div>

            <div className="space-y-6">
              {/* How It Works */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  {t.howItWorksHeader}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {selectedArticle.howItWorks.map((step, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Warning Signs */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  {t.warningSignsHeader}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {selectedArticle.warningSigns.map((sign, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/50">
                      <span className="text-amber-700 font-bold">⚠️</span>
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What They Ask For */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  {t.whatTheyAskForHeader}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-rose-950 font-semibold">
                  {selectedArticle.whatTheyAskFor.map((item, iIdx) => (
                    <li key={iIdx} className="bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How To Protect */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  {t.goldenRulesHeader}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                  {selectedArticle.howToProtect.map((rule, rIdx) => (
                    <li key={rIdx} className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex items-start gap-2.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What To Do If Already Responded */}
              <div className="p-4 bg-rose-100/70 border-2 border-rose-300 rounded-2xl space-y-2">
                <h3 className="text-sm font-black text-rose-950 flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-rose-700" />
                  {t.trappedActionHeader}
                </h3>
                <ul className="space-y-1.5 text-xs text-rose-950">
                  {selectedArticle.whatToDoIfTrapped.map((act, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onOpenEmergency}
                  className="mt-2 text-xs font-extrabold bg-rose-700 hover:bg-rose-800 text-white px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {t.openEmergencyGuideBtn}
                </button>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 cursor-pointer"
              >
                {t.closeGuideBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
