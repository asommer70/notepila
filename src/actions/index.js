import PouchDB from 'pouchdb';

export const db = new PouchDB('notepila');
// db.destroy();

window.PouchDB = PouchDB;

export const addDesignDoc = () => {
  const folders_ddoc = {
    _id: '_design/folders',
    views: {
      index: {
        map: function mapFun(doc) {
          if (doc.type == 'folder') {
            emit(doc._id);
          }
        }.toString()
      }
    }
  };

  const notes_ddoc = {
    _id: '_design/notes',
    views: {
      index: {
        map: function mapFun(doc) {
          if (doc.type == 'note') {
            emit(doc.folder);
          }
        }.toString()
      }
    }
  };

  // Save the _design docs to the database.
  db.bulkDocs([folders_ddoc, notes_ddoc]).then((res) => {
    db.put({
      _id: 'main',
      type: 'folder',
      name: 'Main'
    }).then((res) => {
      console.log('Created main...');
      window.location.reload();
    });
  }).catch((err) => {
    console.log('bulkDocs err:', err);
  });
}
