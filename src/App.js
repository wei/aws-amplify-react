import logo from './logo.svg';
import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { InstanceRole } from "./models";
import { useEffect } from 'react';

function App() {
  const addRecord = async () => {
    await DataStore.save(new InstanceRole({
      entityID: 'EID1',
      instanceID: 'IID1',
      role: 'My Role ' + Math.round(Math.random() * 1000),
    }))
  }

  useEffect(() => {
    DataStore.observe(InstanceRole).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={addRecord}>Add Record</button>
      </header>
    </div>
  );
}

export default App;
