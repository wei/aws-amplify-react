import logo from './logo.svg';
import './App.css';

import { Todo } from './models'
import { DataStore } from 'aws-amplify';
import { useEffect, useState } from 'react';

function App() {
  const [todo, setTodo] = useState()

  async function getTodo() {
    let todos = await DataStore.query(Todo);

    if (todos.length === 0) {
      await DataStore.save(new Todo({name: 'Initial'}))
      todos = await DataStore.query(Todo);
    }
    setTodo(todos[0])
  }

  async function changeTodoName() {
    for (let letter of ['A', 'B', 'C', 'D', 'E']) {
      await DataStore.save(Todo.copyOf(todo, updated => {
        updated.name = `Title ${letter} ${new Date().toTimeString().substr(0, 8)}`;
      }))
    }
  }

  useEffect(() => {
    getTodo()

    const sub = DataStore.observe(Todo).subscribe(({ opType, element }) => {
      console.log('DEBUG', opType, element._lastChangedAt, new Date(element._lastChangedAt).toTimeString().substr(0, 8), element.name);
      getTodo()
    });

    return () => sub.unsubscribe()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <pre>{JSON.stringify(todo, null, 2)}</pre>
        <button onClick={changeTodoName}>Go</button>
      </header>
    </div>
  );
}

export default App;
