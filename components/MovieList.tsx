import { View, Text, TouchableOpacity, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { styles } from '../themes';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  title: string;
  data: number[];
};

let { width, height } = Dimensions.get('window');

const MovieList = ({ title, data }: Props) => {
  let movieName = 'Ant-Man and the Wasp: Quantumania';
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-lg">{title}</Text>
        <TouchableOpacity>
          <Text style={styles.text} className="text-base">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback key={index} onPress={() => {}}>
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