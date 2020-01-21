import React, { useEffect, useState } from 'react';
import { apiCall } from '../../utils/api';
import './Templates.css';

import TemplatePreview from '../TemplatePreview';
import Spinner from '../Spinner';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastTemplatesIndex, setLastTemplatesIndex] = useState(0);
  const [anyMoreTemplates, setAnyMoreTemplates] = useState(true);

  const MAX_RESULTS = 6;

  useEffect(() => {
    if (isLoading) {
      apiCall('GET', `templates/previews/${lastTemplatesIndex}`).then(newTemplates => {
        setTemplates(templates => [...templates, ...newTemplates]);

        if (newTemplates.length < MAX_RESULTS) {
          setAnyMoreTemplates(false);
        }

        setIsLoading(false);
      });
    }
  }, [isLoading, lastTemplatesIndex]);

  const templatePreviews = templates.map(template => <TemplatePreview key={template.name} template={template} />);

  return (
    <section id="templates">
      <h1 className="title">Pick a template!</h1>

      {isLoading && (
        <div className="templates-spinner">
          <Spinner />
        </div>
      )}

      <div className="template-previews">{templatePreviews}</div>

      {anyMoreTemplates && (
        <button
          className="show-more-btn"
          type="button"
          onClick={() => {
            setIsLoading(true);
            setLastTemplatesIndex(lastTemplatesIndex + MAX_RESULTS);
          }}>
          Show More
        </button>
      )}
    </section>
  );
};

export default Templates;
