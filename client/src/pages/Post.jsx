import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';


function Post() {

    let { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

    useEffect(() => {

        if(!localStorage.getItem('accessToken')){
            navigate('/login');
        }
        else{
            axios.get(`http://localhost:5000/posts/${id}}`).then((response) => {
                setPost(response.data);            
            });
    
            axios.get(`http://localhost:5000/comments/${id}}`).then((response) => {
                setComments(response.data);            
            });
        }

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
                    return val.id !== commentId;
                }))
            }
        });
    }

    const deletePost = (postId) => {
        axios.delete(`http://localhost:5000/posts/${postId}`,
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                }
            }
        ).then((response) => {
            if(response.data.error){
                alert('Error deleting post: ' + response.data.error);
            }
            else{
                navigate('/');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const editPost = (option) => {
        if (option === "title"){
            let newTitle = prompt("Enter new title:");
            axios.put('http://localhost:5000/posts/title', {newTitle: newTitle, id: id}, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then((response) => {
                if(response.data.error){
                    console.log(response.data.error);
                }                
                else{
                    setPost({...post, title: response.data});
                }
            });
        }
        else{
            let newPostText = prompt("Enter new post body:");
            axios.put('http://localhost:5000/posts/postText', {newPost: newPostText, id: id}, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then((response) => {
                if(response.data.error){
                    console.log(response.data.error);
                }
                else{
                    setPost({...post, postText: response.data});
                }
            });
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center mt-20 w-full">
                <div className='content'>
                    <div key={post.id}>
                        <h2 className='text-5xl font-semibold font-sans' onClick={ () => {if(authState.username === post.username){ editPost("title")}}}>{post.title}</h2>
                        <p>Posted by: {post.username}</p>
                        <div className='py-20'>
                            <p className='' onClick={ () => {if(authState.username === post.username){ editPost("body")}}}>{post.postText}</p> 
                            {authState.username === post.username && (
                                <button onClick={() => deletePost(post.id)}>Delete Post</button>
                            )}
                        </div>
                    </div>
                    <div>
                        <h1 className='text-2xl'>Comments</h1>
                        <div className="border border-b-2"></div>
                    </div>
                    <div className="comment-section flex flex-col items-end mt-4">
                        <input name='commentInput' onChange={(event) => {setNewComment(event.target.value)}} className='border w-full h-32 p-2' type="text" placeholder='Add comment' value={newComment}/>
                        <button onClick={addComment}>Comment</button>
                    </div>
                    <div className="mt-10">
                        {comments.map((value, key) => {
                            return <div className="my-5" key={key}> 
                                <>
                                    <p className="">{value.commentBody}</p>
                                    <Link className="" to={`/profile/`}>{value.username}</Link>
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