import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu from './main/Menu';
import Content from './main/Content';
import MenuMobile from './main/MenuMobile';

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <MenuMobile />
        <Content />
      </Router>
    </div>
  );
}

export default App;