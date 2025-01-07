import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Profile() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState([]);
    const [ userPosts, setUserPostsList ] = useState([]);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        axios.get(`http://localhost:5000/auth/user/${id}`,
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                }
            }
        ).then((response) => {
            if(response.data.error){
                console.log('Error getting user profile: ' + response.data.error);
                navigate('/login');
            }
            else{
                const dateJoined  = new Date(response.data.createdAt);
                const dateJoinedFinal = dateJoined.toDateString();
                
                setUserProfile({ ...response.data, createdAt: dateJoinedFinal });                
            }
        })

        axios.get(`http://localhost:5000/posts/byUser/${id}`,
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken')
                }
            }
        ).then((response) => {
            if(response.data.error){
                console.log(response.data.error);
                navigate('/login');
            }
            else{
                setUserPostsList(response.data);   
            }
        })
    }, [])

    return (
        <>
            <div className="flex flex-col items-center justify-center my-20">
                <div className="flex flex-col items-start">
                <h1 className='text-6xl'>{userProfile.username}</h1>
                <p className='text-sm'>Joined: {userProfile.createdAt}</p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='w-96 text-start text-4xl'>Posts</h1>
            </div>
            <hr className='mx-96' />
            {userPosts.map((value, key) => {
                return (
                    <div className="flex flex-col items-center justify-center mt-10 mb-20" key={key}>
                        <div className="w-auto">
                            <h1 className='text-start text-4xl'>{value.title}</h1>
                            <p>{value.postText}</p>
                            <div className="flex items-center justify-end gap-2">
                                <ThumbUpIcon />
                                <p className=''>{value.Likes.length}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Profile