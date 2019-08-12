import React, { useState } from 'react';
import { NavigationScreenProps, NavigationParams } from 'react-navigation';
import { Button, Card } from 'react-native-paper';
import {
  TextInput,
  CardContainer,
  CardButtonGroup,
} from '../../components/styled';
import { useNotification } from '../../hooks/notification/useNotification';
import { useSession } from '../../hooks/session';

export interface SignupFormProps extends NavigationScreenProps<{}> {}

export const initFormData = {
  username: '',
  password: '',
};

export const SignupForm = (props: SignupFormProps) => {
  const { clearNotification, setNotification } = useNotification();
  const { signUpUser } = useSession();

  const [formData, setFormData] = useState(initFormData);
  const onInputChange = (key: string) => (value: string) => {
    setFormData(state => ({ ...state, [key]: value }));
  };

  const onSubmit = () => {
    clearNotification();
    const { username } = formData;
    signUpUser(formData)
      .then(() => {
        const params: NavigationParams = { username };
        props.navigation.replace('ConfirmAccount', params);
      })
      .catch(err => setNotification(err.message));
  };

  const onCancel = () => props.navigation.navigate('Login');

  return (
    <CardContainer elevation={2}>
      {/* Input Fields */}
      <Card.Content>
        <TextInput
          label="Email"
          value={formData.username}
          textContentType="emailAddress"
          onChangeText={onInputChange('username')}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={formData.password}
          textContentType="password"
          onChangeText={onInputChange('password')}
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
          Sign Up
        </Button>
      </CardButtonGroup>
    </CardContainer>
  );
};
