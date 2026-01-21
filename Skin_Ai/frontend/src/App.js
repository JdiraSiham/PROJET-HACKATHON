import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Activity, Zap, ShieldCheck, ArrowRight, Video, Brain, Play } from 'lucide-react';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {!started ? (
          <WelcomeScreen key="welcome" onStart={() => setStarted(true)} />
        ) : (
          <AnalysisScreen key="analysis" onBack={() => setStarted(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- ÉCRAN D'ACCUEIL (Landing Page) ---
const WelcomeScreen = ({ onStart }) => {
  return (
    <motion.div 
      className="hero-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* On applique la classe CSS ici */}
        <span className="badge-gemini">GEMINI 3.0 POWERED</span>
      </motion.div>
      
      <h1 style={{ fontSize: '4rem', margin: '10px 0' }}>
        Smart Skin <span className="gradient-text">Insight</span>
      </h1>
      
      <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
        L'intelligence artificielle multimodale au service de votre peau. 
        Analysez les motifs temporels et obtenez un diagnostic précis en quelques secondes.
      </p>

      {/* Cartes des fonctionnalités */}
      <div className="feature-grid">
        <FeatureCard icon={<Video color="#ec4899"/>} title="Analyse Vidéo" desc="Détection du relief et de la souplesse en mouvement." delay={0.4} />
        <FeatureCard icon={<Brain color="#6366f1"/>} title="Deep Reasoning" desc="Raisonnement clinique étape par étape." delay={0.5} />
        <FeatureCard icon={<ShieldCheck color="#10b981"/>} title="Privacy First" desc="Analyse en mémoire, zéro stockage." delay={0.6} />
      </div>

      <motion.button 
        className="btn-magic"
        onClick={onStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Lancer le Diagnostic <ArrowRight size={20} />
      </motion.button>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    className="feature-card"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: delay }}
  >
    <div style={{ marginBottom: '10px' }}>{icon}</div>
    <h3 style={{ margin: '5px 0', color: 'white' }}>{title}</h3>
    <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>{desc}</p>
  </motion.div>
);

// --- ÉCRAN D'ANALYSE (Le Scanner) ---
const AnalysisScreen = ({ onBack }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('video', file);

    try {
      // Remplace par ton IP locale si besoin, ou garde localhost
      const response = await axios.post('http://127.0.0.1:8000/api/diagnosis/analyze/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion avec l'IA.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="scanner-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={onBack} style={{background:'none', border:'none', color:'#94a3b8', cursor:'pointer', marginBottom:'20px'}}>
        ← Retour
      </button>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2rem', margin: 0 }}>Analyseur <span className="gradient-text">Temporel</span></h2>
        <p style={{ color: '#94a3b8' }}>Chargez une vidéo de 10-15 secondes</p>
      </div>

      {/* ZONE D'UPLOAD */}
      {!preview ? (
        <label 
          htmlFor="video-upload" 
          style={{ 
            border: '2px dashed rgba(255,255,255,0.2)', 
            borderRadius: '20px', 
            padding: '40px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            cursor: 'pointer',
            background: 'rgba(0,0,0,0.2)'
          }}
        >
          <Upload size={48} color="#6366f1" style={{ marginBottom: '15px' }} />
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Cliquez pour uploader</span>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>MP4 supporté</span>
          <input type="file" id="video-upload" accept="video/*" style={{ display: 'none' }} onChange={handleFileChange} />
        </label>
      ) : (
        <motion.div className="preview-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <video src={preview} controls className="preview-video" />
          {!loading && !result && (
            <button className="btn-magic" onClick={handleSubmit} style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}>
              <Zap size={20} fill="white" /> Lancer l'Analyse IA
            </button>
          )}
        </motion.div>
      )}

      {/* LOADING */}
      {loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          style={{ textAlign: 'center', marginTop: '30px' }}
        >
          <div className="loading-pulse"></div>
          <p>Gemini réfléchit... (Deep Reasoning)</p>
        </motion.div>
      )}

      {/* RÉSULTATS */}
      {result && (
        <motion.div 
          style={{ marginTop: '30px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="result-box">
            <h3 style={{ color: '#ec4899', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Video size={20} /> Observations Vidéo
            </h3>
            <p style={{ color: '#cbd5e1', fontStyle: 'italic' }}>"{result.analyse_temporelle}"</p>
          </div>

          <div className="result-box" style={{ borderColor: '#6366f1' }}>
            <h3 style={{ color: '#6366f1', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Brain size={20} /> Diagnostic & Raisonnement
            </h3>
            <h2 style={{ margin: '5px 0' }}>{result.diagnostic_possible}</h2>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <span style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>
                Confiance: {result.confiance}
              </span>
              <span style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#fbcfe8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>
                Urgence: {result.urgence}
              </span>
            </div>
            <ul style={{ marginTop: '15px', paddingLeft: '20px', color: '#e2e8f0' }}>
              {result.symptomes && result.symptomes.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div className="result-box" style={{ borderColor: '#10b981' }}>
            <h3 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={20} /> Recommandation
            </h3>
            <p>{result.conseil}</p>
          </div>
          
          <button onClick={() => {setPreview(null); setResult(null);}} style={{ width: '100%', padding: '15px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '10px', cursor: 'pointer' }}>
            Nouvelle analyse
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default App;