import React, { useState } from 'react';
import styled from 'styled-components';
import { NavigationScreenProps, NavigationParams } from 'react-navigation';
import {
  Card,
  Button,
  Title,
  Text,
  DefaultTheme,
  Divider,
} from 'react-native-paper';
import { headerStyle } from '../../theme/header';
import { TextInput, CardContainer } from '../../components/styled';
import { useSession } from '../../hooks/session';
import { useNotification } from '../../hooks/notification';

export interface LoginCardProps extends NavigationScreenProps<{}> {}

export const LoginCard = (props: LoginCardProps) => {
  const { loginUser } = useSession();
  const { setNotification } = useNotification();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onInputChange = (
    method: React.Dispatch<React.SetStateAction<string>>
  ) => (value: string) => method(value);

  const onSubmit = () => {
    loginUser(username, password).catch(err => {
      if (err.code === 'UserNotConfirmedException') {
        const params: NavigationParams = { username };
        props.navigation.navigate('ConfirmAccount', params);
      } else {
        setNotification(err.message || 'Unexpected error');
      }
    });
  };

  const onCreateAccount = () => {
    props.navigation.navigate('Signup');
  };

  const onForgotPassword = () => {
    props.navigation.navigate('ResetPassword');
  };

  return (
    <CardContainer elevation={2}>
      <Card.Content>
        <TextInput
          label="Email"
          value={username}
          textContentType="emailAddress"
          onChangeText={onInputChange(setUsername)}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={password}
          textContentType="password"
          onChangeText={onInputChange(setPassword)}
          onSubmitEditing={onSubmit}
          autoCapitalize="none"
          secureTextEntry
        />
      </Card.Content>
      <ButtonGroup>
        <Button icon="send" mode="contained" onPress={onSubmit}>
          Login
        </Button>
      </ButtonGroup>
      <PaddedDivider />
      <Button mode="text" onPress={onCreateAccount}>
        <SmallButtonText>Create a New Account</SmallButtonText>
      </Button>
      <Button mode="text" onPress={onForgotPassword}>
        <SmallButtonText>Reset Password</SmallButtonText>
      </Button>
    </CardContainer>
  );
};

const ButtonGroup = styled(Card.Actions)`
  margin-top: 10px;
  justify-content: space-evenly;
`;

const SmallButtonText = styled(Text)`
  font-size: 12px;
  color: ${DefaultTheme.colors.primary};
`;

const PaddedDivider = styled(Divider)`
  margin: 20px 0px;
  color: ${DefaultTheme.colors.primary};
`;

LoginCard.navigationOptions = {
  title: 'Login',
  ...headerStyle,
};
