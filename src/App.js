import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleCompile = async () => {
    try {
      const response = await axios.post('https://api.codex.jaagrav.in', {
        code,
        language,
        input: '7', // You can modify the input as needed
      });

      // Handle the response from the external API here
      console.log('Response Data:');
      console.log(JSON.stringify(response.data));

      // Update the state with the response data
      setOutput(response.data.output);
      setError(response.data.stderr);
    } catch (error) {
      console.error(error);
      setError('An error occurred during code execution.');
    }
  };

  return (
    <div className="App">
      <h1>Code Compiler</h1>
      <textarea
        name='code'
        placeholder="Enter your code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <select onChange={(e) => setLanguage(e.target.value)} value={language} name='language'>
        <option value="cpp">C++</option>
        <option value="python">Python</option>
        {/* Add more language options as needed */}
      </select>
      <button onClick={handleCompile}>Compile</button>
      <div>
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
      <div>
        <h2>Error:</h2>
        <pre>{error}</pre>
      </div>
    </div>
  );
}

export default App;
