import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import { Headline } from 'react-native-paper';
import { ScreenContainer } from '../../components/screen-container';
import { useSession } from '../../hooks/session';

export const Logout = () => {
  const { logoutUser } = useSession();
  useEffect(() => {
    logoutUser();
  }, []);

  return (
    <ScreenContainer>
      <PageTitle>Thanks for Visiting!</PageTitle>
    </ScreenContainer>
  );
};

const PageTitle = styled(Headline)`
  text-align: center;
  margin-bottom: 50px;
`;
