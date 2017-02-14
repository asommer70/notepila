import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw } from 'draft-js';

import { saveNote, deleteNote } from '../actions/note_actions';
import Icon from '../components/icon';
import StyleButton from '../components/style_button';
import EditorControl from '../components/editor_control';

class Edity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      title: '',
      titleError: false
    }

    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
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

  toggleBlockType(blockType) {
  this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
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
    this.setState({title: e.target.value, titleError: false});
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


    // Don't save a note without a title.
    let titleError;
    if (note.title == '' || note.title == undefined) {
      this.setState({titleError: !this.state.titleError});
    } else {
      titleError = undefined;
      note.folder = this.props.folder ? this.props.folder._id : 'main';
      note.body = convertToRaw(this.state.editorState.getCurrentContent());
      this.props.saveNote(note);
    }
  }

  render() {
    let addNote;
    if (this.props.addNote) {
      addNote = (
        <div>
          <input type="text" className="title" name="title" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
          {this.state.titleError ? <div className="danger">Please add a title.</div> : ''}
          <br/><br/>
        </div>
      );
    }

    const HEADERS = [
      {label: 'H1', style: 'header-one'},
      {label: 'H2', style: 'header-two'},
      {label: 'H3', style: 'header-three'},
      {label: 'H4', style: 'header-four'},
      {label: 'H5', style: 'header-five'},
      {label: 'H6', style: 'header-six'},
    ]

    const BLOCK_TYPES = [
      {label: 'quote', style: 'blockquote'},
      {label: 'code', style: 'code-block'},
    ];

    const LIST_TYPES = [
      {label: 'ordered-list', style: 'ordered-list-item'},
      {label: 'unordered-list', style: 'unordered-list-item'},
    ]

    var INLINE_STYLES = [
      {label: 'bold', style: 'BOLD'},
      {label: 'italic', style: 'ITALIC'},
      {label: 'underline', style: 'UNDERLINE'},
    ];

    return (
      <div className="editor">
        {addNote}

        <EditorControl type={'inline'} editorState={this.state.editorState} onToggle={this.toggleInlineStyle} actions={INLINE_STYLES} />
        <EditorControl type={'block'} editorState={this.state.editorState} onToggle={this.toggleBlockType} actions={LIST_TYPES} />
        <EditorControl type={'block'} editorState={this.state.editorState} onToggle={this.toggleBlockType} actions={BLOCK_TYPES} />
        <EditorControl type={'header'} editorState={this.state.editorState} onToggle={this.toggleBlockType} actions={HEADERS} />
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          onBlur={this.saveEdit.bind(this)}
        />
        <br/>

        <div className="btn btn-inline check" onClick={this.saveEdit.bind(this)}><Icon name={'check'} /></div>

        &nbsp;&nbsp;&nbsp;&nbsp;

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
