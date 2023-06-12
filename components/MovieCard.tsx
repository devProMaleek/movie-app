import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';

type Props = {
  movie: number;
  onPress: () => void
};

let { width, height } = Dimensions.get('window');

const MovieCard = ({ movie }: Props) => {
  return (
    <TouchableWithoutFeedback>
      <Image
        source={require('../assets/images/moviePoster1.png')}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className='rounded-3xl'
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
