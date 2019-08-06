import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';

export const useNotification = () => {
  const { setNotification } = useContext(NotificationContext);
  const clearNotification = () => setNotification('');
  return {
    setNotification,
    clearNotification,
  };
};
