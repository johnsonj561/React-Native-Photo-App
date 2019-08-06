import React from 'react';
import { StatusBar, SafeAreaView, View } from 'react-native';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import Colors from '../../theme/colors';
import styled from 'styled-components';

export interface ScreenContainerProps extends NavigationScreenProps<{}> {
  children: React.ReactNode;
}

export const ScreenContainer = withNavigation(
  React.memo((props: ScreenContainerProps) => {
    console.log('Screen container', props);
    const { navigation } = props;
    return (
      <>
        {/* Only show drawer menu if rendering the drawer navigator */}
        {!!navigation.toggleDrawer && (
          <Appbar.Header>
            <Appbar.Action
              icon="menu"
              onPress={props.navigation.toggleDrawer}
            />
            <Appbar.Content title={props.navigation.state.routeName} />
          </Appbar.Header>
        )}
        <StatusBar barStyle="dark-content" />
        <SafeArea>
          <Container>{props.children}</Container>
        </SafeArea>
      </>
    );
  })
);

const SafeArea = styled(SafeAreaView)`
  flex: 1;
`;

const Container = styled(View)`
  flex: 1;
  background-color: ${Colors.lighter};
  padding: 20px 10px;
`;
