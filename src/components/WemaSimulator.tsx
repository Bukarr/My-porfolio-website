/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Landmark, Sparkles, PiggyBank, DollarSign, TrendingUp, Award, Clock } from 'lucide-react';

export default function WemaSimulator() {
  const [targetType, setTargetType] = useState<'Tuition' | 'Laptop' | 'Academics' | 'Emergency'>('Tuition');
  const [savingsGoal, setSavingsGoal] = useState<number>(300000); // 300,000 NGN
  const [monthlyContribution, setMonthlyContribution] = useState<number>(25000);
  const [academicGpa, setAcademicGpa] = useState<number>(4.2);
  const [savingsDuration, setSavingsDuration] = useState<number>(12); // months

  const targets = {
    Tuition: { defaultGoal: 450000, description: 'Semester tuition fees & hall registration' },
    Laptop: { defaultGoal: 350000, description: 'Coding & design workstation rig upgrade' },
    Academics: { defaultGoal: 80000, description: 'Textbooks, lab manuals & study resources' },
    Emergency: { defaultGoal: 100000, description: 'Emergency stipend cushion buffer' },
  };

  const handleTargetChange = (type: 'Tuition' | 'Laptop' | 'Academics' | 'Emergency') => {
    setTargetType(type);
    setSavingsGoal(targets[type].defaultGoal);
    setMonthlyContribution(Math.ceil(targets[type].defaultGoal / 12));
  };

  // Base interest offered is 7%
  // But Wema Spark promotional bonus interest rate matches academic performances (streaks/grades)
  const calculateRates = () => {
    const baseRate = 7.0;
    let rankGpaBonus = 0.0;

    if (academicGpa >= 4.5) {
      rankGpaBonus = 3.5; // First Class Elite
    } else if (academicGpa >= 3.5) {
      rankGpaBonus = 2.0; // Very Good (2:1)
    } else if (academicGpa >= 2.4) {
      rankGpaBonus = 1.0; // Average (2:2)
    }

    const totalRate = baseRate + rankGpaBonus;
    return { baseRate, rankGpaBonus, totalRate };
  };

  const { rankGpaBonus, totalRate } = calculateRates();

  // Calculations
  const calculateProjections = () => {
    const r = (totalRate / 100) / 12; // monthly rate
    let balance = 0;
    const records = [];

    for (let month = 1; month <= savingsDuration; month++) {
      // compound previous month structure and add the contribution
      balance = (balance + monthlyContribution) * (1 + r);
      records.push({ month, balance });
    }

    const totalInvested = monthlyContribution * savingsDuration;
    const totalInterestEarned = Math.max(0, balance - totalInvested);
    const progressPercent = Math.min(100, Math.round((balance / savingsGoal) * 100));

    return { balance, totalInvested, totalInterestEarned, progressPercent, records };
  };

  const { balance, totalInvested, totalInterestEarned, progressPercent } = calculateProjections();

  // Format money function
  const formatNaira = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl w-full p-4 md:p-6 overflow-hidden backdrop-blur-md glass-panel emerald-card-glow transition-all duration-300" id="wema-hackathon-module">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Landmark className="h-5 w-5 text-emerald-400" />
            <h3 className="text-xl font-display font-bold text-white tracking-wide">ALAT Student Spark Savings</h3>
          </div>
          <p className="text-xs text-slate-400">
            Interactive micro-savings & interest reward simulation pitched at the Wema Bank Hackathon
          </p>
        </div>

        {/* Mock Pitch badge */}
        <span className="text-[9px] font-mono tracking-wider bg-emerald-500/20 text-[#00f0a0] px-2.5 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-1.5 self-start md:self-auto uppercase">
          <Award className="h-3.5 w-3.5" />
          <span>Wema Hackaholics Pitch Demo</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Parameters sliders */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Target type selection card clicks */}
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#00f0a0] block mb-2">
              Select Your Financial Spark Goal
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Tuition', 'Laptop', 'Academics', 'Emergency'] as const).map(target => (
                <button
                  key={target}
                  onClick={() => handleTargetChange(target)}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    targetType === target
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-[#00f0a0] font-medium'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10'
                  }`}
                  id={`wema-target-${target.toLowerCase()}`}
                >
                  <span className="text-xl block mb-1">
                    {target === 'Tuition' ? '🎓' : target === 'Laptop' ? '💻' : target === 'Academics' ? '📚' : '🛡️'}
                  </span>
                  <span className="text-3xs block">{target}</span>
                </button>
              ))}
            </div>
            <p className="text-[9.5px] text-slate-500 mt-1.5 font-normal italic">
              *Goal Description: {targets[targetType].description}
            </p>
          </div>

          {/* Goal & Monthly Contribution sliders */}
          <div className="space-y-3 p-3.5 bg-[#020502]/40 border border-white/10 rounded-xl">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400 font-sans">Goal Capital Amount</span>
                <span className="text-[#00f0a0] font-mono font-medium">{formatNaira(savingsGoal)}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="25000"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(Number(e.target.value))}
                className="w-full accent-emerald-450 h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
                id="wema-goal-range"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400 font-sans">Monthly Contribution</span>
                <span className="text-[#00f0a0] font-mono font-medium">{formatNaira(monthlyContribution)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full accent-emerald-450 h-1 bg-white/5 rounded-lg appearance-none cursor-pointer"
                id="wema-deposit-range"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-3xs text-slate-400 font-mono block mb-1">Savings Period</span>
                <select
                  value={savingsDuration}
                  onChange={(e) => setSavingsDuration(Number(e.target.value))}
                  className="w-full glass-input text-slate-300 text-2xs rounded p-1.5 focus:outline-none cursor-pointer"
                  id="wema-duration-select"
                >
                  <option value={3}>3 Months</option>
                  <option value={6}>6 Months</option>
                  <option value={12}>12 Months (1 Year)</option>
                  <option value={24}>24 Months (2 Years)</option>
                </select>
              </div>

              {/* Dynamic Academic GPA input to award promotional spark bonus! */}
              <div>
                <span className="text-3xs text-slate-400 font-mono block mb-1">Academic CGPA (Transcripts)</span>
                <select
                  value={academicGpa}
                  onChange={(e) => setAcademicGpa(Number(e.target.value))}
                  className="w-full glass-input text-slate-300 text-2xs rounded p-1.5 focus:outline-none cursor-pointer"
                  id="wema-gpa-spark-select"
                >
                  <option value={4.6}>4.50 — 5.00 (+3.5% First Class Bonus)</option>
                  <option value={3.8}>3.50 — 4.49 (+2.0% Merit Bonus)</option>
                  <option value={2.8}>2.40 — 3.49 (+1.0% Basic Bonus)</option>
                  <option value={2.0}>Below 2.40 (Base Rate only)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Micro savings details bullet metrics */}
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-[10px] font-mono uppercase text-[#00f0a0] block mb-1 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              <span>Fintech Synergy Benefits</span>
            </span>
            <p className="text-[10px] text-slate-300 leading-relaxed font-sans">
              Our proposed ALAT Spark savings API directly aggregates with students’ certified transcript portals. High academic performance automatically raises savings yield. This empowers financial literacy while incentivizing academic efforts!
            </p>
          </div>

        </div>

        {/* Right Side: Projections circle display */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-between h-full relative overflow-hidden backdrop-blur-sm">
            
            {/* Header projection indicator */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-3xs font-mono uppercase text-slate-500 tracking-wider">Projected Final Pot</span>
                <span className="text-3xs font-mono text-[#00f0a0] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  {totalRate.toFixed(1)}% total APR
                </span>
              </div>
              <h2 className="text-2xl font-display font-extrabold text-white text-gradient font-mono tracking-tight">
                {formatNaira(balance)}
              </h2>
            </div>

            {/* Simulated progress tracker */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-3xs text-slate-400 mb-1 font-sans">
                <span>Savings Progress Indicator</span>
                <span>{progressPercent}% towards spark-goal</span>
              </div>
              {/* Progress bar container */}
              <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-neon rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Financial balance breakdown details */}
            <div className="space-y-2 border-t border-white/5 pt-4">
              <div className="flex justify-between text-2xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <PiggyBank className="h-3 w-3 text-emerald-400" />
                  <span>Total Capital Deposited:</span>
                </span>
                <span className="font-mono text-slate-200">{formatNaira(totalInvested)}</span>
              </div>

              <div className="flex justify-between text-2xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                  <span>Promotional Interest Earned:</span>
                </span>
                <span className="font-mono text-emerald-400 font-bold">{formatNaira(totalInterestEarned)}</span>
              </div>

              <div className="flex justify-between text-2xs">
                <span className="text-slate-404 flex items-center gap-1.5">
                  <Award className="h-3 w-3 text-emerald-400" />
                  <span>CGPA Boost Rate:</span>
                </span>
                <span className="font-mono text-emerald-400">+{rankGpaBonus.toFixed(1)}% APY boost</span>
              </div>

              <div className="flex justify-between text-2xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-emerald-400" />
                  <span>Calculated Span:</span>
                </span>
                <span className="font-mono text-slate-300">{savingsDuration} Months</span>
              </div>
            </div>

            {/* Final Action confirmation mock trigger */}
            <button
              onClick={() => alert(`Starting a promotional Spark savings plan with goal: ${formatNaira(savingsGoal)}!`)}
              className="mt-5 w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-white hover:text-[#00f0a0] border border-white/10 hover:border-emerald-500/50 py-2.5 rounded-xl font-display font-bold text-2xs tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer uppercase"
              id="wema-setup-saving-plan"
            >
              <span>Setup Spark Plan</span>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
