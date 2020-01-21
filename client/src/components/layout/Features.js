import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section id="features">
      <h1 className="title">Features</h1>

      <div className="feature-cards">
        <div className="card">
          <h3 className="card-title">Easy to use</h3>
          <p className="card-description">
            Your job hunt doesn't need to be any more complicated than it already is. This is a free, easy-to-use resume
            builder. Simply pick a template, fill a form, and download your resume!
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">Build your own!</h3>
          <p className="card-description">
            We offer professional, scannable and printable resumes that can be downloaded in a variety of formats. If
            none of our templates satisfy your needs, you can upload your own template and use our service to fill it
            out!
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">We'll help you out</h3>
          <p className="card-description">
            No idea what to write? No problem. We tell you what you need to fill out and give you useful examples. Just
            pick the design you like and in 10 minutes you'll have a brand-new resume.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
