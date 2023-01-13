import { useIsFocused } from "@react-navigation/native";
import { getAllChatInProperty } from "app/Redux/Actions/ChatActions";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatView from "./components/ChatView";

const ChatViewScreen = ({ navigation, route }: any) => {
  const { _id: property_id } = route?.params;

  const isFocused = useIsFocused();

  const { response = {} } = useSelector((state: any) => state.allUserchatList);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(
      getAllChatInProperty({
        property_id: property_id,
        limit: 100,
        offset: 0,
      })
    );
  }, [navigation, isFocused]);

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <>
      <ChatView
        chatlist={response?.data}
        handleBackPress={handleBackPress}
      />
    </>
  );
};

export default ChatViewScreen;
