import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { images } from '../../constants'
import {FormField} from '../../components/FormField'
import { CustomButton } from '../../components/CustomButton'
// import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
// import { signIn } from '../../lib/appwrite'
import { useNavigation } from '@react-navigation/native'

const SignIn = () => {

  const { setUser, setIsLoggedIn } = useGlobalContext()

  const navigation = useNavigation()

  const [formData, setFormData] = useState({
    email:'',
    password:''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    console.log("SignIn: " + signIn);
    if (!formData.email || !formData.password) {
      Alert.alert("Please enter all details");
    } else {
      setIsSubmitting(true);
  
      try {
        
        const session = await signIn(formData.email, formData.password);
        console.log("Session:", session);
        if (session) {
          const currentUser = null
          await getCurrentUser();
          setUser(currentUser);
          setIsLoggedIn(true);
          navigation.replace('Home')
          // router.replace('/home')
        } else {
          Alert.alert("Invalid Credentials", "Please input valid credentials");
        }
      } catch (e) {
        console.log(e);
        Alert.alert("Error", e.message || e);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  


  return (
    <View className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center h-[80vh] px-4 my-6'>
          <Image 
            source={images.logo}
            className='w-[115px] h-[35px]'
            resizeMode='contain'
          />
          <Text className='font-psemibold text-white text-2xl mt-14'>Log in to Aora</Text>

          <FormField 
            title="Email"
            value={formData.email}
            handleChangeText = {(e) => setFormData({...formData, email:e.nativeEvent.text})}
            otherStyles="mt-10"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={formData.password}
            handleChangeText = {(e) => setFormData({...formData, password:e.nativeEvent.text})}
            otherStyles="mt-7"
          />

          <CustomButton 
            customText={"Sign In"}
            containerStyles={'mt-6 '}
            handlePress={submit}
            isLoading={isSubmitting}
            CustomLoadingText={"Signing in..."}
          />

          <View className='justify-center flex-row gap-2 pt-5'>
            <Text className='text-base text-gray-100 font-pregular'>
              Don't have an account? {' '}
              {/* <Link href="/sign-up" className='text-secondary-100 text-base font-psemibold'>Sign Up here</Link>   */}
            </Text>
          </View>

        </View>
      </ScrollView>
      
    </View>
  )
}

export default SignIn