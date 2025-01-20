import { createSlice } from "@reduxjs/toolkit";

let taskslice = createSlice({
  name: 'task',
  initialState: {
    tasks: []
  },
  reducers: {
    addtask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deletetask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.taskname !== action.payload);
    },
    
    updatetaskstatus: (state, action) => {
      const { taskname, status } = action.payload;
      const task = state.tasks.find(t => t.taskname === taskname);
      if (task) {
        task.status = status;
      }
    }
  }
});


export const { addtask, deletetask, updatetaskstatus } = taskslice.actions;

export default taskslice.reducer;
