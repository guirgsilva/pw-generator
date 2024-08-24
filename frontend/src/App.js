import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const generatePassword = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-password', {
        length,
        useUppercase,
        useLowercase,
        useNumbers,
        useSymbols
      });
      setPassword(response.data.password);
    } catch (error) {
      console.error('Error generating password:', error);
    }
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <label>
          Length:
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)} min="1" max="100" />
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={useUppercase} onChange={() => setUseUppercase(!useUppercase)} />
          Uppercase
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={useLowercase} onChange={() => setUseLowercase(!useLowercase)} />
          Lowercase
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} />
          Numbers
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} />
          Symbols
        </label>
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      {password && <div>Generated Password: {password}</div>}
    </div>
  );
}

export default App;
