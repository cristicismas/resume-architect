import React, { useState } from 'react';
import useScrollToTop from '../../hooks/useScrollToTop';
import { useTemplatePreviews } from '../../hooks/useTemplatePreviews';
import './Templates.css';

import TemplatePreview from '../misc/TemplatePreview';
import Spinner from '../misc/Spinner';

const Templates = ({ shouldScrollToTop = false }) => {
  useScrollToTop(shouldScrollToTop);

  const [shouldFetch, setShouldFetch] = useState(true);
  const { previewsList, couldFetchMore } = useTemplatePreviews(shouldFetch, setShouldFetch);

  const templatePreviews = previewsList.map(template => (
    <TemplatePreview key={template.name} linkTo={`/build/${template.name}`} template={template} />
  ));

  return (
    <section id="templates">
      <h1 className="title">Pick a template!</h1>

      {shouldFetch && (
        <div className="templates-spinner">
          <Spinner />
        </div>
      )}

      <div className="template-previews">{templatePreviews}</div>

      {couldFetchMore && (
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
