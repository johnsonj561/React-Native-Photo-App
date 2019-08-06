import { createStackNavigator } from 'react-navigation';
import { Signup } from '../../screens/signup';
import { ConfirmAccount } from '../../screens/confirm-account';
import { Login } from '../../screens/login';
import { ResetPassword } from '../../screens/reset-password';

export const DefaultNavigator = createStackNavigator(
  {
    Signup,
    Login,
    ConfirmAccount,
    ResetPassword,
  },
  { initialRouteName: 'Login' }
);
