import { App, BrowserWindow, ipcMain, Menu, Tray } from 'electron';
import { Driver } from '../driver/Driver';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const createTray = (appManager: AppManager) => {
  const tray = new Tray('assets/icon16x16.png');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Preferences...', type: 'normal', click: () => appManager.showPreferencesPanel() },
    { type: 'separator' },
    { label: 'Quit blauncher', type: 'normal', click: () => appManager.quitApplication() }
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
    },
    show: false
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).catch(console.error);
  mainWindow.webContents.openDevTools();
  return mainWindow;
};

const isMacEnvironment = () => process.platform === 'darwin';
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

  private showMainWindow() {
    if (noBrowserWindow()) {
      this.mainWindow = createMainWindow();
    }
    this.mainWindow.show();
  }

  private subscribeEvents() {
    this.app.on('ready', () => this.onAppReady());
    this.app.on('window-all-closed', () => this.onWindowAllClosed());
    this.app.on('activate', () => this.onActivate());
    ipcMain.on('open-connection', (event, arg) => this.onOpenConnection(event, arg));
  }

  private onAppReady() {
    this.tray = createTray(this);
    this.mainWindow = createMainWindow();
  }

  private onWindowAllClosed() {
    if (!isMacEnvironment()) {
      this.app.quit();
    }
  }

  private onActivate() {
    this.showMainWindow();
  }

  private onOpenConnection(event, arg) {
    this.driver = new Driver(arg);
  }

  showPreferencesPanel() {
    this.showMainWindow();
    console.log('AA', ipcMain);
    this.mainWindow.webContents.send('show-preferences', 'asd');
  }

  quitApplication() {
    this.app.quit();
  }
}
