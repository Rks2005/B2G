
import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Search, Download, TrendingUp, Sparkles, RefreshCcw, DollarSign, Target, ArrowRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { MOCK_COUNTRIES } from '../data/countries';
import CountryDetailModal from './CountryDetailModal';
import { CountryData } from '../types';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

const GIAE: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("Run AI Fiscal Optimizer to generate redistribution strategy...");
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const filteredCountries = useMemo(() => {
    return MOCK_COUNTRIES.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const globalAllocation = [
    { name: 'Education', value: MOCK_COUNTRIES.reduce((a, b) => a + b.educationFunding, 0) },
    { name: 'Healthcare', value: MOCK_COUNTRIES.reduce((a, b) => a + b.healthcareFunding, 0) },
    { name: 'Infrastructure', value: MOCK_COUNTRIES.reduce((a, b) => a + b.infrastructureFunding, 0) },
    { name: 'Energy', value: MOCK_COUNTRIES.reduce((a, b) => a + b.energyFunding, 0) },
  ];

  const runOptimizer = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Predict optimal resource reallocation across sectors to maximize SPI impact based on global funding load. Suggest one bold institutional reallocation in one sentence.",
      });
      setPrediction(response.text || "Recommend 12% reallocation to renewable energy infrastructure.");
    } catch (e) {
      setPrediction("OPTIMIZER AI: Shifting 15% of surplus infrastructure funds to rural health oracles in the South Asia hub is predicted to increase regional SPI by 8.4 points.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Allocation Engine</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Algorithmic fiscal optimization across 196 sovereignty nodes.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => alert('Exporting allocations...')} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
            <Download size={14} /> Fiscal Audit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2"><TrendingUp size={20} className="text-blue-500" /> Sectoral Distribution Load</h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Aggregate</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={globalAllocation}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#0f172a', color: '#fff' }} />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={60}>
                     {globalAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800">
               <div className="relative w-full">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Query funding details for 196 countries..." 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 font-bold uppercase tracking-tighter text-[10px]">
                    <th className="px-8 py-4">Country</th>
                    <th className="px-8 py-4">Total Funding</th>
                    <th className="px-8 py-4">Impact</th>
                    <th className="px-8 py-4">Efficiency</th>
                    <th className="px-8 py-4 text-center">Simulate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {filteredCountries.slice(0, 12).map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                      <td className="px-8 py-4 font-bold text-slate-900 dark:text-white">{c.name}</td>
                      <td className="px-8 py-4 text-slate-500 font-mono">${c.fundingTotal.toLocaleString()}M</td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-blue-600">{c.impactScore}</span>
                          <div className="flex-1 w-20 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${c.impactScore}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4 font-bold text-emerald-600">{c.efficiency}%</td>
                      <td className="px-8 py-4 text-center">
                        <button onClick={() => setSelectedCountry(c)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-600 transition-all">
                          <DollarSign size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 text-blue-500/10">
               <Sparkles size={100} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 tracking-widest uppercase text-xs">
                <Target size={20} className="text-blue-400" /> AI Fiscal Optimizer
              </h3>
              <p className="text-sm font-medium italic leading-relaxed text-slate-300 min-h-[160px]">
                "{prediction}"
              </p>
              <button 
                onClick={runOptimizer}
                disabled={loading}
                className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
                Run Simulation Sync
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
             <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-[10px] uppercase tracking-widest">Global Priority Queue</h4>
             <div className="space-y-4">
                {filteredCountries.sort((a, b) => a.impactScore - b.impactScore).slice(0, 4).map((item, i) => (
                  <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10">
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</span>
                      <div className="text-[10px] text-red-500 font-bold">Funding Deficit: ${(Math.random() * 50).toFixed(1)}M</div>
                    </div>
                    <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-all" />
                  </div>
                ))}
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

export default GIAE;
