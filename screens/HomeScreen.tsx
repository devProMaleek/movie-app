import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

type Props = {};

const HomeScreen = (props: Props) => {
  return (
      <View className='flex-1 bg-neutral-800 items-center justify-center'>
        <Text className="text-2xl text-green-500">Welcome to this movie app</Text>
        <Text className="text-green-500">Developed by Abdulmalik Adebayo (devProMaleek)</Text>
      </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
