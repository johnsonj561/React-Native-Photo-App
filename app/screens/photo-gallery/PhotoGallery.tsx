import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Dimensions, Animated, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/screen-container';
import { headerStyle } from '../../theme/header';
import { AnimatedCard, xOffset } from '.';
import { useDevicePhotos } from '../../hooks/device-photos';

const TITLE = 'Photo Gallery';

export const SCREEN_WIDTH = Dimensions.get('screen').width;

export interface Props extends NavigationScreenProps<{}> {}

const BaseComponent = (props: Props) => {
  const { photos } = useDevicePhotos();
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: xOffset } } }],
    { useNativeDriver: true }
  );
  return (
    <ScreenContainer title={TITLE} padding={false}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll}
        horizontal
        pagingEnabled
        style={styles.scrollView}>
        {/* Render all the photos!!! */}
        {photos.map((photo, idx) => (
          <AnimatedCard
            key={photo.node.image.uri}
            uri={photo.node.image.uri}
            index={idx}
          />
        ))}
      </Animated.ScrollView>
    </ScreenContainer>
  );
};

interface NavStatelessComponent extends React.StatelessComponent<Props> {
  navigationOptions?: Object;
}

export const PhotoGallery: NavStatelessComponent = React.memo(BaseComponent);

PhotoGallery.navigationOptions = {
  title: TITLE,
  ...headerStyle,
};

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
