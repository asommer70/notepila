import { renderComponent , expect } from '../test_helper';
import Folders from '../../src/components/folders';

describe('Folders' , () => {
  let component;

  beforeEach((done) => {
    component = renderComponent(Folders);
    done();
  });

  it('renders something', (done) => {
    expect(component).to.exist;
    done();
  });
});
