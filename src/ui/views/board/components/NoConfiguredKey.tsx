import React, { FC } from 'react';
import { Button, Heading } from '@chakra-ui/core';
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  & > button {
    margin: 20px;
  }
`;

interface NoConfiguredKeyProps {
  onClickSetAction: () => void;
}

export const NoConfiguredKey: FC<NoConfiguredKeyProps> = ({ onClickSetAction }) => {
  return <Container>
    <Heading size="sm">Key with no action</Heading>
    <Button variantColor="teal" size="md" onClick={onClickSetAction}>Set action</Button>
  </Container>;
};
