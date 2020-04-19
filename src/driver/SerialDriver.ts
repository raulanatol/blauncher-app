import SerialPort from 'serialport';
import { EventEmitter } from 'events';
import { toEvent } from './events';
import { drawPixelCommand } from './commands';
import { Pixel } from './Pixel';

export const MAX_PIXEL_NUMBER = 32;

export class SerialDriver extends EventEmitter {
  port: SerialPort;

  constructor(address: string) {
    super();
    this.port = new SerialPort(address, {
      baudRate: 115200,
      autoOpen: false
    });
    this.subscribeEvent();
  }

  private subscribeEvent() {
    this.port.on('open', () => {
      console.log('*** Port open ***');
      this.port.on('data', (rawData) => this.processInputData(rawData));
    });

    this.port.on('error', console.error);
  }

  private processInputData(buffer) {
    const event = toEvent(buffer);
    if (event) {
      this.emit(event.type, event);
    }
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

  emulateKeyPressed(keyNumber: number) {
    this.port.write(drawPixelCommand([new Pixel(keyNumber, '00FF00')]));
    setTimeout(() => {
      this.port.write(drawPixelCommand([new Pixel(keyNumber, '000000')]));
    }, 250);
  }
}
