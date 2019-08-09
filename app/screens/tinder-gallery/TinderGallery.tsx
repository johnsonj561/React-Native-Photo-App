import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';
import CameraRoll, {
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import { headerStyle } from '../../theme/header';
import { ScreenContainer } from '../../components/screen-container';
import { TinderCard } from './';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  View,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { runSpring } from './animations';

const {
  add,
  multiply,
  neq,
  cond,
  eq,
  event,
  lessThan,
  greaterThan,
  and,
  call,
  set,
  clockRunning,
  stopClock,
  Clock,
  Value,
  concat,
  interpolate,
  Extrapolate,
} = Animated;

// helper functions for animation
const { width, height } = Dimensions.get('window');
const toRadians = (angle: number) => angle * (Math.PI / 180);
const rotatedWidth =
  width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));

// types
export interface TinderGalleryProps extends NavigationScreenProps<{}> {}

export interface TinderGalleryState {
  photos: PhotoIdentifier[];
}

export class TinderGallery extends React.Component<
  TinderGalleryProps,
  TinderGalleryState
> {
  static navigationOptions: any = {
    title: 'Photo TinderGallery',
    ...headerStyle,
  };
  translationX: Animated.Value<number> = new Value(0);
  translationY: Animated.Value<number> = new Value(0);
  translateX: Animated.Adaptable<number> | number = 0;
  translateY: Animated.Adaptable<number> | number = 0;
  velocityX: Animated.Value<number> = new Value(0);
  offsetX: Animated.Value<number> = new Value(0);
  offsetY: Animated.Value<number> = new Value(0);
  gestureState: Animated.Value<State> = new Value(State.UNDETERMINED);
  onGestureEvent: (...args: any[]) => void = event(
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

  state = { photos: [] as PhotoIdentifier[] };

  componentDidMount = () => {
    this.initAnimations();
    this.initPhotos().catch(err => console.log('Error loading photos', err));
  };

  initPhotos = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
    }
    const photos = await CameraRoll.getPhotos({
      first: 10,
      groupTypes: 'All',
      assetType: 'Photos',
    });
    this.setState({ photos: photos.edges });
    photos.edges
      .map(photo => photo.node.image.uri)
      .map(uri => Image.prefetch(uri));
  };

  initAnimations = () => {
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
          call([], this.swiped),
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

  swiped = () => {
    const {
      photos: [lastPhoto, ...photos],
    } = this.state;
    this.initAnimations();
    this.setState({ photos });
  };

  render() {
    const { onGestureEvent, translateX, translateY } = this;
    const {
      photos: [firstPhoto, secondPhoto, ...remainingPhotos],
    } = this.state;

    if (!firstPhoto) {
      return null;
    }

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

    const style: ViewStyle | any = {
      ...StyleSheet.absoluteFillObject,
      zIndex: 900,
      transform: [{ translateX }, { translateY }, { rotateZ }],
    };
    return (
      <ScreenContainer>
        <View style={[StyleSheet.absoluteFill, { zIndex: 5 }]}>
          <TinderCard
            key={secondPhoto.node.image.uri}
            uri={secondPhoto.node.image.uri}
          />
        </View>
        <TopCard style={StyleSheet.absoluteFill}>
          <PanGestureHandler
            onHandlerStateChange={onGestureEvent}
            {...{ onGestureEvent }}>
            <Animated.View style={style}>
              <TinderCard
                key={firstPhoto.node.image.uri}
                uri={firstPhoto.node.image.uri}
                likeOpacity={likeOpacity}
                nopeOpacity={nopeOpacity}
              />
            </Animated.View>
          </PanGestureHandler>
        </TopCard>
      </ScreenContainer>
    );
  }
}

const TopCard = styled(View)`
  z-index: 1000;
`;
