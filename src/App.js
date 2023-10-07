import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('java')

  const handleCompile = () => {

    axios.post('http://localhost:4000/compile', {
      code: code,
      language: language,
      input: input
    })
      .then((response) => {
        console.log(response.data);
        setOutput(response.data.output);
        setError(response.data.error);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  useEffect(() => {
    switch (language) {
      case "c":
        setMode('java');
        break;
      case "cpp":
        setMode('java');
        break;
      case "py":
        setMode('python');
        break;
      case "java":
        setMode('java');
        break;
      case "cs":
        setMode('csharp');
        break;
      default:
        setMode('python');
        break;
    }
  }, [language])
  return (
    <div className="App" >
      <h1>Code Compiler</h1>
      <div style={{ 'display': 'flex' }}>
        <div>
          <AceEditor
            mode={mode}
            theme='dracula'
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              fontSize: 20,
              showPrintMargin: false,
            }}
            onChange={(e) => setCode(e)}
          />
        </div>
        <div>
          <select onChange={(e) => setLanguage(e.target.value)} name='language'>
            <option value="py">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="cs">C#</option>
            <option value="java">Java</option>
            <option value="js">Javascript</option>
            <option value="go">Golang</option>
          </select>
          <button onClick={handleCompile}>Compile</button><br />
          <label htmlFor='code-input'>Input </label>
          <textarea
            id='code-input'
            type='text'
            placeholder='Enter input If required'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <div>
            <h2>Output:</h2>
            <pre>{output}</pre>
          </div>
          <div>
            <h2>Error:</h2>
            <pre>{error}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;