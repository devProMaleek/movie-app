import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../themes';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { fetchPersonDetails, fetchImageWidth342, fallbackPersonImage, fetchPersonMovies } from '../api/moviedb';

type Props = {};

let { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const CastScreen = (props: Props) => {
  const { params: item } = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [cast, setCast] = useState<Actor>();
  const [featuredMovies, setFeaturedMovies] = useState<Cast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    console.log(item, 'Cast data');
    getPersonDetails(item?.id);
    getPersonMovies(item?.id);
  }, [item]);

  const getPersonMovies = useCallback(async (id: number) => {
    try {
      const data = await fetchPersonMovies(id);
      console.log(data, 'Cast data');
      if (data && data.cast) setFeaturedMovies(data.cast);
      setLoading(false);
    } catch (error) {
      console.log(error, 'GET_PERSON_MOVIES_ERROR');
    }
  }, []);

  const getPersonDetails = useCallback(async (id: number) => {
    try {
      const data = await fetchPersonDetails(id);
      console.log(data, 'Cast data');
      if (data) setCast(data as unknown as Actor);
      setLoading(false);
    } catch (error) {
      console.log(error, 'GET_PERSON_ERROR');
    }
  }, []);

  const toggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      <SafeAreaView className={`z-20 w-full flex-row justify-between items-center px-4 ${isIOS ? ' ' : 'my-3'}`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.background} className="rounded-xl p-1">
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleFavorite}>
          <HeartIcon size="35" color={isFavorite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <View>
            <View
              className="flex-row justify-center"
              style={{ shadowColor: 'gray', shadowOpacity: 1, shadowRadius: 40, shadowOffset: { width: 0, height: 5 } }}
            >
              <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                <Image
                  source={{ uri: fetchImageWidth342(cast?.profile_path) || fallbackPersonImage }}
                  style={{ width: width * 0.8, height: height * 0.5 }}
                />
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-3xl text-white font-bold text-center">{cast?.name}</Text>
              <Text className="text-base text-neutral-500 text-center">{cast?.place_of_birth}</Text>
            </View>
            <View className="mx-3 mt-6 p-4 flex-row justify-center items-center rounded-full bg-neutral-700">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">{cast?.gender === 1 ? 'Female' : 'Male'}</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">{cast?.birthday}</Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known for</Text>
                <Text className="text-neutral-300 text-sm">{cast?.known_for_department}</Text>
              </View>
              <View className=" px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">{cast?.popularity?.toFixed(2)} %</Text>
              </View>
            </View>

            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              {cast?.biography ? (
                <Text className="text-neutral-400 tracking-wide text-justify">{cast?.biography}</Text>
              ) : (
                <>
                  <Text className="text-neutral-400 tracking-wide text-center my-4">
                    This person's biography is not available.
                  </Text>
                </>
              )}
            </View>

            <MovieList title="Featured Movies" hideSeeAll={true} data={featuredMovies} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default CastScreen;
