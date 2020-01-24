import React from 'react';

import Hero from '../layout/Hero';
import Features from '../layout/Features';
import Templates from '../layout/Templates';
import Footer from '../layout/Footer';

const Home = () => {
  return (
    <section id="home">
      <Hero />

      <Features />
      <Templates />

      <Footer />
    </section>
  );
};

export default Home;
