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
import Loading from '../components/Loading';
import {
  fallbackMoviePoster,
  fetchImageWidth500,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
} from '../api/moviedb';

type Props = {};

let { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const MovieScreen = (props: Props) => {
  const { params: item } = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [movie, setMovie] = useState<ExtendedMovie>();
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const getMovieDetails = useCallback(async (id: number) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setMovie(data as unknown as ExtendedMovie);
    }
    setLoading(false);
  }, []);

  const getMovieCredits = useCallback(async (id: number) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) {
      setCasts(data.cast);
    }
    setLoading(false);
  }, []);

  const getSimilarMovies = useCallback(async (id: number) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getMovieDetails(item?.id);
    getMovieCredits(item?.id);
    getSimilarMovies(item?.id);
  }, [item]);

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
        {loading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <View>
              <Image
                source={{ uri: fetchImageWidth500(movie?.poster_path) || fallbackMoviePoster }}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
          </>
        )}
      </View>

      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        <Text className="text-white text-3xl text-center font-bold tracking-wider">
          {movie?.title || movie?.original_title}
        </Text>
        {movie?.id ? (
          <>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
            </Text>
          </>
        ) : null}

        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 !== movie.genres.length;
            return (
              <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                {genre?.name}
                {showDot ? '  •' : null}
              </Text>
            );
          })}
        </View>

        <Text className="text-neutral-400 mx-4 tracking-wide text-justify">{movie?.overview}</Text>
      </View>

      {casts.length > 0 && <Cast navigation={navigation} casts={casts} />}

      {similarMovies.length > 0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}
    </ScrollView>
  );
};

export default MovieScreen;
