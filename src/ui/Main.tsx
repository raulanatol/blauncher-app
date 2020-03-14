import React, { FC } from 'react';
import { useAppContext } from './state/AppContextProvider';
import { Home } from './views/Home';
import { Preferences } from './views/preferences/Preferences';

export const Main: FC = () => {
  const { view } = useAppContext();

  if (view === 'HOME') {
    return <Home/>;
  }

  if (view === 'PREFERENCES') {
    return <Preferences/>;
  }

  return <div>404</div>;
};
