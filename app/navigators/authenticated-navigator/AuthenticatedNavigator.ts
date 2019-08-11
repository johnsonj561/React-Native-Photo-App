import { Dashboard } from '../../screens/dashboard';
import { Logout } from '../../screens/logout';
import { createDrawerNavigator } from 'react-navigation';
import { ChangePassword } from '../../screens/change-password';
import { TinderGallery } from '../../screens/tinder-gallery';
import { AnimatedHorizontalScroll } from '../../screens/animated-horizontal-scroll';

export const AuthenticatedNavigator = createDrawerNavigator(
  {
    Dashboard,
    TinderGallery,
    AnimatedHorizontalScroll,
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
