import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import List from './front/List';
import MessagingUI from './front/Message';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="list"  element={<List />} />
        <Route path="message"  element={<MessagingUI />} />
        {/* Other routes here */}
        {/* <Route exact path="/" component={Home} /> */}
      </Routes>
    </Router>
  );
}

export default App;
