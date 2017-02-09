import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectNote, saveNote, deleteNote } from '../actions/note_actions';
import Edity from './edity';
import Icon from '../components/icon';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doc: {_id: null, title: '', body: ''},
      addNote: false
    }
  }

  handleNoteChange(e) {
    e.preventDefault();
    const doc = this.state.doc;
    doc[e.target.name] = e.target.value;
    this.setState({doc: doc});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.note) {
      this.setState({doc: nextProps.note.doc, addNote: false});
    } else {
      this.setState({addNote: false});
    }
  }

  editTitle(e) {
    e.preventDefault();
    const note = this.state.doc;
    note.title = e.target.value;
    this.setState({doc: note});
  }

  render() {
    const noteForm = (
      <div>
        <Edity note={this.state.doc} addNote={this.state.addNote} folder={this.props.folder} />
      </div>
    )

    let titleField;
    if (this.props.note) {
      titleField = <input type="text" name="title"
        value={this.state.doc.title}
        onChange={this.editTitle.bind(this)} />;
    }

    return (
      <div>
        <div onClick={() => this.setState({addNote: !this.state.addNote})} className="btn btn-inline btn-primary">
          <Icon name={'plus'} />
          <br/>
        </div>

        <h3>
          {this.props.note && !this.state.addNote ? titleField : ''}
        </h3>
        {this.props.note || this.state.addNote ? noteForm : ''}
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
