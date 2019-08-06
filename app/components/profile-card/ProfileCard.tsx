import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { IconButton, Card, Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';

export interface ProfilesProps {
  profile: any;
  likeOpacity: Animated.Node<number>;
  nopeOpacity: Animated.Node<number>;
}

export const ProfileCard = React.memo((props: ProfilesProps) => {
  return (
    <Card style={styles.card}>
      <ImageBackground
        source={props.profile}
        style={{ width: '100%', height: '100%' }}>
        <LabelGroup>
          <GreenLabel style={{ opacity: props.likeOpacity }}>
            <GreenText>LIKE</GreenText>
          </GreenLabel>
          <RedLabel style={{ opacity: props.nopeOpacity }}>
            <RedText>NOPE</RedText>
          </RedLabel>
        </LabelGroup>
        <View style={styles.spacer} />
        <ButtonGroup>
          <IconButton
            icon="keyboard-arrow-left"
            size={40}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            icon="keyboard-arrow-right"
            size={40}
            onPress={() => console.log('Pressed')}
          />
        </ButtonGroup>
      </ImageBackground>
    </Card>
  );
});

ProfileCard.defaultProps = {
  likeOpacity: 0,
  nopeOpacity: 0,
};

const styles = {
  card: StyleSheet.absoluteFill,
  spacer: {
    flex: 1,
  },
};

const LabelGroup = styled(View)`
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
`;

const GreenLabel = styled(Animated.View)`
  padding: 5px 10px;
  border: 4px solid #66bb6a;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const GreenText = styled(Text)`
  font-size: 26px;
  color: #66bb6a;
  font-weight: 600;
`;

const RedLabel = styled(Animated.View)`
  padding: 5px 10px;
  border: 4px solid #ef5350;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const RedText = styled(Text)`
  font-size: 26px;
  font-weight: 600;
  color: #ef5350;
`;

const ButtonGroup = styled(Card.Actions)`
  /* flex: 10; */
  margin: 10px 0px;
  justify-content: space-between;
`;
