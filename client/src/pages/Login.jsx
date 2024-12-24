import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  return (
    <div>
        <div className='flex flex-col items-center justify-center p-2 w-80 border mx-auto rounded-md shadow-md'>
            <h1 className='text-4xl'>Login</h1>
            <Formik>
                <Form>
                    <label className='' htmlFor="username">Username</label>
                    <Field className='w-full' name="username" type="text" placeholder="Enter your username"></Field>
                </Form>
            </Formik>
        </div>
    </div>
  )
}

export default Login