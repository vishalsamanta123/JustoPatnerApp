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
import AppointmentFilterModal from "./AppointmentFilterModal";
import usePermission from "app/components/utilities/UserPermissions";
import RoutingScreen from "./RoutingScreen";

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
  const [indexData, setIndexData] = useState({
    index: 0,
    routes: [
      { key: "first", title: strings.VisitorAppointment },
      { key: "second", title: strings.SMAppointment },
    ],
  });
  useEffect(() => {
    if (indexData?.index == 1) {
      handleUserAppointmentList(1);
    } else {
      getAppointmentList(offSET, {});
    }
  }, [indexData, updateUserStatusResponse]);

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
  }
  const handleIndexChange = (index: any) => {
    setIndexData({
      index: index, routes: [
        { key: "first", title: strings.VisitorAppointment },
        { key: "second", title: strings.SMAppointment },
      ],
    })
    setOffset(0)
    setAppointmentList([])
    setUserAppointmentList([])
  }
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
        getAppointmentList(0, {});
        setAppointmentList([]);
      }}
      refreshing={loadingref}
      onEndReached={() => {
        if (appointmentList?.length < response?.total_data) {
          getAppointmentList(appointmentList?.length > 2 ? offSET + 1 : 0, filterData);
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
      getAppointmentList(offSET, {});
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
    }
  }, [response]);
  useEffect(() => {
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
  const getAppointmentList = (offset: any, data: any) => {
    setOffset(offset);
    dispatch(
      getAllAppointmentList({
        offset: offset,
        limit: 10,
        start_date: data?.start_date ? data?.start_date : '',
        end_date: data?.end_date ? data?.end_date : '',
        customer_name: data?.customer_name ? data?.customer_name : '',
        status: data?.status ? data?.status : '',
      })
    );
    // toGetDatas(array)
  };

  const renderScene = ({ index, route, }: any) => {
    switch (route.key) {
      case 'first':
        return <RoutingScreen
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
        />;
      case 'second':
        return <RoutingScreen
          userAppointmentList={userAppointmentList}
          hanndleUserDetailPress={hanndleUserDetailPress}
          handleOptionPress={handleOptionPress}
          setFilterData={setFilterData}
          getAppointmentList={getAppointmentList}
          loadingref={loadingref}
          handleUserAppointmentList={handleUserAppointmentList}
          setUserAppointmentList={setUserAppointmentList}
          setAppointmentList={setAppointmentList}
          keyType={route.key}
        />;
    }
  };
  const { create } = usePermission({
    create: 'add_appointment',
  })
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={indexData?.index === 0 ? images.filter : null}
        rightSecondImageScr={images.notification}
        headerText={strings.appointmnet}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      {create &&
        (<View style={{ marginVertical: 10, alignItems: "flex-end" }}>
          <Button
            width={200}
            height={30}
            buttonText={strings.addNewappointment}
            btnTxtsize={14}
            handleBtnPress={() => onPressAddNew()}
          />
        </View>)
      }
      <View style={styles.propertyListView}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={indexData}
          renderScene={({ index, route }: any) => renderScene({ index, route })}
          onIndexChange={handleIndexChange}
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
