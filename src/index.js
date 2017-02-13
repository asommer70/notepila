import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import PouchDB from 'pouchdb';
import thunk from 'redux-thunk';

import './css/simple-grid.css';
import './css/main.css';
import './css/obvious-buttons.css';
import './css/input.css';
import './css/fonts.css';
import './css/rich-editor.css';

import reducers from './reducers';
import Folders from './containers/folders';
import Notes from './containers/notes';
import App from './containers/app';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
                  <App />
                </Provider>, document.getElementById('app'));
