import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveNote, getActiveNote } from '../actions/note_actions';
import { selectFolder } from '../actions/folder_actions';

class Note extends Component {
  constructor(props) {
    super(props);

    // console.log('Note props:', props);

    if (props.note) {
      this.state = {
        _id: props.note.doc._id,
        _rev: props.note.doc._rev,
        body: props.note.doc.body,
        title: props.note.doc.title,
        folder: props.note.doc.folder,
        type: props.note.doc.type,
        createdAt: props.note.doc.createdAt,
        updatedAt: props.note.doc.updatedAt
      };
    } else {
      this.state = {
        title: '',
        body: '',
      }
    }

    // if (!this.props.noteId) {
      // const note = props.getActiveNote();
      // this.state = {
      //   note: note
      // }
    // }

    // this.props.selectFolder(this.props.folderId);
    // console.log('Note props:', props, 'this.state:', this.state);
  }

  // componentDidUpdate() {
  //   if (this.props.note) {
  //     this.setState({
  //       _id: this.props.note.doc._id,
  //       _rev: this.props.note.doc._rev,
  //       body: this.props.note.doc.body,
  //       title: this.props.note.doc.title,
  //       folder: this.props.note.doc.folder,
  //       type: this.props.note.doc.type,
  //       createdAt: this.props.note.doc.createdAt,
  //       updatedAt: this.props.note.doc.updatedAt
  //     });
  //   }
  // }

  saveNote(e) {
    e.preventDefault();
    const note = this.state;
    note.folder = this.props.folder._id;
    console.log('Saving note... note:', note);
    this.props.saveNote(note);
  }

  render() {
    // console.log('this.state.title:', this.state.title, 'this.props.note:', this.props.note);


    if (!this.props.note) {
      return <p>No note selected, yet...</p>
    }

    return (
      <div>
        <h2>Note</h2>
          <p>{this.props.note ? this.props.note.doc.title : ''}</p>
          <p>{this.props.note ? this.props.note.doc.body : ''}</p>

          <form>
            <input type="text" name="note_title" placeholder="Title" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
            <br/><br/>
            <input type="text" name="note_body" placeholder="Write something..." value={this.state.body} onChange={(e) => this.setState({body: e.target.value})} />
            <br/><br/>
            <button onClick={this.saveNote.bind(this)}>Save</button>
          </form>
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
