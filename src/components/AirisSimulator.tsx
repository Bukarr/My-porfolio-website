import React, { useState } from 'react';
import { Camera, Bot, Sparkles, RefreshCw, Layers, ZoomIn } from 'lucide-react';

interface PredefinedObject {
  id: string;
  name: string;
  emoji: string;
  category: string;
  confidence: number;
  description: string;
  context: string;
}

const PRESET_OBJECTS: PredefinedObject[] = [
  {
    id: 'ficus',
    name: 'Ficus Houseplant',
    emoji: '🌿',
    category: 'Flora & Agricultural Science',
    confidence: 99.8,
    description: 'An indoor ornamental plant featuring deep-green glossy structural leaves.',
    context: 'Aligns with agricultural science curriculums. Best suited for high humidity areas. Helps purify indoor air spaces naturally by absorbing common VOC compounds.'
  },
  {
    id: 'abu_book',
    name: 'Ahmadu Bello University Textbook',
    emoji: '📘',
    category: 'Higher Educational Resource',
    confidence: 97.4,
    description: 'A study syllabus compendium focused on Introductory Computer/Integrated Science courses in Nigeria.',
    context: 'Aligned to NERDC tertiary standards. Essential academic material for coursework at Ahmadu Bello University and FUE Zaria Computer Science cohorts.'
  },
  {
    id: 'meds',
    name: 'Certified Essential Medication',
    emoji: '💊',
    category: 'Pharmacology & Health Education',
    confidence: 98.2,
    description: 'Approved pharmaceutical capsules containing precise dosage identifiers.',
    context: 'Used for medical literacy. Safe handling guides suggest keeping stored away from direct sunlight at under 30°C temperature points.'
  },
  {
    id: 'leather_art',
    name: 'Zaria Traditional Leatherwork',
    emoji: '👜',
    category: 'Cultural Art & Trade Aesthetics',
    confidence: 99.1,
    description: 'Handcrafted premium goatskin leather art piece depicting northern Nigerian geometrical motifs.',
    context: 'Sourced from the historic tanneries of Zaria. High commercial and design heritage value, showcasing outstanding local craftsmanship.'
  }
];

export default function AirisSimulator() {
  const [selectedObjectId, setSelectedObjectId] = useState<string>('ficus');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(true);

  const activeObject = PRESET_OBJECTS.find(o => o.id === selectedObjectId) || PRESET_OBJECTS[0];

  const handleScanTrigger = (id: string) => {
    setSelectedObjectId(id);
    setIsScanning(true);
    setScanComplete(false);

    // Simulate real-time vision parsing sweeps
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1500);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl w-full p-4 md:p-6 overflow-hidden glass-panel emerald-card-glow text-left transition-all duration-300" id="airis-vision-simulator">
      
      {/* Header info */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Camera className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-display font-bold text-white tracking-wide">Airis Vision Simulator</h3>
          </div>
          <p className="text-[10px] text-slate-400">
            Real-time object categorization & educational context analyzer powered by Gemini Vision API
          </p>
        </div>
        <span className="text-[9px] font-mono tracking-wider bg-emerald-500/20 text-[#00f0a0] px-2.5 py-1 rounded-sm border border-emerald-500/20 whitespace-nowrap">
          Multimodal API Live
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left column: Camera Mock Screen */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-3xs font-mono uppercase text-slate-500 tracking-wider block">Simulator Camera Feed</span>
          
          <div className="relative aspect-square rounded-xl bg-slate-950/80 border border-white/15 overflow-hidden flex flex-col items-center justify-center group">
            {/* Overlay grid lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
            
            {/* Absolute scanning sweep line */}
            {isScanning && (
              <div className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#00f0a0] to-transparent shadow-[0_0_15px_#00f0a0] z-20 animate-bounce" style={{ top: '20%' }}></div>
            )}

            {/* Selected object giant emoji preview */}
            <div className={`text-6xl text-center select-none transition-all duration-500 ${isScanning ? 'scale-110 blur-sm brightness-125' : 'scale-100'}`}>
              {activeObject.emoji}
            </div>

            {/* Subtitles inside webcam box */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[9px] font-mono bg-black/60 backdrop-blur-sm px-2.5 py-1.5 rounded-md border border-white/5 z-10">
              <span className="text-slate-300 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-amber-400 animate-pulse' : 'bg-[#00f0a0]'}`}></span>
                <span>{isScanning ? 'SYSTEM RUNNING SWEEP...' : 'AURA_INPUT_READY'}</span>
              </span>
              <span className="text-slate-500">ISO 400 • f/2.8</span>
            </div>

            <div className="absolute top-2 right-2 p-1 bg-white/5 border border-white/10 rounded">
              <ZoomIn className="h-3 w-3 text-slate-400" />
            </div>
          </div>

          {/* Quick preset selector buttons */}
          <div className="space-y-1.5">
            <span className="text-3xs font-mono uppercase text-slate-500 tracking-wider block">Select Object To Point Camera At:</span>
            <div className="grid grid-cols-2 gap-1.5">
              {PRESET_OBJECTS.map(obj => (
                <button
                  key={obj.id}
                  onClick={() => handleScanTrigger(obj.id)}
                  disabled={isScanning}
                  className={`p-2 rounded-lg border text-left text-3xs transition-all flex items-center gap-2 cursor-pointer ${
                    selectedObjectId === obj.id
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-[#00f0a0] font-medium'
                      : 'bg-white/5 border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/10'
                  }`}
                  id={`airis-preset-${obj.id}`}
                >
                  <span className="text-base shrink-0">{obj.emoji}</span>
                  <span className="truncate">{obj.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Analytical readout */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-white/5 border border-white/10 rounded-xl p-4 md:p-5 relative overflow-hidden h-full">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-3xs font-mono uppercase text-slate-500 tracking-wider">Gemini Vision Readout</span>
              <span className="text-3xs font-mono text-[#00f0a0] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                Confidence: {isScanning ? '...' : `${activeObject.confidence}%`}
              </span>
            </div>

            {isScanning ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                <RefreshCw className="h-6 w-6 text-[#00f0a0] animate-spin" />
                <span className="text-3xs font-mono text-slate-400">INTERSECTING MULTIMODAL VECTORS...</span>
              </div>
            ) : scanComplete ? (
              <div className="space-y-3 font-sans">
                <div>
                  <span className="text-[9px] font-mono uppercase text-[#00f0a0] block mb-1">Coded Identifier</span>
                  <h4 className="text-sm font-display font-extrabold text-white">{activeObject.name}</h4>
                  <span className="text-3xs text-slate-400 font-mono italic block">{activeObject.category}</span>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <span className="text-[9px] font-mono text-slate-500 uppercase block mb-1">Identified Details</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{activeObject.description}</p>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <span className="text-[9px] font-mono text-[#00f0a0] uppercase block mb-1 flex items-center gap-1">
                    <Bot className="h-3.5 w-3.5" />
                    <span>Real-world & Tech Literacy Context</span>
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-emerald-500/5 p-2.5 rounded-lg border border-emerald-500/10">
                    {activeObject.context}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between text-3xs font-mono text-slate-500">
            <span>MULTIMODAL DECODING: ACTIVE</span>
            <span>MODEL: GEMINI-PRO-V</span>
          </div>
        </div>

      </div>
    </div>
  );
}
