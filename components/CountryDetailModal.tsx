
import React from 'react';
import { X, Globe, BarChart, Shield, Zap, TrendingUp } from 'lucide-react';
import { CountryData } from '../types';

interface CountryDetailModalProps {
  country: CountryData;
  onClose: () => void;
}

const CountryDetailModal: React.FC<CountryDetailModalProps> = ({ country, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-blue-600 rounded-2xl text-white">
              <Globe size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">{country.name}</h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">{country.region} • ID: {country.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <BarChart size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Socio-Economic</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-500">GDP/Capita</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">${country.gdp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-500">SPI</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{country.spi}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Shield size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Compliance</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-500">Score</span>
                  <span className="text-sm font-bold text-emerald-600">{country.complianceScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-500">Policy Gaps</span>
                  <span className="text-sm font-bold text-red-600">{country.policyGaps}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Zap size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Efficiency</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-500">Funding Impact</span>
                  <span className="text-sm font-bold text-blue-600">{country.impactScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-slate-500">Latency</span>
                  <span className="text-sm font-bold text-amber-600">{country.latency}ms</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
            <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp size={16} /> GPD-TJP Institutional Predictive AI
            </h4>
            <p className="text-lg italic leading-relaxed text-slate-200">
              "Based on the {country.devianceScore}% deviance score, {country.name} exhibits significant potential for solution replication in the energy sector. Predictive modeling suggests that addressing the {country.policyGaps} policy gaps could improve funding efficiency by 14.5% within the next fiscal cycle."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailModal;
