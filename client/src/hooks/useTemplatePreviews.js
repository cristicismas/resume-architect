import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPreviews } from '../store/actions/previews';

export const useTemplatePreviews = (shouldFetch, setShouldFetch) => {
  const { previewsList, couldFetchMore } = useSelector(state => state.previews);
  const dispatch = useDispatch();

  const handleGetPreviews = useCallback(() => {
    dispatch(getPreviews());
  }, [dispatch]);

  useEffect(() => {
    if (shouldFetch) {
      handleGetPreviews();
      setShouldFetch(false);
    }
  }, [shouldFetch, setShouldFetch, handleGetPreviews]);

  return { previewsList, couldFetchMore };
};
