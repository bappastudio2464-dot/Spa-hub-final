import React, { useState, useEffect, useRef } from 'react';
import { useCourse } from '../context/CourseContext';
import { PracticeLog } from '../types';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Bell, 
  Star, 
  Plus, 
  History, 
  Sparkles, 
  Volume2,
  CheckCircle2
} from 'lucide-react';

export const PracticeTimer: React.FC = () => {
  const { language, practiceLogs, addPracticeLog } = useCourse();

  const [durationMinutes, setDurationMinutes] = useState<number>(30);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedTechnique, setSelectedTechnique] = useState<string>('Swedish Back Flow');
  const [modelType, setModelType] = useState<'Training Dummy' | 'Volunteer/Friend' | 'Client' | 'Self-Stretching'>('Volunteer/Friend');
  const [sessionRating, setSessionRating] = useState<number>(5);
  const [sessionNotes, setSessionNotes] = useState<string>('');
  const [showLogModal, setShowLogModal] = useState<boolean>(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play soothing Tibetan Singing Bowl / Chime using Web Audio API
  const playZenBellChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(432, now); // 432 Hz healing tone
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(864, now); // Octave overtone

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 4.5);
      osc2.stop(now + 4.5);
    } catch (e) {
      console.warn('Audio chime error', e);
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(sec => sec - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isActive) {
      setIsActive(false);
      playZenBellChime();
      setShowLogModal(true);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const setTimerPreset = (mins: number) => {
    setDurationMinutes(mins);
    setSecondsRemaining(mins * 60);
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSecondsRemaining(durationMinutes * 60);
  };

  const handleSaveLog = () => {
    addPracticeLog({
      technique: selectedTechnique,
      durationMinutes,
      modelType,
      notes: sessionNotes.trim() || 'Completed hands-on practical session.',
      rating: sessionRating,
    });
    setSessionNotes('');
    setShowLogModal(false);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalPracticeHours = (practiceLogs.reduce((acc, log) => acc + log.durationMinutes, 0) / 60).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F] mb-1">
            <Timer className="w-4 h-4" />
            <span>{language === 'hi' ? 'हैंड्स-ऑन प्रैक्टिकल वर्कशॉप' : 'Practical Hands-on Practice Studio'}</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B4332]">
            {language === 'hi' ? 'अभ्यास टाइमर एवं प्रैक्टिकल लॉग बुक' : 'Technique Practice Timer & Logbook'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
            {language === 'hi'
              ? 'डमी या मॉडल पर अभ्यास करते समय टाइमर सेट करें और अपने ट्रेनिंग घंटे रिकॉर्ड करें।'
              : 'Time your physical massage choreography, receive gentle Zen interval chimes, and log your hands-on clinical hours.'}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-2xl">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">
              {language === 'hi' ? 'कुल प्रैक्टिस समय' : 'Total Practice Logged'}
            </span>
            <span className="text-xl font-bold text-emerald-950 font-mono">
              {totalPracticeHours} hrs
            </span>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Timer + Logbook */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 6 cols: Spa Zen Timer Card */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#081C15] text-white rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col items-center justify-between space-y-8">
          
          {/* Preset Buttons */}
          <div className="w-full flex items-center justify-center gap-2 flex-wrap">
            {[15, 30, 45, 60, 90].map((mins) => (
              <button
                key={mins}
                onClick={() => setTimerPreset(mins)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  durationMinutes === mins
                    ? 'bg-[#E9C46A] text-stone-900 shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>

          {/* Big Zen Digital Countdown Ring */}
          <div className="relative w-60 h-60 flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="text-white/10"
                strokeWidth="6"
                stroke="currentColor"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className="text-[#E9C46A] transition-all duration-1000 ease-linear"
                strokeWidth="6"
                strokeDasharray="276"
                strokeDashoffset={276 - (276 * (secondsRemaining / (durationMinutes * 60)))}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
              />
            </svg>

            {/* Center Time Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-4xl sm:text-5xl font-mono font-extrabold tracking-tight text-white drop-shadow-md">
                {formatTimer(secondsRemaining)}
              </span>
              <span className="text-xs text-emerald-200 mt-1 uppercase tracking-widest font-semibold">
                {selectedTechnique}
              </span>
            </div>
          </div>

          {/* Timer Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-8 py-3.5 bg-[#E9C46A] hover:bg-[#F4A261] text-stone-900 rounded-2xl font-bold text-sm shadow-md transition flex items-center gap-2 transform hover:scale-105"
            >
              {isActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isActive ? (language === 'hi' ? 'रोकें (Pause)' : 'Pause Timer') : (language === 'hi' ? 'शुरू करें (Start)' : 'Start Practice')}</span>
            </button>

            <button
              onClick={resetTimer}
              className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={playZenBellChime}
              className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition"
              title="Test Zen Bell Chime"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-emerald-200/70 text-center italic">
            {language === 'hi' ? 'सत्र समाप्त होने पर मधुर घंटानाद बजेगा।' : 'A soothing 432Hz Zen chime sounds upon completion.'}
          </p>
        </div>

        {/* Right 6 cols: Log Session & History */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Quick Session Logger Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-[#1B4332] flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#2D6A4F]" />
                <span>{language === 'hi' ? 'नया अभ्यास सत्र दर्ज करें' : 'Log Clinical Practice Session'}</span>
              </h3>
            </div>

            <div className="space-y-4">
              {/* Technique Selector */}
              <div>
                <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                  {language === 'hi' ? 'अभ्यास की गई थेरेपी:' : 'Therapy Technique:'}
                </label>
                <select
                  value={selectedTechnique}
                  onChange={(e) => setSelectedTechnique(e.target.value)}
                  className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] text-stone-800 font-medium"
                >
                  <option value="Swedish Back Flow (5 Strokes)">Swedish Full Back Flow (5 Strokes)</option>
                  <option value="Deep Tissue Neck & Trapezius">Deep Tissue Neck & Trapezius Knots</option>
                  <option value="Hot Stone Basalt Glides">Hot Stone Basalt Glides & Placement</option>
                  <option value="Thai Floor Mat Yoga Stretches">Thai Floor Mat Yoga Stretches</option>
                  <option value="Foot Reflexology Organ Mapping">Foot Reflexology Organ Mapping</option>
                  <option value="Aromatherapy Blending Lab">Aromatherapy Blending & Dilution</option>
                </select>
              </div>

              {/* Model Type */}
              <div>
                <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                  {language === 'hi' ? 'मॉडल का प्रकार:' : 'Practice Model / Recipient:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Training Dummy', 'Volunteer/Friend', 'Client', 'Self-Stretching'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setModelType(m)}
                      className={`p-2.5 text-xs font-semibold rounded-xl border transition text-left ${
                        modelType === m
                          ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Self-Rating Star Selector */}
              <div>
                <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                  {language === 'hi' ? 'आत्म-मूल्यांकन रेटिंग:' : 'Technique Fluidity Rating:'}
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSessionRating(star)}
                      className="p-1"
                    >
                      <Star className={`w-6 h-6 ${star <= sessionRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-stone-600 uppercase tracking-wider block mb-1.5">
                  {language === 'hi' ? 'टिप्पणी व फीडबैक:' : 'Self-Reflection & Feedback Notes:'}
                </label>
                <textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder={language === 'hi' ? 'दबाव नियंत्रण, एर्गोनॉमिक्स या क्लाइंट की प्रतिक्रिया...' : 'Notes on stance, elbow angles, pressure calibration...'}
                  rows={2}
                  className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>

              <button
                onClick={handleSaveLog}
                className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                {language === 'hi' ? 'सत्र लॉग सेव करें' : 'Save Session to Logbook'}
              </button>
            </div>
          </div>

          {/* Recent Practice History */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-base text-[#1B4332] flex items-center gap-2">
              <History className="w-4 h-4 text-[#2D6A4F]" />
              <span>{language === 'hi' ? 'अभ्यास इतिहास (Recent Logs)' : 'Practice Log History'}</span>
            </h3>

            {practiceLogs.length === 0 ? (
              <p className="text-xs text-stone-400 italic">No practical sessions recorded yet.</p>
            ) : (
              <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                {practiceLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-stone-50 border border-stone-200 rounded-2xl flex items-start justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-stone-800">{log.technique}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {log.durationMinutes} mins • {log.modelType} • {log.date}
                      </div>
                      {log.notes && <p className="text-[11px] text-stone-600 mt-1 italic">"{log.notes}"</p>}
                    </div>

                    <div className="flex items-center text-amber-500 font-bold flex-shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      <span>{log.rating}/5</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
