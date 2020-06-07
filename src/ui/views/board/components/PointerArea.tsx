import React, { FC } from 'react';
import styled from '@emotion/styled';

const Container = styled.div<any>`
  position: absolute;
  top: ${props => props.top - 3}px;
  left: ${props => props.left - 3}px;
  width: 46px;
  height: 46px;
  border: 6px solid #CBD5E0;
  border-radius: 10px;
  z-index: 5;
  pointer-events: none;
`;

interface PointerAreaProps {
  areas: object;
  pointerAreaId?: number;
}

export const PointerArea: FC<PointerAreaProps> = ({ areas, pointerAreaId }) => {
  if (!pointerAreaId) {
    return null;
  }

  const coordinate = areas[pointerAreaId].split(',');
  return <Container top={coordinate[1]} left={coordinate[0]}/>;
};
