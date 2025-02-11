import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import { RootStackParamList } from '../types/navigation';


const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthScreen" screenOptions={{ headerShown: false }}>
           <Stack.Screen name="AuthScreen" component={AuthScreen} />
           <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
