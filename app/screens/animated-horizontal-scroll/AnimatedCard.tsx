import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { transitionAnimation, SCREEN_WIDTH } from '.';
import { ImageCard } from '../../components/image-card';

interface Props {
  uri: string;
  index: number;
}

const Component = (props: Props) => {
  const { uri, index } = props;
  return (
    <Animated.View style={[styles.animatedView, transitionAnimation(index)]}>
      <ImageCard uri={uri} />
    </Animated.View>
  );
};

export const AnimatedCard = React.memo(Component);

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 25,
    backgroundColor: 'white',
  },
});
