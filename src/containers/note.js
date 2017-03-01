import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import SyncIcon from 'material-ui/svg-icons/notification/sync';


import { selectNote, saveNote, deleteNote } from '../actions/note_actions';
import { updateSettings, syncDatabase } from '../actions/index';
import Edity from './edity';
import Icon from '../components/icon';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doc: {_id: null, title: '', body: ''},
      addNote: false
    }
  }

  handleNoteChange(e) {
    e.preventDefault();
    const doc = this.state.doc;
    doc[e.target.name] = e.target.value;
    this.setState({doc: doc});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.note) {
      this.setState({doc: nextProps.note.doc, addNote: false});
    } else {
      this.setState({addNote: false});
    }
  }

  editTitle(e) {
    e.preventDefault();
    const note = this.state.doc;
    note.title = e.target.value;
    this.setState({doc: note});
  }

  sync(e) {
    e.preventDefault();
    if (this.props.settings.syncUrl != '') {
      this.props.syncDatabase(this.props.settings);
    }
  }

  render() {
    const noteForm = (
      <div>
        <Edity note={this.state.doc} addNote={this.state.addNote} folder={this.props.folder} />
      </div>
    )

    let titleField;
    if (this.props.note) {
      titleField = <TextField
                     hintText=""
                     floatingLabelText="Title"
                     name="title"
                     fullWidth={true}
                     style={{fontSize: 24}}
                     value={this.state.doc.title}
                     onChange={this.editTitle.bind(this)}
                   />
    }

    let syncDate;
    if (this.props.settings) {
      syncDate = (this.props.settings.syncDate ? this.props.settings.syncDate : 'Never');
    } else {
      syncDate = 'Never';
    }

    return (
      <div>

        <Toolbar>
         <ToolbarGroup firstChild={true}>
           <IconButton onClick={() => this.setState({addNote: !this.state.addNote})}>
             <ActionNoteAdd />
           </IconButton>

           <IconButton onClick={this.sync.bind(this)}>
             <SyncIcon />
           </IconButton>
         </ToolbarGroup>
         <ToolbarGroup>
           <div className="sync-date">Last synced: <strong>{moment.unix(syncDate).fromNow()}</strong></div>
         </ToolbarGroup>
       </Toolbar>

        <h3>
          {this.props.note && !this.state.addNote ? titleField : ''}
        </h3>
        {this.props.note || this.state.addNote ? noteForm : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { note: state.app.activeNote, folder: state.app.activeFolder, settings: state.app.settings };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveNote: saveNote,
    deleteNote: deleteNote,
    selectNote: selectNote,
    syncDatabase: syncDatabase
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
