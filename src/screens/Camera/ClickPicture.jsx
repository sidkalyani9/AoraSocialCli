import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker'
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import * as ImageManipulator from 'expo-image-manipulator';

export default function ClickPicture() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const {formData, setFormData} = useGlobalContext()
  const cameraRef = useRef(null);

  useEffect(() => {
    requestPermission()
  },[])

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const openPicker = async (type) => {
    if (type === 'thumbnail') {
      router.push('/click-picture');
    } else {
      const result = await DocumentPicker.getDocumentAsync({
        type: type === 'video'
          ? ['video/mp4', 'video/gif']
          : ['image/png', 'image/jpeg', 'image/heic'],
      });
  
      if (!result.canceled) {
        if (type !== 'video') {
          let selectedFile = result.assets[0];
  
          // Convert HEIC to JPEG if necessary
          if (selectedFile.mimeType === 'image/heic') {
            const manipulatedImage = await ImageManipulator.manipulateAsync(
              selectedFile.uri,
              [], // No transformations, just format change
              { format: ImageManipulator.SaveFormat.JPEG }
            );
  
            selectedFile = { ...selectedFile, uri: manipulatedImage.uri, mimeType: 'image/jpeg' };
          }
  
          setFormData({ ...formData, thumbnail: selectedFile });
          router.push('/create')
        } else {
          setFormData({ ...formData, video: result.assets[0] });
          router.push('/create')
        }
      }
    }
  };

  const takePicture = async () => {
    try{
      if (cameraRef.current) {
        const options = {
          quality:1,
          base64:true,
          exif:false
        }
        const photo = await cameraRef.current.takePictureAsync();
        // console.log( photo)
  
        // Optionally manipulate the image (e.g., resize or format)
        // const manipulatedImage = await ImageManipulator.manipulateAsync(
        //   photo.uri,
        //   [], // No transformations, just format change
        //   { format: ImageManipulator.SaveFormat.JPEG }
        // );

        // console.log(manipulatedImage);
        
  
         // Get file details
        const uri = photo.uri;
        const mimeType = 'image/jpg';
        const imageName = uri.split('/').pop(); // Extract file name from URI

        // Fetch the file size
        const response = await fetch(uri);
        const blob = await response.blob();
        const size = blob.size; // File size in bytes

        const selectedFile = {
          mimeType,
          uri,
          size,
          name:imageName,
        };

        // console.log(selectedFile);
        
  
        // Set the captured image as thumbnail and navigate back
        setFormData({ ...formData, thumbnail: selectedFile });
        router.push('/create');
      }
    }
    catch(error){
      console.log(error);
      Alert.alert("Error" , error)
    }
    
  };

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} 
      facing={facing}
      ref={cameraRef}
      >
        <View className="w-full m-auto flex-row items-end mb-10">
          <TouchableOpacity 
            className="flex-1 justify-center items-center w-10"
            onPress={openPicker}
          >
            <Entypo name="folder-images" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 items-center w-10 "
            onPress={takePicture}
          >
            <View className="bg-white border-4 w-24 h-24 rounded-full border-gray-500"></View>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 justify-center items-center w-10  "
            onPress={toggleCameraFacing}
          >
            <FontAwesome6 name="camera-rotate" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  }
});
