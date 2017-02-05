import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Folders from './folders';
import Notes from './notes';
import Note from './note';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ul className="menu">
              <li><h5>Note Pila!</h5></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <Folders />
          </div>
          <div className="col-4">
            <Notes folderId={this.props.folders.active ? this.props.folders.active._id : 'main'} />
          </div>
          <div className="col-6">
            <Note

              folderId={this.props.folders.active ? this.props.folders.active._id : 'main'}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    folders: state.folders,
    notes: state.notes
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//   }, dispatch);
// }

export default connect(mapStateToProps)(App);
