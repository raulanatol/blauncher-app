import { AppManager } from '../AppManager';

xdescribe('AppManager', () => {
  describe('subscribeEvents', () => {
    test('should subscribe to all event when the app is created', () => {
      const appOnSpy = jest.fn();
      // const ipcMainHandleSpy = jest.fn();

      new AppManager({
        on: appOnSpy
      } as any);

      expect(appOnSpy).toBeCalledTimes(3);
      // expect(ipcMainHandleSpy).toBeCalledTimes(2);
    });
  });
});
