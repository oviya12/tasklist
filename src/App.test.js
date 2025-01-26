

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './Components/store';
import Addtask from './Components/addtask';
import Tasklist from './Components/showtask';
import { addtask, deletetask, updatetaskstatus } from './taskslice';

describe('Task Management App', () => {
  
  describe('Redux Slice', () => {
    let initialState;

    beforeEach(() => {
      initialState = {
        tasks: [
          { taskname: 'Task 1', status: 'pending' },
          { taskname: 'Task 2', status: 'completed' }
        ]
      };
    });

    it('should add a new task', () => {
      const newTask = { taskname: 'Task 3', status: 'in-progress' };
      const action = addtask(newTask);
      const state = store.getState().task;
      
      store.dispatch(action);
      
      expect(state.tasks.length).toBe(3);
      expect(state.tasks[2].taskname).toBe('Task 3');
    });

    it('should delete a task by taskname', () => {
      const action = deletetask('Task 1');
      store.dispatch(action);
      
      const state = store.getState().task;
      expect(state.tasks.length).toBe(1);
      expect(state.tasks[0].taskname).toBe('Task 2');
    });

    it('should update task status', () => {
      const action = updatetaskstatus({ taskname: 'Task 1', status: 'completed' });
      store.dispatch(action);
      
      const state = store.getState().task;
      expect(state.tasks[0].status).toBe('completed');
    });
  });

 
  describe('Addtask Component', () => {
    it('should render the Addtask form', () => {
      render(
        <Provider store={store}>
          <Addtask />
        </Provider>
      );

      expect(screen.getByPlaceholderText('Task Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Status')).toBeInTheDocument();
    });

    it('should dispatch addtask action when form is submitted', async () => {
      const taskname = 'New Task';
      const status = 'pending';

      render(
        <Provider store={store}>
          <Addtask />
        </Provider>
      );

      fireEvent.change(screen.getByPlaceholderText('Task Name'), { target: { value: taskname } });
      fireEvent.change(screen.getByPlaceholderText('Status'), { target: { value: status } });
      
      fireEvent.click(screen.getByText('Save'));

      await waitFor(() => {
        expect(store.getState().task.tasks).toHaveLength(1);
        expect(store.getState().task.tasks[0].taskname).toBe(taskname);
        expect(store.getState().task.tasks[0].status).toBe(status);
      });
    });
  });

  describe('Tasklist Component', () => {
    it('should render tasks in the list', () => {
      store.dispatch(addtask({ taskname: 'Task 1', status: 'pending' }));
      store.dispatch(addtask({ taskname: 'Task 2', status: 'completed' }));

      render(
        <Provider store={store}>
          <Tasklist />
        </Provider>
      );

      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
    });

    it('should delete a task when delete button is clicked', () => {
      store.dispatch(addtask({ taskname: 'Task 1', status: 'pending' }));

      render(
        <Provider store={store}>
          <Tasklist />
        </Provider>
      );

      fireEvent.click(screen.getByText('Delete'));

      expect(store.getState().task.tasks).toHaveLength(0);
    });

    it('should update task status when Edit Status is clicked', async () => {
      store.dispatch(addtask({ taskname: 'Task 1', status: 'pending' }));

      render(
        <Provider store={store}>
          <Tasklist />
        </Provider>
      );

      fireEvent.click(screen.getByText('Edit Status'));
      fireEvent.change(screen.getByPlaceholderText('Update status'), { target: { value: 'completed' } });
      fireEvent.click(screen.getByText('Update Status'));

      await waitFor(() => {
        expect(store.getState().task.tasks[0].status).toBe('completed');
      });
    });
  });
});
