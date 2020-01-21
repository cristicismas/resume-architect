import React, { useState } from 'react';
import './TemplatePreview.css';

import Spinner from './Spinner';

const TemplatePreview = ({ template }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <a href="/" className="template-preview-container">
      <img src={template.url} alt="template-preview" className="template-preview" onLoad={() => setIsLoaded(true)} />

      {!isLoaded && (
        <div className="spinner-container">
          <Spinner />
        </div>
      )}
    </a>
  );
};

export default TemplatePreview;
