import React from 'react';
import { Formik, Form, Field } from 'formik';
import { loginUserRequest } from '../../actions/actionCreator';
import { connect } from 'react-redux';

const SignIn = (props) => {
  const initialValues = {
    email: '',
    password: ''
  }

  const onSubmit = (values, actions) => {
    props.loginUserRequest(values);
    actions.resetForm();
  }

  return (
    <>
      <h2>Sign In</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formikProps) => (
          <Form>
            <Field name="email" placeholder="Type your email" />
            <Field name="password" placeholder="Type your password" />
            <button type='submit'>Sign in</button>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapDispatchToProps = {
  loginUserRequest
}

export default connect(null, mapDispatchToProps)(SignIn);
