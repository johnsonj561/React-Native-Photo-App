import { Animated } from 'react-native';
import { SCREEN_WIDTH } from './';

export const xOffset = new Animated.Value(0);

export const transitionAnimation = (index: number) => ({
  transform: [
    {
      scale: xOffset.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        outputRange: [0.25, 1, 0.25],
      }),
    },
    {
      rotateX: xOffset.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        outputRange: ['45deg', '0deg', '45deg'],
      }),
    },
    {
      rotateY: xOffset.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        outputRange: ['-45deg', '0deg', '45deg'],
      }),
    },
  ],
});
