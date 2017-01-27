import React, { Component } from 'react';

export default class Folders extends Component {
  constructor() {
    super();

    this.state = {
      folders: {}
    }

    // Get notes from PouchDB.
    console.log('Getting data... about folders!');
  }

  render() {
    return (
      <div>
        <h2>Folders</h2>
      </div>
    )
  }
}
