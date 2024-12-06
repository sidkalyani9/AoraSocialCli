import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../constants'
import {FormField} from '../../components/FormField'
import { CustomButton } from '../../components/CustomButton'
import { createUser, getCurrentUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
const SignUp = () => {
  const navigation = useNavigation()
  const { setUser, setIsLoggedIn } = useGlobalContext()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert("Missing Information", "Please enter all details")
      return
    }
    if (formData.password.length < 8) {
      Alert.alert("Invalid Password", "Password must be at least 8 characters long")
      return
    }
    if (!formData.email.includes('@')) {
      Alert.alert("Invalid Email", "Please enter a valid email address")
      return
    }
    setIsSubmitting(true)
    try {
      const user = await createUser(formData.username, formData.email, formData.password)
      if (user) {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
        setIsLoggedIn(true)
        navigation.replace('tabs', { screen: 'home' })
      }
    } catch (error) {
      console.error(error)
      Alert.alert(
        "Sign Up Failed",
        error.message || "An error occurred during sign up. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }
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
            handleChangeText={(e) => setFormData({...formData, username: e.nativeEvent.text})}
            otherStyles="mt-10"
            placeholder="Enter your username"
          />
          <FormField
            title="Email"
            value={formData.email}
            handleChangeText={(e) => setFormData({...formData, email: e.nativeEvent.text})}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Enter your email"
          />
          <FormField
            title="Password"
            value={formData.password}
            handleChangeText={(e) => setFormData({...formData, password: e.nativeEvent.text})}
            otherStyles="mt-7"
            secureTextEntry={true}
            placeholder="Enter your password"
          />
          <CustomButton
            customText="Sign Up"
            containerStyles='mt-6'
            handlePress={submit}
            isLoading={isSubmitting}
            CustomLoadingText="Signing up..."
          />
          <View className='justify-center flex-row gap-2 pt-5'>
            <Text className='text-base text-gray-100 font-pregular'>
              Have an account already?{' '}
              <Text
                onPress={() => navigation.navigate('signin')}
                className='text-secondary-100 text-base font-psemibold'
              >
                Sign In here
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
export default SignUp