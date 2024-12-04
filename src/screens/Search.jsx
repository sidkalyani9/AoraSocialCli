import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { SearchInput } from '../components/SearchInput'
import useAppwrite from '../lib/useAppwrite'
import { searchPosts } from '../lib/appwrite'
import { VideoCard } from '../components/VideoCard'
// import { useLocalSearchParams } from 'expo-router'
import { EmptyState } from '../components/EmptyState'
import { Loader } from '../components/Loader'
import { useRoute } from '@react-navigation/native'

const Search = () => {
  // const { query: searchParams } = useLocalSearchParams()
  const route = useRoute();
  const { searchParam } = route.params;
  const {data:posts , refetch, loading} = useAppwrite(searchPosts, searchParam);
  

  useEffect(() => {
    refetch()
  }, [searchParam])

  return (
    <View className="bg-primary w-full h-full">
      <View className="my-6 px-4">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Search results
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  { searchParam }
                </Text>
                <View
                  className="mt-6 mb-2"
                >
                  <SearchInput
                    initialQuery={searchParam} 
                    placeholder={"Search for a video topic"}
                  />
                </View>
                </View>
            </View>
      <FlatList 
        data={[...posts].reverse()}     // spreading operator is used to create copy instead of reversing original posts array
        keyExtractor={(item) => item.$id}
        
        renderItem={({item}) => (  
          <View className="">      
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
        ListEmptyComponent={() => (
          <View className="">      
            {
              !loading?
              (
                <EmptyState 
                  title="No Videos Found"            
                  subtitle="No Videos found for this search"
                />
              )
              :
              (
                <Loader />
              )
            }
          </View>
        
      )}
      />
    </View>
    
  )
}

export default Search