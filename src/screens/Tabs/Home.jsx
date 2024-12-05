import { View, Text, Image, RefreshControl, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import { images } from '../../constants'
import { SearchInput } from '../../components/SearchInput'
import { Trending } from '../../components/Trending'
import useAppwrite from '../../lib/useAppwrite'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite'
import { VideoCard } from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { Loader } from '../../components/Loader'

const Home = () => {

  const { user } = useGlobalContext();
  const [userState, setUserState] = useState(true);
  
  const {data:posts, loading , refetch} = useAppwrite(getAllPosts);
  
  const {data:latestPosts, refetch:refetchLatestPosts} = useAppwrite(getLatestPosts);
  
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (user) {
      setUserState(false);
    }
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    await refetchLatestPosts();
    setRefreshing(false)
  }

  return (
    <View className="bg-primary w-full h-full">
      <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {
                    userState?
                    ''
                    :
                    user?.username
                  }
                </Text>
              </View>

              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInput 
              placeholder={"Search for a video topic"}
            />
            </View>
      <FlatList 
        data={[...posts].reverse() || []}     // spreading operator is used to create copy instead of reversing original posts array
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({item}) => (  
          <View className="mt-5">   
            {
              !loading?
              (
                <VideoCard video={item}/>
              )
              :
              (
                <Loader />
              )
            }   
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-2 px-4 space-y-6">
            <View className="w-full flex-1">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Trending Videos
              </Text>

              {!loading? 
              (
                <Trending 
                  posts={latestPosts ?? []}
                  refetch={refetchLatestPosts}
                  loading={loading}
                />
              )
              :
              (
                (
                  <Loader />
                )
              )
              }
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
    
  )
}

export default Home