import { FlatList, Image, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "app/components/Header";
import styles from "./styles";
import strings from "app/components/utilities/Localization";
import images from "app/assets/images";
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  GREEN_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "app/components/utilities/constant";
import { useDispatch, useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import { normalizeSpacing } from "app/components/scaleFontSize";
import { notificationRemove } from "app/Redux/Actions/NotificationAction";
import ErrorMessage from "app/components/ErrorMessage";
import moment from "moment";

const NotificationView = (props: any) => {
  const dispatch: any = useDispatch();
  const { onPressBack, data } = props;
  const { response = [] } = useSelector((state: any) => state.notificationData) || []
  const deleteNotificationData = useSelector((state: any) => state.deleteNotificationData) || {};
  const [listData, setListData] = useState<any>([]);

  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setListData(response?.data)
      }
    }
  }, [response])
  useEffect(() => {
    if (deleteNotificationData?.response?.status === 200) {
      dispatch(notificationRemove())
      ErrorMessage({
        msg: deleteNotificationData?.response?.message,
        backgroundColor: GREEN_COLOR
      })
      if (deleteNotificationData?.response?.data?.length > 0) {
        setListData(deleteNotificationData?.response?.data);
      } if (deleteNotificationData?.response?.data?.length == 0) {
        setListData([])
      }
    }
  }, [deleteNotificationData]);


  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (item: any) => {
    // closeRow(rowMap, item["key"] = i + 1);
    // const newData = [...listData];
    // const prevIndex = listData.findIndex((item: any) => item.key === rowKey);
    // newData.splice(prevIndex, 1);
    // setListData(newData);
    props.handleDeleteNotification(item?._id)
  };

  const renderItem = (data: any) => {
    const { subject = "", message = "", createdDate = "" } = data?.item;
    return (
      <View style={styles.rowFront}>
        <View>
          <Text style={styles.subjectText}>{subject}</Text>
          <Text style={styles.messageText}>{message}</Text>
          <Text style={styles.timeText}>{moment(createdDate).format(DATE_TIME_FORMAT)}</Text>
        </View>
        <TouchableOpacity
          style={styles.backRightBtn}
          onPress={() => deleteRow(data?.item)}>
          <Image
            source={images.deleteIcon}
            style={styles.trashIconVw}
            resizeMode={'contain'}
          />
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.notificationHeader}
        headerStyle={styles.headerStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={onPressBack}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      {/* <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          disableRightSwipe={true}
          ListEmptyComponent={<EmptyListScreen message={strings.notificationHeader} />}
        /> */}
      <FlatList
        data={listData}
        renderItem={renderItem}
        onRefresh={props.getNotification}
        refreshing={false}
      />
    </View>
  );
};

export default NotificationView;
