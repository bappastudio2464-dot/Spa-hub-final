import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { spaGlossaryData } from '../data/oilsAndGlossaryData';
import { BookOpen, Search, Sparkles, Filter } from 'lucide-react';

export const GlossarySection: React.FC = () => {
  const { language } = useCourse();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Swedish & Classical', 'Ayurveda & Eastern', 'Anatomy & Physiology', 'Aromatherapy', 'Spa Operations & Ethics'];

  const filteredTerms = spaGlossaryData.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    if (!searchTerm) return matchesCategory;
    const q = searchTerm.toLowerCase();
    return matchesCategory && (
      item.term.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      item.definitionHi.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F] mb-1">
            <BookOpen className="w-4 h-4" />
            <span>{language === 'hi' ? 'व्यावसायिक शब्दावली एवं संदर्भ कोष' : 'International Spa Terminology & Glossary'}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332]">
            {language === 'hi' ? 'स्पा शब्दकोश एवं शब्दावली' : 'Spa Dictionary & Clinical Glossary'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            {language === 'hi'
              ? 'स्वीडिश, आयुर्वेद, एनाटॉमी और एरोमाथेरेपी से जुड़े महत्वपूर्ण शब्दों की द्विभाषी परिभाषाएं खोजें।'
              : 'Search international spa, holistic massage, anatomical and hydrotherapy terminologies with English and Hindi definitions.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'hi' ? 'शब्दावली खोजें...' : 'Search term or keyword...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F]"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-[#2D6A4F] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerms.map((item) => (
          <div
            key={item.term}
            className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs hover:border-emerald-300 transition-all duration-200 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#2D6A4F]/10 text-[#2D6A4F]">
                  {item.category}
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  {item.termHi}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#1B4332]">
                {item.term}
              </h3>

              <p className="text-xs text-stone-700 leading-relaxed mt-2">
                {item.definition}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                {language === 'hi' ? 'हिंदी व्याख्या:' : 'Hindi Definition:'}
              </span>
              <p className="text-xs text-stone-600">
                {item.definitionHi}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto">
          <BookOpen className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-600 font-semibold text-sm">No glossary terms found matching "{searchTerm}"</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="mt-3 text-xs font-bold text-[#2D6A4F] hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
