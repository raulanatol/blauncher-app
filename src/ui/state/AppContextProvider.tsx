import React, { createContext, useState, useContext } from 'react';

type VIEW = 'HOME' | 'PREFERENCES';

interface AppContextModel {
  view: VIEW;
  boardConnected: boolean;
  changeView: (view: VIEW) => void;
}

const AppContext = createContext<AppContextModel | null>(null);

export const AppProvider = (props) => {
  const [view, setView] = useState<VIEW>('HOME');
  const [boardConnected] = useState(false);

  const values: AppContextModel = {
    view,
    boardConnected,
    changeView: setView
  };

  return <AppContext.Provider value={values} {...props}/>;
};

export const useAppContext = (): AppContextModel => useContext(AppContext);

AppContext.displayName = 'AppContext';
