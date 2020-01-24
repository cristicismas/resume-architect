import React from 'react';
import './BuildResume.css';

import ResumeForm from '../form/ResumeForm';

const BuildResume = () => {
  return (
    <section id="build-resume">
      <h1 className="title">Welcome!</h1>

      <h2 className="sub-title">
        This form will take about 10 minutes to complete.
        <br />
        If you ever feel stuck you can view the tips section and we'll help you out.
      </h2>

      <ResumeForm />
    </section>
  );
};

export default BuildResume;
