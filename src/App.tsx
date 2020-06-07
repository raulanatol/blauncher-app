import React from 'react';
import ReactDOM from 'react-dom';
import './base.css';
import { AppProvider } from './ui/state/AppContextProvider';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { CustomTheme } from './theme';
import { Main } from './ui/Main';
import { Box } from './ui/components/chakraOverride';

ReactDOM.render(<AppProvider>
  <ThemeProvider theme={CustomTheme}>
    <CSSReset/>
    <Box>
      <Main/>
    </Box>
  </ThemeProvider>
</AppProvider>, document.getElementById('root'));
