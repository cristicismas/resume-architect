import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero">
      <div className="hero-text">
        <h2 className="hero-title">A free resume builder, to make your job hunt easier.</h2>

        <p className="hero-description">
          With ResumeArchitect, you can easily build a professional, scannable and printable resume by completing a simple form and choosing a template you like, for free.
        </p>

        <a href="#" className="hero-cta">
          Choose a Template
        </a>
      </div>

      <a href="#" className="resume-sample-link"> 
        <img className="resume-sample" src="resume-sample.png" alt="Resume Sample" />
      </a>
    </section>
  );
};

export default Hero;
