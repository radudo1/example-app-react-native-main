/* 
  Documentation of typings for Navigation:
  https://reactnavigation.org/docs/typescript#type-checking-the-navigator

  This file makes the navigation typesafe and provides access to the navigation props
*/

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
