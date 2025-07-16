// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { toastConfig } from './utils/toastConfig';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <AppNavigator />
      <Toast config={toastConfig} />
    </>
  );
};

export default App;
