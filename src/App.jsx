import { useState } from 'react'
import './App.css'
import { useCallback, useEffect, useRef } from 'react';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // useRef hook
  const passwordRef = useRef(null);

  const copyPasswordtoClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password]);



  const passwordGenUseCallBack = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0987654321"
    }
    if (characterAllowed) {
      str += "/[@!^&\/\\#,+()$~%.':*?<>{}]/</>`"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numberAllowed, characterAllowed, length])


  const passwordGenerator = useEffect(passwordGenUseCallBack, [numberAllowed, characterAllowed, length, setPassword]);

  passwordGenerator
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-700 bg-gray-400'>
        <h1 className='my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} placeholder='password' ref={passwordRef} readOnly className='outline-none w-full py-1 px-3' />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordtoClipBoard}>copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={100} value={length} className='cursor-pointer' onChange={(e) => {
              setLength(e.target.value)
            }} />
            <label >length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => {
              setNumberAllowed((prev) => !prev);
            }} />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <input type="checkbox" defaultChecked={characterAllowed} id='charInput' onChange={() => {
            setCharacterAllowed((prev) => !prev);
          }} />
          <label htmlFor='charInput'>Character</label>
          <div>

          </div>
        </div>

      </div>

    </>
  )
}

export default App
