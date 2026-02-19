
import React from 'react';
import { Settings as SettingsIcon, Shield, Bell, Database, Globe, User } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-4xl mx-auto">
      <div className="flex items-center gap-6 mb-12">
         <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-400">
           <User size={40} />
         </div>
         <div>
           <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Institutional Administrator</h2>
           <p className="text-slate-500">ID: SEC-2024-GPD-001 | Access: Level 5 (Global)</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { label: 'Security & Auth', desc: 'Manage 2FA and cryptographic keys', icon: Shield },
          { label: 'Notifications', desc: 'System alerts and engine logs', icon: Bell },
          { label: 'Data Sources', desc: 'Configure API endpoints and oracles', icon: Database },
          { label: 'Global Presets', desc: 'Regional calibration and metrics', icon: Globe },
        ].map((item, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:border-blue-200 dark:hover:border-blue-900 transition-all cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 group-hover:text-blue-600 transition-colors">
                <item.icon size={24} />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white">{item.label}</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-8 bg-red-50 dark:bg-red-900/10 rounded-[2rem] border border-red-100 dark:border-red-900/20">
        <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4">Danger Zone</h3>
        <p className="text-sm text-red-600/70 dark:text-red-400/70 mb-6 leading-relaxed">
          Critical operations: Resetting engine state or clearing institutional memory is irreversible.
        </p>
        <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500 transition-all shadow-lg">
          Purge Temporal Logs
        </button>
      </div>
    </div>
  );
};

export default Settings;
