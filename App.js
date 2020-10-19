import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Category from './Category';
import ImageComponent from './ImageComponent'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();



export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Category} options={{ headerShown: false }} />
        <Stack.Screen name="ImageComponent" component={ImageComponent} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )



}

