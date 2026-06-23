/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Github, 
  Linkedin, 
  Twitter, 
  ChevronRight, 
  Menu, 
  X, 
  Layers, 
  Briefcase, 
  ArrowUpRight, 
  BookOpen, 
  User, 
  Globe,
  Sparkles,
  Zap,
  Coffee,
  CheckCircle2,
  Cpu,
  Award,
  Download,
  Facebook,
  MessageCircle,
  Palette,
  MessageSquare,
  Maximize2,
  Eye,
  Send,
  Check,
  Loader2,
  Sun,
  Moon
} from 'lucide-react';

// Custom Components
import ContactForm from './components/ContactForm';
import { Project } from './types';
import avatarHero from './assets/images/hero_personal_1782115814673.jpg';

const TECHNICAL_SKILLS = [
  {
    category: 'Software & Web Development',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS', 'PWA Architecture', 'Firebase', 'Supabase', 'Vite'],
  },
  {
    category: 'Design',
    skills: ['UI/UX Design', 'Brand Identity Systems', 'Digital Graphics', 'Figma', 'Canva', 'CorelDRAW', 'Visual Communication'],
  },
  {
    category: 'Tools & Workflow',
    skills: ['Git/GitHub', 'Gemini API Integration', 'Lovable', 'Responsive Design'],
  },
  {
    category: 'Advocacy & Communication',
    skills: ['Tech Literacy Advocacy', 'Curriculum-Aligned Content Design', 'Technical Writing', 'Workshop Facilitation', 'Community Organizing'],
  },
];

const RECENT_PROJECTS: Project[] = [
  {
    id: 'syllabix',
    title: 'Syllabix',
    category: 'Edtech Progressive Web App',
    description: 'AI lesson planning for Nigerian teachers.',
    longDescription: 'Syllabix is an AI-powered edtech Progressive Web App built specifically for Nigerian teachers. It generates structured lesson notes and copy notes aligned to NERDC/UBE and WAEC/SSCE curricula — the actual frameworks Nigerian educators work within, not generic templates.\n\nTeachers can generate a complete lesson plan in under a minute, export it as a PDF, and use the app offline. It was built because lesson planning in Nigerian schools is still largely manual, time-consuming, and disconnected from the digital tools that could make it faster.',
    tags: ['React', 'Vite', 'Lovable', 'Supabase', 'PWA', 'PDF Export'],
    githubUrl: 'https://github.com/bukarr',
    liveUrl: 'https://syllabixng.vercel.app',
    year: '2026',
    highlights: [
      'Generates NERDC/UBE & WAEC/SSCE curriculum-aligned lesson plans',
      'Enables teachers to generate plans under a minute & export as PDF',
      'Built with offline PWA features for schools with slow connectivity'
    ],
  },
  {
    id: 'airis',
    title: 'Airis',
    category: 'Multimodal Vision AI PWA',
    description: 'Point. Identify. Understand.',
    longDescription: 'Airis is a camera-based Progressive Web App that uses Google\'s Gemini Vision API to identify objects in real time. Point your camera at anything — a plant, a medication, a piece of equipment — and Airis tells you what it is and gives you relevant context about it.\n\nIt was built as an exploration of multimodal AI in a lightweight, accessible format. No app store download required. Works in the browser, on any device with a camera.',
    tags: ['React', 'Vite', 'Gemini Vision API', 'PWA'],
    githubUrl: 'https://github.com/bukarr',
    liveUrl: 'https://airis-cam.vercel.app',
    year: '2026',
    highlights: [
      'Identifies real-world elements like crops, medication & equipment',
      'Uses Gemini Vision API backend to generate smart contextual guidance',
      'Zero download required — works instantly inside mobile web browsers'
    ],
  },
  {
    id: 'aura',
    title: 'AURA',
    category: 'Remote Data Security Architecture',
    description: 'Remote employee data security, rethought.',
    longDescription: 'AURA is a remote employee data security system built during Wema Bank Hackaholics 6.0 at ABU Zaria in August 2025. The project tackled the growing problem of data exposure in distributed work environments — a challenge that became impossible to ignore as remote work expanded across Nigerian organizations without the accompanying security infrastructure.\n\nTeam AURA placed 3rd out of 9 competing teams. It was the project that introduced me to hackathon culture and confirmed that building under pressure, with a team, toward a real problem, is where I do some of my best work.',
    tags: ['Web-based', 'Security-focused', 'Hackaholics 6.0'],
    githubUrl: 'https://github.com/bukarr',
    liveUrl: 'https://bukarr-portfolio.vercel.app',
    year: '2025',
    highlights: [
      'Awarded 3rd Place out of 9 competitive entries in Wema Bank Hackaholics 6.0',
      'Addresses enterprise remote data leakage and exposure vectors',
      'Built under extreme hackathon pressure to solve real security dilemmas'
    ],
  },
];

export default function App() {
  const [projectImageErrors, setProjectImageErrors] = useState<Record<string, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string>('syllabix');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Inquiry & Lightbox States
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [inquiryProject, setInquiryProject] = useState<Project | null>(null);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Accessible theme visual variables
  const isDark = true;
  
  const cBg = 'bg-[#010603]';
  const cHeaderBg = 'bg-[#010603]/80 border-b border-white/10';
  const cTextTitle = 'text-white';
  const cTextBody = 'text-slate-200';
  const cTextMuted = 'text-slate-400';
  const cTextLight = 'text-slate-350';
  const cCard = 'bg-[#020704] border border-white/10';
  const cCardGlow = 'emerald-card-glow';
  const cBorder = 'border-white/10';
  const cBorderMuted = 'border-white/5';
  const cBadge = 'bg-emerald-500/10 border-emerald-500/20 text-[#00f0a0] font-bold';
  const cAccentText = 'text-[#00f0a0]';
  const cButtonPrimary = 'bg-[#031d13] border border-emerald-500/40 text-[#00f0a0] hover:bg-emerald-500/10';
  const cButtonSecondary = 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10';
  const cTimelineDot = 'bg-[#010603] border-[#00f0a0]';
  const cGridBg = 'bg-slate-950/40';
  const cInput = 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-emerald-500/50';
  
  const getProjectImageUrl = (id: string) => {
    if (projectImageErrors[id]) {
      return id === 'syllabix'
        ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&fit=crop'
        : id === 'airis'
          ? 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=1200&fit=crop'
          : id === 'aura'
            ? 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1200&fit=crop'
            : 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&fit=crop';
    }
    return `/project-images/${id}.png`;
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) return;
    setInquiryStatus('submitting');
    setTimeout(() => {
      setInquiryStatus('success');
      triggerToast(`Your question for ${inquiryProject?.title} has been submitted!`);
      setTimeout(() => {
        setInquiryProject(null);
        setInquiryName('');
        setInquiryEmail('');
        setInquiryMessage('');
        setInquiryStatus('idle');
      }, 1500);
    }, 1200);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedProject = RECENT_PROJECTS.find(p => p.id === activeProjectId) || RECENT_PROJECTS[0];

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${cBg} ${cTextBody} selection:bg-emerald-800/40 selection:text-[#00f0a0]`} id="applet-main-body">
      
      {/* Absolute Decorative Neon Emerald Glow Ornaments */}
      <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none transition-all duration-300 ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/2'}`}></div>
      <div className={`absolute top-[1200px] right-10 w-[400px] h-[400px] blur-[140px] rounded-full pointer-events-none transition-all duration-300 ${isDark ? 'bg-emerald-500/3' : 'bg-emerald-500/1'}`}></div>
      <div className={`absolute bottom-[200px] left-10 w-[350px] h-[350px] blur-[120px] rounded-full pointer-events-none transition-all duration-300 ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-500/2'}`}></div>

      {/* Modern Navigation Header Bar conforming to Frosted Glass specs */}
      <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${cHeaderBg}`} id="header-nav">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className={`text-sm font-mono font-bold tracking-tighter shadow-[0_0_15px_rgba(16,185,129,0.05)] border px-3 py-1.5 rounded-lg ${isDark ? 'text-[#00f0a0] bg-emerald-500/10 border-emerald-500/20' : 'text-emerald-700 bg-emerald-50 border-emerald-200'}`}>
              &lt;Bukarr /&gt;
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-xs font-display font-bold tracking-tight leading-none ${cTextTitle}`}>Abubakar Sadiq Tajudeen</h1>
              <span className={`text-[9px] font-mono tracking-widest leading-none block mt-0.5 uppercase ${cTextMuted}`}>Developer, Designer & Educator</span>
            </div>
          </motion.div>

          {/* Desktop Navigation Anchors */}
          <nav className={`hidden md:flex items-center gap-7 text-xs font-sans font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-emerald-700'}`}>About</a>
            <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-emerald-700'}`}>Experience</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-emerald-700'}`}>Projects</a>
            <a href="#design" onClick={(e) => { e.preventDefault(); scrollToSection('design'); }} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-emerald-700'}`}>Design</a>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-emerald-700'}`}>Skills</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-emerald-700'}`}>Contact</a>
          </nav>

          {/* Desktop Action Socials */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="https://github.com/bukarr" 
              target="_blank" 
              rel="noreferrer" 
              className={`p-2 border rounded-lg transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-400 hover:text-emerald-400' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600 hover:text-emerald-700'}`}
              id="desktop-github-link"
            >
              <Github className="h-4 w-4" />
            </a>
            <a 
              href="https://linkedin.com/in/bukarr1001" 
              target="_blank" 
              rel="noreferrer" 
              className={`p-2 border rounded-lg transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-400 hover:text-emerald-400' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-600 hover:text-emerald-700'}`}
              id="desktop-linkedin-link"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            {/* Download CV feature that links to resume PDF with Toast notification */}
            <a 
              href="/Abubakar_Sadiq_Tajudeen_CV.html"
              download="Abubakar_Sadiq_Tajudeen_CV.html"
              target="_blank"
              onClick={() => triggerToast("Abubakar's CV/Resume workspace has been opened!")}
              className={`px-4 py-1.5 border text-[10px] font-bold uppercase tracking-widest rounded-sm transition-all flex items-center gap-1.5 cursor-pointer ${isDark ? 'border-emerald-500/50 text-[#00f0a0] hover:bg-emerald-500/15' : 'bg-emerald-600 hover:bg-emerald-700 border-emerald-700 text-white'}`}
            >
              <Download className="h-3 w-3" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-all border ${isDark ? 'text-gray-400 hover:text-white hover:bg-emerald-950/10 border-transparent hover:border-emerald-900/40' : 'text-slate-700 hover:bg-slate-100 border-slate-200'}`}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`md:hidden border-t overflow-hidden ${isDark ? 'bg-[#010805] border-emerald-950/30' : 'bg-white border-slate-200 shadow-lg'}`}
              id="mobile-nav-panel"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium">
                <a href="#about" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('about'); }} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00f0a0]' : 'text-slate-650 hover:text-emerald-700'}`}>About</a>
                <a href="#experience" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('experience'); }} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00f0a0]' : 'text-slate-650 hover:text-emerald-700'}`}>Experience</a>
                <a href="#projects" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('projects'); }} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00f0a0]' : 'text-slate-650 hover:text-emerald-700'}`}>Projects</a>
                <a href="#design" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('design'); }} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00f0a0]' : 'text-slate-650 hover:text-emerald-700'}`}>Design</a>
                <a href="#skills" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('skills'); }} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00f0a0]' : 'text-slate-650 hover:text-emerald-700'}`}>Skills</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection('contact'); }} className={`transition-colors ${isDark ? 'text-gray-400 hover:text-[#00f0a0]' : 'text-slate-650 hover:text-emerald-700'}`}>Contact</a>
                <div className={`flex flex-col gap-3 pt-4 border-t ${isDark ? 'border-emerald-950' : 'border-slate-100'}`}>
                  <div className="flex gap-4">
                    <a href="https://github.com/bukarr" className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400 hover:text-emerald-cyber' : 'text-slate-650 hover:text-emerald-700'}`}>
                      <Github className="h-4 w-4" /> <span>GitHub</span>
                    </a>
                    <a href="https://linkedin.com/in/bukarr1001" className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400 hover:text-emerald-cyber' : 'text-slate-650 hover:text-emerald-700'}`}>
                      <Linkedin className="h-4 w-4" /> <span>LinkedIn</span>
                    </a>
                  </div>
                  {/* Download CV in mobile drawer */}
                  <a 
                    href="/Abubakar_Sadiq_Tajudeen_CV.html"
                    download="Abubakar_Sadiq_Tajudeen_CV.html"
                    target="_blank"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      triggerToast("Abubakar's CV/Resume workspace starting!");
                    }}
                    className={`px-4 py-2 border text-center text-xs font-bold uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 ${isDark ? 'border-emerald-500/50 text-[#00f0a0] hover:bg-emerald-500/10' : 'bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700'}`}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download CV</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container Wrapper */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10 space-y-24 md:space-y-36">

        {/* Hero Segment Section */}
        <section className="pt-8 md:pt-16 pb-4 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center" id="home">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Profile Image Div (Real Personal Photo matching attachment) */}
            <div className="relative group max-w-[150px] aspect-square rounded-2xl overflow-hidden border-2 border-emerald-500/30 bg-[#020d08] shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:border-emerald-500/60 transition-all duration-300">
              <img 
                src={avatarHero} 
                alt="Abubakar Sadiq Tajudeen" 
                className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#010603]/80 to-transparent pointer-events-none"></div>
            </div>

            <div className="space-y-1 pt-2">
              <h1 className={`text-2xl md:text-3xl lg:text-4xl font-display font-extrabold tracking-tight leading-none ${cTextTitle}`}>
                Abubakar Sadiq Tajudeen
              </h1>
              <span className={`text-[10px] font-mono tracking-[0.2em] px-3.5 py-1.5 rounded-full border inline-block uppercase mt-2 font-bold ${cBadge}`}>
                Zaria, Nigeria
              </span>
            </div>

            <h2 className={`text-4xl md:text-5xl lg:text-5.5xl font-display font-extrabold tracking-tight leading-tight ${cTextTitle}`}>
              Building from <span className={`${isDark ? 'text-gradient' : 'text-emerald-700'} font-extrabold`}>Zaria</span>, <br className="hidden md:block" />
              for the world.
            </h2>

            <p className={`text-sm md:text-base max-w-xl leading-relaxed font-sans ${cTextLight}`}>
              I'm Bukarr — a developer, graphic designer, and tech literacy advocate crafting products that work for African users, on African infrastructure.
            </p>

            {/* Micro stats banner indicators */}
            <div className={`grid grid-cols-3 gap-3 pt-4 border-t max-w-md ${cBorderMuted}`}>
              <div>
                <span className={`text-xl md:text-2xl font-bold font-mono block ${cTextTitle}`}>3</span>
                <span className={`text-[10px] font-mono uppercase tracking-widest block mt-0.5 font-bold ${cTextMuted}`}>Core Projects</span>
              </div>
              <div>
                <span className={`text-xl md:text-2xl font-bold font-mono block font-extrabold ${cAccentText}`}>August '25</span>
                <span className={`text-[10px] font-mono uppercase tracking-widest block mt-0.5 font-bold ${cTextMuted}`}>Wema Bronze</span>
              </div>
              <div>
                <span className={`text-xs sm:text-xs md:text-sm font-bold font-mono block leading-none pt-1 ${cTextTitle}`}>Zaria, Nigeria</span>
                <span className={`text-[10px] font-mono uppercase tracking-widest block mt-1.5 font-bold ${cTextMuted}`}>Base Station</span>
              </div>
            </div>

            {/* Actions call to buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-6">
              <a 
                href="#projects" 
                onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}
                className={`px-6 py-3 border rounded-xl font-display font-bold text-xs tracking-widest transition-all flex items-center gap-1.5 cursor-pointer uppercase font-sans font-bold ${cButtonPrimary}`}
                id="hero-view-work"
              >
                <span>See My Work</span>
                <ChevronRight className="h-4 w-4" />
              </a>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
                className={`px-6 py-3 border rounded-xl font-display font-bold text-xs tracking-widest transition-all flex items-center gap-1.5 cursor-pointer uppercase font-sans font-bold ${cButtonSecondary}`}
                id="hero-get-in-touch"
              >
                <span>Get In Touch</span>
              </a>
              <a 
                href="/Abubakar_Sadiq_Tajudeen_CV.html"
                download="Abubakar_Sadiq_Tajudeen_CV.html"
                target="_blank"
                onClick={() => triggerToast("Abubakar's CV/Resume workspace opened!")}
                className={`px-6 py-3 border rounded-xl font-display font-bold text-xs tracking-widest transition-all flex items-center gap-1.5 cursor-pointer uppercase font-sans font-bold ${
                  isDark 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-[#00f0a0] hover:text-white hover:bg-emerald-500/25' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                }`}
                id="hero-download-cv"
              >
                <Download className="h-4 w-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Hero Right Decorative Tech Spec / Aesthetic Card Grid */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className={`relative rounded-3xl p-6 md:p-8 overflow-hidden backdrop-blur-md transition-all duration-300 ${cCard} ${cCardGlow} text-left`}>
              {/* Abs grid bg mesh representation */}
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
              
              {/* Card visual elements */}
              <div className={`relative flex items-center justify-between border-b pb-4 mb-6 ${cBorderMuted}`}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/30 border border-emerald-500/50 animate-pulse"></span>
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-widest block font-bold ${cTextMuted}`}>Network Coordinates</span>
              </div>

              {/* Specs parameters lists represent developer bio summaries */}
              <div className="space-y-4 relative">
                <div className="flex gap-3">
                  <Cpu className={`h-5 w-5 shrink-0 mt-0.5 ${cAccentText}`} />
                  <div>
                    <span className={`text-[9px] font-mono uppercase tracking-widest block font-bold ${cAccentText}`}>Base Location</span>
                    <span className={`text-xs font-sans block ${cTextLight}`}>Zaria, Kaduna State, Nigeria</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Layers className={`h-5 w-5 shrink-0 mt-0.5 ${cAccentText}`} />
                  <div>
                    <span className={`text-[9px] font-mono uppercase tracking-widest block font-bold ${cAccentText}`}>Creative Vision</span>
                    <span className={`text-xs font-sans block ${cTextLight}`}>Designing products capable of serving offline limits, slow networking connections, and actual user constraints.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <GraduationCap className={`h-5 w-5 shrink-0 mt-0.5 ${cAccentText}`} />
                  <div>
                    <span className={`text-[9px] font-mono uppercase tracking-widest block font-bold ${cAccentText}`}>Studies & Leadership</span>
                    <span className={`text-xs font-sans block ${cTextLight}`}>Completing Computer/Integrated Science NCE and coordinating NACOS student initiatives.</span>
                  </div>
                </div>
              </div>

              {/* Developer tagline */}
              <div className={`border-t mt-6 pt-4 text-center ${cBorderMuted}`}>
                <span className={`text-3xs font-mono leading-normal block uppercase tracking-widest ${cTextMuted}`}>
                  Federal University of Education Zaria
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* About Me Section */}
        <section className="space-y-12 pt-4" id="about">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className={`text-[10px] font-mono tracking-[0.25em] px-3.5 py-1.5 rounded-full border uppercase inline-block font-bold ${cBadge}`}>
              My Journey
            </span>
            <h2 className={`text-2.5xl md:text-3xl lg:text-4xl font-display font-extrabold ${cTextTitle}`}>
              The Story & The Drive
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Full About Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className={`p-5 md:p-6 rounded-2xl relative overflow-hidden border ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50/70 border-emerald-100'}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full"></div>
                <p className={`text-xs md:text-sm font-semibold leading-relaxed relative ${cAccentText}`}>
                  "I started building on a phone. No laptop, no fast internet — just a stubborn belief that where you build from doesn't define what you can build. That origin shapes everything I make."
                </p>
              </div>

              <div className={`space-y-4 text-xs md:text-sm leading-relaxed font-sans ${cTextLight}`}>
                <p>
                  I'm a developer and designer based in Zaria, Nigeria. My work sits at the intersection of clean interfaces and real-world constraints: products that load on slow connections, make sense to first-time users, and solve problems that actually exist in my community and beyond.
                </p>
                <p>
                  I'm completing an NCE in Computer/Integrated Science at Federal University of Education Zaria, where I also serve as Organizing Secretary of the NACOS chapter and class representative. Beyond building, I advocate for tech literacy — because access to technology means nothing without the understanding to use it.
                </p>
                <p>
                  When I'm not coding or designing, I'm mentoring, writing, or thinking about how technology education in Nigeria can be better than it currently is.
                </p>
                <p className={`font-semibold font-sans ${cAccentText}`}>
                  I'm planning to pursue a Computer Science degree at Ahmadu Bello University — and I'll be building the whole time.
                </p>
              </div>
            </div>

            {/* Right Column: Short version (card/sidebar) */}
            <div className="lg:col-span-5 relative">
              <div className={`relative rounded-2xl p-6 md:p-8 overflow-hidden backdrop-blur-md transition-all duration-300 ${cCard} text-left`}>
                <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>
                
                <div className={`relative flex items-center justify-between border-b pb-4 mb-5 ${cBorderMuted}`}>
                  <span className={`text-[10px] font-mono uppercase tracking-widest block font-bold ${cAccentText}`}>Short Biography</span>
                  <span className={`text-[9px] font-mono uppercase tracking-widest block font-bold ${cTextMuted}`}>Zaria, NG</span>
                </div>

                <p className={`text-xs leading-relaxed font-sans mb-6 ${cTextLight}`}>
                  Abubakar Sadiq Tajudeen — Bukarr — is a self-taught developer and designer based in Zaria, Nigeria. He builds purposeful digital products, advocates for tech literacy in his community, and leads student tech initiatives at Federal University of Education Zaria.
                </p>

                {/* Micro metrics attributes */}
                <div className={`space-y-3 border-t pt-5 text-2xs ${cBorderMuted}`}>
                  <div className="flex justify-between">
                    <span className={`font-mono ${cTextMuted}`}>NCE Studies:</span>
                    <span className={cTextTitle}>FUE Zaria (Comp/Integrated Sci)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`font-mono ${cTextMuted}`}>Student Body:</span>
                    <span className={cTextTitle}>NACOS Organizing Secretary</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Experience & Timeline Section */}
        <section className="space-y-12" id="experience">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className={`text-[10px] font-mono tracking-[0.25em] px-3.5 py-1.5 rounded-full border uppercase inline-block font-bold ${cBadge}`}>
              Milestones
            </span>
            <h2 className={`text-2.5xl md:text-3xl lg:text-4xl font-display font-extrabold ${cTextTitle}`}>
              My Timeline & Experience
            </h2>
            <p className={`text-xs mt-2 ${cTextMuted}`}>
              A chronological map of academic representation, leadership, technical training, and hackathons.
            </p>
          </div>

          <div className={`max-w-3xl mx-auto relative pl-6 border-l space-y-8 py-2 text-left ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            {/* Timeline element 1 */}
            <div className="relative">
              {/* Dot */}
              <div className={`absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-4 shadow-sm transition-colors duration-300 ${isDark ? 'bg-[#00f0a0] border-[#010603] shadow-[0_0_10px_rgba(0,240,160,0.5)]' : 'bg-emerald-600 border-white shadow-md'}`}></div>
              <div>
                <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded font-bold ${cBadge}`}>
                  August 2025
                </span>
                <h3 className={`text-base font-display font-extrabold mt-2 flex flex-wrap items-center gap-2 ${cTextTitle}`}>
                  <span>Wema Bank Hackaholics 6.0 — Participant, Team AURA</span>
                  <span className={`text-xs font-sans font-medium px-2.5 py-0.5 rounded font-bold ${cBadge}`}>3rd Place Win</span>
                </h3>
                <span className={`text-2xs font-mono block mt-1 ${cTextMuted}`}>ABU Zaria • Hackathon</span>
                <p className={`text-xs mt-2 font-sans leading-relaxed ${cTextLight}`}>
                  Built AURA, a remote employee data security system, placing 3rd of 9 teams in my first competitive hackathon. The project tackled the growing problem of data exposure in distributed work environments, confirming that building under pressure, with a team, toward a real problem is where I do some of my best work.
                </p>
              </div>
            </div>

            {/* Timeline element 2 */}
            <div className="relative">
              <div className={`absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-4 shadow-sm transition-colors duration-300 ${isDark ? 'bg-emerald-500/50 border-[#010603]' : 'bg-emerald-300 border-white'}`}></div>
              <div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded font-bold ${cBadge}`}>
                    2025/26 Exco
                  </span>
                  <span className={`text-[9.5px] font-mono border px-2 py-0.5 rounded font-bold ${isDark ? 'bg-white/5 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    Leadership / NACOS
                  </span>
                </div>
                <h3 className={`text-base font-display font-extrabold mt-3 ${cTextTitle}`}>
                  NACOS, Federal University of Education Zaria — Organizing Secretary
                </h3>
                <span className={`text-2xs font-mono block mt-1 ${cTextMuted}`}>FUE Zaria • Student Association</span>
                <p className={`text-xs mt-2 font-sans leading-relaxed ${cTextLight}`}>
                  Leading event coordination, community engagement, and technical initiatives for the National Association of Computer Science Students chapter at FUE Zaria. Organized and facilitated activities that connect students to the wider Nigerian tech ecosystem.
                </p>
              </div>
            </div>

            {/* Timeline element 3 */}
            <div className="relative">
              <div className={`absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-4 shadow-sm transition-colors duration-300 ${isDark ? 'bg-emerald-500/50 border-[#010603]' : 'bg-emerald-300 border-white'}`}></div>
              <div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded font-bold ${cBadge}`}>
                    2022 - 2026
                  </span>
                  <span className={`text-[9.5px] font-mono border px-2 py-0.5 rounded font-bold ${isDark ? 'bg-white/5 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    Academic Representation
                  </span>
                </div>
                <h3 className={`text-base font-display font-extrabold mt-3 ${cTextTitle}`}>
                  Federal University of Education Zaria — Class Representative, Computer/Integrated Science
                </h3>
                <span className={`text-2xs font-mono block mt-1 ${cTextMuted}`}>FUE Zaria • NCE cohort coordinator</span>
                <p className={`text-xs mt-2 font-sans leading-relaxed ${cTextLight}`}>
                  Bridging students and faculty, handling administrative coordination, and keeping my cohort organized through the NCE program.
                </p>
              </div>
            </div>

            {/* Timeline element 4 */}
            <div className="relative">
              <div className={`absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-4 shadow-sm transition-colors duration-300 ${isDark ? 'bg-emerald-500/50 border-[#010603]' : 'bg-emerald-300 border-white'}`}></div>
              <div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded font-bold ${cBadge}`}>
                    December 2023 - May 2024
                  </span>
                  <span className={`text-[9.5px] font-mono border px-2 py-0.5 rounded font-bold ${isDark ? 'bg-white/5 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    SIWES Internship
                  </span>
                </div>
                <h3 className={`text-base font-display font-extrabold mt-3 ${cTextTitle}`}>
                  SIWES — Web Development Trainee, NCAT
                </h3>
                <span className={`text-2xs font-mono block mt-1 ${cTextMuted}`}>NCAT • Industry Experience</span>
                <p className={`text-xs mt-2 font-sans leading-relaxed ${cTextLight}`}>
                  Practical industry training in web development — where structured technical education met real-world application for the first time.
                </p>
              </div>
            </div>

            {/* Timeline element 5 */}
            <div className="relative">
              <div className={`absolute -left-[33px] top-1.5 w-4 h-4 rounded-full border-4 shadow-sm transition-colors duration-300 ${isDark ? 'bg-emerald-500/50 border-[#010603]' : 'bg-emerald-300 border-white'}`}></div>
              <div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded font-bold ${cBadge}`}>
                    2022 - March 2026
                  </span>
                  <span className={`text-[9.5px] font-mono border px-2 py-0.5 rounded font-bold ${isDark ? 'bg-white/5 text-slate-300 border-white/10' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    Instruction / Pedagogy
                  </span>
                </div>
                <h3 className={`text-base font-display font-extrabold mt-3 ${cTextTitle}`}>
                  Almanhaj Academy — Primary School Teacher (Part-time)
                </h3>
                <span className={`text-2xs font-mono block mt-1 ${cTextMuted}`}>Part-time teaching role</span>
                <p className={`text-xs mt-2 font-sans leading-relaxed ${cTextLight}`}>
                  Taught foundational subjects while integrating technology literacy into the classroom. Built the habit of making complex things simple for people who've never seen them before.
                </p>
              </div>
            </div>
          </div>

          {/* Certifications and Recognitions Row */}
          <div className={`max-w-3xl mx-auto pt-8 border-t mt-8 ${cBorderMuted}`}>
            <h4 className={`text-xs font-mono uppercase tracking-widest mb-4 text-left font-bold flex items-center gap-1.5 ${cAccentText}`}>
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Certifications / Recognition</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`border p-4 rounded-xl flex items-center gap-3 text-left ${cCard}`}>
                <div className={`p-2.5 rounded-lg ${cBadge}`}>
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h5 className={`text-xs font-display font-extrabold leading-normal ${cTextTitle}`}>Anthropic AI Learning Certification</h5>
                  <p className={`text-[9px] font-mono mt-0.5 ${cTextMuted}`}>TECHNICAL CREDENTIAL</p>
                </div>
              </div>

              <div className={`border p-4 rounded-xl flex items-center gap-3 text-left ${cCard}`}>
                <div className={`p-2.5 rounded-lg ${cBadge}`}>
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h5 className={`text-xs font-display font-extrabold leading-normal ${cTextTitle}`}>Wema Bank Hackaholics 6.0</h5>
                  <p className={`text-[9px] font-mono mt-0.5 ${cTextMuted}`}>3RD PLACE WIN • TEAM AURA</p>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Technical Stack / "What I Build With" Section */}
        <section className="space-y-10" id="skills">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className={`text-[10px] font-mono tracking-[0.25em] px-3.5 py-1.5 rounded-full border uppercase inline-block font-bold ${cBadge}`}>
              What I build with
            </span>
            <h2 className={`text-2.5xl md:text-3xl lg:text-4xl font-display font-extrabold ${cTextTitle}`}>
              My Engineering Stack
            </h2>
            <p className={`text-xs md:text-sm ${cTextMuted}`}>
              A comprehensive selection of tools, libraries, and design interfaces compiled specifically to produce responsive outputs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TECHNICAL_SKILLS.map((item, id) => (
              <div 
                key={id} 
                className={`p-6 rounded-2xl relative overflow-hidden group transition-all duration-300 border ${cCard}`}
                id={`skill-card-${id}`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/2 blur-2xl rounded-full"></div>
                <h3 className="text-xs font-display font-bold text-gradient uppercase tracking-widest border-b border-white/5 pb-3 mb-4">
                  {item.category}
                </h3>
                <ul className="space-y-2.5">
                  {item.skills.map((skill, si) => (
                    <li key={si} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="font-sans">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Shipped Products & Dynamic Demos Section */}
        <section className="space-y-10" id="projects">
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b ${cBorderMuted}`}>
            <div className="space-y-2">
              <span className={`text-[10px] font-mono tracking-[0.25em] px-3.5 py-1.5 rounded-full border uppercase inline-block font-bold ${cBadge}`}>
                Things I've shipped
              </span>
              <h2 className={`text-2.5xl md:text-3xl lg:text-4xl font-display font-extrabold tracking-tight ${cTextTitle}`}>
                Featured Live Projects
              </h2>
              <p className={`text-xs md:text-sm max-w-lg leading-relaxed ${cTextMuted}`}>
                Click on the core projects below to read specs, view screenshots, or inspect screenshots in high resolution!
              </p>
            </div>

            {/* Big interactive project tabs switcher */}
            <div className={`flex gap-2 backdrop-blur-md p-1 rounded-xl border self-start md:self-auto overflow-x-auto min-w-[280px] ${cCard}`}>
              {RECENT_PROJECTS.map(proj => (
                <button
                  key={proj.id}
                  onClick={() => setActiveProjectId(proj.id)}
                  className={`px-3 py-2 rounded-lg text-2xs font-display font-bold uppercase tracking-wider transition-all truncate cursor-pointer ${
                    activeProjectId === proj.id
                      ? isDark 
                        ? 'bg-emerald-500/20 text-[#00f0a0] border border-emerald-500/40 shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-emerald-700'
                  }`}
                  id={`project-switcher-${proj.id}`}
                >
                  {proj.title}
                </button>
              ))}
            </div>
          </div>

          {/* Double column overview layout: Left specs / Right demo container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left specifications column — Card width span 4 */}
            <div className={`backdrop-blur-md rounded-2xl p-6 space-y-5 lg:col-span-4 text-left h-full flex flex-col justify-between border ${cCard} ${cCardGlow}`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[9px] font-mono uppercase tracking-widest ${cAccentText}`}>
                    {selectedProject.category}
                  </span>
                  <span className={`text-[10px] font-mono ${cTextMuted}`}>
                    Year {selectedProject.year}
                  </span>
                </div>

                <h3 className={`text-lg font-display font-extrabold leading-tight mb-2 ${cTextTitle}`}>
                  {selectedProject.title}
                </h3>

                <p className="text-2xs text-slate-300 leading-relaxed font-sans mb-5">
                  {selectedProject.description}
                </p>

                {/* Sub features highlights bullet list */}
                <div className="border-t border-white/5 pt-5 space-y-4">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#00f0a0] block">
                    Core Accomplishments
                  </span>
                  <ul className="space-y-2.5">
                    {selectedProject.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-3xs text-slate-400 leading-relaxed font-sans">
                        <Zap className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies tags and action links */}
              <div className="border-t border-white/5 pt-5 mt-4 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-[9px] font-mono bg-white/5 border border-white/10 text-emerald-400 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full sm:flex-1 bg-[#00f0a0]/10 border border-[#00f0a0]/20 hover:bg-[#00f0a0]/20 text-[#00f0a0] hover:text-white px-3 py-2.5 rounded-lg text-3xs text-center font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all"
                    id={`project-live-demo-link-${selectedProject.id}`}
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>View Live Demo</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </a>
                  <button
                    onClick={() => setInquiryProject(selectedProject)}
                    className="w-full sm:flex-1 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-[#00f0a0] px-3 py-2.5 rounded-lg text-3xs text-center font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    id={`project-inquiry-btn-${selectedProject.id}`}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Ask Question</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Project Preview & Tech Breakdown Column — Card Width span 8 */}
            <div className="lg:col-span-8 space-y-6" id="project-visual-preview">
              {/* Clean Screenshot Image Placeholder Container */}
              <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-[#020704] flex flex-col transition-all duration-300 shadow-2xl">
                {/* Top Window Bar Ornament for high-fidelity Mockup Look */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/2 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60 block"></span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                    {selectedProject.title.toLowerCase()}.interface
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 hidden sm:inline flex items-center gap-1">
                    <Eye className="h-3 w-3 inline text-emerald-500" /> Click to Expand
                  </span>
                </div>

                {/* Screenshot Area */}
                <div 
                  className="p-2 bg-slate-950/40 relative group/img cursor-zoom-in overflow-hidden" 
                  onClick={() => {
                    setLightboxImage(getProjectImageUrl(selectedProject.id));
                  }}
                >
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-emerald-950/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px] z-10 m-2 rounded-lg">
                    <div className="bg-slate-900/95 border border-white/10 px-3.5 py-2 rounded-lg flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#00f0a0] shadow-2xl">
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Maximize Screen Inspect</span>
                    </div>
                  </div>
                  <img 
                    src={getProjectImageUrl(selectedProject.id)}
                    onError={() => {
                      setProjectImageErrors(prev => ({ ...prev, [selectedProject.id]: true }));
                    }}
                    alt={`${selectedProject.title} Screen`} 
                    className="w-full h-auto object-contain rounded-lg shadow-lg border border-white/5 hover:scale-[1.002] transition-all duration-300 mx-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Technical Specifications Details section immediately visible */}
              <div 
                className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-md text-left transition-all duration-300"
                id="technical-specifications"
              >
                <h3 className="text-xs font-display font-bold text-white mb-2 tracking-wide uppercase text-slate-350">
                  Architectural Engineering Context
                </h3>
                <p className="text-2xs text-slate-400 mb-5 leading-relaxed">
                  {selectedProject.longDescription}
                </p>

                <div className="border-t border-white/5 pt-4">
                  <h4 className="text-[9px] font-mono font-bold text-[#00f0a0] block uppercase tracking-widest mb-3">
                    Core Specifications & Stack Metrics
                  </h4>

                  {/* Performance metric blocks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white/3 border border-white/5 p-3 rounded-xl">
                      <span className="text-[9px] font-mono text-slate-500 block uppercase mb-1 font-bold">State Management</span>
                      <p className="text-3xs text-slate-400 leading-normal">
                        Configured with localized React context or browser persistence engines, avoiding remote network overhead for offline deployment.
                      </p>
                    </div>

                    <div className="bg-white/3 border border-white/5 p-3 rounded-xl">
                      <span className="text-[9px] font-mono text-slate-500 block uppercase mb-1 font-bold">Resiliency & Layout</span>
                      <p className="text-3xs text-slate-400 leading-normal">
                        Designed with highly responsive layouts & lightweight elements to maximize page presentation speeds on slow cellular networks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Graphic Design Showcase Section */}
        <section className="space-y-12 py-6" id="design">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#00f0a0] bg-[#031d13] px-3.5 py-1.5 rounded-full border border-emerald-900 uppercase inline-block font-bold">
              Creative Display
            </span>
            <h2 className="text-2.5xl md:text-3xl lg:text-4xl font-display font-extrabold text-white">
              Graphic Design Showcase
            </h2>
            <p className="text-xs text-slate-400 mt-2">
              Beyond engineering functional lines of code, I shape identities, format clean alignments, and conceptualize creative templates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Design 1 */}
            <div className="bg-[#020704] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md glass-panel emerald-card-glow text-left group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-slate-950">
                  <img 
                    src="https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&fit=crop" 
                    alt="Brand Identity Blueprint" 
                    className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#010603]/80 backdrop-blur-md border border-[#00f0a0]/30 text-[#00f0a0] font-mono text-[9px] px-2.5 py-1 rounded font-bold uppercase">
                    Template 01
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-display font-extrabold text-white group-hover:text-[#00f0a0] transition-colors leading-tight">
                    Brand Identity & Typography Guidelines
                  </h3>
                  <p className="text-3xs text-slate-400 leading-relaxed font-sans">
                    A comprehensive design archetype specifying cohesive vector standards, precise color palettes, and balanced sans-serif alignments for modern tech initiatives.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 flex flex-wrap gap-1.5">
                <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-[#00f0a0] px-2 py-0.5 rounded">Identity</span>
                <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">Vector Graphics</span>
                <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">Swiss Style</span>
              </div>
            </div>

            {/* Design 2 */}
            <div className="bg-[#020704] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md glass-panel emerald-card-glow text-left group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-slate-950">
                  <img 
                    src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=800&fit=crop" 
                    alt="Swiss Minimalism Social Banners" 
                    className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#010603]/80 backdrop-blur-md border border-[#00f0a0]/30 text-[#00f0a0] font-mono text-[9px] px-2.5 py-1 rounded font-bold uppercase">
                    Template 02
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-display font-extrabold text-white group-hover:text-[#00f0a0] transition-colors leading-tight">
                    Informational Social Campaign Templates
                  </h3>
                  <p className="text-3xs text-slate-400 leading-relaxed font-sans">
                    A modular layout kit built to broadcast tech education and development programs. Prioritizes extreme reader legibility and clean geographic hierarchy.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 flex flex-wrap gap-1.5">
                <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-[#00f0a0] px-2 py-0.5 rounded">Flyer layout</span>
                <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">Marketing grid</span>
                <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">Asymmetry</span>
              </div>
            </div>

            {/* Design 3 */}
            <div className="bg-[#020704] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md glass-panel emerald-card-glow text-left group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10 bg-slate-950">
                  <img 
                    src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&fit=crop" 
                    alt="Unified App Interface Component Kit" 
                    className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-100 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#010603]/80 backdrop-blur-md border border-[#00f0a0]/30 text-[#00f0a0] font-mono text-[9px] px-2.5 py-1 rounded font-bold uppercase">
                    Template 03
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-display font-extrabold text-white group-hover:text-[#00f0a0] transition-colors leading-tight">
                    Unified Web Interface Mockup Presentation
                  </h3>
                  <p className="text-3xs text-slate-400 leading-relaxed font-sans">
                    A conceptual UI storyboard designed with sleek glassmorphism panels, interactive indicators, and dark visual themes to deliver stunning digital mockups.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 flex flex-wrap gap-1.5">
                <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-[#00f0a0] px-2 py-0.5 rounded">UI/UX Kit</span>
                <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">Dashboard mock</span>
                <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">Cyber Theme</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="space-y-10 pt-4" id="contact">
          <ContactForm />
        </section>

      </main>

      {/* Modern Compact Custom Footer */}
      <footer className="border-t border-white/10 bg-[#010603]/80 backdrop-blur-md py-12 text-center text-xs font-sans text-slate-500 tracking-wide mt-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-6">
          
          {/* Logo & Info */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-sm rotate-45 flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <span className="text-[#020502] font-black -rotate-45 text-lg">B</span>
            </div>
            <p className="text-white font-display font-bold text-sm">Abubakar Sadiq Tajudeen</p>
            <p className="text-3xs text-slate-500 font-mono tracking-widest uppercase">Developer, Designer & Tech Educator</p>
          </div>

          {/* Navigation link bullets */}
          <div className="flex justify-center gap-6 text-2xs font-medium text-slate-400">
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:text-[#00f0a0] transition-all">About</a>
            <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }} className="hover:text-[#00f0a0] transition-all">Experience</a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="hover:text-[#00f0a0] transition-all">Projects</a>
            <a href="#design" onClick={(e) => { e.preventDefault(); scrollToSection('design'); }} className="hover:text-[#00f0a0] transition-all">Design</a>
            <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className="hover:text-[#00f0a0] transition-all">Skills</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-[#00f0a0] transition-all">Contact</a>
          </div>

          {/* Copyright signature */}
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-3xs font-mono text-slate-600">
              © {new Date().getFullYear()} Abubakar Sadiq Tajudeen. All Rights Reserved. Crafted with high fidelity.
            </p>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com/bukarr" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-[#00f0a0] transition-colors"
                id="footer-github-link"
                title="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="https://linkedin.com/in/bukarr1001" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-[#00f0a0] transition-colors"
                id="footer-linkedin-link"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://facebook.com/Bukarr1001" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-[#00f0a0] transition-colors"
                id="footer-facebook-link"
                title="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://x.com/bukarr69" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-[#00f0a0] transition-colors"
                id="footer-x-link"
                title="X / Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="https://wa.me/2348027957871" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-500 hover:text-[#00f0a0] transition-colors"
                id="footer-whatsapp-link"
                title="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* Toast Alert Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-[#041c10]/95 border border-[#00f0a0]/30 shadow-[0_0_25px_rgba(16,185,129,0.15)] rounded-2xl p-4 flex items-center gap-3 backdrop-blur-md"
            id="download-cv-toast"
          >
            <div className="p-2 bg-[#00f0a0]/10 text-[#00f0a0] rounded-lg">
              <CheckCircle2 className="h-5 w-5 animate-bounce" />
            </div>
            <div className="text-left">
              <h5 className="text-2xs font-mono font-bold text-[#00f0a0] uppercase tracking-wider leading-none mb-1">Download Started</h5>
              <p className="text-3xs text-slate-350 leading-normal">{toastMessage}</p>
            </div>
            <button 
              onClick={() => setShowToast(false)} 
              className="text-slate-500 hover:text-white ml-auto"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 p-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full transition-all cursor-pointer"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl p-2 inline-block">
                <img
                  src={lightboxImage}
                  alt="Expanded Project Screenshot"
                  className="max-h-[80vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-3xs text-slate-400 font-mono mt-3 uppercase tracking-wider">
                Click anywhere outside the image to dismiss
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Inquiry Modal */}
      <AnimatePresence>
        {inquiryProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setInquiryProject(null)}
          >
            <motion.div
              initial={{ y: 20, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              className={`relative w-full max-w-md border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-300 ${cCard}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar Decoration */}
              <div className={`flex items-center justify-between px-4 py-3 border-b select-none ${cBorderMuted}`}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 rounded-full h-2 bg-emerald-500 animate-pulse"></span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${cAccentText}`}>Project Inquiry</span>
                </div>
                <button
                  onClick={() => setInquiryProject(null)}
                  className={`transition-colors cursor-pointer ${isDark ? 'text-slate-450 hover:text-white' : 'text-slate-600 hover:text-emerald-700'}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <div className="mb-5 text-left">
                  <h4 className={`text-sm font-display font-black leading-tight ${cTextTitle}`}>
                    Inquire: {inquiryProject.title}
                  </h4>
                  <p className={`text-3xs font-sans leading-relaxed mt-1 ${cTextMuted}`}>
                    Have a question or looking to collaborate on a similar build? Send your inquiry details directly to Abubakar.
                  </p>
                </div>

                {inquiryStatus === 'success' ? (
                  <div className="text-center py-8 space-y-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto ${cBadge}`}>
                      <Check className="h-6 w-6" />
                    </div>
                    <h5 className={`text-xs font-display font-semibold uppercase tracking-wider ${cTextTitle}`}>Inquiry Prepared!</h5>
                    <p className={`text-3xs max-w-xs mx-auto ${cTextMuted}`}>
                      Abubakar will receive your details under subject "{inquiryProject.title} Build Specs". Check your email for replies!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4 text-left">
                    <div>
                      <label className={`block text-[8px] font-mono uppercase tracking-widest mb-1.5 font-bold ${cAccentText}`}>
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className={`w-full rounded-lg px-3 py-2 text-2xs focus:outline-none transition-all font-sans ${cInput}`}
                        disabled={inquiryStatus === 'submitting'}
                      />
                    </div>

                    <div>
                      <label className={`block text-[8px] font-mono uppercase tracking-widest mb-1.5 font-bold ${cAccentText}`}>
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="e.g. john@company.com"
                        className={`w-full rounded-lg px-3 py-2 text-2xs focus:outline-none transition-all font-sans ${cInput}`}
                        disabled={inquiryStatus === 'submitting'}
                      />
                    </div>

                    <div>
                      <label className={`block text-[8px] font-mono uppercase tracking-widest mb-1.5 font-bold ${cAccentText}`}>
                        Message / Question Detail
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        placeholder={`Ask a question or describe what you want to know about ${inquiryProject.title}...`}
                        className={`w-full rounded-lg px-3 py-2 text-2xs focus:outline-none transition-all font-sans resize-none ${cInput}`}
                        disabled={inquiryStatus === 'submitting'}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={inquiryStatus === 'submitting'}
                      className={`w-full text-3xs font-mono uppercase tracking-widest font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55 ${cButtonPrimary}`}
                    >
                      {inquiryStatus === 'submitting' ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin text-emerald-400" />
                          <span>Dispatching Info...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3 w-3" />
                          <span>Submit Build Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
