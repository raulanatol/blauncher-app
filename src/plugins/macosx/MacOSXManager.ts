import { bashExecute } from '../utils/bash/bash';
import { MacOSX } from '../../contracts/MacOSX';

const NOTIFICATION_CENTER_UI = '~/Library/Preferences/ByHost/com.apple.notificationcenterui';

export class MacOSXManager implements MacOSX {

  async doNotDisturb() {
    const durationTimeScript = 'date -u +"%Y-%m-%d %H:%M:%S +000"';
    const script = [
      `defaults -currentHost write ${NOTIFICATION_CENTER_UI} doNotDisturb -boolean true`,
      `defaults -currentHost write ${NOTIFICATION_CENTER_UI} doNotDisturbDate -date "\`${durationTimeScript}\`"`,
      'killall NotificationCenter'
    ];
    return bashExecute(script);
  }

  async exitDoNotDisturb() {
    const scripts = [
      `defaults -currentHost write ${NOTIFICATION_CENTER_UI} doNotDisturb -boolean false`,
      'killall NotificationCenter'
    ];
    return bashExecute(scripts);
  }
}
