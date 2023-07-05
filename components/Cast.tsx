import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

type Props = {
  casts: number[];
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Cast = ({ casts, navigation }: Props) => {
  let personName = 'Keanu Reevs';
  let characterName = 'John Wick';

  const handleCastPress = useCallback(
    (cast: any) => {
      navigation.navigate('CastScreen', cast);
    },
    [navigation]
  );
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
        {casts &&
          casts.map((cast, index) => {
            return (
              <TouchableOpacity onPress={() => handleCastPress(cast)} key={index} className="mr-4 items-center">
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image source={require('../assets/images/castImage1.png')} className="rounded-2xl h-24 w-20" />
                </View>
                <Text className="text-white text-xs mt-1">
                  {characterName.length > 10 ? `${characterName.slice(0, 10)}...` : characterName}
                </Text>
                <Text className="text-white text-xs mt-1">
                  {personName.length > 10 ? `${personName.slice(0, 10)}...` : personName}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
