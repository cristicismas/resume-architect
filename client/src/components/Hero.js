import React from 'react';
import './Hero.css';

import Header from './Header';

const Hero = () => {
  return (
    <section id="hero">
      <Header />

      <div className="flex-group">
        <div className="hero-text">
          <h2 className="hero-title">A free resume builder, to make your job hunt easier.</h2>

          <p className="hero-description">
            With <span className="bold">ResumeArchitect</span>, you can easily build a professional, scannable and printable resume by completing a simple form and choosing a template you like, for free.
          </p>

          <a href="#templates" className="hero-cta">
            Choose a Template
          </a>
        </div>

        <a href="/" className="resume-sample-link"> 
          <img className="resume-sample" src="resume-sample.png" alt="Resume Sample" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
