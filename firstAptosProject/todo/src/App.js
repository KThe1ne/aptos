import './App.css';

function App() {
  return (
    <div className="App">
      <div className='w-full h-screen bg-neutral-800 flex justify-center items-center'>
        <div className='w-1/3 h-4/5 bg-neutral-900 rounded-2xl shadow-2xl shadow-neutral-900 relative py-4 px-3 flex flex-col items-center'>
          <h1 className='bg-gradient-to-r bg-clip-text text-transparent from-yellow-600 to-red-500 font-extrabold text-lg text-center'>Add New Task</h1>
          <span className='flex items-center gap-1 w-full justify-center'>
            <input type="text" name="new-task" className='bg-neutral-800 outline-1 outline-none w-[80%] my-2 rounded-full pl-3' />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-yellow-600">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
            </svg>
          </span>
          <ul className='list-none h-min'>
            <li className='inline-block'>
              <button className='bg-gradient-to-r bg-clip-text text-transparent from-yellow-600 to-red-500 font-extrabold text-base m-3'>Your Tasks</button>
            </li>
            <li className='inline-block'>
              <button className='bg-gradient-to-r bg-clip-text text-transparent from-yellow-600 to-red-500 font-extrabold text-base m-3'>Signed Tasks</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
