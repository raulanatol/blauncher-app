import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { useStoreContext } from '../../../state/AppContextProvider';

const AreaContainer = styled.area<any>`
  cursor: pointer;
  background: ${props => props.selected ? 'red' : '#FF00FF'};
`;

interface AreaProps {
  keyValue: string;
  coords: string;
  onClick: (keyValue: string) => void;
}

export const Area: FC<AreaProps> = observer(({ coords, onClick, keyValue }) => {
  const { lastKeyPressed } = useStoreContext();
  const [selected, setSelected] = useState<boolean>();

  useEffect(() => {
    if (lastKeyPressed === keyValue) {
      setSelected(true);
      setTimeout(() => {
        setSelected(false);
      }, 1000);
      console.log('>>>Yeah');
    }
  }, [lastKeyPressed, keyValue]);


  const handleOnClick = () => onClick(keyValue);

  return <AreaContainer selected={selected} shape="rect" coords={coords} onClick={handleOnClick}/>;
});
