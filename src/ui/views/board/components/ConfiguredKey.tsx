import React, { FC } from 'react';
import { KeyConfiguration } from '../../../state/RootStore';
import { Button, Heading } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { useStoreContext } from '../../../state/AppContextProvider';

const Container = styled.div`
  width: 100%;
  & > button {
    margin: 20px;
  }
`;

interface ConfiguredKeyProps {
  configuration: KeyConfiguration;
}

export const ConfiguredKey: FC<ConfiguredKeyProps> = ({ configuration }) => {
  const store = useStoreContext();

  const removeConfiguration = () => store.removeActionToCurrentKey();

  return <Container>
    <Heading size="sm">[{configuration.action.group}] {configuration.action.title}</Heading>
    <Heading size="xs">{configuration.action.description}</Heading>
    <Button variantColor="red" size="md" onClick={removeConfiguration}>Remove action</Button>
  </Container>;
};
