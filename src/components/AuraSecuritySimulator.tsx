import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Cpu, Award, Play, Terminal, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface SecurityNode {
  id: string;
  name: string;
  location: string;
  status: 'SAFE' | 'QUARANTINED' | 'ALERT';
  ip: string;
  encryption: 'AES-256' | 'NONE';
}

const INITIAL_NODES: SecurityNode[] = [
  { id: 'node-1', name: 'Zaria Core Server', location: 'ABU Zaria Main HQ', status: 'SAFE', ip: '192.168.1.10', encryption: 'AES-256' },
  { id: 'node-2', name: 'Zaria Student Portal Portal', location: 'FUE Zaria Cluster', status: 'SAFE', ip: '102.82.14.99', encryption: 'AES-256' },
  { id: 'node-3', name: 'Distributed Admin Laptop', location: 'Lagos Remote Office', status: 'ALERT', ip: '105.112.45.12', encryption: 'NONE' },
  { id: 'node-4', name: 'NCAT Lab Node', location: 'NCAT Web Center', status: 'SAFE', ip: '197.210.8.44', encryption: 'AES-256' }
];

export default function AuraSecuritySimulator() {
  const [nodes, setNodes] = useState<SecurityNode[]>(INITIAL_NODES);
  const [quarantineActive, setQuarantineActive] = useState<boolean>(false);
  const [encryptionLevel, setEncryptionLevel] = useState<number>(85);
  const [systemThreatLevel, setSystemThreatLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [logs, setLogs] = useState<string[]>([
    '[AURA INFRASTRUCTURE INITIALIZED]',
    'Secure communication handshakes established on port 3000.',
    'Monitoring remote employee vectors...'
  ]);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 8));
  };

  const handleIntegrityCheck = () => {
    setIsAuditing(true);
    addLog('Commencing deep data integrity check...');
    
    setTimeout(() => {
      setIsAuditing(false);
      setEncryptionLevel(100);
      setSystemThreatLevel('LOW');
      setNodes(prev => prev.map(n => ({ ...n, status: 'SAFE', encryption: 'AES-256' })));
      addLog('All remote nodes evaluated. Leakage risk points resolved.');
      addLog('System integrity evaluated: 100% SECURE.');
    }, 2000);
  };

  const toggleQuarantine = () => {
    const nextState = !quarantineActive;
    setQuarantineActive(nextState);
    if (nextState) {
      setNodes(prev => prev.map(n => n.id === 'node-3' ? { ...n, status: 'QUARANTINED' } : n));
      addLog('QUARANTINE ORDER TRIGGERED: Sandboxing node standard protocols...');
      addLog('Node 3 at Lagos Remote Office successfully quarantined.');
    } else {
      setNodes(prev => prev.map(n => n.id === 'node-3' ? { ...n, status: 'SAFE' } : n));
      addLog('Quarantine order revoked. Re-authenticating node certificates...');
    }
  };

  useEffect(() => {
    const threatMsg = systemThreatLevel === 'HIGH' ? 'HIGH RISK DETECTED: Exposure vectors active on Lagos node.' : 'Threat level balanced.';
    addLog(threatMsg);
  }, [systemThreatLevel]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl w-full p-4 md:p-6 overflow-hidden glass-panel emerald-card-glow text-left transition-all duration-300" id="aura-security-simulator">
      
      {/* Header bar and pitch indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Shield className="h-4 w-4 text-emerald-400" />
            <h3 className="text-sm font-display font-bold text-white tracking-wide">AURA Cybersecurity Terminal</h3>
          </div>
          <p className="text-[10px] text-slate-400">
            Hackaholics 6.0 3rd Place Awarded Concept — Remote endpoint telemetry quarantine simulation
          </p>
        </div>
        
        <span className="text-[9px] font-mono tracking-wider bg-emerald-500/20 text-[#00f0a0] px-2.5 py-1 rounded-sm border border-emerald-500/30 flex items-center gap-1.5 self-start sm:self-auto uppercase">
          <Award className="h-3.5 w-3.5 text-yellow-400" />
          <span>Hackaholics Bronze Medal Unit</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Interactive node grid monitors */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xs font-mono uppercase text-slate-500 tracking-wider">Distributed Node Monitors</span>
            <span className="text-3xs font-mono text-slate-400">Threat Evaluation Index: <strong className={systemThreatLevel === 'HIGH' ? 'text-red-400' : systemThreatLevel === 'MEDIUM' ? 'text-yellow-400' : 'text-emerald-400'}>{systemThreatLevel}</strong></span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nodes.map(node => {
              const safe = node.status === 'SAFE';
              const alert = node.status === 'ALERT';
              const quar = node.status === 'QUARANTINED';
              return (
                <div 
                  key={node.id} 
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    alert 
                      ? 'bg-red-500/5 border-red-500/20' 
                      : quar 
                        ? 'bg-amber-500/5 border-amber-500/20' 
                        : 'bg-white/5 border-white/5'
                  }`}
                  id={`node-monitor-${node.id}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-display font-semibold text-white truncate max-w-[120px]">{node.name}</span>
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${
                      safe 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : quar 
                          ? 'bg-amber-500/20 text-amber-500' 
                          : 'bg-red-500/20 text-red-500'
                    }`}>
                      {node.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-3xs text-slate-400 font-mono">
                    <div className="flex justify-between">
                      <span>IP Address:</span>
                      <span className="text-slate-300">{node.ip}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Encryption:</span>
                      <span className={node.encryption === 'AES-256' ? 'text-emerald-400' : 'text-red-400'}>{node.encryption}</span>
                    </div>
                    <div className="flex justify-between text-slate-500 mt-1">
                      <span>Location:</span>
                      <span className="truncate max-w-[90px]">{node.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls button row */}
          <div className="bg-[#020502]/40 border border-white/10 p-3.5 rounded-xl space-y-3">
            <span className="text-3xs font-mono uppercase text-[#00f0a0] tracking-wider block">Telemetry System Commands</span>
            
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={toggleQuarantine}
                className={`flex-1 min-w-[130px] p-2.5 rounded-lg border text-center text-2xs transition-all cursor-pointer font-sans font-medium uppercase tracking-wider ${
                  quarantineActive 
                    ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' 
                    : 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/25'
                }`}
                id="quarantine-btn-trigger"
              >
                {quarantineActive ? 'Release Quarantine' : 'Quarantine At-Risk Node'}
              </button>

              <button
                onClick={handleIntegrityCheck}
                disabled={isAuditing}
                className="flex-1 min-w-[130px] p-2.5 bg-emerald-500/20 border border-emerald-500/30 hover:bg-emerald-500/30 text-[#00f0a0] rounded-lg text-center text-2xs font-sans font-medium uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center gap-1.5"
                id="system-audit-btn"
              >
                {isAuditing ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Auditing...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>Deep System Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Security state console and real-time logs */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-950/90 border border-white/10 rounded-xl p-4 md:p-5 relative overflow-hidden">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-3xs font-mono uppercase text-slate-500 tracking-wider flex items-center gap-1">
                <Terminal className="h-3 w-3" />
                <span>Active Telemetry Logs</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            {/* Simulated Live streaming log lines */}
            <div className="font-mono text-[9px] text-zinc-300 leading-relaxed overflow-y-auto max-h-[180px] space-y-2 h-[180px] bg-black/40 p-2.5 rounded border border-white/5 scrolling-container text-left select-none">
              {logs.map((log, idx) => (
                <div key={idx} className={`${idx === 0 ? 'text-[#00f0a0]' : 'text-slate-400'}`}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 mt-4 space-y-2 text-2xs font-sans">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Security Encryption Index:</span>
              <span className="text-slate-200 font-mono">{encryptionLevel}% Strength</span>
            </div>
            
            <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-[#00f0a0] rounded-full transition-all duration-1000"
                style={{ width: `${encryptionLevel}%` }}
              ></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
