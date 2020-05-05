import React from 'react';
import './Credits.css';

const Credits = () => {
  return (
    <section id="credits">
      <h1 className="title">Credits & Attributions</h1>

      <h3 className="sub-title">Icons:</h3>

      <ul className="credits-list">
        <li>
          <img src="favicon.png" alt="logo" />
          The page logo was designed by{' '}
          <a href="https://www.flaticon.com/authors/mangsaabguru" title="mangsaabguru">
            mangsaabguru
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </li>

        <li>
          All other icons are taken from <a href="https://iconmonstr.com">Iconmonstr</a>.
        </li>
      </ul>
    </section>
  );
};

export default Credits;
