
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Button,
} from "react-native";
import call from "react-native-phone-call";
import Sound from "react-native-sound";
import { AudioUtils } from "react-native-audio";

const permission = async () => {
  const granted_1 = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    {
      title: "Permission required",
      message: 'App requires "Phone State " permission.',
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    }
  );

  if (granted_1 === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("given phone state");
  } else {
    console.log("NO phone state");
  }

  const granted_2 = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.PROCESS_OUTGOING_CALLS,
    {
      title: "Permission required",
      message: 'App requires "Outgoing Calls " permission.',
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    }
  );

  if (granted_2 === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("given outgoing");
  } else {
    console.log("NO outgoing");
  }

  const granted_3 = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    {
      title: "Permission required",
      message: 'App requires "record audio" permission.',
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    }
  );

  if (granted_3 === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("given audio");
  } else {
    console.log("NO audio");
  }

  // try {
  //   const granted_4 = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.WAKE_LOCK,
  //     {
  //       title: "Permission required",
  //       message: 'App requires "wake lock " permission.',
  //       buttonNeutral: "Ask Me Later",
  //       buttonNegative: "Cancel",
  //       buttonPositive: "OK",
  //     }
  //   );

  //   if (granted_4 === PermissionsAndroid.RESULTS.GRANTED) {
  //     console.log("given wake lock");
  //   } else {
  //     console.log("NO wake lock");
  //   }
  // } catch (e) {
  //   console.error(e);
  // }
};

const PhoneCall = function () {
  const numbers = ["8178013548", "9311508002"];

  useEffect(() => {
    permission();
  }, []);

  const audioFile = {
    title: "Play mp3",
    isRequire: true,
    url: require("../../assests/1.mp3"),
  };

  const triggerCall = (number) => {
    const args = {
      number: number,
      prompt: true,
    };
    call(args).catch(console.error);
  };

  let music = null;
  const playMusic = () => {
    music = new Sound(audioFile.url, (err, sound) => {
      if (err) {
        alert("Error" + err.message);
        return;
      }
      music.play(() => {
        music.release();
      });
    });
  };

  const stopMusic = () => {
    if (music) {
      music.stop(() => {
        console.log("music stopped");
      });
    }
  };

  const audioPath = AudioUtils.MusicDirectoryPath + "/record.aac";

  const playLastRecord = () => {
    setTimeout(() => {
      const sound = new Sound(audioPath, "");
      console.log('got sound');
      setTimeout(() => {
        sound.play((success) => {
          console.log(success,'in play');
          if (!success) {alert("Error"+ " no records found")}
          else{
            sound.release();
            console.log('played done');
          }
        });
      }, 100);
    }, 100);

    // const sound = new Sound(audioPath, '')
    // alert('playing');
    // console.log(AudioUtils.MusicDirectoryPath,"--");
    // console.log(audioPath);
    //   sound.play((success) => {
    //     if (!success){ alert('Error'+  'no records found')}
    //     else{
    //       console.log(success,'recording playing');
    //       sound.release();
    //     }
    //   })

  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{ fontSize: 30 }}>Calling App</Text>
      <Button title="Play last record" onPress={playLastRecord} />
      <ScrollView>
        {numbers.map((itm, idx) => {
          return (
            <View key={itm + idx} style={styles.barStyle}>
              <Text>{itm}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={() => triggerCall(itm)}
              >
                <Text style={styles.buttonTextStyle}>Make a Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={() => playMusic()}
              >
                <Text style={styles.buttonTextStyle}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonStyle}
                onPress={() => stopMusic()}
              >
                <Text style={styles.buttonTextStyle}>Stop</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "brown",
    padding: 30,
  },
  buttonStyle: {
    padding: 4,
    backgroundColor: "#8ad24e",
  },
  buttonTextStyle: {
    color: "#fff",
    textAlign: "center",
  },
  barStyle: {
    height: 50,
    backgroundColor: "yellow",
    padding: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export { PhoneCall };
