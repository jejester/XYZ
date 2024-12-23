import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Post() {

    let { id } = useParams();
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${id}}`).then((response) => {
            setPost(response.data);            
        });

        axios.get(`http://localhost:5000/comments/${id}}`).then((response) => {
            setComments(response.data);            
        });

    }, [])

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <div className='content'>
                <div key={post.id}>
                    <h2 className='text-5xl font-semibold font-sans'>{post.title}</h2>
                    <p>Posted by: {post.username}</p>
                    <div className='py-20'>
                        <p className=''>{post.postText}</p>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl'>Comments</h1>
                    <div className="border border-b-2"></div>
                </div>
                <div className="mt-5">
                    {comments.map((value, key) => {
                        return <div className="my-5" key={key}> 
                            <div className="">
                                <p className="">{value.commentBody}</p>
                                <p className="">{value.createdAt}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post