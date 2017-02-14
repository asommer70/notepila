import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { listNotes, selectNote } from '../actions/note_actions';
import Icon from '../components/icon';

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
        <div className="container">
          <div className="row">
            {
              this.props.notes.map((note) => {
                let noteIcon;
                if (this.props.active) {
                  if (this.props.active.doc._id == note.doc._id) {
                    noteIcon = 'activeNote';
                  } else {
                    noteIcon = 'note';
                  }
                } else {
                  noteIcon = 'note';
                }

                return (
                  <div key={note.id} className="col-6 notes">
                    <div className="note" onClick={() => this.props.selectNote(note)}>
                      <Icon name={noteIcon} className=""/>
                      <div className="noteTitle">
                        {note.doc.title}
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
        <p>{this.props.folder ? this.props.folder.name : ''}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { notes: state.app.notes, active: state.app.activeNote };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    listNotes,
    selectNote
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
