import React, { useEffect, useState } from 'react';
import { apiCall } from '../utils/api';
import './Templates.css';

import Spinner from './Spinner';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      apiCall('GET', 'templates/previews').then(newTemplates => {
        setTemplates(templates => [...templates, ...newTemplates]);
        setIsLoading(false);
      });
    }
  }, [isLoading]);

  const templatePreviews = templates.map(template => (
    <a key={template.name} href="/">
      <img src={template.url} alt="Template Preview" />
    </a>
  ));

  return (
    <section id="templates">
      <h1 className="title">Pick a template!</h1>

      {isLoading ? (
        <div className="templates-spinner">
          <Spinner />
        </div>
      ) : null}

      <div className="template-previews">{templatePreviews}</div>

      <button className="show-more-btn" type="button" onClick={() => setIsLoading(true)}>
        Show More
      </button>
    </section>
  );
};

export default Templates;
