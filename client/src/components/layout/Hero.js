import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero">
      <div className="flex-group">
        <div className="hero-text">
          <h2 className="hero-title">A free resume builder, to make your job hunt easier.</h2>

          <p className="hero-description">
            With <span className="bold">ResumeArchitect</span>, you can easily build a professional resume by completing a simple form and choosing the template you like, for free.
          </p>

          <Link to="/templates" className="hero-cta">
            Choose a Template
          </Link>
        </div>

        <Link to="/build/Resume_3_bjnkss.pdf" className="resume-sample-link"> 
          <img className="resume-sample" src="resume-sample.png" alt="Resume Sample" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
