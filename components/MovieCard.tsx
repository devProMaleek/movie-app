import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import { fetchImageWidth500 } from '../api/moviedb';

type Props = {
  movie: Movie;
  onPress: () => void
};

let { width, height } = Dimensions.get('window');

const MovieCard = ({ movie, onPress }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        source={{ uri: fetchImageWidth500(movie.poster_path) }}
        style={{ width: width * 0.6, height: height * 0.4 }}
        className='rounded-3xl'
      />
    </TouchableWithoutFeedback>
  );
};

export default MovieCard;
