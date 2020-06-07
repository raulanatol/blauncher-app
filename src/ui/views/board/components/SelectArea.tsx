import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ipcRenderer } from 'electron';

const Selected = styled.div<any>`
  position: absolute;
  background: #2C7A7B;
  top: ${props => props.top - 2}px;
  left: ${props => props.left - 2}px;
  width: 47px;
  height: 47px;
  border-radius: 10px;
  z-index: 1;
  pointer-events: none;
`;

interface SelectedAreaProps {
  areas: any;
}

export const SelectArea: FC<SelectedAreaProps> = ({ areas }) => {
  const [lastKeyPressed, setLastKeyPressed] = useState<number>();

  useEffect(() => {
    const onBoardKeyPressed = (event, { keyNumber }) => {
      setLastKeyPressed(keyNumber);
      setTimeout(() => {
        setLastKeyPressed(undefined);
      }, 450);
    };
    ipcRenderer.on('board-key-pressed', onBoardKeyPressed);
  }, []);

  const coords = areas[lastKeyPressed];
  if (!coords) {
    return null;
  }

  const coordinate = coords.split(',');
  return <Selected top={coordinate[1]} left={coordinate[0]}/>;
};
