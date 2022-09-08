import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signin } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signin(email, password);
      navigate("/home");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
      <div className="card-input">
        <Form.Group>
          <Form.Text className="text-light">{error}</Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" id="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" id="password">
          <Form.Label>Password</Form.Label>

          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </Form.Group>

        <Button variant="light" type="submit">
          Log In
        </Button>

        <Form.Group>
          <Form.Text className="text-light">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Form.Text>
        </Form.Group>
      </div>
    </Form>
  );
};

export default SignIn;
