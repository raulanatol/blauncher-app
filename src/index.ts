import { app } from 'electron';
import { AppManager } from './app/AppManager';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

new AppManager(app);
