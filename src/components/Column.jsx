import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import { db } from "../firebase";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

const Button = styled.button`
  background: rgba(255,255,255,0.1);
  border: 1px solid lightgrey;
  color: black;
  margin: 0 1em;
  height: 30px;
  width: 100%%;
  margin-left: 0px;
  margin-right: 0px;
`;

export default class Column extends React.Component {
  state = {
    columnOrder: [],
    columns: {},
    tasks: {},
    edit: false,
  };

  componentDidMount() {
    this.fetchBoard();
    this.fetchUrl();
  }

  fetchUrl = () => {
    const url = window.location.pathname
    return(url.replace(/\//g,""))
  }

  fetchBoard = async () => {
    await db.collection("Workspaces")
      .where("name", "==", this.fetchUrl())
      .get()
      .then((res) => {
        const result = (res.docs.map((doc) => doc.data()));
        this.setState(result[0])
      })
      .catch((error) => console.log(error));
  };

  postBoard = async (snapshot) => {
    await db.collection("Workspaces").doc(this.fetchUrl()).set(snapshot);
    this.props.updateState(snapshot);
    // this.props.fetchBoard();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const random_id = (Math.random() + 1).toString(36).substring(7);
    const column = e.target.value;
    let tempState = this.state
    delete tempState.edit
    tempState.columns[column].taskIds.push(random_id);
    tempState.tasks = {
              ...this.state.tasks,
              [random_id]: { id: random_id, content: "Edit me!" },
            }
    this.postBoard(tempState);
  };

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({edit: true})
  }

  submitEdit = (e) => {
    e.preventDefault();
    this.setState({edit: false})
    let tempState = this.state
    const currentName = this.props.column.id
    delete tempState.edit
    tempState.columns[currentName].title = e.target.value
    this.postBoard(tempState);
  }


  deleteColumn = (e) => {
    e.preventDefault();
    let tempState = this.state;
    delete tempState.columns[e.target.value];
    tempState.columnOrder.pop(e.target.value);
    this.postBoard(tempState);
    console.log(tempState)
  };

  render() {
    return (
      <Container>
        {this.state.edit ? (
          <>
            <form onBlur={(e) => this.submitEdit(e)} value="input">
                <input type="text" placeholder={this.props.column.title}/>
            </form>
          </>
        ) : (
          <>
            <Title onDoubleClick={(e) => this.handleEdit(e)}>{this.props.column.title}</Title>
          </>
        )}
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  handler={this.props.handler}
                  column={this.props.column}
                />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
        <Button
          onClick={(e) => this.handleSubmit(e, "value")}
          value={this.props.column.id}
        >
          Add Card
        </Button>
        <Button
          onClick={(e) => this.deleteColumn(e, "value")}
          value={this.props.column.id}
        >
          Delete List
        </Button>
      </Container>
    );
  }
}
