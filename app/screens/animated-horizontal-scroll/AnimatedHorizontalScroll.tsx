import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Dimensions, Animated, StyleSheet } from 'react-native';
import { PhotoIdentifier } from '@react-native-community/cameraroll';
import { ScreenContainer } from '../../components/screen-container';
import { headerStyle } from '../../theme/header';
import { AnimatedCard, xOffset } from './';
import { withDevicePhotos } from '../../hooks/device-photos';

export const SCREEN_WIDTH = Dimensions.get('screen').width;

export interface Props extends NavigationScreenProps<{}> {
  photos: PhotoIdentifier[];
}

const Component = (props: Props) => {
  const { photos } = props;
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: xOffset } } }],
    { useNativeDriver: true }
  );
  return (
    <ScreenContainer containerStyle={styles.container}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll}
        horizontal
        pagingEnabled
        style={styles.scrollView}>
        {/* Render all the photos!!! */}
        {photos.map((photo, idx) => {
          const { uri } = photo.node.image;
          return <AnimatedCard key={uri} uri={uri} index={idx} />;
        })}
      </Animated.ScrollView>
    </ScreenContainer>
  );
};

Component.navigationOptions = {
  title: 'Horizontal Photo Animations',
  ...headerStyle,
};

export const AnimatedHorizontalScroll = withDevicePhotos(Component);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  scrollView: {
    backgroundColor: 'black',
    width: SCREEN_WIDTH,
    flex: 1,
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold',
  },
});
