import React, { FC, useState, useEffect } from 'react';
import { MessageManager } from './ipc/MessageManager';
import { ipcRenderer } from 'electron';

export const Main: FC = () => {
  const [serial, setSerial] = useState('/dev/tty.usbmodem1301');

  const handleOnChange = ({ currentTarget: { value } }) => setSerial(value);

  useEffect(() => {
    console.log('aINIC');
    ipcRenderer.on('show-preferences', () => {
      console.log('SHOW_PREFERENCES');
    });
  }, []);

  const handleConnect = () => {
    MessageManager.openConnection(serial);
  };

  return <div>
    <label htmlFor="serial"/>
    <input name="serial" value="/dev/tty.usbmodem1301" onChange={handleOnChange}/>
    <button onClick={handleConnect}>Connect</button>
  </div>;
};
