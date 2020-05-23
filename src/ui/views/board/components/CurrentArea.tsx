import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useStoreContext } from '../../../state/AppContextProvider';
import { observer } from 'mobx-react';

const Current = styled.div<any>`
  position: relative;
  top: ${props => props.top - 2}px;
  left: ${props => props.left - 2}px;
  width: 34px;
  height: 34px;
  border: 5px solid #debc40;
  border-radius: 10px;
  z-index: 1;
`;

interface CurrentAreaProps {
  areas: any;
}

export const CurrentArea: FC<CurrentAreaProps> = observer(({ areas }) => {
  const { currentKey } = useStoreContext();

  if (!currentKey) {
    return null;
  }

  const coords = areas[currentKey];
  if (!coords) {
    return null;
  }

  const coordinate = coords.split(',');
  return <Current top={coordinate[1]} left={coordinate[0]}/>;
});
