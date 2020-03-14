import { App, ipcMain } from 'electron';
import { Driver } from '../driver/Driver';

export class AppManager {
  app: App;
  driver: Driver;

  constructor(app: App) {
    this.app = app;
    this.subscribeEvents();
  }

  subscribeEvents() {
    ipcMain.on('open-connection', this.onOpenConnection);
  }


  onOpenConnection(event, arg) {
    this.driver = new Driver(arg);
  }
}
