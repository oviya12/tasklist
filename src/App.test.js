import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

// Clean up after each test
afterEach(() => {
  cleanup();
});

describe('Task Tracker App', () => {
  
  test('should render the app', () => {
    render(<App />);
    expect(screen.getByText(/Task Tracker/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Task Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Status \(pending or completed\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Task/i)).toBeInTheDocument();
  });

  test('should add a new task with valid input', () => {
    render(<App />);
    
    // Input values
    const taskInput = screen.getByPlaceholderText(/Task Name/i);
    const statusInput = screen.getByPlaceholderText(/Status \(pending or completed\)/i);
    const addButton = screen.getByText(/Add Task/i);
    
    // Simulate user input and click the add button
    fireEvent.change(taskInput, { target: { value: 'Test Task' } });
    fireEvent.change(statusInput, { target: { value: 'pending' } });
    fireEvent.click(addButton);
    
    // Assert if task is added
    expect(screen.getByText('Test Task - pending')).toBeInTheDocument();
  });

  test('should show alert on invalid task name', () => {
    render(<App />);
    
    // Mock the alert function
    window.alert = jest.fn();
    
    // Input invalid task name
    const taskInput = screen.getByPlaceholderText(/Task Name/i);
    const statusInput = screen.getByPlaceholderText(/Status \(pending or completed\)/i);
    const addButton = screen.getByText(/Add Task/i);
    
    fireEvent.change(taskInput, { target: { value: 'Invalid#Task!' } });
    fireEvent.change(statusInput, { target: { value: 'pending' } });
    fireEvent.click(addButton);
    
    // Assert that alert was called for invalid task name
    expect(window.alert).toHaveBeenCalledWith('Enter only Alphanumeric characters');
  });

  test('should toggle task status between pending and completed', () => {
    render(<App />);
    
    // Add a task
    const taskInput = screen.getByPlaceholderText(/Task Name/i);
    const statusInput = screen.getByPlaceholderText(/Status \(pending or completed\)/i);
    const addButton = screen.getByText(/Add Task/i);
    
    fireEvent.change(taskInput, { target: { value: 'Test Task' } });
    fireEvent.change(statusInput, { target: { value: 'pending' } });
    fireEvent.click(addButton);
    
    // Click the toggle status button
    const toggleButton = screen.getByText(/Mark as Complete/i);
    fireEvent.click(toggleButton);
    
    // Assert that the task status is toggled
    expect(screen.getByText('Test Task - completed')).toBeInTheDocument();
    
    // Click again to toggle back to 'pending'
    fireEvent.click(toggleButton);
    
    // Assert that the task status is back to 'pending'
    expect(screen.getByText('Test Task - pending')).toBeInTheDocument();
  });

  test('should delete task', () => {
    render(<App />);
    
    // Add a task
    const taskInput = screen.getByPlaceholderText(/Task Name/i);
    const statusInput = screen.getByPlaceholderText(/Status \(pending or completed\)/i);
    const addButton = screen.getByText(/Add Task/i);
    
    fireEvent.change(taskInput, { target: { value: 'Test Task' } });
    fireEvent.change(statusInput, { target: { value: 'pending' } });
    fireEvent.click(addButton);
    
    // Delete the task
    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);
    
    // Assert that the task is removed from the list
    expect(screen.queryByText('Test Task - pending')).not.toBeInTheDocument();
  });

  test('should display "No Tasks Available" when no tasks are present', () => {
    render(<App />);
    
    // Assert that the text "No Tasks Available" is shown initially
    expect(screen.getByText(/No Tasks Available/i)).toBeInTheDocument();
  });

});

