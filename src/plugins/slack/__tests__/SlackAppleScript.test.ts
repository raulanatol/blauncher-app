import { SlackAppleScript } from '../SlackAppleScript';

xdescribe('SlackAppleScript', () => {
  test('should change to workspace two', async () => {
    const app = new SlackAppleScript();
    await app.changeToWorkspaceNumber(2);
  });
});
