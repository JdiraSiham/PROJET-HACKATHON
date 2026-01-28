import React from 'react';

const CTA = () => {
  return (
    <section className="cta section">
      <div className="container">
        <h2 className="section-title">Start Your Skin Journey Today</h2>
        <p className="section-subtitle">
          Join thousands of users who have gained valuable insights about their skin health. 
          Begin your personalized analysis now.
        </p>

        <button className="btn btn-primary">
          Get Started Free
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        <div className="cta-disclaimer">
          <p>
            <strong>Important Disclaimer:</strong> Smart Skin Insight is designed for informational 
            purposes only and does not provide medical diagnoses. Always consult with a qualified 
            healthcare professional or dermatologist for medical advice and treatment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
