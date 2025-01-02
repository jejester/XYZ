import React from 'react'
import '../App.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";

function Home() {

    let navigate = useNavigate();
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
            axios.get('http://localhost:5000/posts').then((response) => {
                setPostsList(response.data);
            });
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
            }))
        }).catch((error) => {
            console.error(error);
        })
    }

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
                    <div className="flex">
                        <button className='px-5' onClick={() => {likePost(value.id);}}>Like</button>
                        <p className='font-sans p-5'>{value.Likes.length}</p>
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