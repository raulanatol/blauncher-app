import { MacOSXManager } from '../MacOSXManager';

describe('MacOSXManager', () => {
  xtest('should change to do not disturb mode', async () => {
    const manager = new MacOSXManager();
    await manager.doNotDisturb();
  });

  xtest('should exit from do not disturb mode', async () => {
    const manager = new MacOSXManager();
    await manager.exitDoNotDisturb();
  });
});
