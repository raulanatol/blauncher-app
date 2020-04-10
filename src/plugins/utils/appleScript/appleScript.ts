import { run } from '@jxa/run';

export const KEY_CODE_ENTER = 36;

export interface Action {
  beforeDelay?: number;
  keyStroke?: string;
  keyCode?: number;
  options?: {
    using: any;
  };
}

export const menuItemClick = async (appName: string, mainMenuName: string) => {
  await run((appName, mainMenuName) => {
    const application = Application(appName);
    if (!application) {
      throw new Error(`Application not found: ${appName}`);
    }

    const systemEvents = Application('System Events');
    const apps = systemEvents.processes.where({ name: appName });

    const appProcess = apps.length ? apps[0] : null;
    if (!appProcess) {
      throw new Error(`Application not running now: ${appName}`);
    }

    application.activate();
    const menu = appProcess.menuBars[0].menus.byName(mainMenuName);
    if (!menu) {
      throw new Error(`Menu not found: ${mainMenuName}`);
    }
    menu.click();
  }, appName, mainMenuName);
};

export const executeActions = async (applicationName: string, actions: Action[]) => {
  return run((applicationName, actions) => {
    const systemEvents = Application('System Events');
    const application = Application(applicationName);
    application.includeStandardAdditions = true;
    application.activate();
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (action.beforeDelay > 0) {
        delay(action.beforeDelay);
      }
      if (action.keyStroke) {
        systemEvents.keystroke(action.keyStroke, action.options);
      }

      if (action.keyCode) {
        systemEvents.keyCode(action.keyCode);
      }
    }
  }, applicationName, actions);
};
