import React, { useState } from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import { db } from "../firebase";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  diplay: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  top: 80px;
  position: relative;
  padding: 32px;
  width: 50%;
  height: 80%;
  max-width: 640px;
  background-color: #fff;
  margin: 0 auto;
  text-align: center;
  border-radius: 10px;
  border: 2px solid black;
`;

const Close = styled.button`
  position: absolute;
  top: 5px;
  right: 16px;
  font-size: 200%;
  background: transparent;
  border: none !important;
`;

const Edit = styled.button`
  position: absolute;
  top: 5px;
  right: 70px;
  font-size: 200%;
  background: transparent;
  border: none !important;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid black;
  color: black;
  margin: 0 1em;
  height: 30px;
  width: 110px;
  margin-top: 8px;
`;

function Popup(props) {
  const [edit, setEdit] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tempDatabase, setTempDatabase] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(!edit);
    const currentTask = [props.info.task.id];
    tempDatabase.tasks[currentTask] = {
      content: title,
      description: description,
      id: props.info.task.id
    };
    props.info.task.content = title;
    props.info.task.description = description;
    db.collection("Workspaces").doc("aRzyA8nDdTpij51kLFMr").set(tempDatabase);
  };

  const closePopup = (e) => {
    e.preventDefault();
    if (!edit) {
      setEdit(!edit);
    }
    props.handler(e);
  };

  const loadEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
    db.collection("Workspaces")
      .doc("aRzyA8nDdTpij51kLFMr")
      .get()
      .then((res) => {
        setTempDatabase(res.data());
      })
      .catch((error) => console.log(error));
  }

  const deleteTask = (e) => {
    e.preventDefault();
    console.log(tempDatabase)
    const currentTask = [props.info.task.id];
    const currentLocation = [props.info.column.id];
    const currentIndex = [props.info.index];
    delete tempDatabase.tasks[currentTask];
    console.log(tempDatabase)
    tempDatabase.columns[currentLocation].taskIds.pop([currentIndex]);
    db.collection("Workspaces").doc("aRzyA8nDdTpij51kLFMr").set(tempDatabase);
    closePopup(e)
    props.fetchBoard();
  }

  return props.trigger ? (
    <div className="popup">
      <Container>
        <Content>
          <Close onClick={(e) => closePopup(e)}>❌</Close>
          {edit ? (
            <>
              <Edit onClick={(e) => loadEdit(e)}>✏️</Edit>
            </>
          ) : (
            <>
              <Edit onClick={(e) => handleSubmit(e)}>✅</Edit>
            </>
          )}

          {edit ? (
            <>
              <h2>{props.info.task.content}</h2>
              <p>Found in list: {props.info.column.title}</p>
              {/* <p>{props.info.index}</p> */}
              <h4>Description</h4>
              <p>{props.info.task.description}</p>
            </>
          ) : (
            <>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" id="email">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder={props.info.task.content}
                  />
                </Form.Group>

                <Form.Group className="mb-3" id="password">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    as="textarea"
                    rows="5"
                    placeholder={props.info.task.description}
                  />
                </Form.Group>
              </Form>
          <Button onClick={(e) => deleteTask(e)}>Delete Task</Button>
            </>
          )}
        </Content>
      </Container>
    </div>
  ) : (
    ""
  );
}

export default Popup;