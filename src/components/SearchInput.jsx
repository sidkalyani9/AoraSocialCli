import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';
// import { router, usePathname } from 'expo-router';

export const SearchInput = ({placeholder, initialQuery}) => {

    // const pathName = usePathname()
    const [searchParam, setSearchParam] = useState(initialQuery || '')
    const [focused, setFocused] = useState(false)

  return (
    
      <View className={`border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row  text-white font-psemibold text-base ${focused?'border-secondary-100': ''} space-x-4`}>
        <TextInput 
            className='flex-1 mt-0.5 text-base text-white font-regular h-full'
            value={searchParam}
            placeholder={placeholder}
            placeholderTextColor="#CDCDE0"
            onChange={(e) => {
                console.log(e.nativeEvent.text)
                setSearchParam(e.nativeEvent.text)
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />

        <TouchableOpacity
            onPress={() => {
                if(searchParam === ''){
                    Alert.alert("Please Search first")
                }
                else{
                    // if(pathName.startsWith('/search')){
                    //     console.log(pathName + "" + searchParam)
                    //     router.setParams({searchParam})
                    // }
                    // else{
                        // router.push(`/search/${searchParam}`)
                //}
                }
            }}
        >
            <Image 
                source={icons.search}
                className="w-5 h-5"
            />
        </TouchableOpacity>
        
      </View>
    
  )
}