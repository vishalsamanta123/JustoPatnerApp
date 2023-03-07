import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Actions,
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import styles from "./styles";
import Header from "app/components/Header";
import images from "app/assets/images";
import {
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_LIGHT,
} from "app/components/utilities/constant";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { launchImageLibrary } from "react-native-image-picker";

import storage from "@react-native-firebase/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "@react-native-firebase/database";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";
import DocumentPicker from "react-native-document-picker";
import {
  normalizeHeight,
  normalizeSpacing,
} from "app/components/scaleFontSize";
import Video from "react-native-video";
import RNFetchBlob from "rn-fetch-blob";
import { chatStatusUpdate } from "app/Redux/Actions/ChatActions";
import { useDispatch, useSelector } from "react-redux";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import Modal from "react-native-modal";
import FastImages from "app/components/FastImage";
import VideoPlayer from "./VideoPlayer";

const ChatScreen = ({ navigation, route }: any) => {
  const item = route.params || {};
  const dispatch: any = useDispatch();
  const { response = {} } = useSelector((state: any) => state.chatStatusData);
  const profileData = useSelector((state: any) => state.profileData);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [onPressData, setOnPressData] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [keys, setkeys] = useState([]);
  const [userData, setUserData] = useState<any>({});
  const [messages, setMessages] = useState<any>([]);
  const [senderID, setSenderID] = useState<any>("");
  const [attachments, setAttachments] = useState({
    type: "",
    url: "",
  });
  const { dirs } = RNFetchBlob.fs;

  useFocusEffect(
    React.useCallback(() => {
      if (profileData?.response?.status === 200) {
        setUserData(profileData?.response?.data[0]);
      }
      return () => {};
    }, [navigation, profileData, response])
  );

  useEffect(() => {
    getMsgList();
    dispatch(
      chatStatusUpdate({
        property_id: item?.property_id,
        receiver_id: item?._id,
        msg_status: 2,
      })
    );
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const groupedDays = (chatListData: any) => {
    return chatListData.reduce((acc: any, el: any, i: any): any => {
      const messageDay = moment(el.createdAt).format("YYYY-MM-DD");
      if (acc[messageDay]) {
        return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
      }
      return { ...acc, [messageDay]: [el] };
    }, {});
  };

  const generateItems = (chatListData: any) => {
    const days: any = groupedDays(chatListData);
    const sortedDays = Object.keys(days).sort(
      (x, y) => moment(y, "YYYY-MM-DD").unix() - moment(x, "YYYY-MM-DD").unix()
    );
    const item: any = sortedDays.reduce((acc: any, date: any) => {
      const sortedMessages: any = days[date].sort(
        (x: any, y: any) => +new Date(y.createdAt) - +new Date(x.createdAt)
      );
      return acc.concat([...sortedMessages, { type: "day", date, id: date }]);
    }, []);
    return item;
  };

  const getMsgList = async () => {
    await AsyncStorage.setItem("isNotification", "2");
    const asyncSenderID: any = await AsyncStorage.getItem("firebase_id");
    const senderID: any = JSON.parse(asyncSenderID);
    setSenderID(senderID);
    await firebase
      .app()
      .database(apiEndPoints.FIREBASE_DATABASE_URL)
      .ref(
        senderID > item?.firebase_id
          ? senderID + "-" + item?.firebase_id
          : item?.firebase_id + "-" + senderID
      )
      .on("value", async (snapshot: any) => {
        if (snapshot?.val()) {
          var copy: any = Object.keys(snapshot?.val());
          setkeys(copy);
          const message_array: any = [];
          await snapshot.forEach((childSnapshot: any) => {
            message_array.push({
              msgId: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          const msgArray = generateItems(
            message_array.filter((i: any) => i?.["delete-" + senderID] == false)
          );
          const finalChatArray = msgArray.map((items: any) => {
            if (
              items?.text !== "" ||
              typeof items?.text != "undefined" ||
              items?.image !== "" ||
              items?.video !== ""
            ) {
              return {
                _id: items?.msgId,
                text: items?.text,
                image: items?.image,
                filename: items?.filename,
                type: items?.type === "doc" ? items.type : "",
                video: items?.video,
                createdAt: new Date(),
                user: {
                  _id: items?._id,
                  // name: "React Native",
                  avatar: items.profile_picture,
                },
              };
            } else {
              return;
            }
          });
          setMessages(finalChatArray);
        }
      });
  };

  const _handleChatSend = async (msg: any) => {
    const asyncSenderID: any = await AsyncStorage.getItem("firebase_id");
    const senderID: any = JSON.parse(asyncSenderID);

    setSenderID(senderID);
    const params = {
      createdAt: new Date().toISOString(),
      text: msg.trim(),
      senderUserId: senderID,
      recevierID: item?.firebase_id,
      _id: senderID,
      ["isRead-" + senderID]: true,
      ["isRead-" + item?.firebase_id]: false,
      isDelete: false,
      ["delete-" + senderID]: false,
      ["delete-" + item?.firebase_id]: false,
      profile_picture: `${profileData?.response?.data[0]?.profile_base_url?.toString()}${profileData?.response?.data[0]?.profile_picture?.toString()}`,
    };

    if (msg.trim() !== "") {
      await firebase
        .app()
        .database(apiEndPoints.FIREBASE_DATABASE_URL)
        .ref(
          senderID > item?.firebase_id
            ? senderID + "-" + item?.firebase_id
            : item?.firebase_id + "-" + senderID
        )
        .push()
        .set(params)
        .then((ref: any) => {
          dispatch(
            chatStatusUpdate({
              property_id: item?.property_id,
              receiver_id: item?._id,
              msg_status: 1,
            })
          );
        });
    }
  };

  const onSend = useCallback((messages: any) => {
    _handleChatSend(messages[0]?.text);
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            borderTopRightRadius: 15,
            backgroundColor: PRIMARY_THEME_COLOR,
            marginBottom: normalizeSpacing(5),
          },
          left: {
            borderTopLeftRadius: 15,
            backgroundColor: WHITE_COLOR,
            marginBottom: normalizeSpacing(5),
          },
        }}
        // containerToPreviousStyle={{
        //   right: { borderTopRightRadius: 15 },
        //   left: { borderTopLeftRadius: 15 },
        // }}
        // containerToNextStyle={{
        //   right: { borderTopRightRadius: 15 },
        //   left: { borderTopLeftRadius: 15 },
        // }}
        containerStyle={{
          right: { borderTopRightRadius: 15 },
          left: { borderTopLeftRadius: 15 },
        }}
      />
    );
  };
  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.sendIconView}>
          <Image
            source={images.send}
            resizeMode={"contain"}
            style={styles.sendImage}
          />
        </View>
      </Send>
    );
  };

  const handleAttachPress = async () => {
    dispatch({ type: START_LOADING });
    const result: any = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    }).catch((e) => {
      dispatch({ type: STOP_LOADING });
    });

    let imageRef: any;
    let mediaObject: any = {
      url: "",
      type: "",
    };
    if (result[0].type === "image/jpeg") {
      imageRef = storage().ref(`images/${result[0].name}`);
      mediaObject = {
        ...mediaObject,
        type: "image",
      };
    } else if (result[0].type === "application/pdf") {
      imageRef = storage().ref(`docFiles/${result[0].name}`);
      mediaObject = {
        ...mediaObject,
        type: "doc",
      };
    } else if (result[0].type === "video/mp4") {
      imageRef = storage().ref(`videos/${result[0].name}`);
      mediaObject = {
        ...mediaObject,
        type: "video",
      };
    }
    let fileuri = result[0].uri;
    let filename = result[0].name;
    const response = await fetch(fileuri);
    const blob = await response.blob();
    await imageRef.put(blob);
    var dwnload = await imageRef.getDownloadURL();
    mediaObject = {
      ...mediaObject,
      url: dwnload,
    };
    const asyncSenderID: any = await AsyncStorage.getItem("firebase_id");
    const senderID: any = JSON.parse(asyncSenderID);
    setSenderID(senderID);

    if (mediaObject.url !== "") {
      const params = {
        createdAt: new Date().toISOString(),
        [mediaObject.type === "doc" ? "image" : mediaObject.type]: dwnload,
        type: mediaObject.type,
        filename: filename,
        senderUserId: senderID,
        recevierID: item?.firebase_id,
        _id: senderID,
        ["isRead-" + senderID]: true,
        ["isRead-" + item?.firebase_id]: false,
        isDelete: false,
        ["delete-" + senderID]: false,
        ["delete-" + item?.firebase_id]: false,
      };

      await firebase
        .app()
        .database(apiEndPoints.FIREBASE_DATABASE_URL)
        .ref(
          senderID > item?.firebase_id
            ? senderID + "-" + item?.firebase_id
            : item?.firebase_id + "-" + senderID
        )
        .push()
        .set(params)
        .then((ref: any) => {
          dispatch({ type: STOP_LOADING });
          dispatch(
            chatStatusUpdate({
              property_id: item?.property_id,
              receiver_id: item?._id,
              msg_status: 1,
            })
          );
        })
        .catch(() => {
          dispatch({ type: STOP_LOADING });
        });
    }
  };
  const renderComposer = (props: any) => {
    return (
      <View style={styles.attachIconView}>
        <Composer {...props} />
        <TouchableOpacity onPress={() => handleAttachPress()}>
          <Image
            source={images.attach}
            // resizeMode={"contain"}
            style={styles.attachIconImage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const handlePdfDownload = (data: any) => {
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: data?.filename,
        path: `${dirs.DownloadDir}/${data?.filename}`,
      },
    })
      .fetch("GET", data?.image, {})
      .then((res) => {})
      .catch((e) => {});
  };

  const renderImageMessage = (data: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsVisible(true);
          setOnPressData(
            data.currentMessage.image
              ? data.currentMessage.image
              : messages.image
          );
        }}
      >
        {data?.currentMessage?.type !== "doc" ? (
          <Image
            source={{
              uri: data.currentMessage.image
                ? `${data.currentMessage.image}`
                : messages.image,
            }}
            style={styles.imageMessageView}
            resizeMode={"cover"}
          />
        ) : data.currentMessage.user._id === senderID ? (
          <View style={styles.senderpdfMessageView}>
            <Text style={styles.pdfnameTxt}>
              {data.currentMessage.filename}
            </Text>
          </View>
        ) : (
          <View style={styles.recieverpdfMessageView}>
            <View style={{ width: "80%" }}>
              <Text style={styles.pdfRecievednameTxt} numberOfLines={1}>
                {data.currentMessage.filename}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handlePdfDownload(data.currentMessage)}
            >
              <Image
                source={images.download}
                resizeMode={"contain"}
                style={styles.downloadImage}
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderVideoMessage = (data: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsVideoVisible(true);
          setVideoUrl(
            data.currentMessage.video
              ? data.currentMessage.video
              : messages.video
          );
        }}
      >
        <Video
          source={{
            uri: data.currentMessage.video
              ? data.currentMessage.video
              : messages.video,
          }} // Can be a URL or a local file.
          ref={(ref: any) => {
            // player = ref;
          }} // Store reference
          // onBuffer={this.onBuffer} // Callback when remote video is buffering
          // onError={this.videoError} // Callback when video cannot be loaded
          muted
          style={{
            height: 200,
            width: 200,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            borderColor: PRIMARY_THEME_COLOR,
            borderWidth: 4,
          }}
          resizeMode={"cover"}
        />
      </TouchableOpacity>
    );
  };
  const handlePlayPause = () => {
    setPaused(!paused);
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        headerText={item.user_name}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: senderID,
        }}
        alwaysShowSend
        showUserAvatar
        renderBubble={(data: any) => renderBubble(data)}
        renderMessageImage={(props: any) => {
          return renderImageMessage(props);
        }}
        renderMessageVideo={(props: any) => {
          return renderVideoMessage(props);
        }}
        renderInputToolbar={(props: any) => {
          return (
            <InputToolbar
              primaryStyle={styles.chatPrimaryInputStyle}
              containerStyle={styles.chatContainerInputStyle}
              {...props}
            />
          );
        }}
        renderSend={renderSend}
        renderComposer={renderComposer}
      />
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
          setOnPressData("");
        }}
        onBackButtonPress={() => {
          setIsVisible(false);
          setOnPressData("");
        }}
      >
        <View>
          <FastImages
            source={{ uri: onPressData }}
            style={{
              width: "100%",
              height: normalizeHeight(300),
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </Modal>
      <VideoPlayer
        Visible={isVideoVisible}
        setIsVisible={setIsVideoVisible}
        videoUrl={videoUrl}
        paused={paused}
        setIsPlay={setPaused}
        handlePlayPause={handlePlayPause}
      />
    </View>
  );
};

export default ChatScreen;
