import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export function CustomButton(
    {
        customText, 
        handlePress, 
        containerStyles,
        containerViewStyles, 
        textStyles, 
        isLoading, 
        CustomLoadingText
    }) {
        
    
    return (
    <View className={`${containerViewStyles}`}>
        <TouchableOpacity 
            className={`bg-secondary-100 rounded-2xl min-h-[62px] min-w-full justify-center items-center ${containerStyles} ${isLoading? 'opacity-50' : ''}`}
            onPress={handlePress}    
            activeOpacity={0.7}
            disabled={isLoading}
        >
            <Text className={`text-primary text-xl font-psemibold ${textStyles}`}>{isLoading? CustomLoadingText : customText}</Text>
        </TouchableOpacity>
    </View>
  )
}