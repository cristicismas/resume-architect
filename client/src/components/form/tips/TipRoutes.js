import React, { Fragment } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Overlay from '../../misc/Overlay';
import './Tips.css';

import Name from './Name';
import Address from './Address';
import Phone from './Phone';
import Email from './Email';
import About from './About';
import Extra from './Extra';
import JobCompany from './JobCompany';
import JobTitle from './JobTitle';
import JobDate from './JobDate';
import JobResponsibilities from './JobResponsibilities';
import School from './School';
import SchoolDegree from './SchoolDegree';
import SchoolDate from './SchoolDate';

const tips = {
  name: Name,
  address: Address,
  phone: Phone,
  email: Email,
  about: About,
  extra: Extra,
  jobCompany: JobCompany,
  jobTitle: JobTitle,
  jobDate: JobDate,
  jobResponsibilities: JobResponsibilities,
  school: School,
  schoolDegree: SchoolDegree,
  schoolDate: SchoolDate
};

const TipRoutes = () => {
  const history = useHistory();

  return (
    <Fragment>
      {Object.keys(tips).map(tip => {
        const TipComponent = tips[tip];

        return (
          <Route key={tip} exact path={`/build/:template_name/${tip}`}>
            <Overlay closeOverlay={history.goBack}>
              <TipComponent />
            </Overlay>
          </Route>
        );
      })}
    </Fragment>
  );
};

export default TipRoutes;
