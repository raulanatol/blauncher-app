import { MacOSXAppleScript } from '../MacOSXAppleScript';

describe('MacOSXAppleScript', () => {
  test('should change to do not disturb mode', async () => {
    const app = new MacOSXAppleScript();
    await app.doNotDisturb();
  });
});
