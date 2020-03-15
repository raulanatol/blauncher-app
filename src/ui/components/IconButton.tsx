import React, { FC } from 'react';
import { Icon } from 'react-icons-kit';
import styled from '@emotion/styled';

const Container = styled.div<any>`
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

interface IconButtonProps {
  icon: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const IconButton: FC<IconButtonProps> = ({ icon, onClick, disabled = false }) => {

  const handleOnClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return <Container disabled={disabled} onClick={handleOnClick}>
    <Icon icon={icon}/>
  </Container>;
};
