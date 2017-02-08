import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw } from 'draft-js';

import { saveNote, deleteNote } from '../actions/note_actions';

class Edity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    }

    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.saveNote = this.props.saveNote.bind(this);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  componentDidMount() {
    const content = convertFromRaw(this.props.note.doc.body);
    this.setState({editorState: EditorState.createWithContent(content)});
  }

  componentWillReceiveProps(nextProps) {
    const content = convertFromRaw(this.props.note.doc.body);
    this.setState({editorState: EditorState.createWithContent(content)});
  }

  saveEdit(e) {
    e.preventDefault();

    console.log('Edity saveNote this.state.editorState.getCurrentContent():', convertToRaw(this.state.editorState.getCurrentContent()));
    const note = this.props.note.doc;
    note.body = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.saveNote(note);
  }

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
        />
      
        <span onClick={this.saveEdit.bind(this)}>Save</span> &nbsp;&nbsp;&nbsp;&nbsp;
        <span onClick={() => this.props.deleteNote(this.props.note.doc)}>Delete</span>
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
