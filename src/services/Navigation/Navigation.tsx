import React, {FC} from 'react';
import {Screens} from './Screens';
import {createStackNavigator} from '@react-navigation/stack';
import {UserListScrollScreen} from '../../screens/UsersListScroll/UsersListScrollScreen';
import {NavigatorScreenParams} from '@react-navigation/native';
import {UsersPaginationScreen} from '../../screens/UserListPagination/UsersPaginationScreen';

// ps: the comments here just for explaining and not nedeed since every function and var has a meaning by it's name

// navigation typing

export type UsersNavigation = {
  [Screens.UsersListScreen]: undefined;
  [Screens.UsersPaginationScreen]: undefined;
};

export type RootNavigation = {
  [Screens.RootStack]: NavigatorScreenParams<UsersNavigation>;
};

// navigation stacks

// user screens can be added here
const UsersNavigationStack = createStackNavigator<UsersNavigation>();

const UsersNavigationNavigator: FC = () => {
  const {Navigator, Screen} = UsersNavigationStack;

  return (
    <Navigator>
      <Screen name={Screens.UsersListScreen} component={UserListScrollScreen} />
      <Screen
        name={Screens.UsersPaginationScreen}
        component={UsersPaginationScreen}
      />
    </Navigator>
  );
};

// all navigation stacks can be added here to the root navigation
const RootNavigation = createStackNavigator<RootNavigation>();

export const RootNavigationNavigator: FC = () => {
  const {Navigator, Screen} = RootNavigation;

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={Screens.RootStack} component={UsersNavigationNavigator} />
    </Navigator>
  );
};
