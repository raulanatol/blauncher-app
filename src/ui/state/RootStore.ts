import { action, computed, observable, runInAction } from 'mobx';
import ElectronStore from 'electron-store';
import { MessageManager } from '../ipc/MessageManager';

export type View = 'HOME' | 'PREFERENCES' | 'BOARD';

export interface KeyConfiguration {
  title: string;
}

type Dict<T> = {
  [key: string]: T
};

interface Configuration {
  keys: Dict<KeyConfiguration>;
}

export class RootStore {

  private electronStore: ElectronStore<any>;

  @observable
  isBoardConnected: boolean;

  @observable
  currentView: View;

  @observable
  serialPorts?: string[];

  @observable
  currentKey?: number;

  @observable
  configuration: Configuration;

  @computed
  get currentConfiguration(): KeyConfiguration | undefined {
    if (this.currentKey && this.configuration.keys) {
      return this.configuration.keys[this.currentKey];
    }
  }

  lastSerialPortConnected: string;

  constructor() {
    this.currentView = 'BOARD';
    this.electronStore = new ElectronStore();

    this.isBoardConnected = this.electronStore.get('isBoardConnected');
    this.lastSerialPortConnected = this.electronStore.get('lastSerialPortConnected');
    this.configuration = this.electronStore.get('boardConfiguration') || {};
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
  boardKeyPressed(keyNumber: number) {
    this.currentKey = keyNumber;
    console.log('boardKeyPressed', keyNumber);
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

  @action
  onVirtualKeyboardKeyPressed(keyPressed: number) {
    this.currentKey = keyPressed;
    MessageManager.virtualBoardKeyPressed(keyPressed).catch(console.error);
  }
}
