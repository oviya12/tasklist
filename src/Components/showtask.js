import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletetask, updatetaskstatus } from './taskslice';
import './style.css';

function Tasklist(props) {
  const dispatcher = useDispatch();
  const tasklist = useSelector((state) => state.task.tasks);
  const [newStatus, setNewStatus] = useState('');
  const [editingTask, setEditingTask] = useState(null); 

  const handleStatusChange = (task) => {
    setEditingTask(task);
    setNewStatus(task.status); 
  };

  
  const handleStatusUpdate = () => {
    if (newStatus) {
      dispatcher(updatetaskstatus({ taskname: editingTask.taskname, status: newStatus }));
      setEditingTask(null); 
      setNewStatus(''); 
    } else {
      alert('Please enter a new status');
    }
  };

 
  const handleDelete = (taskname) => {
    dispatcher(deletetask(taskname));
  };

  return (
    <div>
      <br />
      <h1>Tasklist</h1>
      <br />
      <div className="tasklist">
        {tasklist && tasklist.length > 0 ? (
          <ul className="tasks">
            {tasklist.map((task, index) => (
              <li key={index} style={{ listStyleType: 'none' }}>
                <div className="task">
                  <strong>Task Name:</strong> {task.taskname} <br />
                  <strong>Status:</strong> {task.status} <br />

                 
                  <button
                    style={{ backgroundColor: 'lightyellow' }}
                    onClick={() => handleStatusChange(task)}
                  >
                    Edit Status
                  </button>

                  {editingTask && editingTask.taskname === task.taskname && (
                    <>
                     
                      <input
                        type="text"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        placeholder="Update status"
                      />
                      <button
                        style={{ backgroundColor: 'lightgreen' }}
                        onClick={handleStatusUpdate} 
                      >
                        Update Status
                      </button>
                    </>
                  )}

                
                  <button
                    style={{ backgroundColor: 'red' }}
                    onClick={() => handleDelete(task.taskname)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
}

export default Tasklist;
