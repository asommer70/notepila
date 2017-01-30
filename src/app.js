import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PouchDB from 'pouchdb';

import './css/simple-grid.css';
import './css/main.css';

import Folders from './components/folders';
import Notes from './components/notes';

var db = new PouchDB('notepila');
var remoteCouch = false;
// db.destroy();

class App extends Component {
  constructor(props) {
    super(props);

    // Create the folders design doc.
    var ddoc = {
      _id: '_design/folders',
      views: {
        index: {
          map: function mapFun(doc) {
            if (doc.type == 'folder') {
              emit(doc);
            }
          }.toString()
        }
      }
    }

    // Save the _design/folders view to the database.
    db.put(ddoc).catch((err) => {
      if (err.name !== 'conflict') {
        throw err;
      }
    }).catch((err) => {
      // Catch the error, but don't need to do anything cause the folders design doc is already created.
    });
  }

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
            <Folders db={db} />
          </div>
          <div className="col-4">
            <Notes db={db} />
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
