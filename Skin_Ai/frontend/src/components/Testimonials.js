import React from 'react';

const testimonials = [
  {
    text: "Smart Skin Insight helped me understand my eczema triggers. The nutrition recommendations made a real difference in just a few weeks.",
    author: "Sarah M.",
    title: "Eczema Management",
    initials: "SM"
  },
  {
    text: "I was skeptical at first, but the AI analysis was surprisingly accurate. The personalized routine has transformed my skincare approach.",
    author: "James L.",
    title: "Acne-prone Skin",
    initials: "JL"
  },
  {
    text: "Finally, an app that gives me actionable insights without replacing my dermatologist. It's the perfect complement to professional care.",
    author: "Maria K.",
    title: "Rosacea Awareness",
    initials: "MK"
  }
];

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#D3A376" stroke="#D3A376" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Testimonials = () => {
  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Users Say</h2>
        <p className="section-subtitle" style={{ margin: '0 auto' }}>
          Real stories from people who improved their skin health
        </p>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star"><StarIcon /></span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.initials}</div>
                <div>
                  <p className="author-name">{testimonial.author}</p>
                  <p className="author-title">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
