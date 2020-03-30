import React from 'react';
import { useHistory, Route } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';
import ICONS from '../../constants/icons';
import './BuildResume.css';

import TipRoutes from '../form/tips/TipRoutes';
import Templates from '../layout/Templates';
import ResumeForm from '../form/ResumeForm';
import Overlay from '../misc/Overlay';
import Icon from '../misc/Icon';

const BuildResume = () => {
  useScrollToTop();
  const history = useHistory();

  return (
    <section id="build-resume">
      <h1 className="title">Welcome!</h1>

      <h2 className="sub-title">
        This form will take about 10 minutes to complete.
        <br />
        If you ever feel stuck you can view a tip for each field by clicking the '<Icon icon={ICONS.INFO} size={20} />'
        icon.
      </h2>

      <Route exact path="/build/change_template">
        <Overlay isFullscreen={true} closeOverlay={history.goBack}>
          <Templates />
        </Overlay>
      </Route>

      <TipRoutes />

      <ResumeForm />
    </section>
  );
};

export default BuildResume;
