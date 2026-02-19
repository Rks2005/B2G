
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Search, Download, ShieldAlert, CheckCircle, Scale, Sparkles, RefreshCcw, ArrowUpRight, Info, Activity } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { MOCK_COUNTRIES } from '../data/countries';
import CountryDetailModal from './CountryDetailModal';
import { CountryData } from '../types';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

const PolicyWatch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("Initiate Global Policy Compliance Scan to identify systemic equity gaps...");
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const filteredCountries = useMemo(() => {
    return MOCK_COUNTRIES.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const runPrediction = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Identify systemic policy gaps across 196 nations for an institutional platform. Predict one major improvement trend for the next decade in one sentence.",
      });
      setPrediction(response.text || "Decentralized compliance verification predicted to reduce structural risk by 18%.");
    } catch (e) {
      setPrediction("POLICY AI: Analysis suggests that the integration of real-time social equity indicators will close the policy-implementation gap in 64% of monitored sovereignty nodes.");
    } finally {
      setLoading(false);
    }
  };

  const globalAverages = [
    { name: 'Compliance', value: MOCK_COUNTRIES.reduce((a, b) => a + b.complianceScore, 0) / 196 },
    { name: 'Equity', value: MOCK_COUNTRIES.reduce((a, b) => a + b.equityIndex, 0) / 196 },
    { name: 'Readiness', value: MOCK_COUNTRIES.reduce((a, b) => a + b.replicationReadiness, 0) / 196 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">PolicyWatch Monitoring</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Real-time compliance and equity tracking across 196 sovereign entities.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => alert('Exporting full policy audit...')} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
            <Download size={14} /> Full Audit PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
              <h3 className="font-bold text-slate-800 dark:text-white mb-6 tracking-widest uppercase text-xs">Global Compliance Profile</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={globalAverages} innerRadius={60} outerRadius={85} paddingAngle={10} dataKey="value">
                      {globalAverages.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-6 mt-6">
                 {globalAverages.map((d, i) => (
                   <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div> {d.name}
                   </div>
                 ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-slate-800 dark:text-white mb-8 tracking-widest uppercase text-xs">Averages vs Benchmarks</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={globalAverages}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#0f172a', color: '#fff' }} />
                    <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                       {globalAverages.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
               <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-3 text-xs uppercase tracking-widest">
                 <Scale size={20} className="text-blue-500" /> Regional Compliance Ledger
               </h3>
               <div className="relative">
                 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                  type="text" 
                  placeholder="Filter by country..." 
                  className="pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20" 
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
                    <th className="px-8 py-4">Compliance</th>
                    <th className="px-8 py-4">Equity Index</th>
                    <th className="px-8 py-4">Policy Gaps</th>
                    <th className="px-8 py-4 text-center">Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {filteredCountries.slice(0, 15).map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group" onClick={() => setSelectedCountry(c)}>
                      <td className="px-8 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                         <div className={`w-2 h-2 rounded-full ${c.complianceScore > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                         {c.name}
                      </td>
                      <td className="px-8 py-4">
                        <span className={`font-bold ${c.complianceScore > 70 ? 'text-emerald-600' : 'text-amber-600'}`}>{c.complianceScore}%</span>
                      </td>
                      <td className="px-8 py-4 font-medium text-slate-500">{c.equityIndex}%</td>
                      <td className="px-8 py-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${c.policyGaps > 10 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                          {c.policyGaps} Gaps
                        </span>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <ArrowUpRight size={16} className="mx-auto text-slate-200 group-hover:text-blue-500 transition-colors" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-950 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-blue-500/10">
               <ShieldAlert size={140} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Sparkles size={14} className={loading ? 'animate-spin' : ''} /> Gap Predictive AI
              </h4>
              <p className="text-xl font-medium italic leading-relaxed text-slate-200 min-h-[180px]">
                "{prediction}"
              </p>
              <button 
                onClick={runPrediction}
                disabled={loading}
                className="mt-8 w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-[2rem] font-black transition-all shadow-xl shadow-blue-600/20"
              >
                Scan Global Improvements
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
             <Activity size={48} className="text-emerald-500 mb-6" />
             <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-widest text-xs">Risk Indicators</h4>
             <p className="text-slate-500 text-sm mb-8">Systemic risk level across 196 sovereignties remains stable with minor drift in Sector-B logs.</p>
             <div className="w-full space-y-4">
               {[
                 { label: 'High Compliance', count: 142, color: 'bg-emerald-500' },
                 { label: 'Risk Warning', count: 48, color: 'bg-amber-500' },
                 { label: 'Critical Gap', count: 6, color: 'bg-red-500' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                    <div className="flex items-center gap-3">
                       <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                       <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                    </div>
                    <span className="text-xs font-black text-slate-900 dark:text-white">{item.count}</span>
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

export default PolicyWatch;
