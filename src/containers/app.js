import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionDone from 'material-ui/svg-icons/action/done';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';

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
    this.props.search(this.input.input.value);
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

  handleSettings = (event) => {
    event.preventDefault();

    this.setState({
      editSettings: true,
      anchorEl: event.currentTarget,
    });
  };

  render() {
    let syncDate;
    if (this.state.settings) {
      syncDate = (this.state.settings.syncDate ? this.state.settings.syncDate : 'Never');
    } else {
      syncDate = 'Never';
    }

    const settingsFormStyle = {
      width: 300,
      padding: 20,
      display: 'inline-block',
    };

    const settingsForm = (
      <Paper style={settingsFormStyle} zDepth={5}>
        <form onSubmit={this.saveSettings.bind(this)}>
            <TextField
              hintText="http://..."
              floatingLabelText="PouchDB Server URL"
              id="search"
              ref={(input) => this.input = input}
              name="syncUrl"
              value={this.state.settings ? this.state.settings.syncUrl : ''}
              onChange={(e) => {this.setState({ settings: {...this.state.settings, syncUrl: e.target.value} })}}
            />
          <div className="settings-buttons">
            <IconButton onClick={this.saveSettings.bind(this)}>
              <ActionDone />
            </IconButton>
          </div>
        </form>
      </Paper>
    );

    const foldersStyle = {
      width: 200,
      padding: 10,
      display: 'inline-block',
    };

    const notesStyle = {
      width: 370,
      padding: 20,
      display: 'inline-block',
    };

    const noteStyle = {
      width: 580,
      padding: 20,
      display: 'inline-block',
    }

    const settingsPopover = (
      <Popover
        open={this.state.editSettings}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={() => this.setState({editSettings: false})}
      >
        {settingsForm}
      </Popover>
    )

    const leftMenuButton = (
      <IconButton onClick={this.handleSettings}>
        {this.state.editSettings ? <NavigationClose /> : <NavigationMenu />}
        {settingsPopover}
      </IconButton>
    )
    return (
      <div className="container">
        <AppBar
          title="Note Pila!"
          iconElementLeft={leftMenuButton}
          className='titleBar'
        />
        <div className="row">
          <div className="col-12">
            <form className="searchForm" onSubmit={this.search.bind(this)}>
              <TextField
                hintText=""
                floatingLabelText="Search"
                name="search"
                id="search"
                ref={(input) => this.input = input}
              />
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-2 folders">
            <Paper style={foldersStyle} zDepth={1}>
              <Folders folders={this.props.folders} activeFolder={this.props.activeFolder} />
            </Paper>
          </div>
          <div className="col-4 notes-wrapper">
              <Notes folderId={this.props.activeFolder ? this.props.activeFolder._id : 'main'} />
          </div>
          <div className="col-6">
            <Paper style={noteStyle} zDepth={4} className="note-wrapper">
              <Note
                note={this.props.activeNote !== undefined ? this.props.activeNote : null}
                folderId={this.props.activeFolder !== undefined ? this.props.activeFolder._id : 'main'}
              />
            </Paper>
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
