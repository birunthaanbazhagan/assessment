import React from "react";
import { DragDropContext, DropTarget, DragSource } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

const tasks = [
  { _id: 1, title: "Dinesh", email: "dinu@gmail.com", status: "open" },
  { _id: 2, title: "Arun", email: "dinu@gmail.com", status: "open" },
  { _id: 3, title: "Mithuna", email: "dinu@gmail.com", status: "open" },
  { _id: 4, title: "Kavi", email: "dinu@gmail.com", status: "contacted" },
  { _id: 5, title: "Sasee", email: "dinu@gmail.com", status: "contacted" },
  { _id: 6, title: "Karthi", email: "dinu@gmail.com", status: "written" },
  { _id: 7, title: "Kiruba", email: "dinu@gmail.com", status: "Technical" },
  { _id: 8, title: "Raja", email: "dinu@gmail.com", status: "Technical" },
  { _id: 9, title: "Senthoora", email: "dinu@gmail.com", status: "culture" },
  { _id: 10, title: "Thaani", email: "dinu@gmail.com", status: "culture" },
];

const labels = ["open", "contacted", "written", "Technical", "culture"];
const labelsMap = {
  open: "open",
  contacted: "contacted",
  written: "written",
  Technical: "Technical",
  culture: "culture",
};

const classes = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
  },
  column: {
    minWidth: 200,
    width: "18vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "#566573",
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    backgroundColor: "#7F8C8D",
    color: "white",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "white",
  },
};

class Kanban extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks,
    };
  }
  update = (id, status) => {
    const { tasks } = this.state;
    const task = tasks.find((task) => task._id === id);
    // console.log("task", task);
    task.status = status;
    const taskIndex = tasks.indexOf(task);
    const newTasks = update(tasks, {
      [taskIndex]: { $set: task },
    });
    console.log("newTask", newTasks);
    this.setState({ tasks: newTasks });
  };

  render() {
    const { tasks } = this.state;
    return (
      <main>
        <header className="header">Assessment</header>
        <section className="card" style={classes.board}>
          {labels.map((channel) => (
            <KanbanColumn status={channel}>
              <div style={classes.column}>
                <div style={classes.columnHead}>{labelsMap[channel]}</div>
                <div>
                  {tasks
                    .filter((item) => item.status === channel)
                    .map((item) => (
                      <KanbanItem id={item._id} onDrop={this.update}>
                        <div style={classes.item}>{item.title}</div>
                        {/* <div styles={classes.item}>{item.email}</div> */}
                      </KanbanItem>
                    ))}
                </div>
              </div>
            </KanbanColumn>
          ))}
        </section>
      </main>
    );
  }
}

export default DragDropContext(HTML5Backend)(Kanban);

// Column

const boxTarget = {
  drop(props) {
    return { name: props.status };
  },
};

class KanbanColumn extends React.Component {
  render() {
    return this.props.connectDropTarget(<div>{this.props.children}</div>);
  }
}

KanbanColumn = DropTarget("kanbanItem", boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(KanbanColumn);

// Item

const boxSource = {
  beginDrag(props) {
    return {
      name: props.id,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.onDrop(monitor.getItem().name, dropResult.name);
    }
  },
};

class KanbanItem extends React.Component {
  render() {
    return this.props.connectDragSource(<div>{this.props.children}</div>);
  }
}

KanbanItem = DragSource("kanbanItem", boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(KanbanItem);
