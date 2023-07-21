import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { useNavigation, useRoute, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { theme } from '../themes';
import Loading from '../components/Loading';
import { debounce } from 'lodash';
import { fallbackMoviePoster, fetchImageWidth185, searchMovies } from '../api/moviedb';

type Props = {};
type FormValues = {
  searchValue: string;
};

const { width, height } = Dimensions.get('window');

const SearchScreen = (props: Props) => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const handleCancelPress = useCallback(() => {
    reset();
    navigation.navigate('HomeScreen');
  }, []);

  const handleSearch = async (value: string) => {
    console.log('Search value:', value);
    if (value && value.length > 1) {
      setLoading(true);
      try {
        const params = {
          query: value,
          page: 1,
          include_adult: false,
          language: 'en-US',
        };
        const data = await searchMovies(params);
        if (data && data.results) {
          setSearchResults(data.results);
        }
      } catch (error: any) {
        console.log(error, 'Search Error');
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setSearchResults([]);
    }
  };

  const handleTextDebounce = debounce((value: string) => {
    // Perform your logic here, which will be executed after the debounce delay
    handleSearch(value);
  }, 500);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mb-3 mx-4 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChangeText={(value) => {
                onChange(value);
                handleTextDebounce(value);
              }}
              value={value}
              placeholder="Search Movies"
              placeholderTextColor={'lightgray'}
              className="py-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
            />
          )}
          name="searchValue"
          rules={{ required: 'Search Value is required' }}
          defaultValue=""
        />

        <TouchableOpacity onPress={handleCancelPress} className="rounded-full p-3 m-1 bg-neutral-500">
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {searchResults.length > 0 ? (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                className="space-y-3"
              >
                <Text className="text-white font-semibold ml-1 text-base">Results ({searchResults.length})</Text>
                <View className="flex-row justify-between flex-wrap">
                  {searchResults.map((result, index) => {
                    let movieName = result?.title || result.original_title;
                    return (
                      <TouchableWithoutFeedback key={index} onPress={() => navigation.push('MovieScreen', result)}>
                        <View className="space-y-2 mb-4">
                          <Image
                            className="rounded-3xl"
                            source={{ uri: fetchImageWidth185(result.poster_path) || fallbackMoviePoster }}
                            style={{ width: width * 0.44, height: height * 0.3 }}
                          />
                          <Text className="text-neutral-300 ml-1">
                            {movieName.length > 14 ? `${movieName.slice(0, 14)}...` : movieName}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
              </ScrollView>
            </>
          ) : (
            <>
              <View className="flex-row justify-center">
                <Image source={require('../assets/images/movieTime.png')} className="h-96 w-96" />
              </View>
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
