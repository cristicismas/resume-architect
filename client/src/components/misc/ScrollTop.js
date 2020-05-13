import React from 'react';
import './ScrollTop.css';
import Icon from './Icon';
import ICONS from '../../constants/icons';

const ScrollTop = () => {
  const scrollToTop = e => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <button id="scroll-top" onClick={scrollToTop}>
      <Icon icon={ICONS.ARROW} size={48} fill="#222" />
    </button>
  );
};

export default ScrollTop;
