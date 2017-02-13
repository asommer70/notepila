import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw } from 'draft-js';

import { saveNote, deleteNote } from '../actions/note_actions';
import Icon from '../components/icon';
import StyleButton from '../components/style_button';

class Edity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      title: ''
    }

    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  componentWillMount() {
    if (this.props.note) {
      const content = convertFromRaw(this.props.note.doc.body);
      this.setState({editorState: EditorState.createWithContent(content)});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.note) {
      if (nextProps.addNote) {
        this.setState({editorState: EditorState.createEmpty()});
      } else {
        const content = convertFromRaw(nextProps.note.doc.body);
        this.setState({editorState: EditorState.createWithContent(content)});
      }
    }
  }

  handleTitleChange(e) {
    e.preventDefault();
    this.setState({title: e.target.value});
  }

  saveEdit(e) {
    e.preventDefault();

    let note;
    if (this.props.note && !this.props.addNote) {
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
          <input type="text" className="title" name="title" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
          <br/><br/>
        </div>
      );
    }

    var INLINE_STYLES = [
      {label: 'Bold', style: 'BOLD'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'},
      {label: 'Monospace', style: 'CODE'},
    ];

    const InlineStyleControls = (props) => {
      var currentStyle = props.editorState.getCurrentInlineStyle();
      return (
        <div className="RichEditor-controls">
          {INLINE_STYLES.map(type =>
            <StyleButton
              key={type.label}
              active={currentStyle.has(type.style)}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          )}
        </div>
      );
    };

    return (
      <div>
        {addNote}

        {InlineStyleControls({ editorState: this.state.editorState, onToggle: () => {console.log('onToggle... this.style:', this.style)} })}
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
        />
        <br/>
        <div className="btn btn-inline check" onClick={this.saveEdit.bind(this)}><Icon name={'check'} /></div> &nbsp;&nbsp;&nbsp;&nbsp;
          {this.props.note && !this.props.addNote
            ? <div className="btn btn-inline btn-small btn-danger" onClick={() => this.props.deleteNote(this.props.note.doc)}><Icon name={'x'} /></div>
            : ''}
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
