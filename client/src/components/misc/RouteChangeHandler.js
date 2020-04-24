import React from 'react';
import { useHistory } from 'react-router-dom';

const RouteChangeHandler = () => {
  const history = useHistory();

  // Remove all selection on route change
  // This is mostly needed because when exiting a modal, some text is sometimes selected.
  history.listen(() => {
    if (window.getSelection().empty) {
      // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {
      // Firefox
      window.getSelection().removeAllRanges();
    }
  });

  return <>{null}</>;
};

export default RouteChangeHandler;
