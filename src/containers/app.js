import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import Folders from './folders';
import Notes from './notes';
import Note from './note';
import Icon from '../components/icon';
import logo from '../assets/img/logo.png';

import { listFolders, selectFolder, addFolder } from '../actions/folder_actions';
import { listNotes, search } from '../actions/note_actions';
import { updateSettings, syncDatabase } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    props.updateSettings();
    props.listFolders();

    this.state = {
      editSettings: false,
      settings: props.settings
    }
  }

  search(e) {
    e.preventDefault();
    this.props.search(this.input.value);
  }

  saveSettings(e) {
    e.preventDefault();
    this.props.updateSettings(this.state.settings);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings) {
      this.setState({settings: nextProps.settings});
    }
  }

  sync(e) {
    e.preventDefault();
    if (this.state.settings.syncUrl != '') {
      this.props.syncDatabase(this.state.settings);
    }
  }

  render() {
    let syncDate;
    if (this.state.settings) {
      syncDate = (this.state.settings.syncDate ? this.state.settings.syncDate : 'Never');
    } else {
      syncDate = 'Never';
    }

    const settingsForm = (
      <form onSubmit={this.saveSettings.bind(this)}>
        <input
          type="text"
          name="syncUrl"
          placeholder="PouchDB URL"
          className="settings-input"
          value={this.state.settings ? this.state.settings.syncUrl : ''}
          onChange={(e) => {this.setState({ settings: {...this.state.settings, syncUrl: e.target.value} })}} />
        <div className="sync-date">Last Sync: <strong>{moment.unix(syncDate).fromNow()}</strong></div>
        <div className="settings-buttons">
          <button className="btn btn-inline btn-small check" title="Save Settings"><Icon name={'check'} /></button>
          &nbsp;&nbsp;
          <button className="btn btn-inline btn-small" onClick={this.sync.bind(this)} title="Sync Database"><Icon name={'sync'} /></button>
        </div>
      </form>
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <ul className="menu">
              <li>
                <div>
                  <img className="logo" src={logo} onClick={() => {this.setState({editSettings: !this.state.editSettings}) }} />
                  {this.state.editSettings ? settingsForm : ''}
                </div>
              </li>
              <li>
                <form className="searchForm" onSubmit={this.search.bind(this)}>
                    <input type="text" id="search "name="search" placeholder="Search" ref={(input) => this.input = input} />
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
  return {
    folders: state.app.folders,
    notes: state.app.notes,
    activeFolder: state.app.activeFolder,
    activeNote: state.app.activeNote,
    settings: state.app.settings,
    sync: state.app.sync
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    listFolders: listFolders,
    selectFolder: selectFolder,
    addFolder: addFolder,
    listNotes: listNotes,
    search: search,
    updateSettings: updateSettings,
    syncDatabase: syncDatabase
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
