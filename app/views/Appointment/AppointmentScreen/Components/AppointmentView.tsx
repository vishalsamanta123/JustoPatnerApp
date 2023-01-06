import {
  View,
  Text,
  StatusBar,
  useWindowDimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  PRIMARY_THEME_COLOR_DARK,
  RED_COLOR,
  TABBAR_COLOR,
} from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import VisitorAppointment from "./VisitorAppointment";
import SmAppointment from "./SmAppointment";
import {
  AppointMentSmData,
  AppointMentVisitorData,
} from "../../../../components/utilities/DemoData";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FilterModal from "./AppointmentModal";
import Button from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointmentList } from "app/Redux/Actions/AppointmentActions";
import ErrorMessage from "app/components/ErrorMessage";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import {
  getUserAppointmentList,
  updateUserAppointmentStatus,
} from "app/Redux/Actions/AppiontmentWithUserActions";
import AppointmentModal from "./AppointmentModal";

const AppointmentView = (props: any) => {
  const loadingref = false;
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const navigation: any = useNavigation();
  const [index, setIndex] = useState(0);
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const [routes] = useState([
    { key: "first", title: strings.VisitorAppointment },
    { key: "second", title: strings.SMAppointment },
  ]);
  const [appointmentList, setAppointmentList] = useState<any>([]);
  const [userAppointmentList, setUserAppointmentList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const dispatch: any = useDispatch();
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.appointment
  );
  const { getUserListResponse = {}, userList = "" } = useSelector(
    (state: any) => state.userAppointmentData
  );
  const { updateUserStatusResponse = {}, statusUpdate = "" } = useSelector(
    (state: any) => state.updateStatusAppointmentData
  );

  const [filterData, setFilterData] = useState({
    start_date: "",
    end_date: "",
    customer_name: "",
    status: "",
  });
  const [isVisible, setIsVisible] = useState<any>(false);
  const [params, setParams] = useState({
    appointment_id: "",
    appointment_status: "",
    remark: "",
  });
  useEffect(() => {
    console.log("props.role: ", props.role);
    if (index == 1) {
      // getAppointmentList(props.role === 'TL'? 3 : 1);
      handleUserAppointmentList(1);
    } else {
      getAppointmentList(offSET);
    }
  }, [index]);
  useEffect(() => {
    console.log("props.role: ", props.role);
    if (index == 1) {
      // getAppointmentList(props.role === 'TL'? 3 : 1);
      handleUserAppointmentList(1);
    } else {
      getAppointmentList(offSET);
    }
  }, [updateUserStatusResponse]);

  const handleUserAppointmentList = (type: any) => {
    console.log("type: ", type);
    dispatch(
      getUserAppointmentList({
        appoiment: type,
      })
    );
    // toGetDatas(array)
  };
  const handleOptionPress = (id: any, status: any) => {
    console.log(id, "= = == ", status);
    setParams({
      ...params,
      appointment_id: id,
      appointment_status: status,
    });
    setIsVisible(true);
  };

  const handleOnPressYesInModal = () => {
    console.log("params: IN APPOINTMENT UPDATE", params);
    dispatch(
      updateUserAppointmentStatus(params)
    );
    setIsVisible(false);
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
  const onPressView = (data: any) => {
    navigation.navigate("AppointmentDetails", data);
  };
  const hanndleUserDetailPress = (data: any) => {
    navigation.navigate("UserAppointmentDetails", data);
  };
  const onPressEdit = (data: any) => {
    navigation.navigate("AddAppointmentScreen", {
      data: data,
      type: strings.edit,
    });
  };
  const onPressAddNew = () => {
    navigation.navigate("AddAppointmentScreen", { data: {}, type: "Add" });
  };
  const handleFilterApply = () => {
    setFilterisVisible(false);
    getAppointmentList(0);
  };
  const FirstRoute = () => (
    <FlatList
      data={Array.isArray(appointmentList) ? appointmentList : []}
      renderItem={({ item }) => (
        <VisitorAppointment
          items={item}
          onPressView={onPressView}
          onPressEdit={onPressEdit}
        />
      )}
      ListEmptyComponent={
        <EmptyListScreen message={strings.VisitorAppointment} />
      }
      onRefresh={() => {
        setFilterData({
          start_date: "",
          end_date: "",
          customer_name: "",
          status: "",
        });
        getAppointmentList(0);
        setAppointmentList([]);
      }}
      refreshing={loadingref}
      onEndReached={() => {
        if (appointmentList?.length < response?.total_data) {
          getAppointmentList(appointmentList?.length > 2 ? offSET + 1 : 0);
        }
      }}
    />
  );
  const SecondRoute = () => (
    <FlatList
      data={userAppointmentList}
      renderItem={({ item }) => (
        <SmAppointment
          items={item}
          hanndleUserDetailPress={hanndleUserDetailPress}
          handleOptionPress={handleOptionPress}
        />
      )}
      ListEmptyComponent={
        <EmptyListScreen message={strings.VisitorAppointment} />
      }
      onRefresh={() => {
        setFilterData({
          start_date: "",
          end_date: "",
          customer_name: "",
          status: "",
        });
        handleUserAppointmentList(1);
        setUserAppointmentList([]);
      }}
      refreshing={loadingref}
    />
  );
  useFocusEffect(
    React.useCallback(() => {
      getAppointmentList(offSET);
      return () => {};
    }, [navigation, list])
  );
  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        if (offSET == 0) {
          setAppointmentList(response?.data);
        } else {
          setAppointmentList([...appointmentList, ...response?.data]);
        }
      }
    }
  }, [response]);
  useEffect(() => {
    console.log("getUserListResponse: ", getUserListResponse);
    if (getUserListResponse?.status === 200) {
      if (getUserListResponse?.data?.length > 0) {
        if (offSET == 0) {
          setUserAppointmentList(getUserListResponse?.data);
        } else {
          setUserAppointmentList([
            ...userAppointmentList,
            ...getUserListResponse?.data,
          ]);
        }
      }
    }
  }, [getUserListResponse]);
  const getAppointmentList = (offset: any) => {
    setOffset(offset);
    dispatch(
      getAllAppointmentList({
        offset: offset,
        limit: 3,
        start_date: filterData.start_date,
        end_date: filterData.end_date,
        customer_name: filterData.customer_name,
        status: filterData.status,
      })
    );
    // toGetDatas(array)
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.appointmnet}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      <View style={{ marginVertical: 10, alignItems: "flex-end" }}>
        <Button
          width={200}
          height={30}
          buttonText={strings.addNewappointment}
          btnTxtsize={14}
          handleBtnPress={() => onPressAddNew()}
        />
      </View>
      <View style={styles.propertyListView}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
        {/* <FlatList
          data={Array.isArray(appointmentList) ? appointmentList : []}
          renderItem={({ item }) => (
            <VisitorAppointment
              items={item}
              onPressView={onPressView}
              onPressEdit={onPressEdit}
            />
          )}
          ListEmptyComponent={
            <EmptyListScreen message={strings.VisitorAppointment} />
          }
          onRefresh={() => {
            setFilterData({
              start_date: "",
              end_date: "",
              customer_name: "",
              status: "",
            });
            getAppointmentList(0);
            setAppointmentList([]);
          }}
          refreshing={loadingref}
          onEndReached={() => {
            if (appointmentList?.length < response?.total_data) {
              getAppointmentList(appointmentList?.length > 2 ? offSET + 1 : 0);
            }
          }}
        /> */}
      </View>
      <AppointmentModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        params={params}
        setParams={setParams}
        handleOnPressYesInModal={handleOnPressYesInModal}
      />
    </View>
  );
};

export default AppointmentView;
