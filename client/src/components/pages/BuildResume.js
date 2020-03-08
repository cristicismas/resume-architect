import React from 'react';
import { useHistory, Route } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';
import './BuildResume.css';

import Overlay from '../misc/Overlay';
import Templates from '../layout/Templates';
import ResumeForm from '../form/ResumeForm';

const BuildResume = () => {
  useScrollToTop();
  const history = useHistory();

  return (
    <section id="build-resume">
      <h1 className="title">Welcome!</h1>

      <h2 className="sub-title">
        This form will take about 10 minutes to complete.
        <br />
        If you ever feel stuck you can view the tips section and we'll help you out.
      </h2>

      <Route exact path="/build/change_template">
        <Overlay closeOverlay={history.goBack}>
          <Templates />
        </Overlay>
      </Route>

      <ResumeForm />
    </section>
  );
};

export default BuildResume;
