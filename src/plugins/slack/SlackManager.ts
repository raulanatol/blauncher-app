import '@jxa/global-type';
import { Slack } from '../../contracts/Slack';
import { Action, executeActions, KEY_CODE_ENTER } from '../utils/appleScript/appleScript';

export class SlackManager implements Slack {
  readonly appName: string;

  constructor() {
    this.appName = 'Slack';
  }

  async changeStatus(newStatus) {
    await this.changeToChannel('me');
    await this.executeCommand(`status ${newStatus}`);
  }

  async clearStatus() {
    await this.executeCommand('status clear');
  }

  async focusMode() {
    await this.changeStatus(':tomato: Focus mode. Do not disturb!');
    await this.doNotDisturb(30);
  }

  async existFocusMode() {
    await this.offDoNotDisturb();
    await this.clearStatus();
  }

  async doNotDisturb(minutes?: number) {
    await this.executeCommand(`dnd ${minutes ? minutes : ''} minutes`);
  }

  async offDoNotDisturb() {
    await this.executeCommand('dnd off');
  }

  async changeToWorkspaceNumber(workspaceNumber: number) {
    const actions: Action[] = [
      { beforeDelay: 0.5, keyStroke: workspaceNumber + '', options: { using: 'command down' } }
    ];
    return executeActions(this.appName, actions);
  }

  private async changeToChannel(channelName: string) {
    const actions: Action[] = [
      { keyStroke: 'k', options: { using: 'command down' }, beforeDelay: 0.5 },
      { keyStroke: channelName, beforeDelay: 0.5 },
      { beforeDelay: 0.5, keyCode: KEY_CODE_ENTER }
    ];
    return executeActions(this.appName, actions);
  }

  private async sendMessage(message: string) {
    const actions: Action[] = [
      { beforeDelay: 0.5, keyStroke: message },
      { beforeDelay: 0.5, keyCode: KEY_CODE_ENTER },
      { beforeDelay: 0.5, keyCode: KEY_CODE_ENTER }
    ];
    return executeActions(this.appName, actions);
  }

  private async executeCommand(command: string) {
    await this.changeToMeChannel();
    await this.sendMessage(`/${command}`);
  }

  private async changeToMeChannel() {
    await this.changeToChannel('me');
  }
}
