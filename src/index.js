import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ListItem extends React.Component {
  render() {
    return (
      <li>
        {this.props.task}
      </li>
    );
  }
}

class List extends React.Component {
  render() {
    const taskList = this.props.taskList.map((todo, index) =>
      <ListItem
        task={todo}
        key={index} />
    );

    return (
      <div className="List">
        <ul>
          {taskList}
        </ul>
      </div>
    );
  }
}

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    }
  }

  addTask = (listNum, input) => {
    var task = {
      task: input,
      listNum: listNum,
      isComplete: false
    }
    console.log("im in AddTask! task: ", task);
    this.props.handleAddTask(task);
  }

  render() {
    return (
      <div className="AddTask">
        <input
          placeholder="Add task here..."
          value={this.state.inputValue}
          onChange={e => {
            this.setState({inputValue: e.target.value})
          }}/>
        <button onClick={() => {
          this.addTask(this.props.listNum,
            this.state.inputValue)}}> Add Task </button>
      </div>
    );
  }
}

class ListContainer extends React.Component {
  handleAddTask = task => {
    console.log("im in ListContainer's handleAddTask: ", task);
    this.props.addTask(task);
  }

  render() {
    return (
      <div className="ListContainer">
        <AddTask
          listNum={this.props.listNum}
          handleAddTask={this.handleAddTask} />
        <List taskList={this.props.taskList} />
      </div>
    );
  }
}

class FilterButtons extends React.Component {
  render() {
    return (
      <div className="FilterButtons">
        <button> All </button>
        <button> In-Progress Tasks </button>
        <button> Completed </button>
      </div>
    );
  }
}

class NewList extends React.Component {
  handleNewList = () => {
    console.log("im in NewList's handleNewList!");
    this.props.addNewList();
  }

  render() {
    return (
      <button onClick={() => this.handleNewList()}> New List </button>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      view: 0
    };
  }

  addTask = (task) => {
    console.log("im in addTask! task: ", task, "taskListNum: ", task.listNum);
    let updatedTaskList = this.state.taskList.splice();
    console.log("this is updatedTaskList: ", updatedTaskList);
    let listAt = updatedTaskList[task.listNum];
    listAt.push(["test"]);
    this.setState({
      taskList: updatedTaskList
    });
  }

  addNewList = () => {
    let updatedTaskList = this.state.taskList.slice();
    updatedTaskList.push([]);
    this.setState({
      taskList: updatedTaskList
    })
  }

  render() {
    console.log(this.state.taskList);

    const lists = this.state.taskList.map((list, index) =>
      <ListContainer
        key={index}
        taskList={list}
        listNum={index}
        addTask={this.addTask} />
    );

    return (
      <div className="App">
        <FilterButtons view={this.state.view} />
        <NewList addNewList={() => this.addNewList()} />
        <br /> {/* why doesn't this work?? */}
        {lists}
      </div>
    );
  }
}

// ============================================================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
