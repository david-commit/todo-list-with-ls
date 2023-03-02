import { useEffect, useState } from 'react';
import { CATEGORIES, TASKS } from './data';

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelecedCat] = useState('All');
  const [newTaskInput, setNewTaskInput] = useState('')
  const [lastID, setLastID] = useState()
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Store tasks
    localStorage.setItem('tasks', JSON.stringify(TASKS));
    setTasks(JSON.parse(localStorage.getItem('tasks')));
    // Store categories
    localStorage.setItem('categories', JSON.stringify(CATEGORIES));
    setCategories(JSON.parse(localStorage.getItem('categories')));
    // 
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    fetch(``, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    console.log(JSON.stringify({
      id: 
      selectedCat, 
      newTaskInput,
      checked: false
    }))
  };
  console.log(newTaskInput)
  console.log(selectedCat)

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
            <input type='text' placeholder='Add Task' autoFocus value={newTaskInput} onChange={(e) => setNewTaskInput(e.target.value)} />
            <button type='submit'>+</button>
          </div>
        </form>
        <hr />
        <div className='task-list'>
          {categories.map((cat) => {
            return (
              <button value={cat} key={cat}>
                {cat}
              </button>
            );
          })}
          <br />
          <div class='task-cards'>
            {tasks.length > 0 ? (
              tasks.map((task) => {
                return (
                  <div class='task-card'>
                    <span>
                      <input type='checkbox' value={checked} onChange={() => setChecked(!checked)} />
                      <label class={checked ? 'checked' : 'unchecked'}>
                        {task.text}
                      </label>
                    </span>
                    <i class='fa-solid fa-trash'></i>
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
