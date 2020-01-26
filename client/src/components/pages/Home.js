import React from 'react';

import Hero from '../layout/Hero';
import Features from '../layout/Features';
import Templates from '../layout/Templates';

const Home = () => {
  return (
    <section id="home">
      <Hero />

      <Features />
      <Templates />
    </section>
  );
};

export default Home;
