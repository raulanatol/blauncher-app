import React, { FC, useState } from 'react';
import { MessageManager } from './ipc/MessageManager';

export const Main: FC = () => {
  const [serial, setSerial] = useState('/dev/tty.usbmodem1301');

  const handleOnChange = ({ currentTarget: { value } }) => setSerial(value);

  const handleConnect = () => {
    MessageManager.openConnection(serial);
  };

  return <div>
    <label htmlFor="serial"/>
    <input name="serial" value="/dev/tty.usbmodem1301" onChange={handleOnChange}/>
    <button onClick={handleConnect}>Connect</button>
  </div>;
};
