import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Folders from './folders';
import Notes from './notes';
import Note from './note';

import { listFolders, selectFolder, addFolder } from '../actions/folder_actions';
import { listNotes, search } from '../actions/note_actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.props.listFolders();
  }

  search(e) {
    e.preventDefault();
    this.props.search(this.input.value);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <ul className="menu">
              <li><h5>Note Pila!</h5></li>
              <li>
                <form onSubmit={this.search.bind(this)}>
                  <input type="text" name="search" placeholder="Search..." ref={(input) => this.input = input} />
                </form>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <Folders folders={this.props.folders} activeFolder={this.props.activeFolder} />
          </div>
          <div className="col-4">
            <Notes folderId={this.props.activeFolder ? this.props.activeFolder._id : 'main'} />
          </div>
          <div className="col-6">
            <Note
              note={this.props.activeNote !== undefined ? this.props.activeNote : null}
              folderId={this.props.activeFolder !== undefined ? this.props.activeFolder._id : 'main'}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log('App mapStateToProps state:', state);
  return {
    folders: state.app.folders,
    notes: state.app.notes,
    activeFolder: state.app.activeFolder,
    activeNote: state.app.activeNote
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    listFolders: listFolders,
    selectFolder: selectFolder,
    addFolder: addFolder,
    listNotes: listNotes,
    search: search
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
