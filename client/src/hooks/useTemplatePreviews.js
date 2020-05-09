import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPreviews } from '../redux/actions/previews';

const useTemplatePreviews = (shouldFetch, setShouldFetch) => {
  const { previewsList, couldFetchMore } = useSelector(state => state.previews);
  const dispatch = useDispatch();

  const dispatchGetPreviews = useCallback(() => {
    dispatch(getPreviews());
  }, [dispatch]);

  useEffect(() => {
    if (shouldFetch) {
      dispatchGetPreviews();
      setShouldFetch(false);
    }
  }, [shouldFetch, setShouldFetch, dispatchGetPreviews]);

  return { previewsList, couldFetchMore };
};

export default useTemplatePreviews;
