import React, { Component } from 'react';
import { connect } from 'react-redux';

class Folder extends Component {
  render() {
    if (!this.props.folder) {
      return <div>No folder selected...</div>;
    }

    return (
      <div>
        Selected Folder: &nbsp;
        <span>{this.props.folder.name}</span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    folder: state.activeFolder
  }
}

export default connect(mapStateToProps)(Folder);
