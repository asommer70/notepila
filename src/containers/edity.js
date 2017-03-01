import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import moment from 'moment';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import TextFieldUnderline from 'material-ui/TextField/TextFieldUnderline';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FormatBold from 'material-ui/svg-icons/editor/format-bold';
import FormatItalic from 'material-ui/svg-icons/editor/format-italic';
import FormatUnderlined from 'material-ui/svg-icons/editor/format-underlined';
import FormatQuote from 'material-ui/svg-icons/editor/format-quote';
import ActionCode from 'material-ui/svg-icons/action/code';
import FormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted';
import FormatListNumbered from 'material-ui/svg-icons/editor/format-list-numbered';
import FormatIndentDecrease from 'material-ui/svg-icons/editor/format-indent-decrease';
import FormatIndentIncrease from 'material-ui/svg-icons/editor/format-indent-increase';
import FormatSize from 'material-ui/svg-icons/editor/format-size';

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
      titleError: false,
      isFoucsed: false
    }

    // this.onChange = (editorState, control) => {
    //   this.setState({editorState}, () => {
    //     if (control) {
    //       this.focus();
    //     }
    //   });
    // }
    this.focus = () => this.refs.editor.focus();

    this.onChange = (editorState) => this.setState({editorState});


    // this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    // this.onTab = (event) => this.onTab(event);
    this.onTab = (e) => this._onTab(e);
    // this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    // this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    // this.toggleTab = this.toggleTab.bind(this);
    // this.focus = () => {
    //   this.refs.editor.focus();
    // }
  }

  // handleKeyCommand(command) {
  //   const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
  //   if (newState) {
  //     this.onChange(newState, true);
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // }
  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }


  // _onTab(e) {
  //   // e.preventDefault();
  //   console.log('_onTab e:', e);
  //   console.log('tabbing this.state.editorState:', this.state.editorState);
  //   const maxDepth = 4;
  //   // this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth), true);
  //   this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  // }
  _onTab(e) {
    const maxDepth = 4;
    const {editorState} = this.state;
    console.log('_onTab e:', e);
    this.onChange(RichUtils.onTab(e, editorState, maxDepth));
  }

  // toggleInlineStyle(inlineStyle) {
  //   this.onChange( RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle), true );
  // }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  // toggleBlockType(blockType) {
  //   this.onChange( RichUtils.toggleBlockType(this.state.editorState, blockType), true );
  // }
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  // toggleTab(event, self, three) {
  //   console.log('event:', event, 'self:', self, 'three:', three);
  //   this.onChange( RichUtils.onTab(event, this.state.editorState, 5), true );
  // }

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

          {this.state.titleError ?
            <TextField
              hintText=""
              floatingLabelText="Title"
              name="title"
              value={this.state.title}
              fullWidth={true}
              ref='title'
              errorText='Please add a title.'
              onChange={this.handleTitleChange.bind(this)}
            />
           :
            <TextField
              hintText=""
              floatingLabelText="Title"
              name="title"
              value={this.state.title}
              fullWidth={true}
              ref='title'
              onChange={this.handleTitleChange.bind(this)}
            />
          }
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
      {label: 'quote', style: 'blockquote', button: <FormatQuote />},
      {label: 'code', style: 'code-block', button: <ActionCode />},
    ];

    const DENTS = [
      {label: 'indent', style: 'indent', button: <FormatIndentIncrease />},
      {label: 'outdent', style: 'outdent', button: <FormatIndentDecrease />},
    ]

    const LIST_TYPES = [
      {label: 'ordered-list', style: 'ordered-list-item', button: <FormatListNumbered />},
      {label: 'unordered-list', style: 'unordered-list-item', button: <FormatListBulleted />},
    ]

    var INLINE_STYLES = [
      {label: 'bold', style: 'BOLD', button: <FormatBold />},
      {label: 'italic', style: 'ITALIC', button: <FormatItalic />},
      {label: 'underline', style: 'UNDERLINE', button: <FormatUnderlined />},
    ];

    let lastSaved;
    if (this.props.note) {
      lastSaved = <div className="sync-date">Last saved: <strong>{moment.unix(this.props.note.doc.updatedAt).fromNow()}</strong></div>;
    } else {
      lastSaved = '';
    }

    // <EditorControl type={'dents'} editorState={this.state.editorState} onToggle={this.toggleTab.bind(this, event)} actions={DENTS} />

    // <EditorControl type={'inline'} editorState={this.state.editorState} onToggle={this.toggleInlineStyle} actions={INLINE_STYLES} />
    // <EditorControl type={'header'} editorState={this.state.editorState} onToggle={this.toggleBlockType} actions={HEADERS} />
    // <EditorControl type={'block'} editorState={this.state.editorState} onToggle={this.toggleBlockType} actions={LIST_TYPES} />
    // <EditorControl type={'block'} editorState={this.state.editorState} onToggle={this.toggleBlockType} actions={BLOCK_TYPES} />

    const currentStyle = this.state.editorState.getCurrentInlineStyle();
    const selection = this.state.editorState.getSelection();
    const blockType = this.state.editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

      // <Editor
      //   editorState={this.state.editorState}
      //   onChange={this.onChange}
      //   handleKeyCommand={this.handleKeyCommand}
      //   onTab={this.onTab}
      //   ref="editor"
      //   onBlur={this.saveEdit.bind(this)}
      // />

    return (
      <div className="editor">
        {addNote}

        <Divider />
          <StyleButton
            key={'ordered-list'}
            active={currentStyle.has('ordered-list-item') ? currentStyle.has('ordered-list-item') : 'ordered-list-item' === blockType}
            label={'ordered-list'}
            onToggle={this.toggleBlockType}
            style={'ordered-list-item'}
            button={<FormatListNumbered />}
          />
        <Divider />

        <br/><br/>

        <div onClick={this.focus} onFocus={() => this.setState({isFocused: true})} onBlur={() => this.setState({isFocused: false})}>

          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            ref="editor"
          />

          <TextFieldUnderline
            disabled={false}
            focus={this.state.isFocused}
            focusStyle={{position: 'static', bottom: 'inherit'}}
            style={{position: 'static', bottom: 'inherit'}}
            muiTheme={getMuiTheme(lightBaseTheme)}
          />
        </div>
        <br/>

        <IconButton onClick={this.saveEdit.bind(this)}>
          <ActionDone />
        </IconButton>

        &nbsp;&nbsp;&nbsp;&nbsp;

        {this.props.note && !this.props.addNote
          ? <IconButton onClick={() => this.props.deleteNote(this.props.note.doc)}>
              <ActionDelete color={'#da4f49'} />
            </IconButton>
          : ''}

          &nbsp;&nbsp;&nbsp;&nbsp;
          {lastSaved}
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
