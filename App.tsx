import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamList } from './src/navigation.models';
import HomeScreen from './src/screens/Home';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Quick Update Real Dead or Alive',
            headerBlurEffect: 'light',
            headerStyle: {
              backgroundColor: '#97ce4c',
            },
            headerTintColor: 'white',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
