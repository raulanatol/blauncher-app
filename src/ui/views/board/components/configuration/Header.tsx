import React, { FC } from 'react';
import styled from '@emotion/styled';
import { KeyConfiguration } from '../../../../state/RootStore';

const Container = styled.div`
  width: 100%;
  background-color: gray;
`;

interface HeaderProps {
  configuration?: KeyConfiguration;
}

export const Header: FC<HeaderProps> = ({ configuration }) => {

  if (!configuration) {
    return <Container>
      <p>Select an action from the selector</p>
    </Container>;
  }

  return <Container>
    {configuration.title}
  </Container>;
};
