import { View, Image, TouchableOpacity } from 'react-native'
import React  from 'react'
import { FlatList } from 'react-native'

import useAppwrite from '../../lib/useAppwrite'
import { getUserPosts, searchPosts, signOut } from '../../lib/appwrite'
import { VideoCard } from '../../components/VideoCard'
// import { router } from 'expo-router'
import { EmptyState } from '../../components/EmptyState'
import { Loader } from '../../components/Loader'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'

const Profile = () => {

  const {user, setUser, setIsLoggedIn} = useGlobalContext()
  
  const {data:posts , refetch, loading} = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    // router.replace('/')
  }

  return (
    <View className="bg-primary w-full h-full">
      <View className="w-full justify-center items-center mt-6 mb-12 px-4">
        <TouchableOpacity 
          onPress={logout}
          className='w-full items-end mb-10'
        >
          <Image 
            source={icons.logout}
            className='w-6 h-6'
            resizeMode='contain'
          />
        </TouchableOpacity>

        <View className='w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center'>
          <Image 
            source={{
              uri:user?.avatar
            }}
            className='w-[90%] h-[90%] rounded-lg'
            resizeMode='contain'
          />
        </View>   

        <InfoBox 
          title={user?.username}
          containerStyles={"mt-5"}
          titleStyles={"text-lg"}
        />

        <View
          className='mt-5 flex-row'
        >

          {
            !loading?
            (
              <>
              <InfoBox
                title={posts?.length || 0}
                subtitle={"posts"}
                containerStyles={"mr-5"}
                titleStyles={"text-xl"}
              />
    
              <InfoBox 
                title={"1.2k"}
                subtitle={"followers"}
                titleStyles={"text-xl"}
              />
              </>
            )
            :
            (
              <Loader />
            )
          }

          

        </View>
      
      </View>
      <FlatList 
        data={[...posts].reverse()}     // spreading operator is used to create copy instead of reversing original posts array
        keyExtractor={(item) => item.$id}
        
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
        
        ListEmptyComponent={() => (
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
      )}
      />
    </View>
    
  )
}

export default Profile