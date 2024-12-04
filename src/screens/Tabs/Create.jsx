import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert} from 'react-native'
import React, { useState } from 'react'
import { FormField } from '../../components/FormField'
import {icons} from '../../constants'
// import { ResizeMode, Video } from 'expo-av'
import { CustomButton } from '../../components/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import { createVideoPost } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
// import { router } from 'expo-router'


const Create = () => {
  
  const [isUploading, setIsUploading] = useState(false)
  const {formData, setFormData} = useGlobalContext()

  const { user } = useGlobalContext()

  const submit = async () => {
    
      if(formData.prompt === '' || !formData.thumbnail || !formData.video || formData.title === ''){
        Alert.alert("Please fill in all details")
      } 
      else{
        setIsUploading(true)

        try{
          await createVideoPost({
            ...formData,
            userId: user.$id
          })

          Alert.alert("Success", "Post Uploaded Successfully")
          // router.push('/home')
        }
        catch(error){
          console.log(error);
          
          Alert.alert("Error",error)
        }
        finally{
          setFormData({
            title:'',
            video:null,
            thumbnail:null,
            prompt:''
          })
        }

        setIsUploading(false)
      }
  }

  const {width:screenWidth} = Dimensions.get('window')

  const videoStyles = {
    width: screenWidth*0.92, // Use dynamic width
    height: screenWidth*0.41, // Use dynamic height
    borderRadius: 18
  };

  const openPicker = async(type) => {
    if(type==='thumbnail'){
      router.push('/click-picture')
    }
    else{
      const result = await DocumentPicker.getDocumentAsync({
        type: type==='video'
          ? ['video/mp4', 'video/gif']
          : ['image/png', 'image/jpeg']
      })
  
      if(!result.canceled){
        if(type === 'video'){
          setFormData({...formData, video: result.assets[0]})
        }
        else{

          setFormData({...formData, thumbnail: result.assets[0]})
        }
      }
    }
  }


  return (
    <View className="bg-primary h-full">
      <ScrollView
        className="px-4 my-6"
      >
        <Text
          className="text-2xl text-white font-psemibold"
        >
          Upload Video
        </Text>

        <FormField
          title={"Video Title"} 
          value={formData.title}
          placeholder={"Give your video a catchy title..."}
          handleChangeText={(e) => setFormData({...formData, title:e.nativeEvent.text})}
          otherStyles={"mt-10"}
        />

        <View className="mt-7 space-y-2">
          
          <Text className="text-base text-gray-100 font-pmedium mb-2" >
            Uploading Video
          </Text>

          <TouchableOpacity
            onPress={() => openPicker('video')}
          >
            {
              formData.video?
              (
                // <Video 
                //   source={{
                //     uri:formData.video.uri
                //   }}
                //   style={videoStyles}
                //   className="w-full h-64 rounded-2xl"
                //   resizeMode={ResizeMode.COVER}
                //   isLooping
                // />
                <></>
              )
              :
              (
                <View
                  className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center"
                >
                  <View
                    className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center"
                  >
                    <Image 
                      source={icons.upload}
                      className="w-1/2 h-1/2"
                      resizeMode='contain'
                    />
                  </View>
                </View>
              )
            }
          </TouchableOpacity>

        </View>

        <View className="mt-7 space-y-2">
          
          <Text className="text-base text-gray-100 font-pmedium mb-2"> 
            Upload Thumbnail
          </Text>

          <TouchableOpacity
            onPress={() => openPicker('thumbnail')}
          >
            {
              formData.thumbnail?
              (
                <Image 
                  source={{
                    uri:formData.thumbnail.uri
                  }}
                  className="w-full h-40 rounded-2xl"
                  resizeMode='cover'
                />
              )
              :
              (
                <View
                  className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center"
                >
                  <View
                    className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center"
                  >
                    <Image 
                      source={icons.upload}
                      className="w-1/2 h-1/2"
                      resizeMode='contain'
                    />
                  </View>
                </View>
              )
            }
          </TouchableOpacity>

        </View>

        <FormField
          title={"Description"} 
          value={formData.prompt}
          placeholder={"Enter a suitable description for your video..."}
          handleChangeText={(e) => setFormData({...formData, prompt:e.nativeEvent.text})}
          otherStyles={"mt-7"}
        />

        <CustomButton 
          customText={"Submit & Publish"}
          CustomLoadingText={"Publishing..."}
          handlePress={submit}
          containerStyles={"mt-7"}
          isLoading={isUploading}
        />

      </ScrollView>
    </View>
  )
}

export default Create