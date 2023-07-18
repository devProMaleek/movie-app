import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { fallbackPersonImage, fetchImageWidth185 } from '../api/moviedb';

type Props = {
  casts: Cast[];
  navigation: NativeStackNavigationProp<ParamListBase>;
};

const Cast = ({ casts, navigation }: Props) => {

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
            let personName = cast.original_name || cast.name;
            let characterName = cast.character;
            return (
              <TouchableOpacity onPress={() => handleCastPress(cast)} key={index} className="mr-4 items-center">
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image source={{uri: fetchImageWidth185(cast?.profile_path) || fallbackPersonImage}} className="rounded-2xl h-24 w-20" />
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
