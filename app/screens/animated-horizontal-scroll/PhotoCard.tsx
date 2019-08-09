import React from 'react';
import { Dimensions, Animated, StyleSheet, Text, View } from 'react-native';
import { transitionAnimation, SCREEN_WIDTH } from './';

interface Props {
  text: string;
  index: number;
}

const Component = (props: Props) => {
  return (
    <View style={styles.scrollPage}>
      <Animated.View
        style={[styles.animatedView, transitionAnimation(props.index)]}>
        <Text style={styles.text}>{props.text}</Text>
      </Animated.View>
    </View>
  );
};

export const PhotoCard = React.memo(Component);

const styles = StyleSheet.create({
  scrollPage: {
    width: SCREEN_WIDTH,
  },
  animatedView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold',
  },
});
