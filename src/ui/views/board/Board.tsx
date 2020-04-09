import React, { FC } from 'react';
import { BoardManager } from './components/BoardManager';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Board: FC = () => {
  return <Container>
    <BoardManager/>
  </Container>;
};
