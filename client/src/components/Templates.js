import React, { useEffect, useState } from 'react';
import { apiCall } from '../utils/api';
import './Templates.css';

const Templates = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    apiCall('GET', 'templates/previews').then(templates => {
      setTemplates(templates);
    });
  }, []);

  const templatePreviews = templates.map(template => (
    <a href="#">
      <img key={template.name} src={template.url} alt="Template Preview" />
    </a>
  ));

  return (
    <section id="templates">
      <h1 className="title">Pick a template!</h1>

      <div className="template-previews">{templatePreviews}</div>
    </section>
  );
};

export default Templates;
