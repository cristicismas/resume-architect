import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <h1 className="title"><a href="#">ResumeArchitect</a></h1>

      <nav>
        <a href="#">Templates</a>
        <a href="#">Build Your Own</a>
        <a href="#">Sign Up</a>
      </nav>
    </header>
  );
};

export default Header;
