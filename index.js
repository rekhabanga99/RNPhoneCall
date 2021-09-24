// import 'react-native-gesture-handler';
// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);




import "react-native-gesture-handler";
//import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import { AudioRecorder, AudioUtils } from "react-native-audio";
import App from "./App";

const audioPath = AudioUtils.MusicDirectoryPath + "/record.aac";
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const Rec = async (data) => {
  console.log("It works!", data);

  if (data.state === "extra_state_offhook") {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
    });
    console.log('starting');
    await AudioRecorder.startRecording();
    // setTimeout(()=>{
    //   console.log('caaling');
    //   (async function(){
    //     console.log('stop 1 ');
    //     await AudioRecorder.stopRecording();
    //     console.log('stop 2 ');
    //   }())
      
    // }, 9000);
  } else if (data.state === "extra_state_idle") {
    console.log('stoping');
      await AudioRecorder.stopRecording();
  }
};
AppRegistry.registerHeadlessTask("Rec", () => Rec);
AppRegistry.registerComponent("main", () => App);
//registerRootComponent(App);
