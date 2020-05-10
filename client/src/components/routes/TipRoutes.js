import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import TIPS from '../../constants/tips';

import Tip from '../modals/Tip';

const TipRoutes = () => {
  return (
    <Fragment>
      {Object.keys(TIPS).map(tip => {
        return (
          <Route key={tip} exact path={[`/build/:templateName/${tip}`, `/draft/:templateName/:resumeId/${tip}`]}>
            <Tip title={TIPS[tip].title} text={TIPS[tip].text} />
          </Route>
        );
      })}
    </Fragment>
  );
};

export default TipRoutes;
