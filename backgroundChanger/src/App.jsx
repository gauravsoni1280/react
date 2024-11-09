import { useState } from 'react';

function App() {
  const [color,SetColor] = useState('red');
  return (
    <div className='w-full h-screen duration-200' style={{backgroundColor: color}}>
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
          <div className='flex flex-wrap justify-cente gap-3 shadow-lg bg-white px-2 py-2 rounded-3xl'>
            <button className='outline-none px-4 py-1 rounded-full text-white' style={{backgroundColor:"red"}} onClick={()=>SetColor('red')}>Red</button>
            <button className='outline-none px-4 py-1 rounded-full text-white' style={{backgroundColor:"Green"}} onClick={()=>SetColor('green')}>Green</button>
            <button className='outline-none px-4 py-1 rounded-full text-white' style={{backgroundColor:"Blue"}} onClick={()=>SetColor('blue')}>Blue</button>
          </div>
      </div>
    </div>
  )
}

export default App
