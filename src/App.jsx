import { useEffect, useState } from 'react';
import { CATEGORIES, TASKS } from './data';

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelecedCat] = useState('All');
  const [newTaskInput, setNewTaskInput] = useState('');
  const [lastID, setLastID] = useState(null);

  useEffect(() => {
    // Set & Get tasks
    localStorage.setItem('tasks', JSON.stringify(TASKS));
    setTasks(JSON.parse(localStorage.getItem('tasks')));
    // Set & Get categories
    localStorage.setItem('categories', JSON.stringify(CATEGORIES));
    setCategories(JSON.parse(localStorage.getItem('categories')));
    // Set last ID from ls
    {
      tasks < 0 ? setLastID(tasks.slice(-1)[0].id) : '';
    }
  }, []);

  const handleAddTask = (e, task) => {
    e.preventDefault();
    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id, checked: false, text: newTaskInput };
    console.log(newTask)
    const taskItems = [...tasks, newTask]
    setTasks(taskItems)
    localStorage.setItem('tasks', JSON.stringify(taskItems))
    setNewTaskInput('');
  };

  const handleChecked = (id) => {
    const taskList = tasks.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    setTasks(taskList);
    localStorage.setItem('tasks', JSON.stringify(taskList))
  };

  const handleDelete = (id) => {
    const taskItems = tasks.filter(task => task.id !== id)
    setTasks(taskItems)
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }

  return (
    <div className='App'>
      <div className='todo-container'>
        <form onSubmit={handleAddTask}>
          <h1>To-Do List</h1>
          <p>Manage your Activities</p>
          <br />
          <div>
            <select onChange={(e) => setSelecedCat(e.target.value)}>
              <option hidden>Category</option>
              {categories.map((cat) => {
                return (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                );
              })}
            </select>
            <input
              type='text'
              placeholder='Add Task'
              autoFocus
              required
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
            />
            <button type='submit'>+</button>
          </div>
        </form>
        <hr />
        <div className='task-list'>
          {categories.map((cat) => {
            return (
              <button value={cat} key={cat} aria-label='Add Task' >
                {cat}
              </button>
            );
          })}
          <br />
          <div class='task-cards'>
            {tasks.length ? (
              tasks.map((task) => {
                return (
                  <div class='task-card' key={task.id}>
                    <span>
                      <label
                       class={task.checked ? 'checked' : 'unchecked'}>
                        {' '}
                      <input
                        type='checkbox'
                        checked={task.checked}
                        onChange={() => handleChecked(task.id)}
                      />
                        {' '}
                        {task.text}
                      </label>
                    </span>
                    <i class='fa-solid fa-trash' onClick={() => handleDelete(task.id)}></i>
                  </div>
                );
              })
            ) : (
              <h3 class='hooray'>Hooray! You dont have any pending tasks!</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
