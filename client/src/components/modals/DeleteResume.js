import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteResume } from '../../redux/actions/resumes';
import ICONS from '../../constants/icons';
import './DeleteResume.css';

import Modal from './Modal';
import LoadingButton from '../misc/LoadingButton';

const DeleteResume = () => {
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  const dispatchDelete = useCallback(() => {
    dispatch(deleteResume(id));
  }, [dispatch, id]);

  const handleDelete = e => {
    e.preventDefault();
    dispatchDelete();
    history.goBack();
  };

  return (
    <Modal closeModal={history.goBack}>
      <div id="delete-resume">
        <h1 className="title">Are you sure?</h1>

        <p className="description">
          If you delete this resume, you won't be able to recover it, and the data inside the resume will be gone
          forever.
        </p>

        <LoadingButton
          loading={false}
          staleIcon={ICONS.DELETE}
          onClick={handleDelete}
          iconColor="#e93c3c"
          type="button"
          className="delete-btn">
          Delete
        </LoadingButton>
      </div>
    </Modal>
  );
};

export default DeleteResume;
