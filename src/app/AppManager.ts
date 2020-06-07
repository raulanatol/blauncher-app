import { App, BrowserWindow, ipcMain, Menu, Tray } from 'electron';
import { SerialDriver } from '../driver/SerialDriver';
import ElectronStore from 'electron-store';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

const createTray = (appManager: AppManager) => {
  const tray = new Tray('assets/icon16x16gray.png');
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Activate', type: 'normal', click: () => appManager.showHomePanel() },
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
    resizable: false,
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
  driver: SerialDriver;
  tray: Tray;
  mainWindow: BrowserWindow;
  electronStore: ElectronStore<any>;

  constructor(app: App) {
    this.app = app;
    this.subscribeEvents();
    this.electronStore = new ElectronStore();
    this.electronStore.set('isBoardConnected', false);
  }

  private showMainWindow() {
    if (noBrowserWindow()) {
      this.mainWindow = createMainWindow();
    }
    this.mainWindow.show();
  }

  private subscribeEvents() {
    this.app.on('ready', async () => this.onAppReady());
    this.app.on('window-all-closed', () => this.onWindowAllClosed());
    this.app.on('activate', () => this.onActivate());
    ipcMain.handle('open-connection', async (event, address) => this.onOpenConnection(address));
    ipcMain.handle('get-serial-ports', async () => AppManager.handleGetSerialPorts());
    ipcMain.handle('virtual-board-key-pressed', async (event, keyNumber) => this.handleVirtualBoardKeyPressed(keyNumber));
  }

  private async onAppReady() {
    this.tray = createTray(this);
    this.mainWindow = createMainWindow();
    this.connectToLastSerialPort();
  }

  private onWindowAllClosed() {
    if (!isMacEnvironment()) {
      this.app.quit();
    }
  }

  private onActivate() {
    this.showMainWindow();
  }

  private async onOpenConnection(address: string): Promise<boolean> {
    this.driver = new SerialDriver(address);

    this.driver.on('board-key-pressed', event => this.mainWindow.webContents.send(event.type, event));

    const isConnected = await this.driver.openConnection();
    if (isConnected) {
      this.tray.setImage('assets/icon16x16.png');
    }
    return isConnected;
  }

  private handleVirtualBoardKeyPressed(keyNumber: number) {
    this.driver.emulateKeyPressed(keyNumber);
  }

  private static async handleGetSerialPorts(): Promise<string[]> {
    return SerialDriver.getPorts();
  }

  showPreferencesPanel() {
    this.showMainWindow();
    this.mainWindow.webContents.send('show-preferences');
  }

  quitApplication() {
    this.app.quit();
  }

  showHomePanel() {
    this.showMainWindow();
    this.mainWindow.webContents.send('show-home');
  }

  private async connectToLastSerialPort() {
    const lastSerialPort = this.electronStore.get('lastSerialPortConnected');

    if (lastSerialPort) {
      await this.onOpenConnection(lastSerialPort);
      this.electronStore.set('isBoardConnected', true);
    }
  }
}
