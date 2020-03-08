import React from 'react';
import './Welcome.css';

const Welcome = () => {
  return (
    <section id="welcome">
      <h1 className="title">Welcome!</h1>

      <p>
        Now that you have an account, your resume data will be saved.<br /><br />The next time you want to build a resume, or
        change the template for your current resume, you can easily do so!
      </p>
    </section>
  );
};

export default Welcome;
