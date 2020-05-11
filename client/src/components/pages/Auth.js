import React, { useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, signup } from '../../redux/actions/user';
import { authFormSchema } from '../../schemas/authForm';
import './Auth.css';

import Icon from '../misc/Icon';
import ICONS from '../../constants/icons';

const Auth = ({ type }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const dispatchAuth = useCallback(
    (data, authType) => {
      if (authType === 'login') {
        return dispatch(login(data));
      } else {
        return dispatch(signup(data));
      }
    },
    [dispatch]
  );

  const handleSubmit = (data, actions) => {
    dispatchAuth(data, type).then(res => {
      actions.setSubmitting(false);

      // If res exists, that means the request was successful,
      // so we can push the /welcome page to history.
      if (res) {
        history.push('/welcome');
      }
    });
  };

  const formTitle = type === 'login' ? 'Log In' : 'Sign Up';

  return (
    <section id="auth">
      <Formik
        initialValues={{
          username: '',
          password: ''
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
