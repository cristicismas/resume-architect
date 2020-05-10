import React from 'react';
import { Route } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';
import ICONS from '../../constants/icons';
import './BuildResume.css';

import TipRoutes from '../routes/TipRoutes';
import ResumeForm from '../form/ResumeForm';
import Icon from '../misc/Icon';
import TemplatesModal from '../modals/TemplatesModal';

const BuildResume = () => {
  useScrollToTop();

  return (
    <section id="build-resume">
      <h1 className="title">Welcome!</h1>

      <h2 className="sub-title">
        This form will take about 10 minutes to complete.
        <br />
        If you ever feel stuck you can view a tip for each field by clicking the '<Icon icon={ICONS.INFO} size={20} />'
        icon.
      </h2>

      <Route exact path={['/build/:templateName/change_template', '/draft/:templateName/:resumeId/change_template']}>
        <TemplatesModal />
      </Route>

      <TipRoutes />

      <ResumeForm />
    </section>
  );
};

export default BuildResume;
