import React, { useState } from 'react';
import { useCourse } from '../context/CourseContext';
import { pressurePointsData } from '../data/anatomyData';
import { PressurePoint } from '../types';
import { 
  Activity, 
  Sparkles, 
  AlertTriangle, 
  Check, 
  Layers, 
  Crosshair, 
  HeartHandshake, 
  Compass, 
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export const AnatomyExplorer: React.FC = () => {
  const { language } = useCourse();

  const [activeView, setActiveView] = useState<'back' | 'front'>('back');
  const [selectedPointId, setSelectedPointId] = useState<string>('pt-b1');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('All');

  const activePoints = pressurePointsData.filter(p => p.view === activeView);
  const selectedPoint = pressurePointsData.find(p => p.id === selectedPointId) || activePoints[0];

  const bodyParts = [
    'All',
    'Head & Neck',
    'Shoulders & Upper Back',
    'Lower Back & Glutes',
    'Arms & Hands',
    'Legs & Thighs',
    'Feet & Soles',
  ];

  const filteredPoints = activePoints.filter(p => {
    return selectedBodyPart === 'All' || p.bodyPart === selectedBodyPart;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F] mb-1">
            <Activity className="w-4 h-4" />
            <span>{language === 'hi' ? 'इंटरैक्टिव शरीर रचना व मर्म बिंदु' : 'Interactive Musculoskeletal & Marma Map'}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332]">
            {language === 'hi' ? 'प्रेशर पॉइंट्स और मांसपेशी गाइड' : 'Anatomy & Therapeutic Pressure Points'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            {language === 'hi'
              ? 'शरीर के संवेदनशील बिंदुओं, सही दबाव स्तर और मालिश तकनीकों को समझने के लिए किसी भी बिंदु पर क्लिक करें।'
              : 'Click any anatomical pressure point to reveal muscle targets, safe pressure grades, recommended stroke techniques, and contraindications.'}
          </p>
        </div>

        {/* Front / Back Toggle Controls */}
        <div className="flex items-center bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
          <button
            onClick={() => {
              setActiveView('back');
              setSelectedPointId('pt-b1');
            }}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
              activeView === 'back'
                ? 'bg-[#2D6A4F] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'hi' ? 'पीठ व पिछला भाग (Back View)' : 'Posterior (Back View)'}
          </button>
          <button
            onClick={() => {
              setActiveView('front');
              setSelectedPointId('pt-f1');
            }}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition ${
              activeView === 'front'
                ? 'bg-[#2D6A4F] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {language === 'hi' ? 'चेहरा व अगला भाग (Front View)' : 'Anterior (Front View)'}
          </button>
        </div>
      </div>

      {/* Main Grid: Body Map + Detailed Point Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 6 cols: Visual Body Diagram with Clickable Markers */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col items-center justify-between space-y-4">
          
          {/* Filter by Body Region */}
          <div className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2">
            {bodyParts.map((bp) => (
              <button
                key={bp}
                onClick={() => setSelectedBodyPart(bp)}
                className={`px-3 py-1 text-[11px] font-semibold rounded-full whitespace-nowrap transition ${
                  selectedBodyPart === bp
                    ? 'bg-[#2D6A4F] text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {bp}
              </button>
            ))}
          </div>

          {/* Interactive Silhouette Canvas Diagram */}
          <div className="relative w-full max-w-sm aspect-[3/5] bg-gradient-to-b from-stone-50 to-stone-100/60 rounded-3xl border border-stone-200/80 p-4 flex items-center justify-center overflow-hidden">
            
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-radial from-emerald-500/5 to-transparent" />

            {/* Stylized Human Body Silhouette SVG */}
            <svg
              viewBox="0 0 200 340"
              className="w-full h-full text-[#1B4332]/25 fill-current transition-all duration-300"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Head */}
              <circle cx="100" cy="35" r="20" opacity="0.85" />
              {/* Neck */}
              <rect x="94" y="52" width="12" height="15" rx="3" opacity="0.85" />
              {/* Shoulders & Torso */}
              <path
                d="M 60 68 C 80 62, 120 62, 140 68 C 150 72, 148 110, 142 145 C 140 160, 138 180, 134 195 C 120 200, 80 200, 66 195 C 62 180, 60 160, 58 145 C 52 110, 50 72, 60 68 Z"
                opacity="0.85"
              />
              {/* Arms */}
              <path
                d="M 58 72 C 45 88, 38 115, 34 145 C 30 170, 26 195, 24 210 C 22 218, 30 220, 34 214 C 40 195, 46 170, 50 145 C 54 125, 58 95, 62 76 Z"
                opacity="0.75"
              />
              <path
                d="M 142 72 C 155 88, 162 115, 166 145 C 170 170, 174 195, 176 210 C 178 218, 170 220, 166 214 C 160 195, 154 170, 150 145 C 146 125, 142 95, 138 76 Z"
                opacity="0.75"
              />
              {/* Legs & Calves */}
              <path
                d="M 68 195 C 72 230, 74 265, 72 295 C 70 310, 68 325, 66 332 C 72 334, 82 334, 86 325 C 88 305, 90 270, 92 230 C 94 200, 94 196, 94 196 Z"
                opacity="0.85"
              />
              <path
                d="M 132 195 C 128 230, 126 265, 128 295 C 130 310, 132 325, 134 332 C 128 334, 118 334, 114 325 C 112 305, 110 270, 108 230 C 106 200, 106 196, 106 196 Z"
                opacity="0.85"
              />
              {/* Spine indicator on Back View */}
              {activeView === 'back' && (
                <line x1="100" y1="65" x2="100" y2="185" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
              )}
            </svg>

            {/* Clickable Pressure Point Markers mapped by coordinates */}
            {filteredPoints.map((point) => {
              const isSelected = point.id === selectedPoint.id;
              return (
                <div
                  key={point.id}
                  onClick={() => setSelectedPointId(point.id)}
                  style={{
                    left: `${point.coordinates.x}%`,
                    top: `${point.coordinates.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group"
                >
                  {/* Outer Pulsing Ring when selected */}
                  {isSelected && (
                    <div className="absolute -inset-2 rounded-full bg-[#2D6A4F]/30 animate-ping" />
                  )}

                  {/* Marker Dot */}
                  <div className={`relative w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md transition-transform group-hover:scale-125 ${
                    isSelected
                      ? 'bg-[#2D6A4F] text-white ring-4 ring-[#2D6A4F]/20'
                      : 'bg-white text-[#1B4332] border border-[#2D6A4F]'
                  }`}>
                    <Crosshair className="w-3.5 h-3.5" />
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-stone-900 text-white text-[10px] font-semibold px-2 py-1 rounded-md whitespace-nowrap z-20 shadow-lg pointer-events-none">
                    {point.name}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-stone-400 italic text-center">
            {language === 'hi' 
              ? 'बिंदु की पूरी जानकारी देखने के लिए शरीर के किसी भी मार्कर पर क्लिक करें।' 
              : 'Click any crosshair marker on the body map to inspect therapeutic technique.'}
          </p>
        </div>

        {/* Right 6 cols: Detailed Pressure Point Information Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            
            {/* Title & Sanskrit Name */}
            <div className="border-b border-stone-100 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 bg-[#2D6A4F]/10 text-[#2D6A4F] rounded-full text-xs font-bold">
                  {selectedPoint.bodyPart}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedPoint.pressureGrade === 'Light'
                    ? 'bg-blue-100 text-blue-800'
                    : selectedPoint.pressureGrade === 'Medium'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  Pressure: {selectedPoint.pressureGrade}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332]">
                {language === 'hi' ? selectedPoint.nameHi : selectedPoint.name}
              </h2>

              {selectedPoint.sanskritOrTraditionalName && (
                <p className="text-xs font-mono font-semibold text-stone-400 mt-1">
                  Traditional Ref: {selectedPoint.sanskritOrTraditionalName}
                </p>
              )}
            </div>

            {/* Target Muscle Groups */}
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1">
                {language === 'hi' ? 'संबद्ध मांसपेशियां (Musculoskeletal Target):' : 'Anatomical Muscle Targets:'}
              </span>
              <p className="text-sm font-semibold text-stone-800">
                {selectedPoint.targetMuscles}
              </p>
            </div>

            {/* Stroke Technique Instructions */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
                <HeartHandshake className="w-4 h-4" />
                <span>{language === 'hi' ? 'अनुशंसित स्ट्रोक व थेरेपी विधि' : 'Recommended Stroke & Pressure Method'}</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200/60 font-medium">
                {selectedPoint.strokeType}
              </p>
            </div>

            {/* Therapeutic Benefits */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
                <Sparkles className="w-4 h-4" />
                <span>{language === 'hi' ? 'चिकित्सीय लाभ (Therapeutic Benefits)' : 'Physiological Benefits'}</span>
              </div>
              <div className="space-y-2">
                {(language === 'hi' ? selectedPoint.benefitsHi : selectedPoint.benefits).map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                    <Check className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cautions & Contraindications */}
            <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-red-700">
                <ShieldAlert className="w-4 h-4" />
                <span>{language === 'hi' ? 'सुरक्षा चेतावनी (Safety Caution):' : 'Safety Warning & Cautions:'}</span>
              </div>
              <p className="text-stone-700">
                {language === 'hi' ? selectedPoint.cautionsHi : selectedPoint.cautions}
              </p>
            </div>

            {/* Quick Points Carousel below for easy switching */}
            <div className="pt-4 border-t border-stone-100">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                {language === 'hi' ? 'इस क्षेत्र के अन्य बिंदु:' : 'Other Points in View:'}
              </span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {activePoints.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPointId(pt.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition border ${
                      pt.id === selectedPoint.id
                        ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {pt.name.split(' ')[0]} {pt.name.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
