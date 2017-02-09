import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectNote, saveNote, deleteNote } from '../actions/note_actions';
import Edity from './edity';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doc: {_id: null, title: '', body: ''},
      editNote: false,
      addNote: false
    }
  }

  saveNote(e) {
    e.preventDefault();

    // console.log('saveNote e:', e);
    // const note = this.state.doc;
    // if (!note.folder || !this.props.folder) {
    //   if (this.props.folder) {
    //     note.folder = this.props.folder._id;
    //   } else {
    //     note.folder = 'main';
    //   }
    // }
    //
    // this.props.saveNote(note);
    // this.setState({
    //   editNote: false,
    //   addNote: false,
    //   doc: {_id: null, title: '', body: ''}
    // })
  }

  editNote() {
    this.setState({
      editNote: !this.state.editNote,
      doc: this.props.note.doc
    })
  }

  handleNoteChange(e) {
    e.preventDefault();
    const doc = this.state.doc;
    doc[e.target.name] = e.target.value;
    this.setState({doc: doc});
  }

  cancelAction(e) {
    e.preventDefault();

    if (this.state.editNote) {
      this.setState({editNote: false, doc: {_id: null, title: '', body: ''}});
    } else if (this.state.addNote) {
      this.setState({addNote: false});
    }
  }

  deleteNote(e) {
    e.preventDefault();

    console.log('deleteNote this.props.note.doc:', this.props.note.doc);

    this.props.deleteNote(this.props.note.doc);
    this.setState({doc: {_id: null, title: '', body: ''}});
    this.props.selectNote({doc: this.state.doc});
  }

  editBody(e) {
    e.preventDefault();

    return true;
  }

  render() {
    let noteAction;
    if (this.props.note) {
      noteAction = (
        <div>
          <div onClick={() => this.setState({addNote: true})}>
            Add Note
          </div>
          <div onClick={this.editNote.bind(this)}>
            Edit Note
          </div>
          <div onClick={this.deleteNote.bind(this)}>
            Delete Note
          </div>
        </div>
      );
    } else {
      noteAction = (
        <div onClick={() => this.setState({addNote: true})}>
          Add Note
        </div>
      );
    }

    // const noteForm = (
    //   <div>
    //     <span onClick={this.cancelAction.bind(this)}>Cancel</span>
    //     <br/>
    //     <form>
    //       <input type="text" name="title" placeholder="Title" value={this.state.doc.title} onChange={this.handleNoteChange.bind(this)} />
    //       <br/><br/>
    //       <input type="text" name="body" placeholder="Write something..." value={this.state.doc.body} onChange={this.handleNoteChange.bind(this)} />
    //       <br/><br/>
    //       <button onClick={this.saveNote.bind(this)}>Save</button>
    //     </form>
    //   </div>
    // );

    const noteForm = (
      <div>
        <Edity note={this.state.doc} addNote={this.state.addNote} folder={this.props.folder} />
      </div>
    )

    // let body;
    // if (this.props.note) {
    //   this.props.note.doc.body.blocks.map((block) => {
    //     console.log('block:', block);
    //   })
    // }

    // {noteAction}
    // {this.props.note ? this.props.note.doc.body : ''}
    const showNote = (
      <div>
        <p onClick={ () => this.setState({editNote: !this.state.editNote, doc: this.props.note.doc}) }>
        </p>
        <br/>
        <div onClick={this.deleteNote.bind(this)}>
          Delete Note
        </div>
      </div>
    );

    // {this.state.addNote ? noteForm : ''}

    return (
      <div>
        <div onClick={() => this.setState({addNote: !this.state.addNote})}>
          Add Note
          <br/>
        </div>
        {this.state.addNote ? noteForm : ''}

        <h3>{this.props.note ? this.props.note.doc.title : ''}</h3>
        {this.props.note ? noteForm : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('Note mapStateToProps state:', state);
  return { note: state.app.activeNote, folder: state.app.activeFolder };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveNote: saveNote,
    deleteNote: deleteNote,
    selectNote: selectNote,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
