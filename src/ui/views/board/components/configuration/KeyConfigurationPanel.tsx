import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useStoreContext } from '../../../../state/AppContextProvider';
import { Header } from './Header';
import { Body } from './Body';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
`;

export const KeyConfigurationPanel: FC = observer(() => {
  const { currentKey, currentConfiguration } = useStoreContext();

  if (!currentKey) {
    return <Container>
      <p>Select a key to configure its action.</p>
    </Container>;
  }

  return <Container>
    <Header configuration={currentConfiguration}/>
    <Body/>
  </Container>;
});
