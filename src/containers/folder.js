import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editFolder, selectFolder } from '../actions';

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editFolder: false,
      editFolderName: ''
    }
  }

  updateFolder(e) {
    e.preventDefault();

    // Call an Action method to set an editActiveFolder property on the application state and display a form under the Selected Folder.
    this.props.editFolder(this.props.folder, this.state.editFolderName);
    this.setState({editFolder: false, editFolderName: ''});
    this.props.selectFolder(this.props.folder._id);
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
      </form>);

    let folderName = (
      <div onDoubleClick={() => this.setState({editFolder: !this.state.editFolder, editFolderName: this.props.folder.name})}>
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

function mapStateToProps(state) {
  return {
    folder: state.activeFolder,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    editFolder: editFolder,
    selectFolder: selectFolder,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Folder);
