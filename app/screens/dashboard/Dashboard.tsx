import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import styled from 'styled-components';
import { headerStyle } from '../../theme/header';
import { Headline } from 'react-native-paper';
import { ScreenContainer } from '../../components/screen-container';
import { TouchableCard } from '../../components/touchable-card';

export interface DashboardProps extends NavigationScreenProps<{}> {}

export const Dashboard = (props: DashboardProps) => {
  const onViewTindergallery = () => props.navigation.navigate('TinderGallery');
  const onViewHorizontalScroll = () =>
    props.navigation.navigate('AnimatedHorizontalScroll');
  const onChangePassword = () => props.navigation.navigate('ChangePassword');
  const noop = () => {};
  return (
    <ScreenContainer>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <TouchableCard
          title="Tinder Gallery"
          subtitle="Access all of your photos"
          icon="collections"
          onPress={onViewTindergallery}
        />
        <TouchableCard
          title="Horizontal Scroll"
          subtitle="Access all of your photos"
          icon="collections"
          onPress={onViewHorizontalScroll}
        />
        <TouchableCard
          title="Photo Map"
          subtitle="View photos from different regions"
          icon="place"
          onPress={noop}
        />
        <TouchableCard
          title="Cloud Storage"
          subtitle="Set up cloud storage to back up your photos"
          icon="cloud"
          onPress={noop}
        />
        <TouchableCard
          title="Preferences"
          subtitle="Edit your account settings"
          icon="settings"
          onPress={noop}
        />
        <TouchableCard
          title="Change Password"
          subtitle="Change your account password"
          icon="vpn-key"
          onPress={onChangePassword}
        />
      </ScrollView>
    </ScreenContainer>
  );
};

Dashboard.navigationOptions = {
  title: 'Dashboard',
  ...headerStyle,
};

const PageTitle = styled(Headline)`
  text-align: center;
  margin-bottom: 50px;
`;
