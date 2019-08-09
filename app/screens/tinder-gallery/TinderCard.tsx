import React from 'react';
import { View, ImageBackground as Image, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import styled from 'styled-components';

export interface ProfilesProps {
  uri: any;
  likeOpacity: Animated.Node<number>;
  nopeOpacity: Animated.Node<number>;
}

const Component = (props: ProfilesProps) => {
  const { uri, likeOpacity, nopeOpacity } = props;
  const likeStyle = { opacity: likeOpacity };
  const nopeStyle = { opacity: nopeOpacity };
  return (
    <Card style={StyleSheet.absoluteFill}>
      <ImageBackground source={{ uri }}>
        <LabelGroup>
          <LabelBorder color="#66bb6a" style={likeStyle}>
            <Label color="#66bb6a">LIKE</Label>
          </LabelBorder>
          <LabelBorder color="#ef5350" style={nopeStyle}>
            <Label color="#ef5350">NOPE</Label>
          </LabelBorder>
        </LabelGroup>
      </ImageBackground>
    </Card>
  );
};

Component.defaultProps = {
  likeOpacity: 0,
  nopeOpacity: 0,
};

export const TinderCard = React.memo(Component);

const ImageBackground = styled(Image)`
  width: 100%;
  height: 100%;
`;

const LabelGroup = styled(View)`
  flex-direction: row;
  padding: 10px;
  justify-content: space-between;
`;

const LabelBorder: any = styled(Animated.View)`
  padding: 5px 10px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  border: 4px solid ${(props: any) => props.color};
`;

const Label: any = styled(Text)`
  font-size: 26px;
  font-weight: 600;
  color: ${(props: any) => props.color};
`;
