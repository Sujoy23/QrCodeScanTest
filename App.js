import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import {Camera, useCameraDevice, useCodeScanner, Code} from 'react-native-vision-camera'


const App =()=> {
  const device = useCameraDevice('back')

  const codeScanObj = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes[0].value} codes!`)
    }
  })

  const checkPermsision = async ()=> {
    const newCameraPermission = await Camera.requestCameraPermission();
    console.log(newCameraPermission);
  };

  useEffect(()=>{
    checkPermsision()
  }, []);


  if (device == null) return <NoCameraDeviceError />
  return (
    <View style={{flex:1}}>
      <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      codeScanner={codeScanObj}
    />
    </View>
  );
}

export default App;