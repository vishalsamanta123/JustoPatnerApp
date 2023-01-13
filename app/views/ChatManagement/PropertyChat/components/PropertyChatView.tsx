import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "app/components/Header";
import images from "app/assets/images";
import styles from "./styles";
import { PRIMARY_THEME_COLOR } from "app/components/utilities/constant";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "app/components/SearchBar";
import strings from "app/components/utilities/Localization";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import FastImages from "app/components/FastImage";
import ComingSoonScreen from "app/components/CommonScreen/ComingSoon";

const PropertyChatView = (props: any) => {
  const { handleDrawerPress, propertyChatList } = props;
  const navigation: any = useNavigation();
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    setFilteredData(propertyChatList);
    console.log('propertyChatList: ', propertyChatList);
  }, [propertyChatList]);
  const handleChatPress = (item: any) => {
    navigation.navigate("UserChatListView", item);
  };
  const renderPropertyList = (item: any, index: any) => {
    return (
      <TouchableOpacity
        onPress={() => handleChatPress(item)}
        style={styles.chatListView}
      >
        <View style={styles.straight}>
          <FastImages
            source={{ uri: item.profile }}
            style={styles.profileImage}
          />
          <Text style={styles.userText}>{item?.property_title}</Text>
        </View>
        <Image source={images.rightArrow} style={styles.iconStyle} />
      </TouchableOpacity>
    );
  };
  const handleChangeText = (val: any) => {
    const final = filteredData?.filter(function (el: any) {
      const name = `${el.property_title}`;
      return name?.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
    setFilteredData(val === "" ? propertyChatList : final);
  };
  const onSubmit = (val: any) => {};
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.notification}
        rightSecondImageScr={images.addCircle}
        headerText={strings.propertyForchat}
        leftImageIconStyle={styles.leftImageIconStyle}
        RightSecondIconStyle={styles.RightSecondIconStyle}
        handleOnLeftIconPress={handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      {/* <ComingSoonScreen/> */}
      <SearchBar
        placeholderText={strings.searchProperty}
        onChangeText={handleChangeText}
        onSubmit={onSubmit}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item, index }) => renderPropertyList(item, index)}
        ListEmptyComponent={
          <EmptyListScreen message={strings.propertyForchat} />
        }
      />
    </View>
  );
};

export default PropertyChatView;
