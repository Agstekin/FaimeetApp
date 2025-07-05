// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <AppNavigator />
    </>
  );
};

export default App;
