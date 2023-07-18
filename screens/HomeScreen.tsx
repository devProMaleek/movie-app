import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../themes';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

type Props = {};

const isIOS = Platform.OS === 'ios';

const HomeScreen = (props: Props) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>();
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>();
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>();
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const getTrendingMovies = useCallback(async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      setTrendingMovies(data.results);
    }
    setLoading(false);
  }, []);

  const getUpcomingMovies = useCallback(async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) {
      setUpcomingMovies(data.results);
    }
    setLoading(false);
  }, []);

  const getTopRatedMovies = useCallback(async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) {
      setTopRatedMovies(data.results);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={`${isIOS ? '-mb-2' : 'mb-3'} `}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-2xl font-bold">
            <Text style={styles.text}>M</Text>ovie<Text style={styles.text}>X</Text>pertise
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} className="">
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
            {trendingMovies && <TrendingMovies data={trendingMovies} />}

            {upcomingMovies && <MovieList title="Upcoming Movies" data={upcomingMovies} />}

            {topRatedMovies && <MovieList title="Top Rated Movies" data={topRatedMovies} />}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
