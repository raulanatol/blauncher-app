import React, { FC, useEffect, useState } from 'react';
import { MessageManager } from '../../../ipc/MessageManager';
import { useAppContext } from '../../../state/AppContextProvider';

export const LauncherPreferences: FC = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [serialPortList, setSerialPortList] = useState<string[]>([]);
  const [currentSerialPort, setCurrentSerialPort] = useState<string>();
  const { setBoardConnected } = useAppContext();

  useEffect(() => {
    MessageManager.getSerialPorts().then(newSerialPorts => setSerialPortList(newSerialPorts));
  }, []);

  const handleOnChange = ({ currentTarget: { value } }) => {
    setDisabled(!value);
    setCurrentSerialPort(value);
  };

  const doConnect = () => {
    MessageManager.openConnection(currentSerialPort)
      .then(() => setBoardConnected(true))
      .catch(err => console.error(err));
  };

  return <div>
    <label htmlFor="serial">Serial:</label>
    <select id="serial" onChange={handleOnChange}>
      <option value="">---</option>
      {serialPortList.map(serialPort => <option key={serialPort} value={serialPort}>{serialPort}</option>)}
    </select>
    <button disabled={disabled} onClick={doConnect}>Connect</button>
  </div>;
};
