import React, { useEffect } from 'react';
import { Text, View, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { styles } from '../themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

type RootStackParamList = {
  SplashScreen: undefined;
  HomeScreen: undefined;
};

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SplashScreen'>;

type SplashScreenRouteProp = RouteProp<RootStackParamList, 'SplashScreen'>;

type SplashScreenProps = {
  navigation: SplashScreenNavigationProp;
  route: SplashScreenRouteProp;
};

const isIOS = Platform.OS === 'ios';

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('HomeScreen');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <View className="flex flex-1 justify-center items-center bg-neutral-800">
      <SafeAreaView className={`${isIOS ? '-mb-2' : 'mb-3'} `}>
        <StatusBar style="light" />
        <Text className="text-white text-4xl font-bold">
          <Text style={styles.text}>M</Text>ovie<Text style={styles.text}>X</Text>pertise
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default SplashScreen;
