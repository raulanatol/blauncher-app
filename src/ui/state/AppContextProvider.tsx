import React, { createContext, useState, useContext, useEffect } from 'react';
import { ipcRenderer } from 'electron';

type VIEW = 'HOME' | 'PREFERENCES';

interface AppContextModel {
  view: VIEW;
  boardConnected: boolean;
  changeView: (view: VIEW) => void;
  setBoardConnected: (boardConnected: boolean) => void;
}

const AppContext = createContext<AppContextModel | null>(null);

export const AppProvider = (props) => {
  const [view, setView] = useState<VIEW>('PREFERENCES');
  const [boardConnected, setBoardConnected] = useState(false);

  useEffect(() => {
    const onShowHome = () => setView('HOME');
    const onShowPreferences = () => setView('PREFERENCES');

    ipcRenderer.on('show-home', onShowHome);
    ipcRenderer.on('show-preferences', onShowPreferences);

    return () => {
      ipcRenderer.off('show-home', onShowHome);
      ipcRenderer.off('show-preferences', onShowPreferences);
    };
  }, []);

  const values: AppContextModel = {
    view,
    boardConnected,
    setBoardConnected,
    changeView: setView
  };

  return <AppContext.Provider value={values} {...props}/>;
};

export const useAppContext = (): AppContextModel => useContext(AppContext);

AppContext.displayName = 'AppContext';
