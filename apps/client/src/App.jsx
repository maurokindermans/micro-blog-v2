import { useState, useEffect } from "react";

import "./App.css";

const baseURL = "http://localhost:8080";

function App() {
  const [entries, setEntries] = useState([]);
  const [textInput, setTextInput] = useState("");
  const author = "Arol";

  useEffect(() => {
    const loop = setInterval(() => {
      fetch(`${baseURL}/entries`)
        .then((res) => res.json())
        .then((currentEntries) => {
          setEntries(currentEntries);
        });
    }, 1000);
    return () => {
      clearInterval(loop);
    };
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`${baseURL}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author, text: textInput }),
    }).then((res) => {
      if (res.status === 201) {
        setTextInput("");
      }
    });
  }
  function handleText(event) {
    setTextInput(event.target.value);
  }

  return (
    <div className="App">
      <div className="home">
        <div className="place">Home</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Write something..."
            value={textInput}
            onChange={handleText}
          />
          <input
            className="submit"
            type="submit"
            value="Post"
            disabled={textInput.length === 0}
          />
        </form>
      </div>
      {entries.map((current) => {
        return (
          <div className="entry" key={current.id}>
            <div className="author">{current.author}</div>
            <div className="text">{current.text}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
