import React, { Component } from 'react'

const URL = "http://127.0.0.1:5000/tasks/";

class Form extends Component {
  initialState = {
    title: '',
  }

  state = this.initialState

  handleChange = (event) => {
    const { value } = event.target
  
    this.setState({
      title: value,
    })
  }

  submitForm = async () => { 
    const { title } = this.state;

    try {
        const response_get = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const tasksList = await response_get.json();
        console.log(tasksList);

        const taskExists = tasksList.some(task => task.title.toLowerCase() === title.toLowerCase());

        if (taskExists) {
            this.setState({ ...this.initialState });
            return; 
          }

        const response_post = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
          });
      
          const newTask = await response_post.json();
          this.props.handleSubmit({newTask});
          this.setState({ ...this.initialState });

      } catch (error) {
        console.error("Erreur d'envoi du formulaire :", error);
      }
    };

  render() {
    const { title } = this.state;
  
    return (
      <form>
        <label htmlFor="task">Task</label>
        <input
          type="text"
          name="title"
          id="task"
          value={title}
          onChange={this.handleChange} />
        <input type="button" value="Submit" onClick={this.submitForm} />
      </form>
    );
  }
}

export default Form;