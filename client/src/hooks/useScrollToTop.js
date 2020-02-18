import { useEffect } from 'react';

// Scrolls to the top of the page on mount.
// Should be used on every route that needs scroll restoration.
const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

export default useScrollToTop;
