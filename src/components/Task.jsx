import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  background: rgba(255, 255, 255, 0.1);

  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: #2D5987;
  border-radius 4px;
  margin-right: 8px
`;

export default class Task extends React.Component {
  taskProps = (e) => {
    e.preventDefault();
    const taskInfo = this.props;
    this.props.handler(e, taskInfo);
  };

  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided) => (
          <Container
            onClick={(e) => this.taskProps(e)}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Handle {...provided.dragHandleProps} />
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
