import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { essentialOilsData } from '../data/oilsAndGlossaryData';
import { EssentialOil } from '../types';
import { 
  Droplet, 
  Sparkles, 
  AlertTriangle, 
  Calculator, 
  Check, 
  Layers, 
  ShieldCheck,
  FlaskConical,
  Heart
} from 'lucide-react';

export const AromatherapyGuide: React.FC = () => {
  const { language } = useCourse();

  const [selectedOil, setSelectedOil] = useState<EssentialOil>(essentialOilsData[0]);

  // Calculator State
  const [carrierVolumeMl, setCarrierVolumeMl] = useState<number>(30);
  const [targetDilutionPercent, setTargetDilutionPercent] = useState<number>(2.0);

  // Calculation Math:
  // Rule of thumb: 1 ml carrier oil ≈ 20 drops.
  // Total drops in bottle = carrierVolumeMl * 20.
  // Essential oil drops needed = Total drops * (targetDilutionPercent / 100).
  const calculatedDrops = Math.round(carrierVolumeMl * 20 * (targetDilutionPercent / 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F] mb-1">
            <Droplet className="w-4 h-4" />
            <span>{language === 'hi' ? 'सुगंध चिकित्सा व तेल मिश्रण विज्ञान' : 'Clinical Aromatherapy & Botanical Blending'}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332]">
            {language === 'hi' ? 'अरोमाथेरेपी एवं आवश्यक तेल गाइड' : 'Essential Oils Encyclopedia & Blending Lab'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            {language === 'hi'
              ? 'शुद्ध आवश्यक तेलों के चिकित्सीय गुण, त्वचा के अनुसार कैरियर ऑयल्स का चुनाव और सुरक्षित डायल्यूशन कैलकुलेटर का उपयोग करें।'
              : 'Explore therapeutic profiles of botanical essences, carrier oil synergies, and calculate precise safe dilution ratios for clients.'}
          </p>
        </div>
      </div>

      {/* Interactive Dilution Calculator Module */}
      <div className="bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#081C15] text-white rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
          <FlaskConical className="w-4 h-4" />
          <span>{language === 'hi' ? 'स्पा डायल्यूशन कैलकुलेटर (Dilution Calculator)' : 'Professional Spa Dilution Calculator'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Step 1: Bottle Volume */}
          <div className="space-y-2 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <label className="text-xs font-semibold text-emerald-200 block">
              1. {language === 'hi' ? 'कैरियर ऑयल की मात्रा (Bottle Size):' : 'Carrier Oil Volume:'}
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[15, 30, 50, 100].map((vol) => (
                <button
                  key={vol}
                  onClick={() => setCarrierVolumeMl(vol)}
                  className={`py-2 text-xs font-bold rounded-xl transition ${
                    carrierVolumeMl === vol
                      ? 'bg-[#E9C46A] text-stone-900 shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {vol}ml
                </button>
              ))}
            </div>
            <p className="text-[11px] text-emerald-200/80">
              {carrierVolumeMl === 30 ? 'Standard 1oz single full body session' : `${carrierVolumeMl}ml base carrier`}
            </p>
          </div>

          {/* Step 2: Target Dilution % */}
          <div className="space-y-2 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <label className="text-xs font-semibold text-emerald-200 block">
              2. {language === 'hi' ? 'लक्ष्य डायल्यूशन अनुपात (%):' : 'Target Dilution Percentage:'}
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[0.5, 1.0, 2.0, 3.0].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setTargetDilutionPercent(pct)}
                  className={`py-2 text-xs font-bold rounded-xl transition ${
                    targetDilutionPercent === pct
                      ? 'bg-[#E9C46A] text-stone-900 shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
            <p className="text-[11px] text-emerald-200/80">
              {targetDilutionPercent === 2.0
                ? 'Standard Full Body Relaxation'
                : targetDilutionPercent === 1.0
                ? 'Facial / Sensitive Skin / Elderly'
                : targetDilutionPercent === 0.5
                ? 'Ultra Gentle / Children'
                : 'Acute Local Joint / Muscle Knots'}
            </p>
          </div>

          {/* Step 3: Resulting Exact Drops Box */}
          <div className="bg-white text-stone-900 p-5 rounded-2xl shadow-md space-y-2 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              {language === 'hi' ? 'आवश्यक कुल तेल बूंदें:' : 'Required Essential Oil Drops:'}
            </span>
            <div className="text-3xl sm:text-4xl font-serif font-extrabold text-[#2D6A4F]">
              {calculatedDrops} Drops <span className="text-xs font-sans font-normal text-stone-500">total</span>
            </div>
            <p className="text-xs text-stone-600">
              In <span className="font-bold text-[#2D6A4F]">{carrierVolumeMl}ml</span> carrier oil for <span className="font-bold text-[#2D6A4F]">{targetDilutionPercent}%</span> strength.
            </p>
          </div>

        </div>
      </div>

      {/* Main Essential Oils Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 4 cols: Oil Selection List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-base text-[#1B4332] flex items-center gap-2">
              <Droplet className="w-4 h-4 text-[#2D6A4F]" />
              <span>{language === 'hi' ? 'स्पा तेल सूची (6 Essential Oils)' : 'Therapeutic Essential Oils'}</span>
            </h3>

            <div className="space-y-2">
              {essentialOilsData.map((oil) => {
                const isSelected = oil.id === selectedOil.id;
                return (
                  <button
                    key={oil.id}
                    onClick={() => setSelectedOil(oil)}
                    className={`w-full text-left p-3 rounded-2xl transition border flex items-center gap-3 ${
                      isSelected
                        ? 'bg-[#2D6A4F] text-white border-[#2D6A4F] shadow-sm'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs flex-shrink-0"
                      style={{ backgroundColor: oil.color }}
                    >
                      <Droplet className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-semibold truncate">
                          {language === 'hi' ? oil.hindiName : oil.name}
                        </h4>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                        }`}>
                          {oil.therapeuticGrade.split(' ')[0]}
                        </span>
                      </div>
                      <p className={`text-[11px] truncate mt-0.5 italic ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                        {oil.botanicalName}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Carrier Oils Synergy Guide Box */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D4A373]" />
              <span>{language === 'hi' ? 'कैरियर ऑयल्स (Base Oils)' : 'Carrier Oil Selection'}</span>
            </h4>
            <div className="space-y-2 text-xs text-stone-600">
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-[#2D6A4F] block">Jojoba Oil:</span>
                Mirrors skin natural sebum, non-comedogenic, ideal for face & oily skin.
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-[#2D6A4F] block">Sweet Almond Oil:</span>
                Classic glide, vitamin E rich, best for full body dry skin massage.
              </div>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="font-bold text-[#2D6A4F] block">Grapeseed Oil:</span>
                Ultra lightweight, fast absorbing, leaves zero greasy residue.
              </div>
            </div>
          </div>
        </div>

        {/* Right 8 cols: Detailed Essential Oil Profile Card */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            
            {/* Header */}
            <div className="border-b border-stone-100 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 bg-[#2D6A4F]/10 text-[#2D6A4F] rounded-full text-xs font-bold">
                  Note: {selectedOil.therapeuticGrade}
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
                  Safe Dilution: {selectedOil.dilutionSafety.split(' ')[0]}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B4332]">
                {language === 'hi' ? selectedOil.hindiName : selectedOil.name}
              </h2>
              <p className="text-xs sm:text-sm italic font-mono text-stone-500 mt-1">
                Botanical Name: {selectedOil.botanicalName}
              </p>
            </div>

            {/* Scent & Aroma Profile */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
              <span className="font-bold text-stone-700 block mb-1">
                {language === 'hi' ? 'सुगंध की प्रकृति (Aroma Profile):' : 'Olfactory Scent Profile:'}
              </span>
              <p className="text-stone-800 text-sm font-medium">
                {selectedOil.scentProfile}
              </p>
            </div>

            {/* Primary Therapeutic Benefits */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
                <Sparkles className="w-4 h-4" />
                <span>{language === 'hi' ? 'मुख्य चिकित्सीय लाभ (Key Benefits)' : 'Therapeutic Benefits'}</span>
              </div>
              <div className="space-y-2">
                {(language === 'hi' ? selectedOil.primaryBenefitsHi : selectedOil.primaryBenefits).map((ben, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <Check className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Blending Synergy & Recommended Carriers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80">
                <span className="font-bold text-emerald-950 block mb-1">
                  {language === 'hi' ? 'मिश्रण तालमेल (Blending Synergy):' : 'Blending Synergy Partners:'}
                </span>
                <p className="text-emerald-900 leading-relaxed">
                  {selectedOil.blendingNotes}
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                <span className="font-bold text-stone-700 block mb-1">
                  {language === 'hi' ? 'सर्वोत्तम कैरियर ऑयल:' : 'Ideal Base Carriers:'}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedOil.recommendedCarriers.map((c, cIdx) => (
                    <span key={cIdx} className="px-2.5 py-1 bg-white text-stone-700 rounded-lg border border-stone-200 font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contraindications Warning */}
            <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-red-700">
                <AlertTriangle className="w-4 h-4" />
                <span>{language === 'hi' ? 'सावधानियां (Contraindications):' : 'Contraindications & Safety Warnings:'}</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                {(language === 'hi' ? selectedOil.contraindicationsHi : selectedOil.contraindications).map((ci, cIdx) => (
                  <li key={cIdx}>{ci}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
