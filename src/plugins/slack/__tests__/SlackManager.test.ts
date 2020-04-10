import { SlackManager } from '../SlackManager';

describe('SlackAppleScript', () => {
  xtest('should change to workspace two', async () => {
    const app = new SlackManager();
    await app.changeToWorkspaceNumber(2);
  });
});
