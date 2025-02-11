import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  AuthScreen: undefined;
  HomeScreen: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
