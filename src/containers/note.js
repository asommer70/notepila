import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { saveNote } from '../actions/note_actions';

class Note extends Component {
  constructor(props) {
    super(props);

    console.log('Note props:', props);

    if (props.note) {
      this.state = {
        _id: props.note.doc._id,
        _rev: props.note.doc._rev,
        body: props.note.doc.body,
        title: props.note.doc.title,
        createdAt: props.note.doc.createdAt,
        updatedAt: props.note.doc.updatedAt
      };
    } else {
      this.state = {
        title: '',
        body: '',
        folderId: this.props.folderId
      }
    }
  }

  saveNote(e) {
    e.preventDefault();
    console.log('Saving note... this.state:', this.state);
    this.props.saveNote(this.state);
  }

  render() {
    // console.log('Note this.props:', this.props, 'this.state:', this.state);
    // console.log('this.state.title:', this.state.title, 'this.props.note:', this.props.note);

    return (
      <div>
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
  console.log('Note mapStateToProps state:', state);
  return { note: state.notes.active };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveNote: saveNote
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
