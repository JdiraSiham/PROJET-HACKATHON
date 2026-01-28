import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            AI-Powered Skin Analysis
          </div>
          
          <h1 className="hero-title">
            Understand Your Skin <span>Like Never Before</span>
          </h1>
          
          <p className="hero-text">
            Record a short video of your skin, and let our AI analyze inflammation patterns, 
            recommend personalized care routines, and suggest nutrition guidance tailored to your needs.
          </p>
          
          <div className="hero-buttons">
            <button className="btn btn-primary">
              Start Analysis
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="btn btn-secondary">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-container">
            <div className="hero-card hero-card-main">
              <div className="card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3E2522" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <h3 className="card-title">Skin Health Score</h3>
              <p className="card-text">Your overall skin condition analysis based on AI insights</p>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <p className="card-text" style={{ marginTop: '8px', fontSize: '12px' }}>75% - Good Condition</p>
            </div>

            <div className="hero-card hero-card-float top">
              <div className="card-icon" style={{ width: '36px', height: '36px', marginBottom: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E2522" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <p className="card-text" style={{ fontWeight: '600', color: '#3E2522' }}>Care Routine</p>
              <p className="card-text" style={{ fontSize: '12px' }}>Personalized</p>
            </div>

            <div className="hero-card hero-card-float bottom">
              <div className="card-icon" style={{ width: '36px', height: '36px', marginBottom: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E2522" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <p className="card-text" style={{ fontWeight: '600', color: '#3E2522' }}>Nutrition Tips</p>
              <p className="card-text" style={{ fontSize: '12px' }}>Tailored for you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
