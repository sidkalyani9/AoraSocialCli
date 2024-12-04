import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { images } from '../../constants'
import {FormField} from '../../components/FormField'
import { CustomButton } from '../../components/CustomButton'
// import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignUp = () => {

  const { setUser, setIsLoggedIn } = useGlobalContext()

  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:''
  })

  const submit = async () => {
    
    if(!formData.username || !formData.email || !formData.password){
      Alert.alert("Please enter all details")
    }
    
    setIsSubmitting(true);

    try{
      const user = await createUser(formData.username, formData.email, formData.password)
      setUser(user)
      setIsLoggedIn(true)
      // router.replace('/home')
    }
    catch(e){
      console.log(e);
      // Alert.alert('Error', e)
    }
    finally{
      setIsSubmitting(false)
    }
    

  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <View className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center h-[80vh] px-4 my-6'>
          <Image 
            source={images.logo}
            className='w-[115px] h-[35px]'
            resizeMode='contain'
          />
          
          <Text className='font-psemibold text-white text-2xl mt-10'>Sign Up to Aora</Text>

          <FormField 
            title="Username"
            value={formData.username}
            handleChangeText = {(e) => setFormData({...formData, username:e.nativeEvent.text})}
            otherStyles="mt-10"
          />
          
          <FormField 
            title="Email"
            value={formData.email}
            handleChangeText = {(e) => setFormData({...formData, email:e.nativeEvent.text})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={formData.password}
            handleChangeText = {(e) => setFormData({...formData, password:e.nativeEvent.text})}
            otherStyles="mt-7"
          />

          <CustomButton 
            customText={"Sign Up"}
            containerStyles={'mt-6 '}
            handlePress={submit}
            isLoading={isSubmitting}
            CustomLoadingText={"Signing up..."}
          />

          <View className='justify-center flex-row gap-2 pt-5'>
            <Text className='text-base text-gray-100 font-pregular'>
              Have an account already? {' '}
              {/* <Link href="/sign-in" className='text-secondary-100 text-base font-psemibold'>Sign In here</Link>   */}
            </Text>
          </View>

        </View>
      </ScrollView>
      
    </View>
  )
}

export default SignUp