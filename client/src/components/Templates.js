import React, { useEffect, useState } from 'react';
import { apiCall } from '../utils/api';
import './Templates.css';

import Spinner from './Spinner';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTemplatePreviews();
  }, []);

  const fetchTemplatePreviews = () => {
    setIsLoading(true);

    apiCall('GET', 'templates/previews').then(newTemplates => {
      setTemplates([...templates, ...newTemplates]);
      setIsLoading(false);
    });
  };

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

      <button className="show-more-btn" type="button" onClick={() => fetchTemplatePreviews()}>
        Show More
      </button>
    </section>
  );
};

export default Templates;
