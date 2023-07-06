import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useNavigation, useRoute, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../themes';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import MovieList from '../components/MovieList';

type Props = {};

let { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const CastScreen = (props: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [featuredMovies, setFeaturedMovies] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);

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

      <View>
        <View
          className="flex-row justify-center"
          style={{ shadowColor: 'gray', shadowOpacity: 1, shadowRadius: 40, shadowOffset: { width: 0, height: 5 } }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
            <Image
              source={require('../assets/images/castImage2.png')}
              style={{ width: width * 0.8, height: height * 0.5 }}
            />
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">Keanu Reeves</Text>
          <Text className="text-base text-neutral-500 text-center">London, United Kingdom</Text>
        </View>
        <View className="mx-3 mt-6 p-4 flex-row justify-center items-center rounded-full bg-neutral-700">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm">Male</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">1964-09-02</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known for</Text>
            <Text className="text-neutral-300 text-sm">Action</Text>
          </View>
          <View className=" px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">64.23</Text>
          </View>
        </View>

        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque rerum consequuntur nihil natus accusamus
            repellendus. Ab, sit recusandae itaque dolor maiores quo eius eos ex quia nulla quis porro esse atque ad
            exercitationem quasi nemo ratione asperiores magnam aliquid illum at expedita. Recusandae vitae aliquam quis
            nihil, sunt accusantium ipsam nesciunt veritatis ipsum cumque beatae voluptatum quae eveniet reprehenderit
            perspiciatis sapiente rem qui pariatur nobis consequatur? Doloremque necessitatibus placeat, nisi mollitia
            ex voluptas cupiditate praesentium. Aliquam libero voluptate provident quasi modi, similique magnam mollitia
            delectus! Similique autem quo nostrum voluptates quos nesciunt, praesentium est doloribus animi,
            reprehenderit totam, aut sapiente.
          </Text>
        </View>

        <MovieList title='Featured Movies' hideSeeAll={true} data={featuredMovies} />
      </View>
    </ScrollView>
  );
};

export default CastScreen;
