import React, { FC } from 'react';
import { useStoreContext } from './state/AppContextProvider';
import { observer } from 'mobx-react';
import { Home } from './views/Home';
import { Preferences } from './views/preferences/Preferences';
import { Board } from './views/board/Board';
import { SelectAction } from './views/selectAction/SelectActions';

export const Main: FC = observer(() => {
  const { currentView } = useStoreContext();

  if (currentView === 'HOME') {
    return <Home/>;
  }

  if (currentView === 'PREFERENCES') {
    return <Preferences/>;
  }

  if (currentView === 'BOARD') {
    return <Board/>;
  }

  if (currentView === 'SELECT_ACTION') {
    return <SelectAction/>;
  }

  return <div>404</div>;
});
