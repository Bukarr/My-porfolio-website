/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Check, AlertTriangle, Mail, RefreshCw, MailOpen, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Collaboration');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus('submitting');
    setSubmittedData({ name, email, subject, message });
    
    // Simulate API delivery
    setTimeout(() => {
      setStatus('success');
      // Reset after simulation
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden backdrop-blur-md glass-panel emerald-card-glow h-full" id="contact-form-module">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Side: Contact contextual badges */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00f0a0] bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/30 inline-block mb-3">
              Let's build together
            </span>
            <h3 className="text-xl md:text-2xl font-display font-extrabold text-white leading-tight mb-3">
              Have a project in mind? Let’s talk.
            </h3>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              If you’re looking for a dedicated developer and designer to shape a pristine web presence, integrate smooth animations, or flesh out full product designs, feel free to shoot a message!
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm">
              <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest">Primary Contact Email</span>
                <a href="mailto:Sahdheeq1001@gmail.com" className="text-xs text-slate-200 hover:text-emerald-400 font-medium block">
                  Sahdheeq1001@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm">
              <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-400">
                <MailOpen className="h-4 w-4" />
              </div>
              <div>
                <span className="text-3xs font-mono text-slate-500 uppercase tracking-widest">Global Location Coverage</span>
                <span className="text-xs text-slate-200 font-medium block font-sans">
                  Zaria, Nigeria
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visual operational form */}
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center flex flex-col justify-center h-full min-h-[340px]"
                id="contact-form-success"
              >
                <div className="w-12 h-12 bg-emerald-500/20 border border-[#00f0a0]/60 rounded-full flex items-center justify-center text-[#00f0a0] mb-4 mx-auto">
                  <Check className="h-6 w-6 animate-pulse" />
                </div>
                <h4 className="text-sm font-display font-bold text-white mb-1.5">Step 1 Complete: Message Prepared!</h4>
                <p className="text-2xs text-slate-450 max-w-sm leading-relaxed mb-6 mx-auto font-sans">
                  Excellent, <span className="text-emerald-400 font-bold">{submittedData?.name}</span>. Your message has been compiled. Choose a standard channel below to transmit directly to Abubakar:
                </p>

                {/* Direct Action Channels */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-sm mx-auto mb-6">
                  <a
                    href={submittedData ? `https://wa.me/2348027957871?text=${encodeURIComponent(`Hello Abubakar Sadiq Tajudeen,\n\nName: ${submittedData.name}\nEmail: ${submittedData.email}\nSubject: ${submittedData.subject}\n\nMessage:\n${submittedData.message}`)}` : '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-500/30 bg-[#00f0a0]/10 hover:bg-[#00f0a0]/20 text-[#00f0a0] font-sans font-bold text-2xs tracking-wider uppercase transition-all"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Send on WhatsApp</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </a>

                  <a
                    href={submittedData ? `mailto:Sahdheeq1001@gmail.com?subject=${encodeURIComponent(submittedData.subject)}&body=${encodeURIComponent(`Hello Abubakar Sadiq Tajudeen,\n\nMy name is ${submittedData.name} (Email: ${submittedData.email}).\n\nMessage:\n${submittedData.message}\n\nSent via Portfolio Contact Form`)}` : '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-slate-200 font-sans font-bold text-2xs tracking-wider uppercase transition-all"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Send via Gmail</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </a>
                </div>

                <button
                  onClick={() => {
                    setStatus('idle');
                    setSubmittedData(null);
                  }}
                  className="px-4 py-1.5 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg border border-white/5 hover:border-white/10 transition-all text-xs cursor-pointer inline-block mx-auto"
                  id="reset-form-status"
                >
                  Draft another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
                id="interactive-contact-form"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-1.5 label-name">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full glass-input rounded-lg text-xs py-2.5 px-3.5 focus:outline-none text-white font-sans"
                      id="form-name"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-1.5 label-email">
                      Email Address
                    </label>
                    <input
                      type="type"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full glass-input rounded-lg text-xs py-2.5 px-3.5 focus:outline-none text-white font-sans"
                      id="form-email"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-1.5 label-subject">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full glass-input rounded-lg text-xs py-2.5 px-3.5 focus:outline-none text-white font-sans"
                    id="form-subject"
                  >
                    <option value="General Collaboration" className="bg-[#020502] text-slate-200">General Collaboration</option>
                    <option value="Freelance Development" className="bg-[#020502] text-slate-200">Freelance Project (React/Next/Vue)</option>
                    <option value="Full-time Employment" className="bg-[#020502] text-slate-200">Full-time Contract Hire</option>
                    <option value="Just to say Hi!" className="bg-[#020502] text-slate-200">Just to say Hi! 👋</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-1.5 label-message">
                    Your Message Detail
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your brilliant ideas, timelines, or specifications..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full glass-input rounded-lg text-xs py-2.5 px-3.5 focus:outline-none text-white font-sans resize-none"
                    id="form-message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-white hover:text-[#00f0a0] border border-white/10 hover:border-emerald-500/50 py-3 px-4 rounded-xl font-display font-medium text-xs tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer uppercase font-bold"
                  id="form-submit-btn"
                >
                  {status === 'submitting' ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Dispatch Message</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
