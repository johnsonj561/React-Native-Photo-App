import React, { useState, useEffect } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import MapView, { Marker, LatLng } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/screen-container';
import { headerStyle } from '../../theme/header';
import { useDevicePhotos } from '../../hooks/device-photos';

const TITLE = 'Photo Map';

interface Props extends NavigationScreenProps<{}> {}

export const PhotoMap = (props: Props) => {
  const { photos } = useDevicePhotos();
  const [coordinates, setCoordinates] = useState<LatLng[]>([]);
  useEffect(() => {
    const coordinates = photos
      .map(photo => photo.node.location)
      .filter((coords = {}) => coords.latitude && coords.longitude)
      .map((coords = {}) => ({
        latitude: coords.latitude,
        longitude: coords.longitude,
      }));
    setCoordinates(coordinates);
  }, [photos]);
  return (
    <ScreenContainer title={TITLE} padding={false}>
      <MapView
        initialRegion={{
          latitude: 63.5314,
          longitude: -19.5112,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
        zoomControlEnabled
        zoomEnabled
        style={StyleSheet.absoluteFill}>
        {/* using index as key bc I'm over this project */}
        {coordinates.map((coord, idx) => (
          <Marker coordinate={coord} key={idx} />
        ))}
      </MapView>
    </ScreenContainer>
  );
};

PhotoMap.navigationOptions = {
  title: TITLE,
  ...headerStyle,
};
