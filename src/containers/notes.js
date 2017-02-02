import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { listNotes } from '../actions/note_actions';

class Notes extends Component {
  constructor(props) {
    super(props);

    console.log('Notes props:', props);

    this.state = {
      notes: {}
    }

  }

  render() {
    return (
      <div>
        <h2>Notes</h2>
        <p>I think it's working...</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { notes: state.notes.docs, active: state.notes.active };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    listNotes: listNotes,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
