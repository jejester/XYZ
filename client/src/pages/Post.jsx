import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';


function Post() {

    let { id } = useParams();
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${id}}`).then((response) => {
            setPost(response.data);            
        });

        axios.get(`http://localhost:5000/comments/${id}}`).then((response) => {
            setComments(response.data);            
        });

    }, []);

    const addComment = () => {
        axios.post(`http://localhost:5000/comments/`, 
        {
            commentBody: newComment, 
            PostId: id
        }, 
        {
            headers: 
            {
                accessToken: localStorage.getItem('accessToken')
            }
        })
        .then((response) => {
            if(response.data.error){
                alert('Please sign in first!');
            }
            else{
                const dateToday = new Date().toDateString();                        
                const commentToAdd = {commentBody: newComment, createdAt: dateToday, username: response.data.username, id: response.data.id};
                setComments([...comments, commentToAdd]);
                setNewComment("");
            }
        });
    }

    const deleteComment = (commentId) => {
        axios.delete(`http://localhost:5000/comments/${commentId}`, {
            headers: {
                accessToken: localStorage.getItem('accessToken')
            }
        }).then((response) => {
            if(response.data.error){
                alert('Error deleting comment: ' + response.data.error);
            }
            else{
                setComments(comments.filter((val) => {
                    return val.id != commentId;
                }))
            }
        });
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-20 w-full">
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
                    <div className="comment-section flex flex-col items-end mt-4">
                        <input name='commentInput' onChange={(event) => {setNewComment(event.target.value)}} className='border w-96 h-32 p-2' type="text" placeholder='Add comment' value={newComment}/>
                        <button onClick={addComment}>Comment</button>
                    </div>
                    <div className="mt-10">
                        {comments.map((value, key) => {
                            return <div className="my-5" key={key}> 
                                <>
                                    <p className="">{value.commentBody}</p>
                                    <p className="">{value.username}</p>
                                    <p className="">{value.createdAt}</p>
                                    { authState.username === value.username && <button className='text-red-500 text-sm' onClick={() => deleteComment(value.id)}>Delete</button> }
                                </>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post