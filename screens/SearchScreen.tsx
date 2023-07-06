import { View, Text, Dimensions, TextInput, TouchableOpacity, Button } from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation, useRoute, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { theme } from '../themes';

type Props = {};
type FormValues = {
  searchValue: string;
};

const { width, height } = Dimensions.get('window');

const SearchScreen = (props: Props) => {
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

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="flex-row justify-between items-center">
        <View className="mb-3 w- flex-row justify-between items-center border border-neutral-500 rounded-full">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
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
        <TouchableOpacity onPress={handleCancelPress} className="rounded-full p-3 m-1 bg-neutral-500">
            <XMarkIcon size="25" color="white" />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
