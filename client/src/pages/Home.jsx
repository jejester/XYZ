import React from 'react'
import '../App.css';
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {

    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/posts').then((response) => {
            setPostsList(response.data);
        })
    }, [])

    return (
        <div className="App">
        {
            postsList.map((value, index) => {
            return <div className='flex flex-col items-center justify-center shadow-xl rounded-xl w-96 mx-auto my-10 hover:cursor-pointer hover:shadow-2xl transition-all ease-in-out' key={index}>
                <h1 className='text-3xl bg-blue-300 w-full font-serif text-center p-5'>{value.title}</h1>
                <p className='font-sans p-28'>{value.postText}</p>
                <p className='font-sans text-start w-full p-5 bg-blue-100'>{value.username}</p>
                {/* <p className='font-sans'>{Date.format(value.createdAt}</p> */}
            </div>
            })
        }
        </div>
    )
    }

export default Home