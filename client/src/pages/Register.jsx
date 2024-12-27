import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Register() {

  const initialValues = {
    username: '',
    password: '',
  };
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required('Username is required'),
    password: Yup.string().min(8).max(20).required('Password is required'),
  })
  
  const onSubmit = (data) => {
    axios.post('http://localhost:5000/auth/create', data).then(() => {
      console.log('Successfully registered');
    }).catch((error) => {
      console.log(error);
      console.log(data);
      
    })
  }
  
  return (
    <div>
      <div className="card">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='flex flex-col items-center justify-center w-96 mx-auto shadow-lg m-2 p-5'>
                <label className='text-start w-full mt-2' htmlFor="username">Username</label>
                <Field className='text-start w-full border rounded-md p-2' id='createPostInput' name='username' placeholder='Enter your username' />
                <ErrorMessage name='username' component='span' className='text-red-500 w-full text-start text-sm'/>
                <label className='text-start w-full mt-2' htmlFor="password">Password</label>
                <Field type='password' className='text-start w-full border rounded-md p-2' id='createPostInput' name='password' placeholder='Enter your password' />
                <ErrorMessage name='password' component='span' className='text-red-500 w-full text-start text-sm'/>
                <button className='w-full bg-blue-400 text-white mt-5 my-2 p-2 rounded-md' type="submit">Register</button>
            </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Register