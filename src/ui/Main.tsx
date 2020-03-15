import React, { FC } from 'react';
import { useStoreContext } from './state/AppContextProvider';
import { Home } from './views/Home';
import { Preferences } from './views/preferences/Preferences';
import { observer } from 'mobx-react';

export const Main: FC = observer(() => {
  const { currentView } = useStoreContext();

  if (currentView === 'HOME') {
    return <Home/>;
  }

  if (currentView === 'PREFERENCES') {
    return <Preferences/>;
  }

  return <div>404</div>;
});
