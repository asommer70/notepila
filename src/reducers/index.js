import { combineReducers } from 'redux';

import FoldersReducer from './folder_reducer';
// import ActiveFolderReducer from './active_folder_reducer';

// List of Folders
// Current Folder
// List of Notes in Folder
// Current Note

const rootReducer = combineReducers({
  folders: FoldersReducer,
});

export default rootReducer;
