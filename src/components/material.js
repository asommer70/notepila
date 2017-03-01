import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from '../containers/app';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);
