import React from "react";
import Column from "../components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { db } from "../firebase";
import Popup from "../components/Popup";

const Container = styled.div`
  display: flex;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 1px solid lightgrey;
  color: black;
  margin: 0 1em;
  height: 50px;
  margin-top: 8px;
  margin-left: 3px;
`;

class Trello extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
  }

  state = {
    columnOrder: [],
    columns: {},
    tasks: {},
  };

  componentDidMount() {
    this.fetchBoard();
    this.fetchUrl();
  }

  updateState(snapshot) {
    this.setState(snapshot);
  }

  fetchUrl = () => {
    const url = window.location.pathname;
    return url.replace(/\//g, "");
  };

  fetchBoard = async () => {
    await db
      .collection("Workspaces")
      .where("name", "==", this.fetchUrl())
      .get()
      .then((res) => {
        const result = res.docs.map((doc) => doc.data());
        this.setState(result[0]);
        console.log("sucess!");
      })
      .catch((error) => console.log(error));
  };

  postBoard(snapshot) {
    delete snapshot.popup;
    delete snapshot.popupInfo;
    db.collection("Workspaces").doc(this.fetchUrl()).set(snapshot);
    // this.fetchBoard();
    this.setState(snapshot);
  }

  addColumn(e) {
    e.preventDefault();
    const random_id = (Math.random() + 1).toString(36).substring(7);
    let temp = this.state;
    temp.columnOrder.push(random_id);
    temp.columns = {
      ...temp.columns,
      [random_id]: {
        id: random_id,
        title: "Edit me!",
        taskIds: [],
      },
    };
    this.postBoard(temp);
  }

  handler = (e, info) => {
    e.preventDefault();
    this.setState({
      popupInfo: info,
      popup: !this.state.popup,
    });
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      this.postBoard(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    this.setState(newState);
    this.postBoard(newState);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <hr />

        <Container>
          {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => this.state.tasks[taskId]
            );
            return (
              <Column
                updateState={this.updateState}
                handler={this.handler}
                fetchBoard={this.fetchBoard}
                key={column.id}
                column={column}
                tasks={tasks}
              />
            );
          })}
          <Button onClick={(e) => this.addColumn(e)}>Add List</Button>

          <Popup
            postBoard={this.postBoard}
            fetchurl={this.fetchUrl}
            fetchBoard={this.fetchBoard}
            handler={this.handler}
            trigger={this.state.popup}
            info={this.state.popupInfo}
          ></Popup>
        </Container>
      </DragDropContext>
    );
  }
}

export default Trello;
