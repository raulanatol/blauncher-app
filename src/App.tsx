import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './ui/Main';
import './base.css';
import { AppProvider } from './ui/state/AppContextProvider';

ReactDOM.render(<AppProvider>
  <Main/>
</AppProvider>, document.getElementById('root'));
