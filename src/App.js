import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';

import './App.css';

function App() {
  const ESCAPE_KEY = 27;
  const ENTER_KEY = 13;

  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');

  const erase = () => {
    setValue('');
  };

  const submit = () => {
    console.log(value);
    setTodos([
      ...todos,
      {
        id: new Date().getTime(),
        title: value,
        checked: false,
      },
    ]);
    erase();
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.which === ENTER_KEY) {
      submit();
    } else if (event.which === ESCAPE_KEY) {
      erase();
    }
  };

  const onToggle = (todo) => {
    setTodos(todos.map((obj) => (obj.id === todo.id ? { ...obj, checked: !obj.checked } : obj)));
  };

  return (
    <section id="app" className="container">
      <header>
        <h1 className="title">Todo</h1>
      </header>
      <section className="main">
        <input
          className="new-todo"
          placeholder="what need to be done?"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <ul className="todo-list">
          {
            todos.map((todo) => (
              <li key={todo.id.toString}>
                <span
                  className={['todo', todo.checked ? 'checked' : ''].join(' ')}
                  onClick={() => onToggle(todo)}
                  onKeyPress={() => onToggle(todo)}
                  role="button"
                  tabIndex={0}
                >
                  {todo.title}
                </span>
                <button type="button" className="remove">
                  <MdDelete size={28} />
                </button>
              </li>
            ))
          }
        </ul>
      </section>
    </section>
  );
}

export default App;
