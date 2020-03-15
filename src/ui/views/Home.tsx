import React, { FC } from 'react';
import { useStoreContext } from '../state/AppContextProvider';

export const Home: FC = () => {
  const store = useStoreContext();

  const toPreferences = () => store.changeView('PREFERENCES');

  return <div>
    <h1>HOME</h1>
    <button onClick={toPreferences}>To Preferences</button>
  </div>;
};
