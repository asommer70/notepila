import { combineReducers } from 'redux';

import ListFoldersReducer from './list_folders_reducer';
import ActiveFolderReducer from './active_folder_reducer';

// List of Folders
// Current Folder
// List of Notes in Folder
// Current Note

const rootReducer = combineReducers({
  folders: ListFoldersReducer,
  activeFolder: ActiveFolderReducer,
});

export default rootReducer;
