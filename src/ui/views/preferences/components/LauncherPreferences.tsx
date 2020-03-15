import React, { FC, useState } from 'react';
import { refresh } from 'react-icons-kit/fa/refresh';
import { MessageManager } from '../../../ipc/MessageManager';
import { useStoreContext } from '../../../state/AppContextProvider';
import styled from '@emotion/styled';
import { IconButton } from '../../../components/IconButton';
import { observer } from 'mobx-react';

const Container = styled.div`
  display: flex;
`;

export const LauncherPreferences: FC = observer(() => {
  const store = useStoreContext();
  const { serialPorts, lastSerialPortConnected } = store;
  const [disabled, setDisabled] = useState<boolean>(true);
  const [currentSerialPort, setCurrentSerialPort] = useState<string>(lastSerialPortConnected);

  const handleOnChange = ({ currentTarget: { value } }) => {
    setDisabled(!value);
    setCurrentSerialPort(value);
  };

  const doConnect = () => {
    MessageManager.openConnection(currentSerialPort)
      .then(() => store.boardConnected(currentSerialPort))
      .catch(err => console.error(err));
  };

  if (!serialPorts) {
    return <Container>Loading...</Container>;
  }

  const refreshSerialPorts = () => store.updateSerialPorts();

  return <Container>
    <label htmlFor="serial">Serial:</label>
    <select id="serial" defaultValue={currentSerialPort} onChange={handleOnChange}>
      <option value="">---</option>
      {serialPorts.map(serialPort => <option key={serialPort} value={serialPort}>{serialPort}</option>)}
    </select>
    <IconButton icon={refresh} onClick={refreshSerialPorts}/>
    <button disabled={disabled} onClick={doConnect}>Connect</button>
  </Container>;
});
