import logo from './logo.svg';
import './App.css';
import { DataStore } from 'aws-amplify';
import { Order } from "./models";
import { useEffect, useState } from 'react';

function App() {
  const [orders, setOrders] = useState(null)

  const fetchOrders = async () => {
    setOrders(await DataStore.query(Order))
  }

  const addOrder = async () => {
    await DataStore.save(new Order({
      orderDate: '2020-05-19T11:5:29.000Z',
      owner: `Owner ${Math.random()}`
    }))
    await fetchOrders()
  }

  const clear = async () => {
    await DataStore.clear()
    await fetchOrders()
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <pre>{JSON.stringify(orders, null, 2)}</pre>
        <button onClick={addOrder}>
          Add Order
        </button>
        <button onClick={clear}>
          Clear
        </button>
      </header>
    </div>
  );
}

export default App;
