
import React, { useState, useMemo } from 'react';
import { 
  Search, FileText, Download, ShieldCheck, History, Calendar, Sparkles, Filter, 
  Clock, ArrowRight, BookOpen, Layers
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { MOCK_COUNTRIES } from '../data/countries';
import CountryDetailModal from './CountryDetailModal';
import { CountryData } from '../types';

const IMA: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [prediction, setPrediction] = useState("Scan the historical repository to synthesize past outcomes for 196 nations...");
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const filteredCountries = useMemo(() => {
    return MOCK_COUNTRIES.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const fetchAIMemory = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Synthesize lessons from historical development reports for a global platform. Predict the most likely replication opportunity in one sentence.",
      });
      setPrediction(response.text || "Historical data suggest a 22% increase in replication success when local decentralization is prioritized.");
    } catch (e) {
      setPrediction("INSTITUTIONAL MEMORY AI: Analysis indicates that 'low-latency communication protocols' are the single greatest predictor of project sustainability over 5 years.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Institutional Memory</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Centralized archival knowledge and timeline analysis for 196 sovereignties.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => alert('Downloading archive index...')} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
            <Download size={14} /> Full Index
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Query country archives, project logs, or policy reports..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] pl-14 pr-6 py-5 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 dark:text-white shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-400 hover:bg-slate-50 transition-all">
               <Filter size={20} />
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="px-10 py-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-3 tracking-widest uppercase text-xs"><History size={20} className="text-blue-500" /> Knowledge Repository</h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full">Temporal Log v4.2</span>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-800 max-h-[600px] overflow-y-auto">
              {filteredCountries.slice(0, 15).map((c, i) => (
                <div key={i} className="px-10 py-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between group cursor-pointer" onClick={() => setSelectedCountry(c)}>
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-400 group-hover:text-blue-600 transition-colors">
                      <FileText size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black text-blue-500 uppercase px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded">{c.region}</span>
                        <h4 className="font-bold text-slate-900 dark:text-white">{c.name} Performance Audit</h4>
                      </div>
                      <div className="flex gap-6 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                         <span className="flex items-center gap-1"><Calendar size={12} /> FY 2024-Q3</span>
                         <span className="flex items-center gap-1"><BookOpen size={12} /> {c.policyGaps > 10 ? 'Detailed' : 'Summary'} Report</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} className="text-slate-200 group-hover:text-blue-500 transition-all translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-950 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 text-blue-500/10 group-hover:scale-110 transition-transform">
               <ShieldCheck size={140} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Sparkles size={14} className={loading ? 'animate-spin' : ''} /> Memory Predictive AI
              </h4>
              <p className="text-xl font-medium italic leading-relaxed text-slate-200 min-h-[180px]">
                "{prediction}"
              </p>
              <button 
                onClick={fetchAIMemory}
                disabled={loading}
                className="w-full mt-8 py-5 bg-white text-slate-900 hover:bg-slate-100 rounded-[2rem] font-black transition-all shadow-xl shadow-white/5"
              >
                Synthesize Institutional Trends
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
             <h4 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <Clock size={16} className="text-blue-500" /> Recent Archive Sync
             </h4>
             <div className="space-y-4">
                <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border-l-4 border-blue-500">
                   <p className="text-xs text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                     SUCCESS: 'Water-Nodes' protocol replicated from Country 10 to Country 22. Efficiency gain: +40%.
                   </p>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border-l-4 border-amber-500">
                   <p className="text-xs text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
                     ALERT: High structural latency detected in Sector-7 regional logs. Memory drift: 12%.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {selectedCountry && (
        <CountryDetailModal country={selectedCountry} onClose={() => setSelectedCountry(null)} />
      )}
    </div>
  );
};

export default IMA;
