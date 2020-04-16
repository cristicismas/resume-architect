import React, { useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../store/actions/user';
import { authFormSchema } from '../../schemas/authForm';
import './Auth.css';

import Icon from '../misc/Icon';
import ICONS from '../../constants/icons';

const Auth = ({ type }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const dispatchLogin = useCallback(
    data => {
      dispatch(login(data));
    },
    [dispatch]
  );

  const dispatchSignup = useCallback(
    data => {
      dispatch(signup(data));
    },
    [dispatch]
  );

  const handleSubmit = (data, actions) => {
    if (type === 'login') {
      dispatchLogin(data);
    } else {
      dispatchSignup(data);
    }

    actions.setSubmitting(false);
    history.push('/welcome');
  };

  const formTitle = type === 'login' ? 'Log In' : 'Sign Up';

  return (
    <section id="auth">
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={authFormSchema}
        onSubmit={handleSubmit}>
        {() => (
          <Form>
            <h1 className="title">{formTitle}</h1>

            <div className="group">
              <label htmlFor="username">Username / Email</label>
              <Field type="text" placeholder="Your Username or Email" name="username" />
              <ErrorMessage className="field-error" name="username" component="div" />
            </div>

            <div className="group">
              <label htmlFor="password">Password</label>
              <Field type="password" placeholder="Your Password" name="password" />
              <ErrorMessage className="field-error" name="password" component="div" />
            </div>

            <button type="submit" id="submit-btn">
              Submit
              <Icon icon={ICONS.SUBMIT} size={26} fill="#fff" />
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Auth;
