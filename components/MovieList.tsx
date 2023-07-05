import { View, Text, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback } from 'react';
import { styles } from '../themes';
import { ScrollView } from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  title: string;
  data: number[];
  hideSeeAll?: boolean;
};

let { width, height } = Dimensions.get('window');

const MovieList = ({ title, data, hideSeeAll }: Props) => {
  let movieName = 'Ant-Man and the Wasp: Quantumania';
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleMovieCardPress = useCallback(
    (movie: any) => {
      navigation.push('MovieScreen', movie);
    },
    [navigation]
  );
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-base">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data.map((movie, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                handleMovieCardPress(movie);
              }}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={require('../assets/images/moviePoster2.png')}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-neutral-300 ml-1">
                  {movieName.length > 14 ? `${movieName.slice(0, 14)}...` : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
