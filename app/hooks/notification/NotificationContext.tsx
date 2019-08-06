import React, { createContext, useState } from 'react';
import { Snackbar, Portal } from 'react-native-paper';

export interface NotificationContextType {
  setNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  setNotification: () => {},
});

export interface NotificationProviderProps {
  children: React.ElementType;
}

const NotificationProvider = (props: NotificationProviderProps) => {
  const [message, setMessage] = useState('');
  const clearMessage = () => setMessage('');
  const setNotification = (message: string) => setMessage(message);
  return (
    <NotificationContext.Provider value={{ setNotification }}>
      <Portal>
        <Snackbar
          visible={!!message}
          duration={Snackbar.DURATION_SHORT}
          onDismiss={clearMessage}>
          {message}
        </Snackbar>
      </Portal>
      {props.children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationProvider };
