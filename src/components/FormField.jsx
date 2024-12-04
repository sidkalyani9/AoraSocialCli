import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';

export const FormField = ({title, placeholder, value, handleChangeText, otherStyles, keyboardType}) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className=''>
        <TextInput 
            className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl items-center  text-white font-psemibold text-base focus:border-secondary-100'
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChange={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity
            className='w-8 h-8 absolute right-4 bottom-4'
            onPress={() => setShowPassword(!showPassword)}>
            <Image 
              source={icons.eye}
              style={showPassword?{tintColor:'#FF9C01'}:{}}
              className={`w-7 h-7 ${showPassword?'':''}`}
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}

        
      </View>
    </View>
  )
}