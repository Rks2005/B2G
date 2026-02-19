
import React from 'react';
import { Database, Server, UserCheck, Globe, Lock, Share2 } from 'lucide-react';

const Architecture: React.FC = () => {
  return (
    <div className="space-y-12 animate-in slide-in-from-right-4 duration-700">
      <div className="max-w-3xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">GPD-TJP System Architecture</h2>
        <p className="text-slate-600 leading-relaxed">
          The GPD-TJP infrastructure consists of an integrated multi-layer stack designed for secure, temporal data synthesis and global partnership monitoring.
        </p>
      </div>

      <div className="relative p-12 bg-white border border-slate-100 rounded-[3rem] shadow-sm flex flex-col items-center gap-12 overflow-hidden">
        {/* Layer: Inputs */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            { label: 'Citizen Feedback', icon: UserCheck, color: 'text-blue-500' },
            { label: 'Encrypted Comms', icon: Lock, color: 'text-amber-500' },
            { label: 'Social Signals', icon: Share2, color: 'text-emerald-500' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-6 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-blue-200 transition-colors">
              <div className={`p-4 bg-white rounded-full shadow-sm mb-4 ${item.color}`}>
                <item.icon size={24} />
              </div>
              <span className="font-bold text-sm text-slate-700">{item.label}</span>
              <div className="mt-4 w-px h-8 bg-gradient-to-b from-slate-200 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Central Engine Layer */}
        <div className="w-full flex justify-center items-center gap-12 relative z-10">
          <div className="p-8 bg-slate-900 rounded-[2rem] text-white shadow-2xl relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-2xl -z-10 animate-pulse"></div>
            <div className="flex flex-col items-center">
              <Server size={40} className="text-blue-400 mb-6" />
              <div className="flex gap-8">
                <div className="text-center">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Engine A</h4>
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-lg font-bold">GSRE</div>
                </div>
                <div className="w-px h-12 bg-white/10 self-end mb-2"></div>
                <div className="text-center">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Engine B</h4>
                  <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-lg font-bold">PLM</div>
                </div>
              </div>
              <p className="mt-6 text-[10px] text-blue-300 font-mono tracking-tighter">COORDINATED SYNERGY PROTOCOL v1.02</p>
            </div>
          </div>
        </div>

        {/* Layer: Outputs */}
        <div className="w-full flex flex-col md:flex-row justify-center gap-8 relative z-10">
          {[
            { label: 'NGO Partners', icon: Globe },
            { label: 'Governments', icon: Database },
            { label: 'Global Citizens', icon: UserCheck },
          ].map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center p-6 border-t-2 border-slate-100 border-dashed">
              <div className="w-px h-8 bg-gradient-to-t from-slate-200 to-transparent mb-4"></div>
              <div className="p-3 bg-slate-100 rounded-xl text-slate-600 mb-3">
                <item.icon size={20} />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Decorative Background Mesh */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="arch-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#arch-grid)" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        <div className="p-6 bg-slate-50 rounded-2xl">
          <h4 className="font-bold text-slate-900 mb-3">Multimodal Signal Ingestion</h4>
          <p className="text-slate-600 leading-relaxed italic">
            "Citizen feedback loops are integrated via decentralized oracle nodes to ensure signal integrity across high-latency environments."
          </p>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl">
          <h4 className="font-bold text-slate-900 mb-3">Institutional Policy Output</h4>
          <p className="text-slate-600 leading-relaxed italic">
            "Automated reports are rendered in compliant PDF-X format, ensuring archival stability for decade-long partnership monitoring."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
