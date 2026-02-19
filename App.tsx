
import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  GitBranch, 
  Activity, 
  PieChart, 
  Layers, 
  Menu, 
  X,
  Settings as SettingsIcon,
  BookOpen,
  Moon,
  Sun,
  ShieldCheck,
  Bell,
  Scale,
  Wifi,
  WifiOff
} from 'lucide-react';
import { AppSection } from './types';
import Overview from './components/Overview';
import GSRE from './components/GSRE';
import PLM from './components/PLM';
import GIAE from './components/GIAE';
import IMA from './components/IMA';
import About from './components/About';
import Settings from './components/Settings';
import PolicyWatch from './components/PolicyWatch';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.OVERVIEW);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isApiActive, setIsApiActive] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Check if API key is present and not the default placeholder
    const key = process.env.API_KEY;
    const hasActiveKey = !!key && key !== 'your_gemini_api_key_here' && key !== '';
    setIsApiActive(hasActiveKey);
  }, []);

  const navigation = [
    { id: AppSection.OVERVIEW, name: 'Dashboard', icon: Layers },
    { id: AppSection.ABOUT, name: 'About Platform', icon: BookOpen },
    { id: AppSection.GSRE, name: 'GSRE Engine', icon: GitBranch },
    { id: AppSection.PLM, name: 'Latency Mapping', icon: Globe },
    { id: AppSection.GIAE, name: 'Allocation Engine', icon: PieChart },
    { id: AppSection.IMA, name: 'Institutional Memory', icon: ShieldCheck },
    { id: AppSection.POLICYWATCH, name: 'PolicyWatch', icon: Scale },
    { id: AppSection.SETTINGS, name: 'System Settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden text-slate-900 dark:text-slate-100">
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50 dark:bg-slate-900/50 z-30`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800">
          <div className="bg-slate-900 dark:bg-blue-600 text-white p-2 rounded-lg shadow-lg">
            <Activity size={24} />
          </div>
          {isSidebarOpen && (
            <div className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
              GPD<span className="text-blue-500">.</span>TJP
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${
                activeSection === item.id 
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm font-semibold' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <item.icon size={20} />
              {isSidebarOpen && <span className="text-sm">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center gap-4 px-3 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            {isSidebarOpen && <span className="text-sm font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-4 px-3 py-3 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            {isSidebarOpen && <span className="text-sm">Collapse Sidebar</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 relative overflow-y-auto ieee-grid bg-white dark:bg-slate-950">
        <header className="sticky top-0 z-20 glass dark:bg-slate-900/80 px-8 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {navigation.find(n => n.id === activeSection)?.name}
              </h1>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">
                IEEE-STD-GLOBAL-JUSTICE-V2
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`hidden lg:flex items-center gap-2 text-[10px] font-black uppercase px-4 py-2 rounded-full border transition-all ${isApiActive ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-600' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'}`}>
              {isApiActive ? <Wifi size={12} className="animate-pulse" /> : <WifiOff size={12} />}
              {isApiActive ? 'AI Core Connected' : 'Local Sandbox Mode'}
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              196 REGIONS MONITORED
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
               <Bell size={20} />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto min-h-[calc(100vh-140px)]">
          {activeSection === AppSection.OVERVIEW && <Overview onNavigate={setActiveSection} />}
          {activeSection === AppSection.ABOUT && <About />}
          {activeSection === AppSection.GSRE && <GSRE />}
          {activeSection === AppSection.PLM && <PLM />}
          {activeSection === AppSection.GIAE && <GIAE />}
          {activeSection === AppSection.IMA && <IMA />}
          {activeSection === AppSection.POLICYWATCH && <PolicyWatch />}
          {activeSection === AppSection.SETTINGS && <Settings />}
        </div>
        
        <footer className="py-8 border-t border-slate-200 dark:border-slate-800 px-8 text-center bg-slate-50 dark:bg-slate-900/50">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            &copy; 2024 Global Partnership Data Integration & Temporal Joint Platforms (GPD-TJP). <br/>
            Optimized for IEEE Standards & Global Institutional Memory.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
