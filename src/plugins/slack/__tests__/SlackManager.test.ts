import { SlackManager } from '../SlackAppleScript';

xdescribe('SlackAppleScript', () => {
  test('should change to workspace two', async () => {
    const app = new SlackManager();
    await app.changeToWorkspaceNumber(2);
  });
});
