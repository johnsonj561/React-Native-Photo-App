/**
 * @format
 */

import React, { useState } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Title, Button, Card } from 'react-native-paper';
import { headerStyle } from '../../theme/header';
import { ScreenContainer } from '../../components/screen-container';
import {
  TextInput,
  CardContainer,
  CardButtonGroup,
} from '../../components/styled';
import { useNotification } from '../../hooks/notification/useNotification';
import { useSession } from '../../hooks/session';

export interface ResetPasswordProps extends NavigationScreenProps<{}> {}

export const ResetPassword = (props: ResetPasswordProps) => {
  const { clearNotification, setNotification } = useNotification();
  const { resetPassword, confirmResetPassword } = useSession();
  const [username, setUsername] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onInputChange = (
    method: React.Dispatch<React.SetStateAction<string>>
  ) => (value: string) => method(value);

  const onSubmit = () => {
    clearNotification();
    if (!resetSubmitted) {
      resetPassword(username)
        .then(() => setResetSubmitted(true))
        .catch(err => setNotification(err.message));
    } else {
      confirmResetPassword(username, authCode, newPassword)
        .then(() => props.navigation.navigate('Login'))
        .catch(err => setNotification(err.message));
    }
  };

  const onCancel = () => props.navigation.navigate('Login');

  return (
    <ScreenContainer>
      {/* Signup Form Card */}
      <Title>Reset Your Password</Title>
      <CardContainer elevation={2}>
        {/* Input Fields */}
        <Card.Content>
          {!resetSubmitted && (
            <TextInput
              label="Email"
              value={username}
              textContentType="emailAddress"
              onChangeText={onInputChange(setUsername)}
              autoCapitalize="none"
            />
          )}
          {resetSubmitted && (
            <>
              <TextInput
                label="Confirmation Code"
                value={authCode}
                textContentType="oneTimeCode"
                onChangeText={onInputChange(setAuthCode)}
                autoCapitalize="none"
                secureTextEntry
              />
              <TextInput
                label="New Password"
                value={newPassword}
                textContentType="password"
                onChangeText={onInputChange(setNewPassword)}
                autoCapitalize="none"
                secureTextEntry
              />
            </>
          )}
        </Card.Content>
        {/* Buttons */}
        <CardButtonGroup>
          <Button mode="outlined" onPress={onCancel}>
            Cancel
          </Button>
          <Button mode="contained" onPress={onSubmit}>
            Submit
          </Button>
        </CardButtonGroup>
      </CardContainer>
    </ScreenContainer>
  );
};

ResetPassword.navigationOptions = {
  title: 'Reset Password',
  ...headerStyle,
};
