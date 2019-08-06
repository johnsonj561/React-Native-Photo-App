/**
 * @format
 */

import React, { useState } from 'react';
import { NavigationScreenProps, NavigationParams } from 'react-navigation';
import { Auth } from 'aws-amplify';
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

export interface ChangePasswordProps extends NavigationScreenProps<{}> {}

export const ChangePassword = (props: ChangePasswordProps) => {
  const { clearNotification, setNotification } = useNotification();
  const { changePassword } = useSession();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onInputChange = (
    method: React.Dispatch<React.SetStateAction<string>>
  ) => (value: string) => method(value);

  const onSubmit = () => {
    clearNotification();
    changePassword(oldPassword, newPassword)
      .then(() => props.navigation.navigate('Dashboard'))
      .catch(err => setNotification(err.message));
  };

  const onCancel = () => props.navigation.navigate('Dashboard');

  return (
    <ScreenContainer>
      <Title>Change Your Password</Title>
      <CardContainer elevation={2}>
        {/* Input Fields */}
        <Card.Content>
          <TextInput
            label="Old Password"
            value={oldPassword}
            textContentType="password"
            onChangeText={onInputChange(setOldPassword)}
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

ChangePassword.navigationOptions = {
  title: 'Change Password',
  ...headerStyle,
};
