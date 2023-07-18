import { View, Text, Dimensions } from 'react-native';
import React, { useCallback } from 'react';
import Carousel from 'react-native-snap-carousel';
import MovieCard from './MovieCard';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  data: Movie[];
};

let { width, height } = Dimensions.get('window');

const TrendingMovies = ({ data }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleMovieCardPress = useCallback(
    (item: any) => {
      navigation.navigate('MovieScreen', item);
    },
    [navigation]
  );
  return (
    <View className="mb-8">
      <Text className="text-white text-lg mx-4 mb-5">Trending Movies</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard movie={item} onPress={() => handleMovieCardPress(item)} />}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
};

export default TrendingMovies;
