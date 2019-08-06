/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import Amplify from 'aws-amplify';
import App from './app/App';
import { name as appName } from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';
import { NotificationProvider } from './app/hooks/notification';
import { SessionProvider } from './app/hooks/session/SessionContext';
import config from './aws-exports';

Amplify.configure(config);

const Main = () => (
  <PaperProvider>
    <SessionProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </SessionProvider>
  </PaperProvider>
);

AppRegistry.registerComponent(appName, () => Main);
