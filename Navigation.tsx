import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';

const Stack = createNativeStackNavigator();

type Props = {};

const Navigation = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
