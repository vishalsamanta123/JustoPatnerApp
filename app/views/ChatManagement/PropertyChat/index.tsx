import React, { useLayoutEffect } from "react";
import PropertyChatView from "./components/PropertyChatView";
import { useDispatch, useSelector } from "react-redux";
import { getChatListForProperty } from "app/Redux/Actions/ChatActions";
import { useIsFocused } from "@react-navigation/native";
import { Keyboard } from "react-native";

const PropertyChat = ({ navigation, route }: any) => {
  const { response = {},  } = useSelector((state: any) => state.propertyChatData);
  const isFocused = useIsFocused();

  const dispatch: any = useDispatch();
  useLayoutEffect(() => {
    getPropertyListForChat()
  }, [isFocused]);
  const getPropertyListForChat = () => {
    dispatch(
      getChatListForProperty({
        limit: 10,
        offset: 0,
      })
    );
  }
  const handleDrawerPress = () => {
    Keyboard.dismiss()
    navigation.toggleDrawer();
  };
  
  return (
    <PropertyChatView
      propertyChatList={Array.isArray(response?.data) ? response?.data : []}
      handleDrawerPress={handleDrawerPress}
      getPropertyListForChat={getPropertyListForChat}
    />
  );
};

export default PropertyChat;
