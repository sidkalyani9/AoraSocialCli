import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
// import { ResizeMode, Video } from 'expo-av'

export const VideoCard = (
    {
        video: 
        {
            title, 
            thumbnail, 
            video, 
            creator:
            {
                username, 
                avatar
            }
        }
    }) => {

        const [play, setPlay] = useState(false)
        const {width:screenWidth} = Dimensions.get('window')
        const videoStyles = {
            width: screenWidth*0.935, // Use dynamic width
            height: 205, // Use dynamic height
            borderRadius: 12,
            marginTop:16
            // marginTop:screenWidth*0.055,
            // overflow: 'hidden',
            // shadowColor: 'rgba(0, 0, 0, 0.4)',
            // shadowOpacity: 1,
            // shadowOffset: { width: 0, height: 2 },
            // shadowRadius: 4,
          };

  return (
    <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] border rounded-lg border-secondary-100 justify-center items-center">
                    <Image
                        source={{uri:avatar}}
                        className="w-full h-full rounded-lg"
                        resizeMode='contain'
                    />
                </View>
                <View className="justify-center flex-1 ml-3 gap-y-1">
                    <Text 
                        className="text-white font-psemibold text-sm"
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                    <Text 
                        className="text-xs text-gray-100 font-pregular"
                        numberOfLines={1}
                    >
                        {username}
                    </Text>
                </View>
            </View>

            {/* <View className="pt-2">
            <Image 
                    source={icons.menu}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </View> */}

        </View>

        {   
            play? 
                (
                    // <Video 
                    //     source={{uri: video}}
                    //     style={videoStyles}
                    //     useNativeControls
                    //     shouldPlay
                    //     onPlaybackStatusUpdate={(status) => {
                    //         if(status.didJustFinish){
                    //         setPlay(false)
                    //         }
                    //     }}
                    //     resizeMode={ResizeMode.COVER}
                    // />
                    <></>
                )
            :
                <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center "
                >
                    <Image 
                        source={{
                            uri:thumbnail
                        }}
                        className="w-full h-full rounded-xl mt-3 bg-black-200"
                        resizeMode='cover'
                    />
                    <Image 
                        source={icons.play}
                        className="w-12 h-12 absolute"
                    />
                </TouchableOpacity>
        }

    </View>
  )
}