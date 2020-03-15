import React, { FC } from 'react';
import { LauncherPreferences } from './components/LauncherPreferences';
import { useAppContext } from '../../state/AppContextProvider';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Space = styled.div`
  height: 250px;
`;

export const Preferences: FC = () => {
  const { changeView } = useAppContext();

  const handleSave = () => changeView('HOME');

  return <Container>
    <h1>Preferences</h1>
    <LauncherPreferences/>
    <Space/>
    <div>
      <button onClick={handleSave}>Save</button>
    </div>
  </Container>;
};
