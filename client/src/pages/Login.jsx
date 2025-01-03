import React, { useContext, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
  const { setAuthState } = useContext(AuthContext)
  const { authState } = useContext(AuthContext);
  
  let navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
  };
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required('Username is required'),
    password: Yup.string().min(5).max(20).required('Password is required'),
  })

  const onSubmit = (data) => {
    axios.post('http://localhost:5000/auth/login', data).then((response) => {
      if (response.data.error) {
        return alert(response.data.error);
      }
      else{
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });        
        navigate('/');
      }
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
        <div className='flex flex-col items-center justify-center mx-auto'>
            <h1 className='text-4xl'>Login</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className='flex flex-col items-center justify-center w-96 mx-auto shadow-lg m-2 p-5'>
                    <label className='text-start w-full mt-2' htmlFor="username">Username</label>
                    <Field className='text-start w-full border rounded-md p-2' id='createPostInput' name='username' placeholder='Enter your username' />
                    <ErrorMessage name='username' component='span' className='text-red-500 w-full text-start text-sm'/>
                    <label className='text-start w-full mt-2' htmlFor="password">Password</label>
                    <Field type='password' className='text-start w-full border rounded-md p-2' id='createPostInput' name='password' placeholder='Enter your password' />
                    <ErrorMessage name='password' component='span' className='text-red-500 w-full text-start text-sm'/>
                    <button className='w-full bg-blue-400 text-white mt-5 my-2 p-2 rounded-md' type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    </>
  )
}

export default Login