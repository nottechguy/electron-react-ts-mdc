import React, { Component } from 'react';
import './main.scss';

import NavBar from '@/components/header/nav-bar';
import Sidebar from '@/components/sidebar/sidebar-menu';

class App extends Component {

  render() {
    return (
      <div className="app">
        <NavBar />
        <div>
          <Sidebar />
        </div>
      </div>
    );
  }

}

export default App;