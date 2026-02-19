
import React from 'react';
import { Target, Eye, Users, Heart, Download, Mail, ShieldCheck, Zap, Globe, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <header className="relative h-[450px] rounded-[4rem] overflow-hidden shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          alt="AI Global Development"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        <div className="relative z-10 h-full flex flex-col items-start justify-end p-20 max-w-4xl">
          <span className="px-4 py-1.5 bg-blue-600 rounded-full text-[10px] font-black text-white uppercase tracking-[0.3em] mb-6">Institutional OS v4.2</span>
          <h2 className="text-6xl font-black text-white mb-6 leading-tight">Driving Temporal <br/> Justice & Equity.</h2>
          <p className="text-slate-300 text-xl font-medium leading-relaxed">
            Bridging institutional memory and future-facing predictive action to revolutionize sustainable global development.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center px-10">
        <div className="space-y-10">
          <div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              The GPD-TJP was established to rectify systemic delays in development aid and knowledge sharing. By leveraging advanced AI engines, we identify what works in resource-constrained environments and replicate it across all 196 sovereignty nodes.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {[
              { icon: Target, title: 'Positive Deviance Detection', text: 'Identifying outliers performing significantly above peer benchmarks.' },
              { icon: Eye, title: 'Temporal Monitoring', text: 'Exposing hidden hierarchies and latency in communication networks.' },
              { icon: Heart, title: 'Global Equity', title2: 'Ethics', text: 'Ensuring resource allocation maximizes impact for the underserved.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] transition-all hover:translate-x-2">
                <div className="p-4 bg-white dark:bg-slate-700 rounded-2xl text-blue-600 shadow-sm self-start">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white text-lg mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-12 rounded-[4rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-500"></div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-10 text-center">Platform Capabilities</h3>
            <div className="grid grid-cols-2 gap-8">
                {[
                  { label: 'Predictive Nodes', count: '196' },
                  { label: 'Annual Outcomes', count: '84k' },
                  { label: 'Memory Span', count: '30yrs' },
                  { label: 'Latency Precision', count: '0.1ms' },
                ].map((stat, i) => (
                  <div key={i} className="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl text-center group transition-colors hover:bg-blue-600">
                    <div className="text-3xl font-black text-blue-600 dark:text-blue-400 group-hover:text-white mb-1">{stat.count}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-100">{stat.label}</div>
                  </div>
                ))}
            </div>
            <div className="mt-12 space-y-4">
              <button className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-[2rem] font-black hover:bg-slate-800 transition-all shadow-xl">
                <Download size={20} /> Download Platform Charter
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-[2rem] font-black hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                <Mail size={20} /> Contact Secretariat
              </button>
            </div>
        </div>
      </div>

      <section className="px-10 pb-20">
         <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-12 text-center">Institutional Leadership</h3>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { name: 'Dr. Elena Vance', role: 'Head of Global Memory', icon: ShieldCheck },
              { name: 'Marcus Chen', role: 'Deviance Architect', icon: Zap },
              { name: 'Sarah Al-Fayed', role: 'Equity Coordinator', icon: Globe },
              { name: 'Dr. Robert Thorne', role: 'Latency Strategist', icon: Clock },
            ].map((person, i) => (
              <div key={i} className="p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] text-center shadow-sm hover:shadow-xl transition-all group">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <person.icon size={32} />
                </div>
                <h4 className="font-black text-slate-900 dark:text-white mb-1">{person.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{person.role}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
};

export default About;
