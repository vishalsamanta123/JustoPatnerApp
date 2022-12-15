import { useFocusEffect } from "@react-navigation/native";
import { getNotificationList } from "app/Redux/Actions/NotificationAction";
import React from "react";
import { useDispatch } from "react-redux";
import NotificationView from "./components/NotificationView";

const Notification = ({ navigation, route }: any) => {
    const dispatch: any = useDispatch();
    useFocusEffect(
        React.useCallback(() => {
            dispatch(getNotificationList({
                limit: 100,
                offset: 0
            }))
          return () => { };
        }, [navigation])
      );
  const onPressBack = () => {
    navigation.goBack();
  };
  return <NotificationView onPressBack={onPressBack} data={route.params} />;
};

export default Notification;
