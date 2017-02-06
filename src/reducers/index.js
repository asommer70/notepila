import { combineReducers } from 'redux';

import AppReducer from './app_reducer';
// import FolderReducer from './folder_reducer';
// import NoteReducer from './note_reducer';


// List of Folders
// Current Folder
// List of Notes in Folder
// Current Note

// const AppReducer = (state = {}, action) => {
//   // switch (action.type) {
//   //   case LIST_FOLDERS:
//   //     console.log('LIST_FOLDERS state:', state, 'action:', action);
//   //     return {...state, folders: action.payload};
//   //   default:
//   //     return state;
//   // }
//   return state;
// }

const rootReducer = combineReducers({
  app: AppReducer,
  // folders: FolderReducer,
  // notes: NoteReducer
});

export default rootReducer;
