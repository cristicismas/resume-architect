import React from 'react';
import useScrollToTop from '../../hooks/useScrollToTop';
import './About.css';

const About = () => {
  useScrollToTop();

  return (
    <section id="about">
      <h1 className="title">About</h1>

      <p className="description">
        This website was mainly built because of my frustration with other resume builder websites.
        <br />
        <br />
        Making your resume was almost always stuck under paywalls and promises of free resume building, only to
        discover, at the end of building the resume, that you need to pay and / or enter your email to get your precious
        resume.
        <br />
        <br />
        All of that was incredibly frustrating, and that's why I decided to make a simple, no BS builder, that doesn't
        try to fool its users in order to get revenue.
        <br />
        <br />
        Currently, the site has very few templates, and I need some help adding more. If you want to help, contact me at
        <a className="intermediary" href="mailto:cristicismas.webdev@gmail.com">
          cristicismas.webdev@gmail.com
        </a>
        .
        <br />
        <br />
        If you want to see more of my work, you can take a look at my
        <a className="intermediary" href="https://cristicismas.github.io">
          portfolio
        </a>
        .
      </p>
    </section>
  );
};

export default About;
