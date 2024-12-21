import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {

    let { id } = useParams();
    const [post, setPost] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${id}}`).then((response) => {
            setPost(response.data);            
        })    }, [])

    return (
        <div className="flex items-center justify-center">
            <div key={post.id}>
                <h2 className='mt-20 text-5xl font-semibold font-sans'>{post.title}</h2>
                <p>Posted by: {post.username}</p>
                <div className='py-20'>
                    <p className=''>{post.postText}</p>
                </div>
            </div>
        </div>
    )
}

export default Post