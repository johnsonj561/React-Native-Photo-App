import { createStackNavigator } from 'react-navigation';
import { Signup, ConfirmAccount, Login, ResetPassword } from '../../screens';

export const DefaultNavigator = createStackNavigator(
  {
    Signup,
    Login,
    ConfirmAccount,
    ResetPassword,
  },
  { initialRouteName: 'Login' }
);
