import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import { CustomButton } from './CustomButton'
// import { router } from 'expo-router'

export const EmptyState = ({title, subtitle}) => {
  return (
    <View className="w-[90vw] mx-auto justify-center items-center flex-1 px-4">

        <Image 
            source={images.empty}
            className="w-[270px] h-[215px]"
            resizeMode='contain'
        />

        <Text className="font-psemibold text-xl text-white">
            {title}
        </Text>

        <Text className="font-pmedium text-sm mt-2 text-gray-100">
            {subtitle}
        </Text>

        <CustomButton 
          customText="Create Video" 
          containerViewStyles={"my-5"}
          // handlePress={() => router.push("/create")}  
          CustomLoadingText={"Creating"}
        />

    </View>
  )
}