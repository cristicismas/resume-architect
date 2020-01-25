import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPreviews } from '../../store/actions/previews';
import './Templates.css';

import TemplatePreview from '../misc/TemplatePreview';
import Spinner from '../misc/Spinner';

const Templates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { previewsList, shouldFetchMore } = useSelector(state => state.previews);
  const dispatch = useDispatch();

  const handleGetPreviews = useCallback(() => {
    dispatch(getPreviews());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      handleGetPreviews();
      setIsLoading(false);
    }
  }, [isLoading, handleGetPreviews]);

  const templatePreviews = previewsList.map(template => <TemplatePreview key={template.name} template={template} />);

  return (
    <section id="templates">
      <h1 className="title">Pick a template!</h1>

      {isLoading && (
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
            setIsLoading(true);
          }}>
          Show More
        </button>
      )}
    </section>
  );
};

export default Templates;
