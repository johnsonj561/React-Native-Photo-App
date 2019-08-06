import React, { createContext, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

export interface SessionContextType {
  user: {};
  updateUser: (user: {}) => void;
}

const SessionContext = createContext<SessionContextType>({
  user: {},
  updateUser: user => {},
});

export interface NotificationProviderProps {
  children: React.ElementType;
}

const SessionProvider = (props: NotificationProviderProps) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const updateUser = (user = {}) => setUser(user);
  useEffect(() => {
    Auth.currentUserInfo()
      .then(user => {
        setUser(user);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <SessionContext.Provider value={{ user, updateUser }}>
      {!loading && props.children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
