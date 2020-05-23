import React, { FC } from 'react';
import { BoardManager } from './components/BoardManager';
import styled from '@emotion/styled';
import { KeyConfigurationPanel } from './components/configuration/KeyConfigurationPanel';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Board: FC = () => {
  return <Container>
    <BoardManager/>
    <KeyConfigurationPanel/>
  </Container>;
};
