import SerialPort from 'serialport';
import { onData } from './events';

export const MAX_PIXEL_NUMBER = 32;

export class SerialDriver {
  port: SerialPort;

  constructor(address: string) {

    SerialPort.list().then(
      ports => ports.forEach(console.log),
      err => console.error(err)
    );

    // this.port = new SerialPort(address, {
    //   baudRate: 115200,
    //   autoOpen: true
    // });
    // this.subscribeEvent();
  }

  private subscribeEvent() {
    this.port.on('open', () => {
      console.log('*** Port open ***');
      this.port.on('data', onData(this.port));
    });

    this.port.on('error', console.error);
  }

  static getPorts() {
    SerialPort.list().then(
      ports => ports.forEach(console.log),
      err => console.error(err)
    );
  }
}
