import React, { Component } from 'react';

export default class Notes extends Component {
  constructor() {
    super();

    this.state = {
      notes: {}
    }

    // Get notes from PouchDB.
    console.log('Getting data... and stuf!');
  }

  render() {
    return (
      <div>
        <h2>Notes...</h2>
        <p>I think it's working...</p>
      </div>
    )
  }
}
