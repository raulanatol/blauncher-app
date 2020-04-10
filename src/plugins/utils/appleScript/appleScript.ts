import { run } from '@jxa/run';

export const menuItemClick = async (appName: string) => {
  await run((appName) => {
    // const application = Application(appName);
    // if (!application) {
    //   throw new Error(`Application not found: ${appName}`);
    // }

    const systemEvents = Application('System Events');
    const apps = systemEvents.processes.where({ name: appName });

    const appProcess = apps.length ? apps[0] : null;
    if (!appProcess) {
      throw new Error(`Application not running now: ${appName}`);
    }

    const menuName = 'File';

    // application.activate();
    const menu = appProcess.menuBars[0].menus.byName(menuName);
    if (!menu) {
      throw new Error(`Menu not found: ${menuName}`);
    }
    menu.click();
  }, appName);
};
