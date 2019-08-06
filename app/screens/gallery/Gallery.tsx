import React, { useState, useEffect } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import Animated from 'react-native-reanimated';
import { headerStyle } from '../../theme/header';
import { ScreenContainer } from '../../components/screen-container';
import { profiles, ProfileType } from '../../assets/profiles';
import { ProfileCard } from '../../components/profile-card';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { Image, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { runSpring } from './animations';

const {
  add,
  multiply,
  neq,
  spring,
  cond,
  eq,
  event,
  lessThan,
  greaterThan,
  and,
  call,
  set,
  clockRunning,
  startClock,
  stopClock,
  Clock,
  Value,
  concat,
  interpolate,
  Extrapolate,
} = Animated;

const { width, height } = Dimensions.get('window');
const toRadians = angle => angle * (Math.PI / 180);
const rotatedWidth =
  width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

export interface GalleryProps extends NavigationScreenProps<{}> {}
export interface GalleryState {
  profiles: ProfileType[];
}

export class Gallery extends React.Component<GalleryProps, GalleryState> {
  translationX: Animated.Value<number>;
  translationY: Animated.Value<number>;
  rotation: Animated.Value<number>;
  velocityX: Animated.Value<number>;
  offsetX: Animated.Value<number>;
  offsetY: Animated.Value<number>;
  gestureState: Animated.Value<State>;
  onGestureEvent: (...args: any[]) => void;

  constructor(props: GalleryProps) {
    super(props);
    this.state = { profiles };
    this.translationX = new Value(0);
    this.translationY = new Value(0);
    this.velocityX = new Value(0);
    this.offsetY = new Value(0);
    this.offsetX = new Value(0);
    this.gestureState = new Value(State.UNDETERMINED);
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationX: this.translationX,
            translationY: this.translationY,
            velocityX: this.velocityX,
            state: this.gestureState,
          },
        },
      ],
      { useNativeDriver: true }
    );
    this.init();
  }

  init = () => {
    // profiles.map(p => {
    //   Image.prefetch(p.profile);
    // });
    // this.setState({ ready: true });
    const clockX = new Clock();
    const clockY = new Clock();
    const {
      translationX,
      translationY,
      velocityX,
      gestureState,
      offsetY,
      offsetX,
    } = this;
    gestureState.setValue(State.UNDETERMINED);
    translationX.setValue(0);
    translationY.setValue(0);
    velocityX.setValue(0);
    offsetY.setValue(0);
    offsetX.setValue(0);

    const finalTranslateX = add(translationX, multiply(0.2, velocityX));
    const translationThreshold = width / 4;
    const snapPoint = cond(
      lessThan(finalTranslateX, -translationThreshold),
      -rotatedWidth,
      cond(greaterThan(finalTranslateX, translationThreshold), rotatedWidth, 0)
    );
    // TODO: handle case where the user drags the card again before the spring animation finished
    this.translateY = cond(
      eq(gestureState, State.END),
      [
        set(translationY, runSpring(clockY, translationY, 0)),
        set(offsetY, translationY),
        translationY,
      ],
      cond(
        eq(gestureState, State.BEGAN),
        [stopClock(clockY), translationY],
        translationY
      )
    );
    this.translateX = cond(
      eq(gestureState, State.END),
      [
        set(translationX, runSpring(clockX, translationX, snapPoint)),
        set(offsetX, translationX),
        cond(and(eq(clockRunning(clockX), 0), neq(translationX, 0)), [
          call([translationX], this.swipped),
        ]),
        translationX,
      ],
      cond(
        eq(gestureState, State.BEGAN),
        [stopClock(clockX), translationX],
        translationX
      )
    );
  };

  swipped = ([translationX]) => {
    const {
      profiles: [lastProfile, ...profiles],
    } = this.state;
    this.setState({ profiles }, this.init);
  };

  render() {
    const { onGestureEvent, translateX, translateY } = this;
    const {
      profiles: [lastProfile, ...profiles],
    } = this.state;
    const rotateZ = concat(
      interpolate(translateX, {
        inputRange: [-width / 2, width / 2],
        outputRange: [15, -15],
        extrapolate: Extrapolate.CLAMP,
      }),
      'deg'
    );
    const likeOpacity = interpolate(translateX, {
      inputRange: [0, width / 4],
      outputRange: [0, 1],
    });
    const nopeOpacity = interpolate(translateX, {
      inputRange: [-width / 4, 0],
      outputRange: [1, 0],
    });
    const style: ViewStyle = {
      ...StyleSheet.absoluteFillObject,
      zIndex: 900,
      transform: [{ translateX }, { translateY }, { rotateZ }],
    };
    return (
      <ScreenContainer>
        {profiles.reverse().map(profile => (
          <ProfileCard key={profile.id} profile={profile.profile} />
        ))}
        <PanGestureHandler
          onHandlerStateChange={onGestureEvent}
          {...{ onGestureEvent }}>
          <Animated.View style={style}>
            <ProfileCard
              profile={lastProfile.profile}
              likeOpacity={likeOpacity}
              nopeOpacity={nopeOpacity}
            />
          </Animated.View>
        </PanGestureHandler>
      </ScreenContainer>
    );
  }
}

Gallery.navigationOptions = {
  title: 'Photo Gallery',
  ...headerStyle,
};
