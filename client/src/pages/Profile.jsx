import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Profile() {

    const { id } = useParams();
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/auth/user/${id}`,
            {
                headers: {
                    accessToken: localStorage.getItem('accessToken'),
                }
            }
        ).then((response) => {
            if(response.data.error){
                alert('Error getting user profile: ' + response.data.error);
            }
            else{
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const dateJoined  = new Date(response.data.createdAt);
                const dateJoinedFinal = dateJoined.toLocaleDateString("en-US", options);
                
                setUserProfile({ ...response.data, createdAt: dateJoinedFinal });                
            }
        })
    }, [])

    return (
        <>
            <div className="flex">
                <h1>{userProfile.username}'s Profile</h1>
                <p>Joined: {userProfile.createdAt}</p>
            </div>
        </>
    )
}

export default Profile