import React, { FC } from 'react';
import { Heading, IconButton, Text } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { ActionDefinition } from '../../selectAction/SelectActions';

const Container = styled.div`
  border:1px solid #DDDDDD;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background: red;
  }
`;

interface ActionItemProps {
  action: ActionDefinition;
  onClick: (action: ActionDefinition) => void;
}

export const ActionItem: FC<ActionItemProps> = ({ action, onClick }) => {
  const handleOnClick = () => onClick(action);

  return <Container onClick={handleOnClick}>
    <IconButton aria-label="Search database" icon="search"/>
    <Heading fontSize="xl">{action.title}</Heading>
    <Text mt={4}>{action.description}</Text>
  </Container>;
};
