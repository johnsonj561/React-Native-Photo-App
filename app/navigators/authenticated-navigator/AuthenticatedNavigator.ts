import {
  Dashboard,
  Logout,
  ChangePassword,
  PhotoGallery,
  PhotoMap,
  TinderGallery,
} from '../../screens';
import { createDrawerNavigator } from 'react-navigation';

export const AuthenticatedNavigator = createDrawerNavigator(
  {
    Dashboard,
    PhotoGallery,
    TinderGallery,
    PhotoMap,
    ChangePassword,
    Logout,
  },
  {
    initialRouteName: 'Dashboard',
    hideStatusBar: false,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#6b52ae',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
  }
);
