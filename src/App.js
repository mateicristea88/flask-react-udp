import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';



function handleSubmit(e) {
  // Prevent the browser from reloading the page
  e.preventDefault(); 

  // Read the form data
  const form = e.target;
  const formData = new FormData(form);

  // You can pass formData as a fetch body directly:
  fetch('/some-api', { method: form.method, body: formData });

  // Or you can work with it as a plain object:
  const formJson = Object.fromEntries(formData.entries());
  console.log(formJson);
}

function App() {

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Osciloscope.
        </p>
        <div className="divForm">
        <form method="post" onSubmit={handleSubmit}>

        <label>
        UDP Port: <input name="udpPort" defaultValue="12345" />
        </label>

        <br/>
        
        <label>
        Data Format: <input name="dataFormat" defaultValue="<iffd" />
        </label>
        <br/>
        <button type="submit">Set Port and Format</button>

        </form>

        </div>

        <div className="divLegend">Left Div with legend
        <br/>
        legend
        <br/>
        i - integer
        <br/>
        f - float
        <br/>
        d - double
        <br/>
        lessthan little-endian
        <br/>
        greaterthan big-endian

        </div>

        <div className="example-text-box">
          latest number is {currentTime}.
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
