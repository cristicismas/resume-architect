import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  return (
    <section id="welcome">
      <h1 className="title">Welcome!</h1>

      <p>Now that you have an account, your resumes will be saved and attributed to your account.</p>

      <p>
        The next time you want to build a resume, or change the template for your current resume, you can easily do so!
      </p>

      <p>
        To view your saved resumes, you can visit the <Link to="/resumes">My Resumes</Link> page. If you want to select
        a template for a new resume instead, visit the <Link to="/templates">Templates</Link> page.
      </p>
    </section>
  );
};

export default Welcome;
