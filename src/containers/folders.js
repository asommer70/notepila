import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Folder from './folder';
import { listFolders, selectFolder, addFolder } from '../actions/folder_actions';
import { listNotes } from '../actions/note_actions';
import Icon from '../components/icon';

class Folders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewFolder: false,
      newFolder: ''
    }
  }

  submitNewFolder(e) {
    e.preventDefault();
    this.props.addFolder(this.state.newFolder);
    this.setState({newFolder: '', showNewFolder: false});
  }

  render() {
    if (!this.props.folders) {
      return <p>No folders in the database...</p>;
    }

    // If the database is clean there won't be any folders to map so refresh to pickup the new Main folder.
    if (this.props.folders.type !== undefined) {
      window.location.reload();
    }

    let newFolder = (
      <form onSubmit={this.submitNewFolder.bind(this)} className="new-folder">
        <input type="text"
               name="folder_name"
               placeholder="Folder Name"
               onChange={(e) => {this.setState({newFolder: e.target.value})} }
               value={this.state.newFolder} />
      </form>);

    return (
      <div>
        <h2>Folders</h2>

        <div>
          <div className="btn btn-inline btn-small btn-primary" onClick={ () => {this.setState({showNewFolder: !this.state.showNewFolder})} }>
            <Icon name={'plus'} />
          </div>
          {this.state.showNewFolder ? newFolder : ''}
        </div>

        <Folder folder={this.props.activeFolder} />

        <ul className="folders">
          {
            this.props.folders.map((folder, idx) => {
              return (
                <li key={folder.doc._id} onClick={() => {this.props.selectFolder(folder); }}>
                  <div>
                    {folder.doc.name}
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('Folders mapStateToProps state:', state);
  return {
    folders: state.app.folders,
    activeFolder: state.app.activeFolder,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    listFolders: listFolders,
    selectFolder: selectFolder,
    addFolder: addFolder,
    listNotes: listNotes
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Folders);
// export default Folders;
