import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ipcRenderer } from 'electron';

const Selected = styled.div<any>`
  position: relative;
  background: green;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: 44px;
  height: 44px;

`;

interface SelectedAreaProps {
  areas: any;
}

export const SelectedArea: FC<SelectedAreaProps> = ({ areas }) => {
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
