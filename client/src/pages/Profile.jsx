import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import { AuthContext } from '../helpers/AuthContext';


function Profile() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState([]);
    const [ userPosts, setUserPostsList ] = useState([]);
    const { authState } = useContext(AuthContext);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        if(!authState.status){
            navigate('/login');
        }
        axios.get(`http://localhost:5000/auth/user/${id}`,
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                }
            }
        ).then((response) => {
            if(response.data.error){
                console.log('Error getting user profile: ' + response.data.error);
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
            }
            else{
                setUserPostsList(response.data);   
            }
        })
    }, [])

    return (
        <>
            <div className="flex flex-col items-center justify-center my-20">
                <div className="flex flex-col justify-center">
                <div className="flex items-center justify-between mx-auto gap-60">
                    <h1 className='text-6xl'>{userProfile.username}</h1>
                    {authState.username === userProfile.username && (
                        <Link to={'/profile/update'}><EditIcon /></Link>
                    )}
                </div>
                <p className='text-sm mt-2'>Joined: {userProfile.createdAt}</p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center mb-5'>
                <h1 className='w-96 text-start text-4xl'>Posts</h1>
            </div>
            <hr className='mx-96' />
                {userPosts.map((value, key) => {
                    return (
                        <div className="flex flex-col items-center justify-start text-start mt-10 mb-20 w-96 mx-auto hover:cursor-pointer" key={key} onClick={() => navigate(`/posts/${value.id}`)}>
                            <div className="w-96">
                                <h1 className='text-start text-4xl'>{value.title}</h1>
                                <p>{value.postText}</p>
                                <div className="flex items-center justify-end gap-2">
                                    <ThumbUpIcon className='text-gray-400' />
                                    <p className=''>{value.Likes.length}</p>
                                    <CommentIcon className='text-gray-400' />
                                    <p className=''>{value.Comments.length}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </>
    )
}

export default Profile