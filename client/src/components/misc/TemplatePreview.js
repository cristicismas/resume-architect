import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TemplatePreview.css';

import Spinner from './Spinner';

const TemplatePreview = ({ template }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (template)
    return (
      <Link to={`/build/${template.name}`} className="template-preview-container">
        <img src={template.url} alt="template-preview" className="template-preview" onLoad={() => setIsLoaded(true)} />

        {!isLoaded && (
          <div className="spinner-container">
            <Spinner />
          </div>
        )}
      </Link>
    );
  else return null;
};

export default TemplatePreview;
