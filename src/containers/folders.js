import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import CreateNewFolder from 'material-ui/svg-icons/file/create-new-folder';


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

  handleNewFolder = (event) => {
    event.preventDefault();

    this.setState({
      showNewFolder: true,
      anchorEl: event.currentTarget,
    });
  };

  render() {
    if (!this.props.folders) {
      return <p>No folders in the database...</p>;
    }

    // If the database is clean there won't be any folders to map so refresh to pickup the new Main folder.
    if (this.props.folders.type !== undefined) {
      window.location.reload();
    }

    const newFolderFormStyle = {
      width: 300,
      padding: 20,
      display: 'inline-block',
    };

    let newFolder = (
      <Paper style={newFolderFormStyle} zDepth={5}>
        <form onSubmit={this.submitNewFolder.bind(this)} className="new-folder">
          <TextField
            hintText=""
            floatingLabelText="New Folder Name"
            name="folder_name"
            value={this.state.newFolder ? this.state.newFolder : ''}
            onChange={(e) => {this.setState({newFolder: e.target.value})} }
          />
        </form>
      </Paper>
    );

    const newFolderPopover = (
      <Popover
        open={this.state.showNewFolder}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={() => this.setState({showNewFolder: false})}
      >
        {newFolder}
      </Popover>
    )

    return (
      <List>
        <Subheader>Folders</Subheader>

          <IconButton onClick={this.handleNewFolder} >
            <CreateNewFolder />
            {newFolderPopover}
          </IconButton>
          <Divider />
          <br/>

          {
            this.props.folders.map((folder, idx) => {
              let folderIcon;
              if (this.props.activeFolder) {
                if (folder.doc._id == this.props.activeFolder._id) {
                  folderIcon = <FileFolderOpen />;
                } else {
                  folderIcon = <FileFolder />;
                }
              } else {
                folderIcon = <FileFolder />;
              }

              return (
                <Folder key={folder.doc._id} folderIcon={folderIcon} folder={folder} selectFolder={this.props.selectFolder}/>
              )
            })
          }
      </List>
    )
  }
}

const mapStateToProps = (state) => {
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
