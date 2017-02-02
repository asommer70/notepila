import { combineReducers } from 'redux';

import FolderReducer from './folder_reducer';
import NoteReducer from './note_reducer';

// List of Folders
// Current Folder
// List of Notes in Folder
// Current Note

const rootReducer = combineReducers({
  folders: FolderReducer,
  notes: NoteReducer
});

export default rootReducer;
