import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import styled from 'styled-components';

export interface ImageCardProps {
  uri: string;
  children?: ReactNode;
}

const Component = (props: ImageCardProps) => {
  const { uri, children } = props;
  return (
    <Card style={StyleSheet.absoluteFill}>
      <ImageBackground style={styles.image} source={{ uri }}>
        {children}
      </ImageBackground>
    </Card>
  );
};

const styles = {
  image: {
    width: '100%',
    height: '100%',
  },
};

export const ImageCard = React.memo(Component);
