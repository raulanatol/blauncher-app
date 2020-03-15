import SerialPort from 'serialport';
import { onData } from './events';

export const MAX_PIXEL_NUMBER = 32;

export class SerialDriver {
  port: SerialPort;

  constructor(address: string) {
    this.port = new SerialPort(address, {
      baudRate: 115200,
      autoOpen: false
    });
    this.subscribeEvent();
  }

  private subscribeEvent() {
    this.port.on('open', () => {
      console.log('*** Port open ***');
      this.port.on('data', onData(this.port));
    });

    this.port.on('error', console.error);
  }

  static getPorts(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      SerialPort.list().then(
        ports => resolve(ports.map(port => port.path)),
        err => reject(err)
      );
    });
  }

  openConnection(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.port.open(err => {
        err ? reject(err) : resolve(true);
      });
    });
  }
}
