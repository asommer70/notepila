import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFolder, updateFolder, deleteFolder } from '../actions/folder_actions';

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editFolder: false,
      editFolderName: ''
    }
  }

  editFolder(e) {
    e.preventDefault();
    if (this.props.folder._id != 'main') {
      this.setState({editFolder: !this.state.editFolder, editFolderName: this.props.folder.name});
    }
  }

  updateFolder(e) {
    e.preventDefault();
    this.props.updateFolder(this.props.folder, this.state.editFolderName);
    this.setState({editFolder: false, editFolderName: ''});
    this.props.selectFolder(this.props.folder._id);
  }

  deleteFolder(e) {
    e.preventDefault();
    this.props.deleteFolder(this.props.folder);
    this.setState({editFolder: false, editFolderName: ''});

    // Select the Main folder.
    this.props.selectFolder('main');
  }

  render() {
    if (!this.props.folder) {
      return <div>No folder selected...</div>;
    }

    let folderForm = (
      <form onSubmit={this.updateFolder.bind(this)} className="new-folder">
        <input type="text"
               name="folder_name"
               onChange={(e) => {this.setState({editFolderName: e.target.value})} }
               value={this.state.editFolderName} />

             <span onClick={this.deleteFolder.bind(this)}>Delete Folder</span>
      </form>);

    let folderName = (
      <div onDoubleClick={this.editFolder.bind(this)}>
        {this.props.folder.name}
      </div>
    )

    return (
      <div>
        Selected Folder: &nbsp;

        {this.state.editFolder ? folderForm : folderName}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectFolder,
    updateFolder,
    deleteFolder
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Folder);