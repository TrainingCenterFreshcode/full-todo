import React from 'react';
import { Formik, Form, Field } from 'formik';
import { format } from 'date-fns';

const TodoForm = (props) => {
  const initialValues = {
    body: '',
    deadline: format(new Date(), 'yyyy-MM-dd')
  }

  const onSubmit = (values, actions) => {
    props.sendData(values);
    actions.resetForm();
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formikProps) => (
        <Form>
          <Field name="body" placeholder="Type task text..." />
          <Field name="deadline" type="date" />
          <button type='submit'>Add task</button>
        </Form>
      )}
    </Formik>
  );
}

export default TodoForm;
