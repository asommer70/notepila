import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw } from 'draft-js';

import { saveNote, deleteNote } from '../actions/note_actions';

class Edity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      title: ''
    }

    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    // this.saveNote = this.props.saveNote.bind(this);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  componentWillMount() {
    console.log('this.props.note:', this.props.note);
    if (this.props.note) {
      const content = convertFromRaw(this.props.note.doc.body);
      this.setState({editorState: EditorState.createWithContent(content)});
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps;', nextProps);
    if (this.props.note) {
      const content = convertFromRaw(nextProps.note.doc.body);
      this.setState({editorState: EditorState.createWithContent(content)});
    }
  }

  handleTitleChange(e) {
    e.preventDefault();
    // const doc = this.props.note;
    // doc[e.target.name] = e.target.value;
    this.setState({title: e.target.value});
  }

  saveEdit(e) {
    e.preventDefault();

    let note;
    if (this.props.note) {
      note = this.props.note.doc;
    } else {
      note = {};
    }

    if (this.state.title !== '') {
      note.title = this.state.title;
    }

    note.folder = this.props.folder ? this.props.folder._id : 'main';
    note.body = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.saveNote(note);
  }

  render() {
    let addNote;
    if (this.props.addNote) {
      addNote = (
        <div>
          <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
          <br/><br/>
        </div>
      );
    }

    return (
      <div>
        {addNote}

        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
        />

        <span onClick={this.saveEdit.bind(this)}>Save</span> &nbsp;&nbsp;&nbsp;&nbsp;
        {this.props.note ? <span onClick={() => this.props.deleteNote(this.props.note.doc)}>Delete</span> : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { note: state.app.activeNote, folder: state.app.activeFolder };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveNote: saveNote,
    deleteNote: deleteNote
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Edity);
