import React from 'react';
import { useHistory } from 'react-router-dom';
import './Tip.css';

import Modal from './Modal';

const Tip = ({ title, text }) => {
  const history = useHistory();

  return (
    <Modal closeModal={history.goBack}>
      <section id="tip">
        <h2 className="title">{title}</h2>
        <p className="text" dangerouslySetInnerHTML={{ __html: text }}></p>
      </section>
    </Modal>
  );
};

export default Tip;
