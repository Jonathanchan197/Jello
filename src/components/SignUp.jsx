import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";
import {UserAuth} from '../context/Auth'
 
const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const {createUser} = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
        await createUser(email, password)
        navigate('/profile')
    } catch (e) {
        setError(e.message)
        console.log(e.message)
    }
  }

    return (
        <Form onSubmit={handleSubmit}>
          <h2>Sign Up</h2><Form.Group>
          <Form.Text className="text-muted">
           {error}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" id="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" />
          </Form.Group>
    
          <Form.Group className="mb-3" id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password"/>
          </Form.Group>

          <Form.Group className="mb-3" id="passwordconfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type="password"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>

          <Form.Group>
          <Form.Text className="text-muted">
              Already have an account? <Link to='/signin'>Sign In</Link>
            </Form.Text>
          </Form.Group>
        </Form>
      );
  }

export default SignUp;