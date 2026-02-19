
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Download, FileText, CheckCircle, AlertTriangle, MessageSquareCode, RefreshCcw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const COLORS = ['#1e293b', '#3b82f6', '#94a3b8', '#e2e8f0'];

const Insights: React.FC = () => {
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>("Click to generate real-time institutional directive...");

  const generateInsight = async () => {
    setLoadingInsight(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate a one-sentence professional institutional directive for a global partnership platform focusing on resource allocation efficiency and transparency based on current 'simulated' performance metrics (85% compliance, 12% delay). Make it sound authoritative and IEEE-style.",
      });
      setAiInsight(response.text || "Protocol optimization required for Sub-Sector 4.B.");
    } catch (error) {
      setAiInsight("Unable to connect to GPD-TJP Intel Core. Please check system status.");
    } finally {
      setLoadingInsight(false);
    }
  };

  const complianceData = [
    { name: 'Financial', value: 92 },
    { name: 'Social', value: 85 },
    { name: 'Environmental', value: 78 },
    { name: 'Governance', value: 88 },
  ];

  const allocationData = [
    { name: 'NGO Support', value: 400 },
    { name: 'Infrastructure', value: 300 },
    { name: 'Capacity Bldg', value: 300 },
    { name: 'Monitoring', value: 200 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Overall Compliance', value: '88.4%', status: 'optimal', icon: CheckCircle },
          { label: 'Latency Score', value: '1.2ms', status: 'optimal', icon: CheckCircle },
          { label: 'Active Partnerships', value: '142', status: 'warning', icon: AlertTriangle },
          { label: 'Solution Drift', value: '-2.4%', status: 'optimal', icon: CheckCircle },
        ].map((m, i) => (
          <div key={i} className="bg-white p-5 border border-slate-100 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.label}</span>
              <m.icon size={16} className={m.status === 'optimal' ? 'text-emerald-500' : 'text-amber-500'} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Compliance Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800">Compliance & Performance Tracking</h3>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 text-slate-400 rounded-lg transition-colors"><Download size={18} /></button>
              <button className="p-2 hover:bg-slate-50 text-slate-400 rounded-lg transition-colors"><FileText size={18} /></button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="value" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <h3 className="font-bold text-slate-800 mb-8 text-center">Fund Allocation</h3>
          <div className="flex-1 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {allocationData.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                {d.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Directive Section */}
      <div className="bg-slate-900 p-8 rounded-3xl shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="bg-blue-500/20 p-4 rounded-2xl border border-blue-500/30">
            <MessageSquareCode size={32} className="text-blue-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <RefreshCcw size={12} className={loadingInsight ? 'animate-spin' : ''} /> 
              Real-Time AI Insight (Gemini-3-Flash)
            </h4>
            <p className="text-xl text-white font-medium italic leading-relaxed">
              {loadingInsight ? 'Synthesizing data stream...' : `"${aiInsight}"`}
            </p>
          </div>
          <button 
            onClick={generateInsight}
            disabled={loadingInsight}
            className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-colors disabled:opacity-50"
          >
            Regenerate Protocol
          </button>
        </div>
      </div>
    </div>
  );
};

export default Insights;
