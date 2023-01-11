import { View, Text, Alert } from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import Loader from "../CommonScreen/Loader";

const FastImages = (props: any) => {
  const dispatch: any = useDispatch()
  const onStartLoad = () => {
    <Loader />
  }
  const onEndLoad = () => {
  }
  const { source = {
    uri: "https://unsplash.it/400/400?image=1",
    headers: { Authorization: "someAuthToken" },
    priority: FastImage.priority.normal,
  }, style, resizeMode } = props;
  return (
    <>
      <FastImage
        style={style}
        source={source}
        resizeMode={resizeMode}
        onLoad={() => {
          return (
            <Loader />
          )
        }}
        onLoadEnd={() => onEndLoad()}
      />
    </>
  );
};

export default FastImages;
