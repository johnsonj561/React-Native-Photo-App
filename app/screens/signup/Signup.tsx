/**
 * @format
 */

import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Title } from 'react-native-paper';
import { headerStyle } from '../../theme/header';
import { ScreenContainer } from '../../components/screen-container';
import { SignupForm } from './';

export interface SignupProps extends NavigationScreenProps<{}> {}

export const Signup = (props: SignupProps) => (
  <ScreenContainer>
    {/* Signup Form Card */}
    <Title>Create a New Account</Title>
    <SignupForm navigation={props.navigation} />
  </ScreenContainer>
);

Signup.navigationOptions = {
  title: 'Sign Up',
  ...headerStyle,
};
