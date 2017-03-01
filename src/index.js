import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import PouchDB from 'pouchdb';
import thunk from 'redux-thunk';

import './css/simple-grid.css';
import './css/main.css';
import './css/fonts.css';
// import './css/draft-default.css';
import './css/rich-editor.css';
import './css/media-queries.css';

import reducers from './reducers';
import Folders from './containers/folders';
import Notes from './containers/notes';
import App from './containers/app';
import Material from './components/material';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
                  <Material />
                </Provider>, document.getElementById('app'));
