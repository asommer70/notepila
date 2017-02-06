import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveNote, getActiveNote } from '../actions/note_actions';
import { selectFolder } from '../actions/folder_actions';

class Note extends Component {
  constructor(props) {
    super(props);

    // console.log('Note props:', props);

    // if (props.note) {
    //   this.state = {
    //     _id: props.note.doc._id,
    //     _rev: props.note.doc._rev,
    //     body: props.note.doc.body,
    //     title: props.note.doc.title,
    //     folder: props.note.doc.folder,
    //     type: props.note.doc.type,
    //     createdAt: props.note.doc.createdAt,
    //     updatedAt: props.note.doc.updatedAt
    //   };
    // } else {
    //   this.state = {
    //     title: '',
    //     body: '',
    //     folderId: props.folder
    //   }
    // }
//
    // if (!this.props.noteId) {
      const note = props.getActiveNote();
      this.state = {
        note: note
      }
    // }

    // this.props.selectFolder(this.props.folderId);
    // console.log('Note props:', props, 'this.state:', this.state);
  }

  saveNote(e) {
    e.preventDefault();
    // console.log('Saving note... this.state:', this.state);
    // this.props.saveNote(this.state);
  }

  render() {
    // console.log('this.state.title:', this.state.title, 'this.props.note:', this.props.note);

    // <form>
    //   <input type="text" name="note_title" placeholder="Title" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
    //   <br/><br/>
    //   <input type="text" name="note_body" placeholder="Write something..." value={this.state.body} onChange={(e) => this.setState({body: e.target.value})} />
    //   <br/><br/>
    //   <button onClick={this.saveNote.bind(this)}>Save</button>
    // </form>

    return (
      <div>
        <h2>Note</h2>
        <p>{this.state.note ? this.state.note.title : ''}</p>
        <p>{this.state.note ? this.state.note.body : ''}</p>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   console.log('Note mapStateToProps state:', state);
//   return { note: state.notes.active, folder: state.folders.active };
// }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveNote: saveNote,
    getActiveNote: getActiveNote
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Note);
