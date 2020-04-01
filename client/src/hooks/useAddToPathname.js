import { useLocation } from 'react-router-dom';

const useAddToPathname = stringToAdd => {
  const { pathname } = useLocation();

  // If the current pathname ends in '/', don't add it in the new pathname.
  const newPath = pathname[pathname.length - 1] === '/' ? `${pathname}${stringToAdd}` : `${pathname}/${stringToAdd}`;

  return newPath;
};

export default useAddToPathname;
