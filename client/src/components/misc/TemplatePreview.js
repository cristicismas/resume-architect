import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TemplatePreview.css';

import Spinner from './Spinner';

const TemplatePreview = ({ template, linkTo, caption }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  if (template)
    return (
      <Link to={linkTo} className="template-preview-container">
        <figure>
          <img
            src={template.url}
            alt="template-preview"
            className="template-preview"
            onLoad={() => setIsLoaded(true)}
          />

          {caption && <figcaption>{caption}</figcaption>}
        </figure>

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
