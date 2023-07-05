import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MovieScreen from './screens/MovieScreen';
import SplashScreen from './screens/SplashScreen';
import CastScreen from './screens/CastScreen';

type RootStackParamList = {
  SplashScreen: undefined;
  HomeScreen: undefined;
  MovieScreen: undefined;
  CastScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {};

const Navigation = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="SplashScreen"
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="MovieScreen" options={{ headerShown: false }} component={MovieScreen} />
        <Stack.Screen name="CastScreen" options={{ headerShown: false }} component={CastScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
