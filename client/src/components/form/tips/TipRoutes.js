import React, { Fragment } from 'react';
import { Route, useHistory } from 'react-router-dom';
import TIPS from '../../../constants/tips';
import './Tips.css';

import Overlay from '../../misc/Overlay';

const TipRoutes = () => {
  const history = useHistory();

  return (
    <Fragment>
      {Object.keys(TIPS).map(tip => {
        return (
          <Route key={tip} exact path={`/build/:template_name/${tip}`}>
            <Overlay closeOverlay={history.goBack}>
              <section id="tip">
                <h2 className="title">{TIPS[tip].title}</h2>
                <p className="text" dangerouslySetInnerHTML={{ __html: TIPS[tip].text }}></p>
              </section>
            </Overlay>
          </Route>
        );
      })}
    </Fragment>
  );
};

export default TipRoutes;
