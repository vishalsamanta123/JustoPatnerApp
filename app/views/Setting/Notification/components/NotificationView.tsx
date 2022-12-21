import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "app/components/Header";
import styles from "./styles";
import strings from "app/components/utilities/Localization";
import images from "app/assets/images";
import {
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "app/components/utilities/constant";
import { useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";

const NotificationView = (props: any) => {
  const { onPressBack, data } = props;
  const { response = [] } = useSelector((state: any) => state.notificationData) || []
  console.log('response: ', response);
  const [listData, setListData] = useState<any>([]);

  useEffect(() => {
  if(response?.satus === 200){
    if(response?.data?.length > 0){
      setListData(response?.data)
    }
  }
    return () => {
    }
  }, [response])
  

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item: any) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const renderItem = (data: any) => {
    const { subject, message } = data.item;
    console.log("data: ", data);
    return (
      <TouchableHighlight
        onPress={() => console.log("You touched me")}
        style={styles.rowFront}
        underlayColor={WHITE_COLOR}
      >
        <View>
          <Text style={styles.subjectText}>{subject}</Text>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data: any, rowMap: any) => (
    <View style={styles.rowBack}>
      {/* <Text>Left</Text> */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

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
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        ListEmptyComponent={<EmptyListScreen message={strings.notificationHeader}  />}
      />
    </View>
  );
};

export default NotificationView;
