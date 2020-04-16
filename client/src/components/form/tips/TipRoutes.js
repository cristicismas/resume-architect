import React, { Fragment } from 'react';
import { Route, useHistory } from 'react-router-dom';
import TIPS from '../../../constants/tips';
import './Tips.css';

import Modal from '../../modals/Modal';

const TipRoutes = () => {
  const history = useHistory();

  return (
    <Fragment>
      {Object.keys(TIPS).map(tip => {
        return (
          <Route key={tip} exact path={[`/build/:templateName/${tip}`, `/draft/:templateName/:resumeName/${tip}`]}>
            <Modal closeModal={history.goBack}>
              <section id="tip">
                <h2 className="title">{TIPS[tip].title}</h2>
                <p className="text" dangerouslySetInnerHTML={{ __html: TIPS[tip].text }}></p>
              </section>
            </Modal>
          </Route>
        );
      })}
    </Fragment>
  );
};

export default TipRoutes;
