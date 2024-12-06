import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { Redirect, router } from 'expo-router'
import { images } from '../constants'
import { CustomButton } from '../components/CustomButton'
import { useGlobalContext } from '../context/GlobalProvider'
import { useNavigation } from '@react-navigation/native'
// import { Image as ExpoImage } from 'expo-image'

const LandingPage = () => {

  const {isLoading, isLoggedIn} = useGlobalContext();
  const [loading, setLoading] = useState(true)
  const gifUri = require('../assets/splash.gif');
  const {width:screenWidth} = Dimensions.get('window')

  const imageStyles = {
    width: screenWidth*0.9,
    height: screenWidth*0.9,
    marginTop:16
  };

  useEffect(() => {
    setLoading(isLoading)
  },[isLoading])

  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      console.log("res loading: " + isLoading);
      
      // Navigate after rendering to avoid state update during render
      navigation.replace('tabs', { screen: 'home' });
    }
  }, [isLoading, isLoggedIn, navigation]);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  else{
    return (
      <View className='bg-primary h-full'>
        <ScrollView
          contentContainerStyle={{
            height:'100%'
          }}
        >
          <View className='w-full h-full justify-start items-center px-4'>
            
            <Image 
              source={images.logo}
              className='w-40 h-16 mt-2'
              resizeMode='contain'
            />
  
            <Image
              source={images.cards}
              style={imageStyles}
              className=' max-w-[450px]'
              resizeMode='contain'
            />
          
            <View className='my-2'> 
              <Text className=' text-4xl text-white font-bold text-center'>
                Discover Endless Possibilities with {' '}
                <Text className='text-secondary-200'>
                  Aora
                </Text>
              </Text>
                  <Image 
                    source={images.path}
                    className='w-[150px] h-[20px] absolute -bottom-3 -right-10'
                    resizeMode='contain'
                  />
              
            </View>
  
            <Text 
              className='w-[90vw] text-base font-pregular text-gray-100 mt-6 text-center'
            >
              Where creativity meets innovation: embard on a journey of limitless exploration with Aora
            </Text>
          
            <CustomButton 
              customText={"Continue with Email"}
              handlePress={() => navigation.replace('auth', {screen: 'signin'})}  
              containerStyles="mt-10 "
              containerViewStyles="absolute bottom-10"
              isLoading={isLoading}
            />
  
          </View>
  
  
        </ScrollView>
  
        
  
      </View>
    )
  }

  

  
}

export default LandingPage

const styles = StyleSheet.create({})