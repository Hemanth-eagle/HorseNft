import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import { RootStackParamList } from '../types/navigation';


const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
           <Stack.Screen name="HomeScreen"  component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
