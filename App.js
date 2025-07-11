import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = (text) => {
    setTasks([...tasks, text]);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAdd = () => {
    if (input.trim()) {
      addTask(input.trim());
      setInput('');
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log('Voice Input:', transcript);

      if (transcript.startsWith('add task')) {
        const taskText = transcript.replace('add task', '').trim();
        if (taskText) {
          addTask(taskText);
        }
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  };

  return (
    <div className="App">

      <h1>🎙️ Voice Controlled To-Do List</h1>

      <input
        value={input}
        onChange={handleInputChange}
        placeholder="Type a task..."
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleVoiceInput} style={{ marginLeft: '8px' }}>🎤 Speak</button>

      <ul style={{ listStyle: 'none', paddingTop: '20px' }}>
        {tasks.map((task, i) => (
          <li key={i} style={{ padding: '5px 0' }}>{i + 1}. {task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
