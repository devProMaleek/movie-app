import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../themes';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';

type Props = {};

let { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const MovieScreen = (props: Props) => {
  let movieName = 'Ant-Man and the Wasp: Quantumania';
  const { params: item } = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [casts, setCasts] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  const [similarMovies, setSimilarMovies] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);

  const toggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);

  useEffect(() => {}, [item]);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      <View className="w-full">
        <SafeAreaView
          className={`absolute z-20 w-full flex-row justify-between items-center px-4 ${isIOS ? ' ' : 'mt-3'}`}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleFavorite}>
            <HeartIcon size="35" color={isFavorite ? theme.background : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image source={require('../assets/images/moviePoster2.png')} style={{ width, height: height * 0.55 }} />
          <LinearGradient
            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>
      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-3xl text-center font-bold tracking-wider">{movieName}</Text>
        <Text className="text-neutral-400 font-semibold text-base text-center">Released • 2022 • 170 min</Text>

        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">• Action </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">• Thrill </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">• Comedy </Text>
        </View>

        <Text className="text-neutral-400 mx-4 tracking-wide text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, eveniet aliquam laborum suscipit recusandae
          deserunt debitis molestiae minima explicabo doloremque? Perspiciatis, ea. Et, magni! Dolorem, magnam delectus!
          Assumenda deserunt ullam voluptatem cumque sapiente repellendus fugiat sequi at saepe quas voluptate minima a
          perspiciatis, labore expedita porro, hic, nesciunt praesentium nemo.
        </Text>
      </View>

      <Cast navigation={navigation} casts={casts} />

      <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
    </ScrollView>
  );
};

export default MovieScreen;
