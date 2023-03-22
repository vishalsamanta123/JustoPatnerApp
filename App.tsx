import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import configureStore from './app/Redux/Store';
import { PersistGate } from 'redux-persist/es/integration/react';
import Root from 'app/navigation';
import NetInfo from "@react-native-community/netinfo";
import ErrorMessage from 'app/components/ErrorMessage';
import { BLACK_COLOR } from 'app/components/utilities/constant';
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from '@react-native-async-storage/async-storage';
import VersionCheck from "react-native-version-check";
import { Alert, BackHandler, Linking } from 'react-native';
// Display The Push notification
export async function onDisplayNotification(title: any, body: any, data: any) {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: "default",
    importance: AndroidImportance.HIGH,
    name: "Default Channel",
  });

  await notifee.displayNotification({
    title,
    body,
    data,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: "default",
      },
      // color: PRIMARY_THEME_COLOR,
    },
  });
}


const App = () => {
  const { persistor, store } = configureStore();

  // For check the Network Connection
  useEffect(() => {
    const unsubscribe: any = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        ErrorMessage({
          msg: "No Connection",
          backgroundColor: BLACK_COLOR,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const checkUpdateNeeded = async () => {
    let updateNeeded = await VersionCheck.needUpdate();
    console.log("updateNeeded: ", updateNeeded);
    if (updateNeeded.isNeeded) {
      //Alert the user and direct to the app url
      Alert.alert(
        "New Update is here",
        "Please update to the latest version",
        [{
          text: "Update",
          onPress: () => {
            BackHandler.exitApp();
            Linking.openURL(updateNeeded.storeUrl)
          }
        }]
      )
    }
  };
  useEffect(() => {
    checkUpdateNeeded();
  }, []);


  useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log("A new FCM message arrived!", JSON.stringify(remoteMessage));
      onDisplayNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        remoteMessage.data
      );
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log("Message handled in the background!", remoteMessage);
      onDisplayNotification(
        remoteMessage.data.title,
        remoteMessage.data.body,
        remoteMessage.data
      );
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log("remoteMessage getInitialNotification: ", remoteMessage);
      onDisplayNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        remoteMessage.data
      );
    });
    return unsubscribe;
  }, []);

  // Get the FCM Token From Firebase
  const getFcmToken = async () => {
    const localFCM = await AsyncStorage.getItem("fcm");
    console.log("localFCM: ", localFCM);
    if (localFCM === null) {
      const fcmToken = await messaging().getToken();
      console.log("fcmToken: ", fcmToken);
      await AsyncStorage.setItem("fcm", fcmToken);
    }
  };

  // Request the notification permission
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      getFcmToken();
    }
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <Root />
      </PersistGate>
    </Provider>
  );
};

export default App;
