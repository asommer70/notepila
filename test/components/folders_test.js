import PouchDB from 'pouchdb';
import { renderComponent , expect } from '../test_helper';
import Folders from '../../src/components/folders';

var db = new PouchDB('notepila');

describe('Folders' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Folders, {db: db});
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('has a main folder', () => {
    console.log('component:', component);
    expect(component).to.be.contain('Main');
  });
});
