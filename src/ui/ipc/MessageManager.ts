import { ipcRenderer } from 'electron';

export class MessageManager {
  static openConnection(serialPort: string): Promise<boolean> {
    return ipcRenderer.invoke('open-connection', serialPort);
  }

  static getSerialPorts(): Promise<string[]> {
    return ipcRenderer.invoke('get-serial-ports');
  }
}
