// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainScreen from './screens/MainScreen';
import PlayerScreen from './screens/PlayerScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/player" element={<PlayerScreen />} />  {/* This is where players go */}
      </Routes>
    </Router>
  );
}

export default App;
