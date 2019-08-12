import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { ScreenContainer } from '../../components/screen-container';
import { headerStyle } from '../../theme/header';
import MapView from 'react-native-maps';
import { StyleSheet } from 'react-native';

const TITLE = 'Photo Map';

interface Props extends NavigationScreenProps<{}> {}

export const PhotoMap = (props: Props) => {
  return (
    <ScreenContainer title={TITLE} padding={false}>
      <MapView
        initialRegion={{
          latitude: 40.0770134,
          longitude: -96.6978618,
          latitudeDelta: 25,
          longitudeDelta: 50,
        }}
        zoomControlEnabled
        zoomEnabled
        style={StyleSheet.absoluteFill}
      />
    </ScreenContainer>
  );
};

PhotoMap.navigationOptions = {
  title: TITLE,
  ...headerStyle,
};
