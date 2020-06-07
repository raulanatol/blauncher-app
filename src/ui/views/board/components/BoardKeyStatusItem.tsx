import React, { FC } from 'react';
import styled from '@emotion/styled';

const Container = styled.div<any>`
  position: absolute;
  background-color: #F7FAFC;
  opacity: 0.3;
  top: ${props => props.top - 2}px;
  left: ${props => props.left - 2}px;
  width: 47px;
  height: 47px;
  border-radius: 10px;
  z-index: 1;
  pointer-events: none;
`;

interface Props {
  value: string;
}

export const BoardKeyStatusItem: FC<Props> = ({ value }) => {
  const coordinate = value.split(',');
  return <Container top={coordinate[1]} left={coordinate[0]}/>;
};
