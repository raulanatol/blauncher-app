import { action, observable } from 'mobx';

export type View = 'HOME' | 'PREFERENCES';

export class RootStore {

  @observable
  isBoardConnected: boolean;

  @observable
  currentView: View;

  constructor() {
    this.isBoardConnected = false;
    this.currentView = 'HOME';
  }

  @action
  changeView(newView: View) {
    this.currentView = newView;
  }

  @action
  boardConnected() {
    this.isBoardConnected = true;
  }
}
