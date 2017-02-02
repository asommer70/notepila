import React, { Component } from 'react';

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: {}
    }

  }

  render() {
    return (
      <div>
        <h2>Notes</h2>
        <p>I think it's working...</p>
      </div>
    )
  }
}
