import '../App.css';
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";

function CreatePost() {
  return (
    <div className=''>
        <Formik>
            <Form className='flex flex-col items-center justify-center w-96 mx-auto shadow-lg m-2 p-5'>
                <label className='text-start w-full mt-2' htmlFor="title">Title</label>
                <Field className='text-start w-full border rounded-md p-2' id='createPostInput' name='title' placeholder='Enter the title' />
                <label className='text-start w-full mt-2' htmlFor="postText">Post</label>
                <Field className='text-start w-full border rounded-md p-2' id='createPostInput' name='postText' placeholder='Enter the post' />
                <label className='text-start w-full mt-2' htmlFor="username">Username</label>
                <Field className='text-start w-full border rounded-md p-2' id='createPostInput' name='username' placeholder='Enter your username' />
                <button className='w-full bg-blue-400 text-white mt-5 my-2 p-2 rounded-md' type="submit">Create Post</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost