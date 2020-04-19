import React, { createContext, FC, useContext, useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { useLocalStore } from 'mobx-react';
import { RootStore } from './RootStore';

const AppContext = createContext<RootStore | null>(null);

const createStores = () => (): RootStore => new RootStore();

export const AppProvider: FC = (props) => {
  const store = useLocalStore(createStores());

  useEffect(() => {
    const onShowHome = () => store.changeView('HOME');
    const onShowPreferences = () => store.changeView('PREFERENCES');
    const onBoardKeyPressed = (event, args) => store.boardKeyPressed(args.keyNumber);

    ipcRenderer.on('show-home', onShowHome);
    ipcRenderer.on('show-preferences', onShowPreferences);
    ipcRenderer.on('board-key-pressed', onBoardKeyPressed);

    return () => {
      ipcRenderer.off('show-home', onShowHome);
      ipcRenderer.off('show-preferences', onShowPreferences);
    };
  }, [store]);

  return <AppContext.Provider value={store} {...props}/>;
};

export const useStoreContext = (): RootStore => {
  const store = useContext(AppContext);

  if (!store) {
    throw new Error('useStoreContext must be used within a AppContextProvider');
  }

  return store;
};

AppContext.displayName = 'AppContext';
