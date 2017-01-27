import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './css/simple-grid.css';
import './css/main.css';

import Folders from './components/folders';
import Notes from './components/notes';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ul className="menu">
              <li><h5>Note Pila!</h5></li>
              <li>Add Note</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <Folders />
          </div>
          <div className="col-4">
            <Notes />
          </div>
          <div className="col-6">
            <div>
              Note content...
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
