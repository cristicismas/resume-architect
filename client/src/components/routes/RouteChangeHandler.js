import React from 'react';
import { useHistory } from 'react-router-dom';

// Remove all selection on route change
// This is needed because when exiting a modal, text is sometimes selected.
const removeSelection = () => {
  if (window.getSelection().empty) {
    // Chrome
    window.getSelection().empty();
  } else if (window.getSelection().removeAllRanges) {
    // Firefox
    window.getSelection().removeAllRanges();
  }
};

const preventWindowRefreshOrClose = pathname => {
  const routesToPrevent = ['/change_template', '/save'];

  let shouldPrevent = false;

  for (const route of routesToPrevent) {
    if (pathname.includes(route)) {
      shouldPrevent = true;
      break;
    }
  }

  if (shouldPrevent) {
    window.onbeforeunload = e => {
      e.preventDefault();
      return 'Are you sure you want to close?';
    };
  } else {
    window.onbeforeunload = () => {};
  }
};

const RouteChangeHandler = () => {
  const history = useHistory();

  history.listen(location => {
    const { pathname } = location;

    removeSelection();
    preventWindowRefreshOrClose(pathname);
  });

  return <>{null}</>;
};

export default RouteChangeHandler;
