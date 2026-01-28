import React from 'react';

const steps = [
  {
    number: 1,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3E2522" strokeWidth="2">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    title: 'Record Video',
    description: 'Capture a short video of your skin concern using your smartphone camera.'
  },
  {
    number: 2,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3E2522" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'AI Analysis',
    description: 'Our advanced AI processes your video to identify inflammation and patterns.'
  },
  {
    number: 3,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3E2522" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: 'Get Insights',
    description: 'Receive detailed reports about your skin condition and inflammation levels.'
  },
  {
    number: 4,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3E2522" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Follow Plan',
    description: 'Apply personalized care routines and nutrition guidance for better skin health.'
  }
];

const HowItWorks = () => {
  return (
    <section className="how-it-works section" id="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Get personalized skin insights in four simple steps
        </p>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
