import { executeAction } from './actions';

const onErr = err => console.error(err);

const write = port => message => port.write(message, onErr);

const isKeyPressEvent = event => event[0] === '#';

const extractKeyNumber = event => Number(event.substring(1));

export const onData = port => (data) => {
  const event = data.toString();
  if (isKeyPressEvent(event)) {
    const keyNumber = extractKeyNumber(event);
    executeAction(keyNumber, write(port));
  } else {
    console.warn('New event from the board', event);
  }

  // if (dataStr.includes('24 pressed')) {
  //   write('DP#16FF00FF');
  // } else if (dataStr.includes('0 pressed')) {
  //   write('CLS#');
  // } else if (dataStr.includes('31 pressed')) {
  //   write(drawPixelCommand([
  //     pixelColor(0, 'FF0000'),
  //     pixelColor(1, 'FF0000'),
  //     pixelColor(2, 'FF0000'),
  //     pixelColor(3, 'FF0000'),
  //     pixelColor(4, '00FF00'),
  //     pixelColor(5, '00FF00'),
  //     pixelColor(6, '00FF00'),
  //     pixelColor(7, '00FF00'),
  //     pixelColor(8, '0000FF'),
  //   ]));
  // } else if (dataStr.includes('1 pressed')) {
  //   write('DP#16FF00FF17FF00FF18FF00FF19000010');
  // }
  //
  // console.log('>>', dataStr);
  // // if (dataStr.includes('24')) {
  // //     port.write('#2');
  // // } else if (dataStr.includes('25')) {
  // //     port.write('#1');
  // // } else {
  // //     console.log('Not found!');
  // // }
  // // if (data.toString().includes('OFF')) {
  // //     console.log('WRITE');
  // //     port.write('A');
  // // }
  // // port.write(Math.random() > 0.7 ? 'A' : 'B');
};
