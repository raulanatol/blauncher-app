import React, { FC } from 'react';
import { useStoreContext } from '../state/AppContextProvider';

export const Home: FC = () => {
  const store = useStoreContext();

  const toPreferences = () => store.changeView('PREFERENCES');
  const toBoard = () => store.changeView('BOARD');

  return <div>
    <h1>HOME</h1>
    <button onClick={toPreferences}>To Preferences</button>
    <button onClick={toBoard}>To Board</button>
  </div>;
};
