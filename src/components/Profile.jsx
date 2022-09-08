import React, { useDebugValue, useEffect, useState } from "react";
import { UserAuth } from "../context/Auth";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CardGroup } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import styled from "styled-components";

const Accept = styled.button`
  position: absolute;
  top: 5px;
  right: 80px;
  font-size: 300%;
  background: transparent;
  border: none !important;
`;

const Decline = styled.button`
  position: absolute;
  top: 15px;
  right: 16px;
  font-size: 250%;
  background: transparent;
  border: none !important;
`;

const Profile = () => {
  const { user, signout } = UserAuth();
  const email = user.email;
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [invite, setInvite] = useState("");
  const [userData, setUserData] = useState("");
  const [workspaceData, setWorkspaceData] = useState("");
  const navigate = useNavigate();

  const handleAccept = async (e, currentIndex, selectedWorkspace) => {
    e.preventDefault();
    const index = currentIndex.index;
    console.log(index);
    console.log(selectedWorkspace);
    const tempData = await db
      .collection("Users")
      .doc(email)
      .get()
      .then((res) => res.data());
    let tempUser = tempData;
    tempUser.notifications.splice(index, 1);
    await db.collection("Users").doc(email).set(tempUser);
    setNotifications(tempUser);
    const tempWorkspaceData = await db
      .collection("Workspaces")
      .doc(selectedWorkspace)
      .get()
      .then((res) => res.data());
    let tempWorkspace = tempWorkspaceData;
    console.log(tempWorkspace);
    tempWorkspace.users.push(email);
    await db.collection("Workspaces").doc(selectedWorkspace).set(tempWorkspace);
  };

  const handleDecline = async (e, currentIndex, selectedWorkspace) => {
    e.preventDefault();
    const index = currentIndex.index;
    console.log(index);
    console.log(selectedWorkspace);
    const tempData = await db
      .collection("Users")
      .doc(email)
      .get()
      .then((res) => res.data());
    let tempUser = tempData;
    tempUser.notifications.splice(index, 1);
    await db.collection("Users").doc(email).set(tempUser);
    setNotifications(tempUser);
  };

  const handleSignout = async () => {
    try {
      await signout();
      navigate("/");
      console.log("logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchNotifications = async () => {
    if (count < 1) {
      await db
        .collection("Users")
        .doc(user.email)
        .get()
        .then((res) => setNotifications(res.data()));
      setCount(1);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [notifications]);

  return (
    <div>
      <hr />
      <h1>Dashboard</h1>
      <div className="card-block">
        <CardGroup>
          <Card border="dark" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <h3>{user && user.email}</h3>
              </Card.Title>
              <Card.Text>
                some meaningful quote some meaningful quote some meaningful
                quote some meaningful quote some meaningful quote some
                meaningful quote some meaningful quote some meaningful quote
                some meaningful quote some meaningful quote some meaningful
                quote
              </Card.Text>
              <Button onClick={handleSignout} variant="danger">
                Log Out
              </Button>
            </Card.Body>
          </Card>
          <Card border-radius="20%" border="dark" style={{ width: "18rem" }}>
            <Card.Header>
              <h3>Workspace Invites</h3>
            </Card.Header>
            <ListGroup variant="flush">
              {notifications ? (
                notifications.notifications.map((n, index) => (
                  <ListGroup.Item key={index}>
                    <p className="fs-4 text-capitalize">{n.workspace}</p>
                    <p className="fs-8">From: ✨{n.user}✨</p>
                    <div className="text-right">
                      <Accept
                        onClick={(e) => {
                          handleAccept(e, { index }, n.workspace);
                        }}
                      >
                        {" "}
                        🤝{" "}
                      </Accept>
                      <Decline
                        onClick={(e) => {
                          handleDecline(e, { index }, n.workspace);
                        }}
                      >
                        {" "}
                        ❌{" "}
                      </Decline>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <></>
              )}
            </ListGroup>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
};

export default Profile;
