import React, {useState, useEffect} from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Card} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { db } from '../firebase';

const Home = () => {
    const [user,setUser] = useState('')
    const [workspaces, setWorkspaces] = useState('')
    const auth = getAuth();
    const navigate = useNavigate
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user.uid)
        setUser(user)
      } else {
        navigate('/signin')
      }
    });

    useEffect(() => {
      db.collection("Workspaces")
      .where("users", "array-contains", "jonathan")
      .get()
      .then((res) => {
        setWorkspaces(res.docs.map(doc => (doc.data())));
        console.log(workspaces)
      })
      .catch((error) => console.log(error));
    },[])

    return (
        <div>
            <h1>Welcome Back! {user.email}</h1>
            <h2>Your workspaces:</h2>
            <Row xs={10} md={4} className="g-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Col>
          <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Members: 
        </Card.Text>
        <Card.Link href="#">Invite Members</Card.Link>
      </Card.Body>
    </Card>
        </Col>
      ))}
    </Row>
        </div>
    )
}

export default Home