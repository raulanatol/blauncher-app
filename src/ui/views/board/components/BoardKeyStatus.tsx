import React, { FC } from 'react';
import { Configuration } from '../../../state/RootStore';
import { BoardKeyStatusItem } from './BoardKeyStatusItem';

interface BoardKeyStatusProps {
  areas: object;
  configuration: Configuration;
}

export const BoardKeyStatus: FC<BoardKeyStatusProps> = ({ configuration, areas }) => {
  return <div>
    {Object.keys(configuration.keys).map(key => <BoardKeyStatusItem key={key} value={areas[key]}/>)}
  </div>;
};
