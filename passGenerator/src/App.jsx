import React, { useCallback, useEffect, useState, useRef } from 'react';

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);


  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (charAllowed) str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+,-./:;<=>?@[\]^_`{|}~";

    for (let i = 0; i < length; i++) {
      const element = str[i];
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword]);//this dependency array in callback hook is responsible for optimising the code. which means if any of the dependency is hitted , then work accordingly.


  const copyPass = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password]);

  useEffect(()=>{
    passGenerator()
  },[length, numAllowed, charAllowed, setPassword]); //this dependency array in useEffect means if any of the dependency is hitted , it will re-executred the function which is being provided.

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-2 text-slate-400 bg-gray-700">
        <h1 className="text-center my-3">Pass Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passRef}
          />
          <button className="bg-blue-500 text-white px-3 py-1" onClick={copyPass}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={24}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
              id='progressbar'
            />
            <label htmlFor="progressbar">Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
              id='numberInput'
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)} // this means - a callback function is passed to seter function , which gives access to the previous value , so that we can make a toggle.
              id='charInput'
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;


// `passRef.current?.select()`:
// The `?.` is called **optional chaining** and is used to safely access the `current` property of the `passRef` reference.
// If `passRef.current` is `null` or `undefined` (for example, before the component has fully rendered or if the ref is not yet attached to the DOM element),
// the expression will return `undefined` without throwing an error, preventing potential runtime issues.
// This ensures that the `.select()` method is only called when the input element is available.
// It's particularly useful in React where refs might be `null` during the initial render or in certain lifecycle stages.
// If `passRef.current` is valid (i.e., the input field is rendered and attached), the `.select()` method is called to select the text inside the input field, enabling the user to copy it easily.
