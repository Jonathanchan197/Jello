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

export default class Column extends React.Component {
  state = {
    columnOrder: [],
    columns: {},
    tasks: {},
  };

  componentDidMount() {
    console.log("mounted");
    this.fetchBoard();
  }

  fetchBoard = () => {
    db.collection("Workspaces")
      .doc("aRzyA8nDdTpij51kLFMr")
      .get()
      .then((res) => {
        this.setState(res.data());
      })
      .catch((error) => console.log(error));
  };

  postBoard = () => {
    db.collection("Workspaces").doc("aRzyA8nDdTpij51kLFMr").set(this.state);
    this.props.fetchBoard();
  };

  handleSubmit = (e) => {
    const random_id = (Math.random() + 1).toString(36).substring(7);
    e.preventDefault();
    const column = e.target.value;
    const currentColumn = { ...this.state.columns };
    currentColumn[column].taskIds.push(random_id);
    this.setState(
      {
        tasks: {
          ...this.state.tasks,
          [random_id]: { id: random_id, content: "Edit me!" },
        },
      },
      function () {
        this.postBoard();
      }
    );
  };

  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided) => (
            <TaskList ref={provided.innerRef} {...provided.droppableProps}>
              {this.props.tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
        <button
          onClick={(e) => this.handleSubmit(e, "value")}
          value={this.props.column.id}
        >
          Add Card
        </button>
      </Container>
    );
  }
}
