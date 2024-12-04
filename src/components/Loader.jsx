import { View, Text, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'

export const Loader = () => {

    const {width:screenWidth} = Dimensions.get('window')
    const trendingSectionStyles = {
        height: screenWidth*0.8, // Use dynamic height
        marginTop:screenWidth*0.055,
      };

  return (
    <View 
        style={trendingSectionStyles}
        className='flex items-center justify-center'
    >
        <Text className='text-2xl text-gray-100 mb-3'>Loading</Text>
        <ActivityIndicator size="small" color="#0000ff" />
    </View>
  )
}