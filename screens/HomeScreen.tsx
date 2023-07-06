import React, { useState } from 'react';
import { Text, View, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../themes';
import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';

type Props = {};

const isIOS = Platform.OS === 'ios';

const HomeScreen = (props: Props) => {
  const [trendingMovies, setTrendingMovies] = useState([1, 2, 3, 4, 5, 6]);
  const [upcomingMovies, setUpcomingMovies] = useState([1, 2, 3, 4, 5, 6]);
  const [topRatedMovies, setTopRatedMovies] = useState([1, 2, 3, 4, 5, 6]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
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
            <MagnifyingGlassIcon  size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
        <TrendingMovies data={trendingMovies} />

        <MovieList title="Upcoming Movies" data={upcomingMovies} />

        <MovieList title="Top Rated Movies" data={upcomingMovies} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
