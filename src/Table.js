import React, { Component } from 'react'

const URL = "http://127.0.0.1:5000/tasks/";

function TableHeader() {
    return (
        <thead>
          <tr>
            <th>Id</th>
            <th>Task</th>
            <th>Creation Date</th>
            <th>Done</th>
          </tr>
        </thead>
      )
}

const TableBody = (props) => {
    const { updateTaskList, taskData} = props;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    const handleCheckboxChange = (id, checked) => {
        updateTaskStatus(id, checked);
    };

    const updateTaskStatus = async (id, done) => {
        try {
            console.log(id)
            const response = await fetch(`${URL}${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ done }),
            });

            updateTaskList(taskData.map((task) =>
                    task.id === id ? { ...task, done } : task
                ))
        
        } catch (error) {
            console.error('Erreur de mise à jour du statut de la tâche :', error);
        }
    };

    const rows = props.taskData.map((row, index) => {
        console.log({row})
        return (
            <tr key={index}>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>{formatDate(row.creation_date)}</td>
                <td>
                    <input
                        type="checkbox"
                        checked={row.done}
                        onChange={(e) => handleCheckboxChange(row.id, e.target.checked)}
                    />
                </td>
                <td>
                    <button onClick={() => props.removeTask(row.id)}>Delete</button>
                </td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

const Table = (props) => {
    const { taskData, removeTask, updateTaskList } = props;

    return (
        <table>
            <TableHeader />
            <TableBody taskData={taskData} removeTask={removeTask} updateTaskList={updateTaskList} />
        </table>
    );
};

export default Table