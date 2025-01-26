import React, { useState } from 'react';
// import './style.css'
const App = () => {
  
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('');

  const handleTaskNameChange = (e) => {
    
    const value = e.target.value;
    if (/^[A-Za-z0-9\s]*$/.test(value)) {
      setTaskName(value);
    }
    else{
      alert('Enter only Alphanumeric characters')
    }
  };

  const handleStatusChange = (e) => setStatus(e.target.value);

  const addTask = () => {
    if (taskName && (status === 'pending' || status === 'completed')) {
      const newTask = {
        id: tasks.length + 1, 
        taskName,
        status,
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
      setStatus('');
    } else {
      alert('Please enter a valid task name and status (pending or completed).');
    }
  };

  const toggleStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className='tasklist'>
      <h1>Task Tracker</h1>

      <div className='inputform'>
        <input style={{height:'30px'}}
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <input style={{height:'30px'}}
          type="text"
          placeholder="Status (pending or completed)"
          value={status}
          onChange={handleStatusChange}
        />
        </div>
        <br></br>
        <div>
        <button 
        id='add-btn'
        onClick={addTask}>Add Task</button>
      </div>
      <br></br>
    <h2>Your Tasks</h2>
     <div>
     {tasks && tasks.length >0 ? (
   
      <ul className='list'>
       
        
        {tasks.map((task) => (
          <li className='eachTask' key={task.id}>
           <span>{task.taskName} - {task.status}</span>
            <button onClick={() => toggleStatus(task.id)}>
             
              {task.status === 'pending' ? 'Mark as Complete' : 'Mark as Pending'}

            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
  
        
      </ul>):(
   <span>No Tasks Available</span>
        
      )

      }
      </div>
    </div>
  );
};

export default App;
