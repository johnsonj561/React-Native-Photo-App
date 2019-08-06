import { useContext, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { SessionContext } from './SessionContext';
import { initFormData } from '../../screens/signup';

export const useSession = () => {
  const { user, updateUser } = useContext(SessionContext);

  // Try loading existing user from storage
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(updateUser);
  }, []);

  const signUpUser = (signupData: typeof initFormData) =>
    Auth.signUp(signupData);

  const loginUser = async (username: string, password: string) => {
    const user = await Auth.signIn(username, password);
    updateUser(user);
  };

  const logoutUser = async () => {
    await Auth.signOut();
    updateUser({});
  };

  const confirmSignUp = (username: string, authCode: string) =>
    Auth.confirmSignUp(username, authCode);

  const resetPassword = (username: string) => Auth.forgotPassword(username);

  const confirmResetPassword = (
    username: string,
    authCode: string,
    newPassword: string
  ) => Auth.forgotPasswordSubmit(username, authCode, newPassword);

  /**
   * Change password for authenticated user
   */
  const changePassword = (oldPassword: string, newPassword: string) =>
    Auth.changePassword(user, oldPassword, newPassword);

  return {
    user,
    signUpUser,
    confirmSignUp,
    loginUser,
    logoutUser,
    resetPassword,
    confirmResetPassword,
    changePassword,
  };
};
