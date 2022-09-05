import React from 'react'
import { UserAuth } from '../context/Auth'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {user, signout} = UserAuth(); 
  const navigate = useNavigate();

    const handleSignout = async () => {
        try {
            await signout()
            navigate('/')
            console.log('logged out')
        } catch (e) {
            console.log(e.message)
        }
    }

  return (
    <div>
        <h1>
            Profile page
        </h1>
        <p>
            {user && user.email}
        </p>
        <Button onClick={handleSignout}variant="danger">Log Out</Button>
    </div>
  )
}

export default Profile