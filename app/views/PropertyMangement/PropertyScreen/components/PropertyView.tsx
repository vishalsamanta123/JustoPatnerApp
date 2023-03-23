import { View, FlatList, ActivityIndicator, useWindowDimensions } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PropertyListItem from "./PropertyListItem";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import ConfirmModal from "../../../../components/Modals/ConfirmModal";
import FilterModal from "./FilterModel";
import { useSelector, useDispatch } from "react-redux";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import { TabBar, TabView } from "react-native-tab-view";
import {
  PRIMARY_THEME_COLOR_DARK,
  TABBAR_COLOR,
} from "app/components/utilities/constant";

const PropertyView = (props: any) => {
  const dispatch: any = useDispatch();
  const layout = useWindowDimensions();
  const [isVisible, setIsVisible] = useState(false);
  const [masterDataShow, setMasterDataShow] = useState([]);
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const [propertyList, setPropertyList] = useState<any>([]);
  const insets = useSafeAreaInsets();
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  const moreData = propertyData?.response?.total_data || 0;
  const masterData = useSelector((state: any) => state.masterData) || {};
  const navigation: any = useNavigation();
  const loadingref = false;
  const [filterform, setFilterform] = useState<any>({
    start_date: "",
    end_date: "",
    location: "",
    property_name: "",
    property_type: "",
    active_property: ""
  });
  const [indexData, setIndexData] = useState({
    index: 0,
    routes: [
      { key: "first", title: strings.subscribed },
      { key: "second", title: strings.allProperty },
    ],
  });

  useEffect(() => {
    if (indexData?.index === 0) {
      console.log("indexData?.index: ", indexData?.index);
      // handleUserAppointmentList(1);
      setFilterform({
        ...filterform,
        active_property: 1
      })
      props.getallproperty(0, {active_property: 1});
    } else {
      props.getallproperty(0, {active_property: 2});
      setFilterform({
        ...filterform,
        active_property: 2
      })
    }
  }, [indexData, props.params]);

  useEffect(() => {
    if (propertyData?.response) {
      const { response = {} } = propertyData;
      if (response?.status === 200) {
        if (response?.data?.length > 0) {
          if (props?.offSET === 0) {
            setPropertyList(response?.data);
          } else {
            setPropertyList([...propertyList, ...response?.data]);
          }
        }
      }
      // else {
      //   setPropertyList([]);
      // }
    }
  }, [propertyData]);

  useEffect(() => {
    if (masterData?.response) {
      const { response } = masterData;
      if (response?.status === 200) {
        setMasterDataShow(response?.data);
      } else {
        setMasterDataShow([]);
      }
    }
  }, [masterData]);

  const onPressView = (items: any) => {
    navigation.navigate("PropertyDetails", items);
  };
  const onRefresh = () => {
    setFilterform({
      ...filterform,
      start_date: "",
      end_date: "",
      location: "",
      property_name: "",
      property_type: "",
    });
    setPropertyList([]);
    props.getallproperty(0, filterform);

  };
  const confirmStatus = (items: any) => {
    if (items.approve_status === 2) {
      dispatch(
        getAllMaster({
          type: 7,
        })
      );
    }
    setIsVisible(true);
    props.setCurrentStatus(items.approve_status);
    props.setCurrentProperty(items?.property_id);
  };

  const handleIndexChange = (index: any) => {
    setIndexData({
      index: index,
      routes: [
        { key: "first", title: strings.subscribed },
        { key: "second", title: strings.allProperty },
      ],
    });
    setPropertyList([]);
  };

  const renderTabBar = (props: any) => (
    <TabBar
      activeColor={TABBAR_COLOR}
      //inactiveColor={'#F4F4F4'}
      {...props}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
    />
  );

  const renderScene = ({ index, route }: any) => {
    switch (route.key) {
      case "first":
        return (
          <View style={styles.propertyListView}>
            <FlatList
              data={Array.isArray(propertyList) ? propertyList : []}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <EmptyListScreen message={strings.propertyHeader} />
              }
              renderItem={({ item }) => (
                <PropertyListItem
                  items={item}
                  setIsVisible={setIsVisible}
                  onPressView={onPressView}
                  confirmStatus={(items: any) => confirmStatus(items)}
                />
              )}
              onEndReached={() => {
                if (propertyList?.length < moreData) {
                  props.getallproperty(
                    propertyList?.length >= 3 ? props?.offSET + 1 : 0,
                    {...filterform, active_property: 1}
                  );
                }
              }}
              onRefresh={() => onRefresh()}
              refreshing={loadingref}
            />
          </View>
        );
      case "second":
        return (
          <View style={styles.propertyListView}>
            <FlatList
              data={Array.isArray(propertyList) ? propertyList : []}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <EmptyListScreen message={strings.propertyHeader} />
              }
              renderItem={({ item }) => (
                <PropertyListItem
                  items={item}
                  setIsVisible={setIsVisible}
                  onPressView={onPressView}
                  confirmStatus={(items: any) => confirmStatus(items)}
                />
              )}
              onEndReached={() => {
                if (propertyList?.length < moreData) {
                  props.getallproperty(
                    propertyList?.length >= 3 ? props?.offSET + 1 : 0,
                    {...filterform, active_property: 2}
                  );
                }
              }}
              onRefresh={() => onRefresh()}
              refreshing={loadingref}
            />
          </View>
        );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={indexData?.index === 1 ? images.filter : null}
        rightSecondImageScr={images.notification}
        headerText={strings.propertyHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      {/* <View style={styles.propertyListView}>
        <FlatList
          data={Array.isArray(propertyList) ? propertyList : []}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyListScreen message={strings.propertyHeader} />}
          renderItem={({ item }) => <PropertyListItem items={item} setIsVisible={setIsVisible} onPressView={onPressView}
            confirmStatus={(items: any) => confirmStatus(items)} />}
          onEndReached={() => {
            if (propertyList?.length < moreData) {
              props.getallproperty(propertyList?.length >= 3 ? props?.offSET + 1 : 0,
                filterform
              )
            }
          }}
          onRefresh={() => onRefresh()}
          refreshing={loadingref}
        />
      </View> */}
      {/* <View style={styles.propertyListView}> */}
        <TabView
          renderTabBar={renderTabBar}
          navigationState={indexData}
          renderScene={({ index, route }: any) => renderScene({ index, route })}
          onIndexChange={handleIndexChange}
          initialLayout={{ width: layout.width }}
        />
      {/* </View> */}
      <ConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        handleNoPress={() => {
          //props.setChangeStatus({ _id: '', status: false })
          setIsVisible(false);
        }}
        handleYesPress={() => {
          setIsVisible(false);
          props.handleStatusChange();
        }}
        handleConfirmPress={() => {
          setIsVisible(false);
          props.handleStatusChange();
        }}
        setResion={props.setResion}
        resion={props.resion}
        masterDataShow={masterDataShow}
        stringshow={strings.confirmation}
        textshow={strings.activconfirmation + " Property"}
        confirmtype={props.currentStatus === 2 ? "" : "CONFIRMATION"}
      />
      <FilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        filterform={filterform}
        setFilterform={setFilterform}
        setPropertyList={setPropertyList}
        getallproperty={props.getallproperty}
      />
    </View>
  );
};

export default PropertyView;
