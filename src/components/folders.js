import React, { Component } from 'react';

export default class Folders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: []
    }

    // Get the folders.
    props.db.query('folders/index', {
      include_docs: true
    }).then((res) => {
      if (res.rows.length == 0) {
        // Create Main if it's not there.
        props.db.post({
          type: 'folder',
          name: 'Main'
        }).then((response) => {
          props.db.get(response.id).then((doc) => {
            this.setState({folders: [{doc: doc}]});
          });
        }).catch((err) => {
        });
      } else {
        this.setState({folders: res.rows});
      }
    }).catch((err) => {
    })
  }

  render() {
    return (
      <div>
        <h2>Folders</h2>
        <ul className="folders">
          {
            this.state.folders.map((folder) => {
              return (
                <li key={folder.doc._id}>
                  {folder.doc.name}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
