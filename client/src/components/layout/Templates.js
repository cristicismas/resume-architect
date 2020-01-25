import React, { useState } from 'react';
import { useTemplatePreviews } from '../../hooks/useTemplatePreviews';
import './Templates.css';

import TemplatePreview from '../misc/TemplatePreview';
import Spinner from '../misc/Spinner';

const Templates = () => {
  const [shouldFetch, setShouldFetch] = useState(true);

  const { previewsList, shouldFetchMore } = useTemplatePreviews(shouldFetch, setShouldFetch);
  const templatePreviews = previewsList.map(template => <TemplatePreview key={template.name} template={template} />);

  return (
    <section id="templates">
      <h1 className="title">Pick a template!</h1>

      {shouldFetch && (
        <div className="templates-spinner">
          <Spinner />
        </div>
      )}

      <div className="template-previews">{templatePreviews}</div>

      {shouldFetchMore && (
        <button
          className="show-more-btn"
          type="button"
          onClick={() => {
            setShouldFetch(true);
          }}>
          Show More
        </button>
      )}
    </section>
  );
};

export default Templates;
