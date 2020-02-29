import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../misc/Icon';

const HeaderLink = ({ text, path, icon }) => {
  const { pathname } = useLocation();

  return (
    <Link className={pathname.includes(path) ? 'active' : ''} to={path}>
      {text}
      <Icon size={24} fill="#eee" icon={icon} />
    </Link>
  );
};

export default HeaderLink;
