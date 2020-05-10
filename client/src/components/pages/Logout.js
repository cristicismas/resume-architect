import React from 'react';
import { Link } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
  return (
    <section id="logout">
      <h1 className="title">You are now logged out.</h1>

      <h3 className="text">
        Would you like to <Link className="intermediary" to="/login">log in</Link> with another account?
      </h3>
    </section>
  );
};

export default Logout;
