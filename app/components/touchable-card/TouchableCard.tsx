import React from 'react';
import { Card, Avatar } from 'react-native-paper';

export interface TouchableCardProps {
  title: string;
  subtitle?: string;
  icon: string;
  onPress: () => void;
}

export const TouchableCard = React.memo((props: TouchableCardProps) => {
  const { title, subtitle, icon, onPress } = props;
  return (
    <Card style={CARD} onPress={onPress}>
      <Card.Title
        title={title}
        subtitle={subtitle}
        left={props => (icon ? <Avatar.Icon {...props} icon={icon} /> : null)}
      />
    </Card>
  );
});

const CARD = {
  marginVertical: 5,
};
