import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  HomeScreen: undefined; // No parameters
};

export type NavigationProps = StackNavigationProp<RootStackParamList, 'HomeScreen'>;
