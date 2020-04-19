import { menuItemClick } from '../appleScript';

describe('appleScript', () => {
  describe('menuItemClick', () => {
    xtest('should click in the File menu of Safari', () => {
      menuItemClick('Safari', 'File');
    });
  });
});
