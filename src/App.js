import logo from './logo.svg';
import './App.css';

function TextBoxContent() {
  // JSON obj from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON#arrays_as_json
  const exampleJSON = [
    {
      name: "Molecule Man",
      age: 29,
      secretIdentity: "Dan Jukes",
      powers: ["Radiation resistance", "Turning tiny", "Radiation blast"]
    }]
    const parseJsonIntoConsoleStr = (item, index) => {
      return (
        <p key={index}>
          {item.name}'s true identity is {item.secretIdentity}
        </p>
      );
    };
    return exampleJSON.map(parseJsonIntoConsoleStr);
  }


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
          <TextBoxContent />
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
