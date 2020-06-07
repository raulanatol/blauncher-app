import React, { FC } from 'react';
import { BoardManager } from './components/BoardManager';
import styled from '@emotion/styled';
import { KeyConfigurationPanel } from './components/configuration/KeyConfigurationPanel';

const Container = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  flex-grow: 1;
`;

export const Board: FC = () => {
  return <Container>
    <BoardManager/>
    <KeyConfigurationPanel/>
  </Container>;
};
