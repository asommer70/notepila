import React, { Component } from 'react';

export default class Folders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: []
    }

    // Get notes from PouchDB.
    console.log('Getting data... about folders!');
    // props.db.allDocs({
    //   include_docs: true,
    //   attachments: true
    // }).then(function (result) {
    //   // handle result
    //   console.log('allDocs result:', result);
    // }).catch(function (err) {
    //   console.log(err);
    // });
    // props.db.query((doc) => {
    //   // sort by last name, first name, and age
    //   emit([doc]);
    // }).then(function (result) {
    //   // handle result
    //   console.log('result:', result);
    // }).catch(function (err) {
    //   console.log(err);
    // });

    props.db.query('folders/index', {
      include_docs: true
    }).then((res) => {
      console.log('res.rows:', res.rows);
      this.setState({folders: res.rows});
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
