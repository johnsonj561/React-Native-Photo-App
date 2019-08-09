import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Title } from 'react-native-paper';
import { headerStyle } from '../../theme/header';
import { ScreenContainer } from '../../components/screen-container';
import { LoginCard } from './';

export interface LoginProps extends NavigationScreenProps<{}> {}

export const Login = (props: LoginProps) => (
  <ScreenContainer>
    <Title>Login to Get Started</Title>
    <LoginCard navigation={props.navigation} />
  </ScreenContainer>
);

Login.navigationOptions = {
  title: 'Login',
  ...headerStyle,
};
