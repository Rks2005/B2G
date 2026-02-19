
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { Clock, Info, Activity, AlertCircle, Sparkles, RefreshCcw, Download, Globe as GlobeIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { MOCK_COUNTRIES } from '../data/countries';
import CountryDetailModal from './CountryDetailModal';
import { CountryData } from '../types';

const PLM: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [prediction, setPrediction] = useState("Analyzing global temporal communication flows for 196 sovereignty nodes...");
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = 500;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Globe
    const globeGeom = new THREE.SphereGeometry(5, 64, 64);
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0x1e293b,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const globe = new THREE.Mesh(globeGeom, globeMat);
    scene.add(globe);

    // Nodes (using 196 countries)
    const nodes: THREE.Mesh[] = [];
    MOCK_COUNTRIES.forEach((c, i) => {
      const size = 0.05 + (c.collaborations / 500);
      const nodeGeom = new THREE.SphereGeometry(size, 16, 16);
      const color = c.latency > 70 ? 0xf43f5e : (c.latency < 30 ? 0x10b981 : 0x3b82f6);
      const nodeMat = new THREE.MeshBasicMaterial({ color });
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      
      const phi = Math.acos(-1 + (2 * i) / MOCK_COUNTRIES.length);
      const theta = Math.sqrt(MOCK_COUNTRIES.length * Math.PI) * phi;
      node.position.setFromSphericalCoords(5, phi, theta);
      
      node.userData = c;
      scene.add(node);
      nodes.push(node);
    });

    // Connections (random subset)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.1 });
    for (let i = 0; i < 200; i++) {
      const start = nodes[Math.floor(Math.random() * nodes.length)].position;
      const end = nodes[Math.floor(Math.random() * nodes.length)].position;
      const points = [start, end];
      const lineGeom = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeom, lineMaterial);
      scene.add(line);
    }

    // Lights
    const light = new THREE.PointLight(0xffffff, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 2));

    camera.position.z = 12;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes);
      if (intersects.length > 0) {
        setSelectedCountry(intersects[0].object.userData as CountryData);
      }
    };

    renderer.domElement.addEventListener('click', onMouseClick);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', onMouseClick);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Analyze global partnership latency shocks and hidden power hierarchies. Predict the next major structural delay in a one-sentence institutional alert.",
      });
      setPrediction(response.text || "Structural bottleneck predicted in Southeast Asia hub.");
    } catch (e) {
      setPrediction("PREDICTION: Regional latency is expected to propagate from the East Africa hub to donor verification nodes by Q1 2025, creating a 22% delay in fund disbursement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in zoom-in-95 duration-500">
       <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Temporal Mapping</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Interactive 3D visualization of communication latency across all 196 nations.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => alert('Downloading graph data...')} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">
            <Download size={14} /> Export Graph
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-2 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden min-h-[500px]">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          <div className="absolute bottom-8 left-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div> OPTIMAL FLOW (0-30ms)
            </div>
            <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-500">
              <div className="w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div> CRITICAL LATENCY (70ms+)
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest italic">Click any node for country details</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 text-blue-500/20">
                <Sparkles size={80} />
             </div>
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-6">
                  <Activity className="text-blue-400" size={24} />
                  <h3 className="font-bold">Latency Predictor</h3>
               </div>
               <p className="text-sm font-medium italic leading-relaxed text-slate-300 min-h-[140px]">
                 "{prediction}"
               </p>
               <button 
                onClick={fetchPrediction}
                disabled={loading}
                className="w-full mt-6 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
               >
                 <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
                 Forecast Shocks
               </button>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
             <h4 className="font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <Clock size={16} className="text-amber-500" /> Recent Delays
             </h4>
             <div className="space-y-4">
                {MOCK_COUNTRIES.filter(c => c.latency > 85).slice(0, 3).map((c, i) => (
                  <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-l-4 border-red-500">
                    <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase">{c.name} Hub</div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-200">Structural Bottleneck</div>
                    <p className="text-[10px] text-red-500 mt-1">+{c.latency}ms Deviation</p>
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

export default PLM;
