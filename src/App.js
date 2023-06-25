import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Addtasks from './components/Addtasks';


function App() {
 


 

  return (
    <div>
      <Navbar/>
      <Addtasks/>
      {/* <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul> */}
      
    </div>
  );
}

export default App;
