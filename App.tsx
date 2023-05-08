import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import WebviewContainer from './src/WebViewContainer';
import {Platform} from 'react-native';

const Stack = createStackNavigator<{
  Home: {
    params: {
      url: string;
    };
  };
}>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // ...TransitionPresets.SlideFromRightIOS,
          ...Platform.select({
            ios: TransitionPresets.SlideFromRightIOS,
            android: TransitionPresets.BottomSheetAndroid,
          }),
          headerShown: false,
        }}>
        <Stack.Screen
          options={{
            transitionSpec: {
              open: {
                animation: 'spring',
                config: {
                  stiffness: 2000,
                  damping: 1000,
                },
              },
              close: {
                animation: 'spring',
                config: {
                  stiffness: 1000,
                  damping: 500,
                },
              },
            },
          }}
          name="Home"
          component={WebviewContainer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
