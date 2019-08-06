import { Dashboard } from '../../screens/dashboard';
import { Logout } from '../../screens/logout';
import { createDrawerNavigator } from 'react-navigation';
import { ChangePassword } from '../../screens/change-password';
import { Gallery } from '../../screens/gallery';

export const AuthenticatedNavigator = createDrawerNavigator(
  {
    Dashboard,
    Logout,
    ChangePassword,
    Gallery,
  },
  {
    initialRouteName: 'Dashboard',
    hideStatusBar: true,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: '#6b52ae',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
  }
);
