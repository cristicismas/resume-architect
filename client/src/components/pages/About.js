import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about">
      <h1 className="title">About</h1>

      <p className="description">
        This website was mainly built because of my frustration with other resume builder websites.
        <br />
        <br />
        Making your resume was almost always stuck under paywalls and promises of free resume building, only to discover, at
        the end of building the resume, that you need to pay and / or enter your email to get your precious resume.
        <br />
        <br />
        All of that was incredibly frustrating, and that's why I decided to make a simple, no BS builder, that doesn't
        try to fool its user in order to get revenue.
        <br />
        <br />
        The reason I won't ask for money, and the reason I'm not going to bloat this site with ads, is that I don't
        actually need money to host the website, since it's hosted on a free server on <a href="https://heroku.com">Heroku</a>. That means that resume
        building isn't going to be necessarily fast, but from what I could test, it's fast enough to be usable.
        <br />
        <br />
        <br />
        Currently, the site has very few templates, and I need some help adding more. If you want to help, contact me at
        <a href="mailto:cristicismas.webdev@gmail.com">cristicismas.webdev@gmail.com</a>.
        <br />
        <br />
        If you want to see more of my work, you can take a look at my
        <a href="https://cristicismas.github.io">portfolio</a>.
      </p>
    </section>
  );
};

export default About;
