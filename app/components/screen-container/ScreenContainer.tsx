import React from 'react';
import { StatusBar, SafeAreaView, View, ViewStyle } from 'react-native';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import Colors from '../../theme/colors';
import styled from 'styled-components';

export interface ScreenContainerProps extends NavigationScreenProps<{}> {
  children: React.ReactNode;
  title?: string;
  padding?: boolean;
}

export const ScreenContainer = withNavigation(
  React.memo((props: ScreenContainerProps) => {
    console.log('Screen props', props, props.navigation);
    const { navigation, title, padding } = props;
    return (
      <>
        {/* Only show drawer menu if rendering the drawer navigator */}
        {!!navigation.toggleDrawer && (
          <Appbar.Header>
            <Appbar.Action
              icon="menu"
              onPress={props.navigation.toggleDrawer}
            />
            <Appbar.Content title={title} />
          </Appbar.Header>
        )}
        <StatusBar barStyle="dark-content" />
        <SafeArea>
          <Container padding={padding}>{props.children}</Container>
        </SafeArea>
      </>
    );
  })
);

ScreenContainer.defaultProps = {
  title: '',
  padding: true,
};

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const Container: any = styled(View)`
  flex: 1;
  background-color: ${Colors.lighter};
  padding: ${(props: any) => (props.padding ? '20px 10px' : '0px')};
`;
