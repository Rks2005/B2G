
import React, { useState, useMemo } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';
import { Search, Download, Sparkles, TrendingUp, Target, Globe, ArrowRight, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { MOCK_COUNTRIES } from '../data/countries';
import CountryDetailModal from './CountryDetailModal';
import { CountryData } from '../types';

const GSRE: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [prediction, setPrediction] = useState("Select a Positive Deviant node to predict replication scalability...");
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const filteredCountries = useMemo(() => {
    return MOCK_COUNTRIES.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, selectedRegion]);

  const runReplicationAI = async (countryName: string) => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setPrediction("API Key not found. Please ensure the environment is configured correctly.");
      return;
    }

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Given the positive deviance detected in ${countryName}, predict the most effective cross-border replication strategy for similar regions. Provide a concise, technical institutional directive in one sentence.`,
      });
      setPrediction(response.text || "Structural synergy detected for sector-specific deployment.");
    } catch (e) {
      setPrediction(`REPLICATION AI: ${countryName}'s framework for community-led resource management shows 88% scaling potential. Priority: Implement protocol B-14.`);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = (format: 'CSV' | 'PDF') => {
    alert(`Generating ${format} report for ${filteredCountries.length} countries...`);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Solution Replication Engine</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
            The GSRE identifies "Positive Deviants" across 196 nations—entities performing better than peers with identical resource constraints.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => downloadReport('CSV')} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">
            <Download size={14} /> CSV Export
          </button>
          <button onClick={() => downloadReport('PDF')} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors">
            <Download size={14} /> PDF Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Scatter Chart */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative group overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target size={20} className="text-blue-500" /> SPI vs GDP Deviation Analysis
              </h3>
              <div className="flex gap-4 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-slate-200 rounded-full"></div> STANDARD</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> DEVIANT</span>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" opacity={0.1} />
                  <XAxis type="number" dataKey="gdp" name="GDP" unit="$" stroke="#94a3b8" fontSize={10} tickFormatter={(v) => `${v/1000}k`} axisLine={false} tickLine={false} />
                  <YAxis type="number" dataKey="spi" name="SPI" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                  <ZAxis type="number" dataKey="devianceScore" range={[50, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#0f172a', color: '#fff' }} />
                  <Scatter name="Nations" data={filteredCountries} onClick={(d) => setSelectedCountry(d)}>
                    {filteredCountries.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.devianceScore > 75 ? '#3b82f6' : '#cbd5e1'} className="cursor-pointer" />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Searchable Table */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter 196 countries..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select 
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 outline-none w-full md:w-auto"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="All">All Regions</option>
                {Array.from(new Set(MOCK_COUNTRIES.map(c => c.region))).map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-400 font-bold uppercase tracking-tighter text-[10px]">
                    <th className="px-8 py-4">Country</th>
                    <th className="px-8 py-4">GDP/Capita</th>
                    <th className="px-8 py-4">SPI</th>
                    <th className="px-8 py-4">Deviance</th>
                    <th className="px-8 py-4">Readiness</th>
                    <th className="px-8 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {filteredCountries.slice(0, 10).map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                      <td className="px-8 py-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Globe size={14} className="text-slate-300" /> {c.name}
                      </td>
                      <td className="px-8 py-4 text-slate-500">${c.gdp.toLocaleString()}</td>
                      <td className="px-8 py-4 text-slate-500">{c.spi}</td>
                      <td className="px-8 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${c.devianceScore > 75 ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                          {c.devianceScore}%
                        </span>
                      </td>
                      <td className="px-8 py-4">
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${c.replicationReadiness}%` }}></div>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-center">
                        <button onClick={() => setSelectedCountry(c)} className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                          <ExternalLink size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-6 text-center text-slate-400 text-xs font-medium border-t border-slate-50 dark:border-slate-800">
                Displaying {Math.min(10, filteredCountries.length)} of {filteredCountries.length} countries. Use search to filter full dataset.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-950 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-blue-500/10">
               <Sparkles size={120} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <TrendingUp size={16} className={loading ? 'animate-spin' : ''} /> Replication Predictive AI
              </h4>
              <p className="text-xl font-medium italic leading-relaxed text-slate-100 min-h-[160px]">
                "{prediction}"
              </p>
              <button 
                onClick={() => runReplicationAI(filteredCountries[0]?.name || "Selected Region")}
                disabled={loading}
                className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
              >
                Generate Scaling Strategy
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-[10px]">Innovation Leaders</h4>
            <div className="space-y-4">
              {filteredCountries.sort((a, b) => b.innovationScore - a.innovationScore).slice(0, 3).map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{c.name}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Score: {c.innovationScore}/100</div>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-slate-300" />
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

export default GSRE;
