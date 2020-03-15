import React, { FC, useEffect, useState } from 'react';
import { refresh } from 'react-icons-kit/fa/refresh';
import { MessageManager } from '../../../ipc/MessageManager';
import { useStoreContext } from '../../../state/AppContextProvider';
import styled from '@emotion/styled';
import { IconButton } from '../../../components/IconButton';

const Container = styled.div`
  display: flex;
`;

export const LauncherPreferences: FC = () => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [serialPortList, setSerialPortList] = useState<string[]>([]);
  const [currentSerialPort, setCurrentSerialPort] = useState<string>();
  const store = useStoreContext();


  useEffect(() => {
    MessageManager.getSerialPorts().then(newSerialPorts => setSerialPortList(newSerialPorts));
  }, []);

  const handleOnChange = ({ currentTarget: { value } }) => {
    setDisabled(!value);
    setCurrentSerialPort(value);
  };

  const doConnect = () => {
    MessageManager.openConnection(currentSerialPort)
      .then(() => store.boardConnected())
      .catch(err => console.error(err));
  };

  const refreshSerialPorts = () => {
    MessageManager.getSerialPorts().then(newSerialPorts => setSerialPortList(newSerialPorts));
  };

  return <Container>
    <label htmlFor="serial">Serial:</label>
    <select id="serial" onChange={handleOnChange}>
      <option value="">---</option>
      {serialPortList.map(serialPort => <option key={serialPort} value={serialPort}>{serialPort}</option>)}
    </select>
    <IconButton icon={refresh} onClick={refreshSerialPorts}/>
    <button disabled={disabled} onClick={doConnect}>Connect</button>
  </Container>;
};
