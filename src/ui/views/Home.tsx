import React, { FC } from 'react';
import { useAppContext } from '../state/AppContextProvider';

export const Home: FC = () => {
  const { changeView } = useAppContext();

  const toPreferences = () => changeView('PREFERENCES');

  return <div>
    <h1>HOME</h1>
    <button onClick={toPreferences}>To Preferences</button>
  </div>;
};
