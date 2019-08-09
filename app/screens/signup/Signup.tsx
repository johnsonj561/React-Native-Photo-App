/**
 * @format
 */

import React, { useState } from 'react';
import { NavigationScreenProps, NavigationParams } from 'react-navigation';
import { Title } from 'react-native-paper';
import { headerStyle } from '../../theme/header';
import { ScreenContainer } from '../../components/screen-container';
import { useNotification } from '../../hooks/notification/useNotification';
import { useSession } from '../../hooks/session';
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
