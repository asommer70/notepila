import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFolder, updateFolder, deleteFolder } from '../actions/folder_actions';
import Icon from '../components/icon';

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editFolder: false,
      editFolderName: ''
    }
  }

  editFolder(folder, e) {
    e.preventDefault();

    console.log('editFolder e:', e, 'folder:', folder);
    if (this.props.folder._id != 'main' || this.props.folder.id != 'main') {
      this.setState({editFolder: !this.state.editFolder, editFolderName: (this.props.folder.doc ? this.props.folder.doc.name : this.props.folder.name)});
    }
  }

  updateFolder(e) {
    e.preventDefault();
    let folder;
    if (this.props.folder.doc) {
      folder = this.props.folder.doc;
    } else {
      folder = this.props.folder;
    }
    this.props.updateFolder(folder, this.state.editFolderName);
    this.setState({editFolder: false, editFolderName: ''});

    this.props.selectFolder(folder._id);
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
      return;
    }

    let folderForm = (
      <form onSubmit={this.updateFolder.bind(this)} className="new-folder">
        <input
          type="text"
          className="folderName"
          name="folder_name"
          onChange={(e) => {this.setState({editFolderName: e.target.value})} }
          value={this.state.editFolderName}
        />

        <div className="btn btn-inline" onClick={ () => this.setState({editFolder: false, editFolderName: ''}) }><span>CANCEL</span></div>
        &nbsp;&nbsp;
        <div className="btn btn-inline btn-small btn-danger" onClick={this.deleteFolder.bind(this)}><Icon name={'x'} /></div>
        <br/><br/>
      </form>);

    let folderName = (
      <span onDoubleClick={this.editFolder.bind(this, this.props.folder)}>
        {this.props.folder.doc ? this.props.folder.doc.name : this.props.folder.name}
      </span>
    )

    return (
      <div className="folder">
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
