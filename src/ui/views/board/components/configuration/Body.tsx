import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ActionTree } from './ActionTree';

const Container = styled.div`
  display: flex;
`;

const BodyContent = styled.div`
  width: 80%;
  height: 100%;
`;

export const Body: FC = () => {
  return <Container>
    <BodyContent/>
    <ActionTree/>
  </Container>;
};
