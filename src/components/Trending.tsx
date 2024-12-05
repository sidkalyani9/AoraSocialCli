import { TouchableOpacity, ImageBackground, Dimensions, RefreshControl, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList } from 'react-native'
import { EmptyState } from './EmptyState'
import * as Animatable from 'react-native-animatable';
// import { Audio, ResizeMode, Video } from 'expo-av';
import { useGlobalContext } from '../context/GlobalProvider';
import { isLoading } from 'expo-font';
import { Loader } from './Loader';
import VideoPlayer, {VideoPlayerRef} from 'react-native-video-player';

const zoomIn = {
  0: {
    scale:0.9
  },
  1:{
    scale:1.1
  }
}

const zoomOut = {
  0: {
    scale:1
  },
  1:{
    scale:0.9
  }
}

const {width:screenWidth} = Dimensions.get('window')
// const playerRef = useRef<import('react-native-video-player').VideoPlayerRef>(null);
const playerRef = useRef<VideoPlayerRef>(null);


const videoStyles = {
  width: screenWidth*0.52, // Use dynamic width<VideoPlayerRef>
  height: screenWidth*0.8, // Use dynamic height
  borderRadius: 35,
  marginTop:screenWidth*0.055,
  overflow: 'hidden',
  shadowColor: 'rgba(0, 0, 0, 0.4)',
  shadowOpacity: 1,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
};

const TrendingItem = ({activeItem, item}) => {
  
  const [playing, setPlaying] = useState(false);
  // console.log(item);
  

  return(
    <Animatable.View
      className="mx-3"
      animation={activeItem === item.$id? zoomIn : zoomOut}
      duration={500}
    >
      {
        playing?
          (
            // <Video 
            //   ref={videoRef}
            //   source={{uri: item.video}}
            //   style={videoStyles}
            //   useNativeControls
            //   shouldPlay
            //   onPlaybackStatusUpdate={(status) => {
            //     if(status.didJustFinish){
            //       setPlaying(false)
            //     }
            //   }}
            //   resizeMode={ResizeMode.COVER}
            // />
            <VideoPlayer
              ref={playerRef}
              autoplay={true}
              source={{
                uri: item.video
              }}
              onError={(e) => console.log(e)}
              showDuration={false}
              style={videoStyles}
              resizeMode='cover'
              onEnd={() => setPlaying(false)}
            />
          )
          :
          (
            <TouchableOpacity 
              className="relative justify-center items-center"
              activeOpacity={0.7}
              onPress={() => setPlaying(true)}
            >
              <ImageBackground 
                className="w-[52vw] h-[80vw] rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 bg-black-200"
                resizeMode='cover'
                source={{
                  uri:item.thumbnail
                }}
              />
            </TouchableOpacity>
          )
      }
    </Animatable.View>
  )
}

export function Trending({posts = [], refetch = null, loading})  {
  
  const [activeItem, setActiveItem] = useState(posts[0])
  const [refreshing, setRefreshing] = useState(false)
  
  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }

  const viewableItemsChanged = ({viewableItems}) => {
    if(viewableItems.length > 0){
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
        data={posts || []}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({item}) => (
                <TrendingItem 
                  activeItem={activeItem}
                  item={item}
                />
            
        )}
        horizontal
        ListEmptyComponent={() => (
          !loading?
          (
            <EmptyState 
                title="No Videos Found"            
                subtitle="Be the first one to upload a video"
            />
          )
          :
          (
            <Loader />
          )
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold:80
        }}
        contentOffset={{ x:screenWidth*0.39 }}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
    />
  )
}