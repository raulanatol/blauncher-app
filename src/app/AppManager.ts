import { App, BrowserWindow, ipcMain, Menu, Tray } from 'electron';
import { Driver } from '../driver/Driver';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const quitApplication = app => app.quit();

const createTray = (app) => {
  const tray = new Tray('assets/icon-48.png');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'normal' },
    { label: 'Item2', type: 'separator' },
    { label: 'Quit blauncher', type: 'normal', click: () => quitApplication(app) }
  ]);
  tray.setToolTip('blauncher');
  tray.setContextMenu(contextMenu);
  return tray;
};

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).catch(console.error);
  mainWindow.webContents.openDevTools();
  return mainWindow;
};

const isMacEnvironment = () => process.platform !== 'darwin';
const noBrowserWindow = () => BrowserWindow.getAllWindows().length === 0;

export class AppManager {
  app: App;
  driver: Driver;
  tray: Tray;
  mainWindow: BrowserWindow;

  constructor(app: App) {
    this.app = app;
    this.subscribeEvents();
  }

  subscribeEvents() {
    this.app.on('ready', () => this.onAppReady());
    this.app.on('window-all-closed', () => this.onWindowAllClosed);
    this.app.on('activate', () => this.onActivate);
    ipcMain.on('open-connection', () => this.onOpenConnection);
  }

  onAppReady() {
    this.tray = createTray(this.app);
    this.mainWindow = createMainWindow();
  }

  onWindowAllClosed() {
    if (!isMacEnvironment()) {
      this.app.quit();
    }
  }

  onActivate() {
    if (noBrowserWindow()) {
      this.mainWindow = createMainWindow();
    }
  }

  onOpenConnection(event, arg) {
    this.driver = new Driver(arg);
  }
}
