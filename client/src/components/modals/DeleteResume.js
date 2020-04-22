import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteResume } from '../../store/actions/resumes';
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
        <h1 className="title">Are you sure you want to delete the resume?</h1>

        <LoadingButton
          loading={false}
          staleIcon={ICONS.DELETE}
          onClick={handleDelete}
          type="button"
          className="delete-btn">
          Delete
        </LoadingButton>
      </div>
    </Modal>
  );
};

export default DeleteResume;
