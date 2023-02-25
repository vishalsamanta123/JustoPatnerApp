import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import Header from "app/components/Header";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import { PRIMARY_THEME_COLOR } from "app/components/utilities/constant";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "app/components/SearchBar";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import FastImages from "app/components/FastImage";
import ComingSoonScreen from "app/components/CommonScreen/ComingSoon";
import { useSelector } from "react-redux";

const ChatViewView = (props: any) => {
  const loadingref = false;
  const [filteredData, setFilteredData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    setFilteredData(props.chatlist);
    setSearchVal("");
  }, [props.chatlist]);
  const navigation: any = useNavigation();
  const handleChatPress = (item: any) => {
    navigation.navigate("ChatScreen", {
      ...item,
      property_id: props.property_id,
    });
  };
  const handleChangeText = (val: any) => {
    setSearchVal(val);
    const final = props?.chatlist?.filter(function (el: any) {
      const name = `${el.user_name}`;
      return name?.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
    setFilteredData(final);
  };
  const onSubmit = (val: any) => {};
  const renderChatList = (item: any) => {
    const role =
      item?.roles_slug === "sourcing_tl"
        ? "TL"
        : item?.roles_slug === "sourcing_manager"
        ? "SM"
        : item?.roles_slug === "closing_manager"
        ? "CM"
        : item?.roles_slug === "closing_tl"
        ? "CTL"
        : item?.roles_slug === "channel_partner"
        ? "CP"
        : item?.roles_slug === "receptionist"
        ? "Recp"
        : item?.roles_slug === "cp_agent"
        ? "Agent"
        : item?.roles_slug === "post_sales"
        ? "PS"
        : item?.roles_slug === "site_head"
        ? "SHD"
        : item?.roles_slug === "cluster_head"
        ? "CH"
        : item?.roles_slug === "call_center"
        ? "CC"
        : "";
    return (
      <TouchableOpacity
        onPress={() => handleChatPress(item)}
        style={styles.chatListView}
      >
        <View style={styles.straight}>
          <FastImages
            source={{ uri: item.base_url + "/" + item.profile_picture }}
            style={styles.profileImage}
          />
          <Text
            style={styles.propertyText}
          >{`${item.user_name} (${role})`}</Text>
        </View>
        <View style={styles.dotWrap}>
          {item?.is_seen === false ? <View style={styles.dot}></View> : null}
          <Image source={images.rightArrow} style={styles.iconStyle} />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        // rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        leftImageIconStyle={styles.leftImageIconStyle}
        headerText={strings.chatHeader}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      {/* <ComingSoonScreen /> */}
      <SearchBar
        placeholderText={strings.searchInChat}
        onChangeText={handleChangeText}
        value={searchVal}
        onSubmit={onSubmit}
      />
      <FlatList
        data={filteredData}
        renderItem={(item) => renderChatList(item.item)}
        ListEmptyComponent={<EmptyListScreen message={strings.chat} />}
        keyboardShouldPersistTaps={"handled"}
        refreshing={loadingref}
        onRefresh={() => props.handleGetChatList()}
      />
    </View>
  );
};

export default ChatViewView;
