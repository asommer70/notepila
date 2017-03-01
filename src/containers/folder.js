import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectFolder, updateFolder, deleteFolder } from '../actions/folder_actions';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';

import Icon from '../components/icon';

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editFolder: false,
      editFolderName: ''
    }
  }

  editFolder(self, e, folder) {
    e.preventDefault();

    if (self.props.folder.doc._id !== 'main' && self.props.folder.id !=='main') {
      self.setState({
        editFolder: true,
        anchorEl: e.currentTarget,
        editFolderName: self.props.folder.doc.name
      });
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

    const folderFormStyle = {
      width: 300,
      paddingBottom: 0,
      paddingLeft: 20,
      display: 'inline-block',
    };

    let folderForm = (
      <Paper style={folderFormStyle} zDepth={5}>
        <form onSubmit={this.updateFolder.bind(this)} className="new-folder">
          <TextField
            hintText=""
            floatingLabelText="Folder Name"
            name="folder_name"
            value={this.state.editFolderName}
            onChange={(e) => {this.setState({editFolderName: e.target.value})} }
          />

          <IconButton onClick={this.updateFolder.bind(this)}><ActionDone /></IconButton>

          &nbsp;&nbsp;&nbsp;&nbsp;
          <IconButton onClick={this.deleteFolder.bind(this)}><ActionDelete /></IconButton>
          <br/><br/>
        </form>
      </Paper>
    );

    let folderName = (
      <span onDoubleClick={this.editFolder.bind(this, this.props.folder)}>
        {this.props.folder.doc ? this.props.folder.doc.name : this.props.folder.name}
      </span>
    );

    const editFolderPopover = (
      <Popover
        open={this.state.editFolder}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={() => this.setState({editFolder: false})}
      >
        {folderForm}
      </Popover>
    );

    return (
      <ListItem
        leftAvatar={<Avatar icon={this.props.folderIcon} />}
        primaryText={this.props.folder.doc.name}
        secondaryText=""
        onClick={() => {this.props.selectFolder(this.props.folder); }}
        onDoubleClick={this.editFolder.bind(this.props.folder, this)}
      >
        {editFolderPopover}
      </ListItem>
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
