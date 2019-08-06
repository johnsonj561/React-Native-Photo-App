import React from 'react';
import { DefaultNavigator, AuthenticatedNavigator } from './navigators';
import { createAppContainer } from 'react-navigation';
import { useSession } from './hooks/session';

const DefaultContainer = createAppContainer(DefaultNavigator);
const AuthContainer = createAppContainer(AuthenticatedNavigator);

const App = () => {
  const { user } = useSession();
  if (user && user.username) {
    return <AuthContainer />;
  }
  return <DefaultContainer />;
};

export default App;
