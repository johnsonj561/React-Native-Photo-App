import React, { useState } from 'react';
import styled from 'styled-components';
import { NavigationScreenProps, NavigationParams } from 'react-navigation';
import { Auth } from 'aws-amplify';
import { Card, TextInput, Title } from 'react-native-paper';
import { headerStyle } from '../../theme/header';
import { Button } from 'react-native-paper';
import { ScreenContainer } from '../../components/screen-container';
import { useNotification } from '../../hooks/notification';
import { useSession } from '../../hooks/session';

export interface ConfirmAccountProps extends NavigationScreenProps<{}> {
  username: string;
}

export const ConfirmAccount = (props: ConfirmAccountProps) => {
  const username = props.navigation.getParam('username' as never);

  const [authCode, setAuthCode] = useState('');

  const { setNotification } = useNotification();
  const { confirmSignUp } = useSession();

  const onInputChange = (value: string) => setAuthCode(value);

  const onCancel = () => {
    props.navigation.navigate('Login');
  };

  const onSubmit = () => {
    confirmSignUp(username, authCode)
      .then(() => {
        const params: NavigationParams = {
          message: 'Account confirmed, please sign in',
        };
        props.navigation.navigate('Login', params);
      })
      .catch(err => setNotification(err.message || 'Unexpected error'));
  };

  const onResendConfirmation = () => {
    Auth.resendSignUp(username)
      .then(() => setNotification('Confirmation code sent, check your email'))
      .catch(err => setNotification('Error sending confirmation code'));
  };

  return (
    <ScreenContainer>
      <Title>Enter Your Confirmation Code</Title>
      <CommonCard elevation={2}>
        <Card.Content>
          <WhiteTextInput
            label="Code"
            value={authCode}
            textContentType="username"
            onChangeText={onInputChange}
            autoCapitalize="none"
          />
        </Card.Content>
        <ButtonGroup>
          <Button mode="outlined" onPress={onCancel}>
            Cancel
          </Button>
          <Button mode="contained" onPress={onSubmit}>
            Submit
          </Button>
        </ButtonGroup>
        <Button compact mode="text" onPress={onResendConfirmation}>
          Resend Confirmation Code
        </Button>
      </CommonCard>
    </ScreenContainer>
  );
};

const CommonCard = styled(Card)`
  flex-direction: row;
  padding: 15px 5px;
`;

const WhiteTextInput = styled(TextInput)`
  background-color: white;
`;

const ButtonGroup = styled(Card.Actions)`
  margin: 10px 0px;
  justify-content: space-evenly;
`;

ConfirmAccount.navigationOptions = {
  title: 'Confirm Account',
  ...headerStyle,
};
