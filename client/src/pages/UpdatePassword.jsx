import React, { useContext } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../helpers/AuthContext';

function UpdatePassword() {

    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    

    const initialValues = {
       'oldPassword': '',
       'newPassword': '',
       'confirmPassword': '' 
    }

    const validationSchema = Yup.object().shape({
        oldPassword: Yup.string().min(8, 'Password must be atlear 8 characters').max(55).required('Old password is required'),
        newPassword: Yup.string().min(8, 'New password must be atlear 8 characters').max(55).required('New password is required'),
        confirmPassword: Yup.string().required('Password confirmation is required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    })

    const onSubmit = (data) => {
        axios.post('http://localhost:5000/auth/update/password', data, {
            headers: {
                accessToken: localStorage.getItem('accessToken'), 
            }
        }).then((response) => {
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                alert(response.data.message);
                navigate(`/profile/${authState.id}`);
            }
        })
    }

    return (
        <>
            <div className="">
                <h1 className='text-center mt-20'>Update Password</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    <Form className='flex flex-col items-center justify-center w-96 gap-5 mx-auto shadow-lg m-2 p-5'>
                        <Field type='password' className='text-start w-full border rounded-md p-2 mt-2' id='createPostInput' name='oldPassword' placeholder='Enter your current password' />
                        <ErrorMessage name='oldPassword' component='span' className='text-red-500 w-full text-start text-sm'/>
                        <Field type='password' className='text-start w-full border rounded-md p-2' id='createPostInput' name='newPassword' placeholder='Enter your new password' />
                        <ErrorMessage name='newPassword' component='span' className='text-red-500 w-full text-start text-sm'/>
                        <Field type='password' className='text-start w-full border rounded-md p-2' id='createPostInput' name='confirmPassword' placeholder='Confirm password' />
                        <ErrorMessage name='confirmPassword' component='span' className='text-red-500 w-full text-start text-sm'/>
                        <button className='w-full bg-blue-400 text-white my-2 p-2 rounded-md' type="submit">Update</button>
                    </Form>
                </Formik>
            </div>
        </>
    )
}

export default UpdatePassword