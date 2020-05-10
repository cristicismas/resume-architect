import React from 'react';
import { useHistory } from 'react-router-dom';

import Templates from '../layout/Templates';
import Modal from './Modal';

const TemplatesModal = () => {
  const history = useHistory();

  return (
    <Modal isFullscreen={true} closeModal={history.goBack}>
      <Templates isModal={true} />
    </Modal>
  );
};

export default TemplatesModal;
