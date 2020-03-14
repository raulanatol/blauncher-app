import { Pixel } from './Pixel';
import { clearBoard, drawPixelCommand } from './commands';
import { MAX_PIXEL_NUMBER } from './Driver';

export const executeAction = (key: number, writeCallback) => {
  console.log('Execute action from ', key);
  switch (key) {
    case 31:
      return animation1(writeCallback);
    case 30:
      return animation2(writeCallback);
    case 8:
      return clear(writeCallback);
    default:
      console.log('Action not defined', key);
  }
};

const clear = (write) => write(clearBoard());


const animation1 = (write) => {
  const pattern: Pixel[] = [
    new Pixel(0, '00FF00'),
    new Pixel(1, '0000FF'),
    new Pixel(2, 'FF0000')
  ];

  write(clearBoard());
  setTimeout(() => {
    write(drawPixelCommand(pattern));
  }, 500);

  setTimeout(() => {
    const pattern: Pixel[] = [
      new Pixel(3, '00FF00'),
      new Pixel(4, '0000FF'),
      new Pixel(5, 'FF0000')
    ];
    write(drawPixelCommand(pattern));
  }, 1000);
};


const animation2 = (write) => {
  let counter = 0;
  const interval = setInterval(() => {
    write(drawPixelCommand([new Pixel(counter, '00FF00')]));
    counter++;
    if (counter > MAX_PIXEL_NUMBER) {
      clearInterval(interval);
    }
  }, 500);
};
