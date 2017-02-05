import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { listNotes, selectNote } from '../actions/note_actions';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.props.listNotes(this.props.folderId);
  }

  submitNewNote(e) {
    e.preventDefault();
  }

  render() {
    if (!this.props.notes) {
      return <p>No notes, yet...</p>;
    }

    return (
      <div>
        <h2>Notes</h2>
        <ul>
          {
            this.props.notes.map((note) => {
              return (
                <li key={note.id}>
                  <div onClick={() => this.props.selectNote(note)}>
                    {note.doc.title}
                  </div>
                </li>
              );
            })
          }
        </ul>
        <p>{this.props.folder ? this.props.folder.name : ''}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('Notes mapStateToProps state:', state);
  return { notes: state.notes.docs, active: state.notes.active };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    listNotes,
    selectNote
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
