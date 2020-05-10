import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useScrollToTop from '../../hooks/useScrollToTop';
import useTemplatePreviews from '../../hooks/useTemplatePreviews';
import './Templates.css';

import TemplatePreview from '../misc/TemplatePreview';
import Spinner from '../misc/Spinner';

const Templates = ({ shouldScrollToTop = false, isModal }) => {
  const { pathname } = useLocation();
  const { templateName } = useParams();

  useScrollToTop(shouldScrollToTop);

  const [shouldFetch, setShouldFetch] = useState(true);
  const { previewsList, couldFetchMore } = useTemplatePreviews(shouldFetch, setShouldFetch);

  const templatePreviews = previewsList.map(template => {
    const linkTo = isModal
      ? pathname.replace(templateName, template.name).replace('/change_template', '')
      : `/build/${template.name}`;

    return <TemplatePreview key={template.name} linkTo={linkTo} template={template} />;
  });

  return (
    <section id="templates">
      <h1 className="title">{isModal ? 'Change your template' : 'Pick a template!'}</h1>

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
