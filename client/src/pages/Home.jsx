import React from 'react'
import '../App.css';
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helpers/AuthContext';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Home() {

    let navigate = useNavigate();
    const [likedPosts, setLikedPosts] = useState([]);
    const [postsList, setPostsList] = useState([]);
    const { authState } = useContext(AuthContext);
    
    

    useEffect(() => {
        if (!localStorage.getItem('accessToken')){
            navigate('/login');            
        }
        else{
            axios.get('http://localhost:5000/posts', 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }
            ).then((response) => {
                setPostsList(response.data.postsList);
                setLikedPosts(response.data.likedPosts.map((like) => {
                    return like.PostId;  
                }));
            });
        }

    }, [])

    const likePost = (postId) => {
        axios.post('http://localhost:5000/likes', { PostId: postId },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }
        ).then((response) => {
            setPostsList(postsList.map((post) => {
                if (post.id === postId){
                    if(response.data.liked){
                        return {...post, Likes: [...post.Likes, {UserId: 0}]};
                    }
                    else{
                        const likesArray = post.Likes;
                        likesArray.pop();
                        return {...post, Likes: likesArray}
                    }
                }
                else{
                    return post;
                }
            })
        
        );
        
        if(likedPosts.includes(postId)){
            setLikedPosts(likedPosts.filter((id) => id!== postId));
        }
        else{
            setLikedPosts([...likedPosts, postId]);
        }

        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className="App">
        {
            postsList.map((value, index) => {
            return <div className='flex flex-col items-center justify-center shadow-xl rounded-xl w-96 mx-auto my-10 hover:cursor-pointer hover:shadow-2xl transition-all ease-in-out' 
            key={index}>
                <h1 className='text-3xl bg-blue-300 w-full font-serif text-center p-5'>{value.title}</h1>
                <p className='font-sans p-28' onClick={() => navigate(`/posts/${value.id}`)}>{value.postText}</p>
                <div className="flex items-center justify-between w-full bg-blue-100">
                    <p className='font-sans p-5'>{value.username}</p>
                    <div className="flex justify-center items-center px-5">
                        <ThumbUpIcon className={likedPosts.includes(value.id) ? 'text-blue-500' : 'text-blue-300'} onClick={() => {likePost(value.id);}} />
                        <p className='font-sans py-5 ml-2'>{value.Likes.length}</p>
                    </div>
                </div>
                {/* <p className='font-sans'>{Date.format(value.createdAt}</p> */}
            </div>
            })
        }
        </div>
    )
    }

export default Home