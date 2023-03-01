import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import Loader from "../CommonScreen/Loader";
import Video from "react-native-video";
import Button from "../Button";
import strings from "../utilities/Localization";
import styles from "./styles";
import VideoPlayer from 'react-native-media-console';


const CustomVideoPlayer = (props: any) => {
  const [playPause, setPlayPause] = useState(false)
  const [onLoad, setOnLoad] = useState(false)
  const { source, style, resizeMode = "contain" } = props;
  return (
    <View style={{
      width: '100%',
      height: '100%',
    }}>
      <VideoPlayer
        source={{ uri: props?.url + props?.content }}
        navigator={props.navigator}
        repeat={true}
        disableVolume={true}
        disableBack={true}
        fullscreenOrientation='landscape'
        fullscreenAutorotate={true}
        isFullscreen={true}
        toggleResizeModeOnFullscreen={true}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </View>
  );
};

export default CustomVideoPlayer;
