import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './css/simple-grid.css';
import './css/main.css';

import Notes from './components/notes';

class App extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <Notes />
          </div>
          <div className="col-6">

          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
