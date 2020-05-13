import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <section id="not-found">
      <h1 className="title">404</h1>

      <p className="description">Sorry, the page you're looking for cannot be found.</p>
      <p className="description">Please try another page.</p>
    </section>
  );
};

export default NotFound;
