import {
  View,
  useWindowDimensions,
  FlatList,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  DATE_FORMAT,
  PRIMARY_THEME_COLOR_DARK,
  TABBAR_COLOR,
} from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {  TabBar, TabView } from "react-native-tab-view";
import VisitorAppointment from "./VisitorAppointment";
import SmAppointment from "./SmAppointment";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Button from "../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppointmentList } from "app/Redux/Actions/AppointmentActions";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import {
  getUserAppointmentList,
  updateUserAppointmentStatus,
} from "app/Redux/Actions/AppiontmentWithUserActions";
import AppointmentModal from "./AppointmentModal";
import AppointmentFilterModal from "./AppointmentFilterModal";
import usePermission from "app/components/utilities/UserPermissions";
import RoutingScreen from "./RoutingScreen";
import moment from "moment";

const AppointmentView = (props: any) => {
  const loadingref = false;
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const navigation: any = useNavigation();
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const [appointmentList, setAppointmentList] = useState<any>([]);
  const [userAppointmentList, setUserAppointmentList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const dispatch: any = useDispatch();
  const [type, settype] = useState('')
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
  const todayAppointment = {
    start_date: moment(new Date()).format(DATE_FORMAT),
    end_date: moment(new Date()).format(DATE_FORMAT),
  };
  const [indexData, setIndexData] = useState({
    index: 0,
    routes: [
      { key: "first", title: strings.todayAppointment },
      { key: "second", title: strings.allappointment },
    ],
  });
  useFocusEffect(
    React.useCallback(() => {
      settype(props?.params)
      return () => { };
    }, [navigation, list, props?.params])
  );
  useEffect(() => {
    // if (type === "today") {
    //   getAppointmentList(0, todayAppointment);
    // } else if (type === "todayComplete") {
    //   getAppointmentList(0, { ...todayAppointment, status: 3 });
    // } else if (indexData?.index === 0) {
    //   getAppointmentList(offSET, todayAppointment);
    // } else {
    //   getAppointmentList(offSET, {});
    // }
    if (indexData?.index === 0) {
      if (type === "today") {
        getAppointmentList(0, todayAppointment);
      } else if (type === "todayComplete") {
        getAppointmentList(0, { ...todayAppointment, status: 3 });
      } else {
        getAppointmentList(0, todayAppointment);
      }
    } else {
      getAppointmentList(offSET, {});
    }
  }, [indexData, updateUserStatusResponse, props.params]);

  useEffect(() => {
    const backAction = () => {
      setIndexData({
        index: 0, routes: [
          { key: "first", title: strings.todayAppointment },
          { key: "second", title: strings.allappointment },
        ],
      })
      setTimeout(() => {
        navigation.goBack()
      }, 250);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleDrawerPress = () => {
    setIndexData({
      index: 0, routes: [
        { key: "first", title: strings.todayAppointment },
        { key: "second", title: strings.allappointment },
      ],
    })
    setTimeout(() => {
      navigation.toggleDrawer()
    }, 250);
  };

  const handleReset = () => {
    settype('')
    if (indexData?.index === 0) {
      // handleUserAppointmentList(1);
      getAppointmentList(offSET, todayAppointment);
    } else {
      getAppointmentList(offSET, {});
    }
  }
  const handleUserAppointmentList = (type: any) => {
    dispatch(
      getUserAppointmentList({
        appoiment: type,
      })
    );
    // toGetDatas(array)
  };
  const handleOptionPress = (id: any, status: any) => {
    setParams({
      ...params,
      appointment_id: id,
      appointment_status: status,
    });
    setIsVisible(true);
  };

  const handleOnPressYesInModal = () => {
    dispatch(updateUserAppointmentStatus(params));
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
    navigation.navigate("AddAppointmentScreen", { data: {} });
  };
  const handleFilterApply = () => {
    setFilterisVisible(false);
    getAppointmentList(0, filterData);
  };

  const onPressReset = () => {
    setFilterData({
      start_date: "",
      end_date: "",
      customer_name: "",
      status: "",
    });
    getAppointmentList(0, {});
    setFilterisVisible(false);
  };
  const handleIndexChange = (index: any) => {
    setIndexData({
      index: index,
      routes: [
        { key: "first", title: strings.todayAppointment },
        { key: "second", title: strings.allappointment },
      ],
    });
    setOffset(0);
    setAppointmentList([]);
    setUserAppointmentList([]);
  };

  useFocusEffect(
    React.useCallback(() => {
      getAppointmentList(offSET, todayAppointment);
      return () => { };
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
    } else {
      setAppointmentList([]);
    }
  }, [response]);
  const getAppointmentList = (offset: any, data: any) => {
    console.log("data: ", data);
    setOffset(offset);
    dispatch(
      getAllAppointmentList({
        offset: offset,
        limit: 10,
        start_date: data?.start_date ? data?.start_date : "",
        end_date: data?.end_date ? data?.end_date : "",
        customer_name: data?.customer_name ? data?.customer_name : "",
        status: data?.status ? data?.status : "",
      })
    );
    // toGetDatas(array)
  };

  const renderScene = ({ index, route }: any) => {
    switch (route.key) {
      case "first":
        return (
          <RoutingScreen
            appointmentList={appointmentList}
            onPressView={onPressView}
            onPressEdit={onPressEdit}
            setFilterData={setFilterData}
            getAppointmentList={getAppointmentList}
            loadingref={loadingref}
            setAppointmentList={setAppointmentList}
            response={response}
            filterData={filterData}
            offSET={offSET}
            keyType={route.key}
            todayAppointment={todayAppointment}
            settype={settype}
          />
        );
      case "second":
        return (
          <RoutingScreen
            appointmentList={appointmentList}
            onPressView={onPressView}
            onPressEdit={onPressEdit}
            setFilterData={setFilterData}
            getAppointmentList={getAppointmentList}
            loadingref={loadingref}
            setAppointmentList={setAppointmentList}
            response={response}
            filterData={filterData}
            offSET={offSET}
            keyType={route.key}
            todayAppointment={todayAppointment}
            settype={settype}
          />
        );
    }
  };
  const { create } = usePermission({
    create: "add_appointment",
  });
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={indexData?.index === 1 ? images.filter : null}
        rightSecondImageScr={images.notification}
        headerText={strings.appointmnet}
        handleOnLeftIconPress={handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between' }}>
        <Button
          width={110}
          height={30}
          buttonText={strings.resetToday}
          btnTxtsize={14}
          handleBtnPress={() => handleReset()}
        />
        {create && (
          <Button
            width={200}
            height={30}
            buttonText={strings.addNewappointment}
            btnTxtsize={14}
            handleBtnPress={() => onPressAddNew()}
          />
        )}
      </View>
      <View style={styles.propertyListView}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={indexData}
          renderScene={({ index, route }: any) => renderScene({ index, route })}
          onIndexChange={handleIndexChange}
          initialLayout={{ width: layout.width }}
        />
      </View>
      <AppointmentModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        params={params}
        setParams={setParams}
        handleOnPressYesInModal={handleOnPressYesInModal}
      />
      <AppointmentFilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        params={filterData}
        setParams={setFilterData}
        handleFilterApply={handleFilterApply}
        onPressReset={onPressReset}
      />
    </View>
  );
};

export default AppointmentView;
