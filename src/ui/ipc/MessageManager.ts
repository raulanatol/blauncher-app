import { ipcRenderer } from 'electron';

export class MessageManager {
  static openConnection(serialPort: string) {
    ipcRenderer.send('open-connection', serialPort);
  }
}
