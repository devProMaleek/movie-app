import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress'
import { theme } from '../themes';

type Props = {}

const { width, height } = Dimensions.get('window');

const Loading = (props: Props) => {
  return (
    <View style={{height, width}} className='absolute flex-1 justify-center items-center'>
      <Progress.CircleSnail thickness={12} size={180} color={theme.background} />
      <Text className='text-center text-neutral-200 text-base font-semibold py-2'>Please wait...</Text>
    </View>
  )
}

export default Loading