import React from 'react';
import './MaintenancePage.css';

const MaintenancePage = ({ theme="light", mainText=null, secondaryText=null }) => {
  return (
    <section id="maintenance-page" className={theme}>
      <div className="page-text">
        <h1 className="main-text">{mainText ? mainText : "Sorry! this page is currently under maintenance."}</h1>

        <h2 className="secondary-text">{secondaryText ? secondaryText : "Please come back at a later time!"}</h2>
      </div>
    </section>
  )
}

export default MaintenancePage;
