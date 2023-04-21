import { Camera } from 'expo-camera';
import { useRef } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CameraBtn from '../../components/CameraBtn/CameraBtn';
import { ImageBackground } from 'react-native';

export default function CameraComponent({ photoUri, setPhotoUri }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    setPhotoUri(photo.uri);
  };

  const resetPhoto = () => {
    setPhotoUri('');
  };

  function photoContainer() {
    if (photoUri === '') {
      return (
        <Camera
          style={styles.camera}
          // type={type}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <CameraBtn
              // isEdit={!!imgUrl}
              isEdit={true}
              onPress={takePhoto}
            />
          </View>
        </Camera>
      );
    } else {
      return (
        <ImageBackground source={{ uri: photoUri }} style={styles.makePhoto}>
          <TouchableOpacity style={styles.dropCamera} onPress={resetPhoto}>
            <View style={styles.buttonContainer}>
              <CameraBtn />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      );
    }
  }

  console.log(photoUri);

  return (
    <View style={styles.container} onPress={() => console.log('my press')}>
      {/* <Camera
        style={styles.camera}
        // type={type}
        ref={cameraRef}
      >
        {photoUri && (
          <View style={styles.preview}>
            <Image source={{ uri: photoUri }} style={styles.makePhoto} />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <CameraBtn
            // isEdit={!!imgUrl}
            isEdit={true}
            onPress={takePhoto}
          />
        </View>
      </Camera> */}
      {photoContainer()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  camera: {
    flex: 1,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  buttonContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
  dropCamera: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    opacity: 0.85,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  makePhoto: {
    height: 238,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
