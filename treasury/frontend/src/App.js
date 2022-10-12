import React, { useState, useEffect } from "react";
import { Types, AptosClient } from 'aptos';
import './App.css';


const client = new AptosClient('https://fullnode.devnet.aptoslabs.com/v1');

function App() {

  const [address, setAddress] = useState(null);
  const [account, setAccount] = React.useState(null);

  useEffect(() => {
    window.aptos.isConnected()
    .then(result => {
      if (result === false){
        window.aptos.connect()
        .then((data) => setAddress(data.address))
      }
      else{
        window.aptos.account()
        .then((data) => setAddress(data.address));
      }
    })
  }, []);

  useEffect(() => {
    if (!address) return;
    client.getAccount(address)
    .then(result => setAccount(result));
  }, [address]);
  

  

  return (
    <div className="App">
      <div className='w-full h-screen bg-neutral-200 flex justify-center items-center'>
        <div className='min-w-[325px] max-w-1/3 h-3/4 bg-white rounded-2xl flex-row items-center p-3 relative drop-shadow-2xl'>
          <p className="text-neutral-200 overflow-clip w-[20ch]">{address}</p>
          <div className='flex flex-row gap-5 my-3 justify-center'>
            <button className='border-b-[5px] border-[2px] border-blue-600 font-bold p-3 rounded-2xl focus:bg-blue-600 focus:text-white focus:outline-none' autoFocus>Deposit</button>
            <button className='border-b-[5px] border-2 border-green-600 font-bold p-3 rounded-2xl focus:bg-green-600 focus:text-white focus:outline-none'>Withdraw</button>
          </div>
          <div className='p-3 relative'>
            <div className='rounded-2xl border-2 border-b-[5px] border-blue-600 p-3'>
              <span>Amount: </span>
              <span className='w-max'>
                <input type="number" className='bg-white w-[15ch] rounded-2xl p-1 px-3 inline' />
                <select name="coins" id="coins" className='inline rounded-2xl p-1 mx-1 outline-blue-600'>
                  <option value="?">BTC</option>
                </select>
              </span>
            </div>
          </div>
          <button className='bg-blue-500 p-3 rounded-2xl font-bold text-white absolute bottom-3 left-1/2 -translate-x-1/2 '>Deposit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
