import { action, observable, runInAction } from 'mobx';
import ElectronStore from 'electron-store';
import { MessageManager } from '../ipc/MessageManager';

export type View = 'HOME' | 'PREFERENCES';

export class RootStore {

  private electronStore: ElectronStore<any>;

  @observable
  isBoardConnected: boolean;

  @observable
  currentView: View;

  @observable
  serialPorts?: string[];

  lastSerialPortConnected: string;

  constructor() {
    this.isBoardConnected = false;
    this.currentView = 'HOME';
    this.electronStore = new ElectronStore();

    this.lastSerialPortConnected = this.electronStore.get('lastSerialPortConnected');
    this.initialize();
  }

  private initialize() {
    this.updateSerialPorts();
  }

  @action
  changeView(newView: View) {
    this.currentView = newView;
  }

  @action
  boardConnected(serialPortAddress: string) {
    this.isBoardConnected = true;
    this.lastSerialPortConnected = serialPortAddress;
    this.electronStore.set('lastSerialPortConnected', serialPortAddress);
  }

  @action
  updateSerialPorts() {
    MessageManager.getSerialPorts().then(newSerialPorts => {
      runInAction(() => {
        this.serialPorts = newSerialPorts;
      });
    });
  }
}
