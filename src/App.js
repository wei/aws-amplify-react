import logo from './logo.svg';
import './App.css';
import { DataStore } from 'aws-amplify';
import { Todo } from './models';

function App() {

  const addRecord = async () => {
    try {
      await DataStore.save(new Todo({
        name: 'me ' + Date.now(),
        someField: [null],
      }))
      console.log('DEBUG', 'Successfully saved a record with someField: [null]')
    } catch (err) {
      console.warn('DEBUG', 'Failed to saved a record with someField: [null]', err)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={addRecord}>Add Record (see console)</button>
      </header>
    </div>
  );
}

export default App;
