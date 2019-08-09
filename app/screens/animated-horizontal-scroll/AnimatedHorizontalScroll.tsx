import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Dimensions, Animated, StyleSheet } from 'react-native';
import { ScreenContainer } from '../../components/screen-container';
import { headerStyle } from '../../theme/header';
import { PhotoCard, xOffset } from './';

export const SCREEN_WIDTH = Dimensions.get('screen').width;

export interface Props extends NavigationScreenProps<{}> {}

export const AnimatedHorizontalScroll = (props: Props) => {
  return (
    <ScreenContainer>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xOffset } } }],
          { useNativeDriver: true }
        )}
        horizontal
        pagingEnabled
        style={styles.scrollView}>
        <PhotoCard text="Screen 1" index={0} />
        <PhotoCard text="Screen 2" index={1} />
        <PhotoCard text="Screen 3" index={2} />
      </Animated.ScrollView>
    </ScreenContainer>
  );
};

AnimatedHorizontalScroll.navigationOptions = {
  title: 'Horizontal Photo Animations',
  ...headerStyle,
};

const styles = StyleSheet.create({
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
