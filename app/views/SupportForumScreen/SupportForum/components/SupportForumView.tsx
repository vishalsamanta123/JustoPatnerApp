import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import Header from "app/components/Header";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import {
  DATE_TIME_FORMAT,
  PRIMARY_THEME_COLOR,
} from "app/components/utilities/constant";
import { normalizeSpacing } from "app/components/scaleFontSize";
import SuportForumFilter from "./SupportForumFilter";
import moment from "moment";
import FastImages from "app/components/FastImage";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import ComingSoonScreen from "app/components/CommonScreen/ComingSoon";
import usePermission from "app/components/utilities/UserPermissions";

const SupportForumView = (props: any) => {
  const [filterisVisible, setFilterisVisible] = useState(false);
  const loadingref = false;
  const { view } = usePermission({
    view: "view_support_forum",
  });
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightSecondImageScr={images.filter}
        headerText={strings.supportforumHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        RightSecondIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        handleOnRightSecondIconPress={() => setFilterisVisible(true)}
        barStyle={"light-content"}
      />
      {/* <ComingSoonScreen /> */}
      <View style={{ flex: 1, marginHorizontal: normalizeSpacing(10) }}>
        <FlatList
          data={
            Array.isArray(props?.supportForumList) ? props.supportForumList : []
          }
          showsVerticalScrollIndicator={false}
          refreshing={loadingref}
          onRefresh={() => {
            props.getSupportForums(0, {});
            props.setFilterData({
              search_title: "",
              start_date: "",
              end_date: "",
            });
          }}
          onEndReached={() => {
            if (props?.supportForumList?.length < props?.moreData) {
              props.getSupportForums(
                props?.supportForumList?.length > 2 ? props.offSET + 1 : 0,
                props.filterData
              );
            }
          }}
          ListEmptyComponent={
            <EmptyListScreen message={strings.supportforumHeader} />
          }
          renderItem={({ item }: any) => {
            return (
              <View style={styles.mainView}>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={styles.dateTxt}>
                    {item?.createdDate
                      ? moment(item?.createdDate).format(DATE_TIME_FORMAT)
                      : ""}
                  </Text>
                  <Text style={styles.reportTxt}>{item?.title}</Text>
                  <View style={{ marginVertical: 5 }}>
                    <Text style={[styles.dateTxt, { alignSelf: "auto" }]}>
                      {item?.description}
                    </Text>
                  </View>
                  {item?.document?.length > 0 ? (
                    <View style={styles.demoImgView}>
                      {item?.document?.map((itm: any, indx: any) => {
                        return (
                          <>
                            {indx <= 3 ? (
                              <FastImages
                                source={{ uri: item?.base_url + itm?.content }}
                                resizeMode={"contain"}
                                style={styles.Img}
                              />
                            ) : null}
                          </>
                        );
                      })}
                    </View>
                  ) : null}
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      props.onPressShare(item);
                    }}
                  >
                    <Image
                      source={images.shareIcon}
                      resizeMode={"contain"}
                      style={styles.shareImg}
                    />
                  </TouchableOpacity>
                  {view && (
                    <TouchableOpacity
                      onPress={() => props.onPressView(item)}
                      style={styles.btnView}
                    >
                      <Image
                        source={images.forwardArrow}
                        resizeMode={"contain"}
                        style={styles.downloadImg}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          }}
        />
        <SuportForumFilter
          Visible={filterisVisible}
          setIsVisible={setFilterisVisible}
          filterData={props.filterData}
          setFilterData={props.setFilterData}
          handleFilterApply={() => props.getSupportForums(0, props.filterData)}
          resetFilter={() => {
            props.getSupportForums(0, {});
            props.setFilterData({
              search_title: "",
              start_date: "",
              end_date: "",
            });
          }}
        />
      </View>
    </View>
  );
};

export default SupportForumView;
