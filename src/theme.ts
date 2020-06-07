import { theme } from '@chakra-ui/core';

export const Colors = {
  white: '#23292d',
  background: '#23292d',
  borders: '#E0E2DB',
  textColor: '#d6d8da'
};

// Let's say you want to add custom colors
export const CustomTheme = {
  ...theme,
  colors: {
    tomato: '#FFF000',
    ...theme.colors,
    ...Colors,
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac'
    }
  }
};
