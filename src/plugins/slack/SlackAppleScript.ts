import '@jxa/global-type';
import { Slack } from './Slack';
import { run } from '@jxa/run';

export class SlackAppleScript implements Slack {

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
    return run(workspaceNumber => {
      const systemEvents = Application('System Events');
      const slack = Application('Slack');
      slack.includeStandardAdditions = true;
      slack.activate();
      delay(0.5);
      systemEvents.keystroke(workspaceNumber, { using: 'command down' });
      delay(0.5);
    }, workspaceNumber);
  }

  private async changeToChannel(channelName: string) {
    return run(channelName => {
      const slack = Application('Slack');
      slack.includeStandardAdditions = true;
      slack.activate();
      delay(0.5);
      const systemEvents = Application('System Events');
      systemEvents.keystroke('k', { using: 'command down' });
      delay(0.5);
      systemEvents.keystroke(channelName);
      delay(0.5);
      systemEvents.keyCode(36);
      delay(0.5);
    }, channelName);
  }

  private async sendMessage(message: string) {
    return run(message => {
      const systemEvents = Application('System Events');
      const slack = Application('Slack');
      slack.includeStandardAdditions = true;
      slack.activate();
      delay(0.5);
      systemEvents.keystroke(message);
      delay(0.5);
      systemEvents.keyCode(36);
      delay(0.5);
      systemEvents.keyCode(36);
    }, message);
  }

  private async executeCommand(command: string) {
    await this.changeToMeChannel();
    await this.sendMessage(`/${command}`);
  }

  private async changeToMeChannel() {
    await this.changeToChannel('me');
  }
}
