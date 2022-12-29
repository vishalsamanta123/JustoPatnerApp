import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import PropertyChatView from "./components/PropertyChatView";
import { useDispatch, useSelector } from "react-redux";
import { getChatListForProperty } from "app/Redux/Actions/ChatActions";
import { useIsFocused } from "@react-navigation/native";

const PropertyChat = ({ navigation, route }: any) => {
  const { response = {},  } = useSelector((state: any) => state.propertyChatData);
  const isFocused = useIsFocused();


  const dispatch: any = useDispatch();
  useLayoutEffect(() => {

    dispatch(
      getChatListForProperty({
        limit: 10,
        offset: 0,
      })
    );
  }, [isFocused]);
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  
  return (
    <PropertyChatView
      propertyChatList={Array.isArray(response?.data) ? response?.data : []}
      handleDrawerPress={handleDrawerPress}
    />
  );
};

export default PropertyChat;
