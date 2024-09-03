import React from 'react';
import { HomeScreen } from './src/screens';

const App = () => {

  return (
    <HomeScreen />
  );
};

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified']);

export default App;
