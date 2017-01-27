import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PouchDB from 'pouchdb';

import './css/simple-grid.css';
import './css/main.css';

import Folders from './components/folders';
import Notes from './components/notes';

var db = new PouchDB('notepila');
var remoteCouch = false;

class App extends Component {
  constructor(props) {
    super(props);

    // create a design doc
    var ddoc = {
      _id: '_design/index',
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

    // save the design doc
    db.put(ddoc).catch(function (err) {
      if (err.name !== 'conflict') {
        throw err;
      }
      // ignore if doc already exists
    }).then(function () {
      // find docs where type === 'folder'
      return db.query('index', {
        include_docs: true
      });
    }).then(function (result) {
      // handle result
    }).catch(function (err) {
      console.log(err);
    });

    //
    // db.post({  
    //   type: 'folder',
    //   name: 'Ideas'
    // }).then(function (response) {
    //   // handle response
    //   console.log('create folder response:', response);
    // }).catch(function (err) {
    //   console.log(err);
    // });
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
