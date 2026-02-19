
import React, { useState } from 'react';
import { 
  Zap, 
  Activity, 
  Target, 
  Users, 
  AlertCircle, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  RefreshCcw,
  Globe,
  PieChart,
  ShieldCheck
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { AppSection } from '../types';
import { MOCK_COUNTRIES } from '../data/countries';

interface OverviewProps {
  onNavigate: (section: AppSection) => void;
}

const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  const [insight, setInsight] = useState("System standby. Initializing global sovereignty analysis...");
  const [loading, setLoading] = useState(false);

  const fetchAIInsight = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate a one-sentence institutional insight for a global partnership platform (GPD-TJP) monitoring 196 nations. Focus on resource allocation efficiency, latency, or deviance. Use IEEE style.",
      });
      setInsight(response.text || "Structural data drift detected in sub-sector 4.B.");
    } catch (e) {
      const fallbacks = [
        "Silence propagation index in East Africa hub suggests governance bottlenecks.",
        "Positive Deviant node detected in Rural Education Sector: High SPI achieved at 40% lower cost.",
        "Resource allocation optimization could yield 22% improvement in cross-border synergy.",
        "Temporal latency detected in Donor-Partner communication cycle: Mean delay +14s."
      ];
      setInsight(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: 'Member Nations', value: '196', icon: Globe, trend: 'UN Recognized' },
    { label: 'Active Projects', value: '12,402', icon: Activity, trend: '+8% MoM' },
    { label: 'Deviants Detected', value: '18', icon: Target, trend: 'High Scaling Priority' },
    { label: 'Platform Compliance', value: '96.2%', icon: ShieldCheck, trend: 'Optimal' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[400px] rounded-[4rem] overflow-hidden group shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600" 
          alt="Global Network"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent"></div>
        <div className="relative z-10 p-20 flex flex-col justify-center h-full max-w-3xl">
          <span className="px-3 py-1 bg-blue-600 rounded-full text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6 w-fit">Institutional OS v4.2</span>
          <h2 className="text-5xl font-black text-white leading-tight mb-6">
            Global Data Synthesis <br/> for Institutional Equity.
          </h2>
          <p className="text-slate-200 text-lg mb-10 font-medium leading-relaxed">
            Bridging the gap between raw field signals and high-level institutional decision-making through 196-node temporal justice monitoring.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate(AppSection.GSRE)}
              className="bg-white text-slate-900 px-10 py-4 rounded-[2rem] font-black transition-all shadow-xl hover:-translate-y-1 flex items-center gap-3"
            >
              Analyze Engines <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-900 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {React.createElement(stat.icon as any, { size: 28 })}
              </div>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${stat.trend.includes('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                {stat.trend}
              </span>
            </div>
            <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* AI Insights & Modules Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-10">
        <div className="lg:col-span-2 bg-slate-950 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 text-blue-500/10 group-hover:scale-110 transition-transform">
             <Sparkles size={160} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <RefreshCcw size={24} className={loading ? 'animate-spin' : ''} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-widest text-xs text-blue-400">Institutional Intelligence Core</h3>
            </div>
            <p className="text-3xl font-medium italic text-slate-100 mb-10 leading-relaxed min-h-[120px]">
              "{insight}"
            </p>
            <button 
              onClick={fetchAIInsight}
              disabled={loading}
              className="bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black hover:bg-slate-100 transition-colors flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-white/5"
            >
              Generate Protocol Directive
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10 flex items-center gap-2">
            <AlertCircle size={20} className="text-red-500" /> Active System Sync
          </h3>
          <div className="space-y-6">
            {[
              { type: 'Critical', msg: 'PLM Bottleneck in Southeast Asia Hub', time: '2m ago' },
              { type: 'Warning', msg: 'SPI Deviation in Region 4 (S. America)', time: '14m ago' },
              { type: 'Info', msg: 'GSRE Sync Successful: 196 Sovereignties', time: '1h ago' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-6 p-6 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-[2rem] transition-all cursor-pointer group">
                <div className={`w-1.5 h-12 rounded-full ${alert.type === 'Critical' ? 'bg-red-500' : alert.type === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between mb-1">
                    {alert.type} <span>{alert.time}</span>
                  </div>
                  <div className="text-md font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors leading-tight">{alert.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-10 pb-20">
         <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[4rem] p-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
               <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Module Fast-Links</h4>
               <p className="text-slate-500 font-medium mb-8">Access the five pillars of the GPD-TJP Institutional Platform instantly.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:col-span-2">
               {[
                 { id: AppSection.GSRE, name: 'Solution Engine', icon: Target },
                 { id: AppSection.PLM, name: 'Latency Mapping', icon: Activity },
                 { id: AppSection.GIAE, name: 'Fiscal Engine', icon: PieChart },
                 { id: AppSection.IMA, name: 'Memory Archive', icon: ShieldCheck },
               ].map((mod) => (
                 <button 
                  key={mod.id}
                  onClick={() => onNavigate(mod.id)}
                  className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl hover:bg-blue-600 hover:text-white transition-all group"
                 >
                    <div className="flex items-center gap-4">
                       <mod.icon size={24} />
                       <span className="font-black text-sm uppercase tracking-widest">{mod.name}</span>
                    </div>
                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-all" />
                 </button>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Overview;
