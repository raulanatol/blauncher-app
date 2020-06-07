import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { useStoreContext } from '../../../../state/AppContextProvider';
import styled from '@emotion/styled';
import { NoConfiguredKey } from '../NoConfiguredKey';
import { ConfiguredKey } from '../ConfiguredKey';

const Container = styled.div`
  width: 100%;
`;

export const KeyConfigurationPanel: FC = observer(() => {
  const store = useStoreContext();
  const { currentKey, currentConfiguration } = store;

  const onClickSetAction = () => store.changeView('SELECT_ACTION');

  if (currentKey < 0) {
    return <Container>
      <p>Select any key to see it's configuration.</p>
    </Container>;
  }

  if (!currentConfiguration) {
    return <NoConfiguredKey onClickSetAction={onClickSetAction}/>;
  }

  return <ConfiguredKey configuration={currentConfiguration}/>;
});
