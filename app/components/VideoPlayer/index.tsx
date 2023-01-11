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

const VideoPlayer = (props: any) => {
  const [playPause, setPlayPause] = useState(false)
  const [onLoad, setOnLoad] = useState(false)
  const { source, style, resizeMode = "contain" } = props;
  return (
    <View style={{ width: '100%', }}>
      {onLoad ? <Loader /> : null}
      <Video
        source={source}
        style={styles.videoStyle}
        repeat={true}
        paused={playPause}
        onLoadStart={() => setOnLoad(true)}
        onReadyForDisplay={() => setOnLoad(false)}
        resizeMode={resizeMode}
        // isLooping
        // onBuffer={() => setOnLoad(true)}
        // bufferConfig={{
          //   minBufferMs: 15000,
          //   maxBufferMs: 50000,
          //   bufferForPlaybackMs: 2500,
          //   bufferForPlaybackAfterRebufferMs: 5000
          // }}
          // poster={props?.url + props?.contentData?.video_thumbnail}
          // shouldPlay={false}
          // posterResizeMode={"contain"}
      />
      <View style={styles.playbtntch}>
        <Button width={60}
          handleBtnPress={() => setPlayPause(!playPause)}
          buttonText={playPause ?
            strings.playVideo : strings.pauseVideo}
        />
      </View>
    </View>
  );
};

export default VideoPlayer;
