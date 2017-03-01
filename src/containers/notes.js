import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import TextTruncate from 'react-text-truncate';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import FileFolder from 'material-ui/svg-icons/file/folder';
import InsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import AvNote from 'material-ui/svg-icons/av/note';

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
        <Paper>
          <Subheader>Notes</Subheader>
        </Paper>
        <div className="container">
          <div className="row">
            {
              this.props.notes.map((note) => {
                let noteIcon, divider, noteClass, paperBorder;
                if (this.props.active) {
                  if (this.props.active.doc._id == note.doc._id) {
                    // noteIcon = 'activeNote';
                    noteIcon = <AvNote />;
                    divider = <Divider />;
                    noteClass = 'note-active';
                    paperBorder = '1px solid #424242';
                  } else {
                    // noteIcon = 'note';
                    noteIcon = <InsertDriveFile />;
                    noteClass = 'note';
                  }
                } else {
                  // noteIcon = 'note';
                  noteIcon = <InsertDriveFile />;
                  noteClass = 'note';
                }

                const style = {
                  width: 160,
                  height: 170,
                  margin: 10,
                  padding: 10,
                  textAlign: 'center',
                  display: 'inline-block',
                  border: paperBorder,
                  cursor: 'pointer',
                  position: 'relative'
                };

                return (
                  <div key={note.id} className="col-6 notes" onClick={() => this.props.selectNote(note)}>
                    <Paper style={style} zDepth={2} >
                      <div className='note'>
                        <div className="noteTitle">
                          <TextTruncate
                            line={1}
                            truncateText="…"
                            text={note.doc.title}
                          />
                          <Divider/>
                        </div>

                        <div className="noteBody">
                          <TextTruncate
                            line={3}
                            truncateText="…"
                            text={note.doc.body.blocks[0].text}
                          />
                        </div>
                      </div>
                      <Chip style={{position: 'absolute', bottom: 10}} labelStyle={{fontSize: '10px', padding: '0 10px'}}>
                        {moment.unix(note.doc.createdAt).format('MM-DD-YYYY')}
                      </Chip>
                    </Paper>
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
