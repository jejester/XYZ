import '../App.css';
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function CreatePost() {

  const initialValues = {
    title: '',
    postText: '',
    username: '',
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title field is required"),
    postText: Yup.string().required("Post content is required"),
    username: Yup.string().min(3).max(15).required("User name is required"),
  });

  const onSubmit = (data) => {
    axios.post('http://localhost:5000/posts/create', data).then((response) => {
      console.log('Post successfully created!');
    })
  };

  return (
    <div className=''>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className='flex flex-col items-center justify-center w-96 mx-auto shadow-lg m-2 p-5'>
                <label className='text-start w-full mt-2' htmlFor="title">Title</label>
                <Field className='text-start w-full border rounded-md p-2' id='createPostInput' name='title' placeholder='Enter the title' />
                <ErrorMessage name='title' component='span' className='text-red-500 w-full text-start text-sm'/>
                <label className='text-start w-full mt-2' htmlFor="postText">Post</label>
                <Field className='text-start w-full border rounded-md p-2' id='createPostInput' name='postText' placeholder='Enter the post' />
                <ErrorMessage name='postText' component='span' className='text-red-500 w-full text-start text-sm'/>
                <label className='text-start w-full mt-2' htmlFor="username">Username</label>
                <Field className='text-start w-full border rounded-md p-2' id='createPostInput' name='username' placeholder='Enter your username' />
                <ErrorMessage name='username' component='span' className='text-red-500 w-full text-start text-sm'/>
                <button className='w-full bg-blue-400 text-white mt-5 my-2 p-2 rounded-md' type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost