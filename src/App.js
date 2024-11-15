import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'

class App extends Component {
  state = { 
    tasks : []
  }

  updateTaskList = (tasks) => {
    this.setState({ tasks : tasks})
  }

  removeTask = (id) => {
    this.setState((prevState) => ({
        tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
};

  handleSubmit = ({ newTask }) => {
    this.setState({ tasks: [...this.state.tasks, newTask] })
  }

  render() {
    const { tasks } = this.state
  
    return (
      <div className="container">
        <Table taskData={tasks} removeTask={this.removeTask} updateTaskList={this.updateTaskList}/>
        <Form handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App