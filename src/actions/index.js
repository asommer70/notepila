import PouchDB from 'pouchdb';

export const db = new PouchDB('notepila');
// db.destroy();

window.PouchDB = PouchDB;
