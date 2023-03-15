import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppointmentWithSMView from './components/AppointmentWithSMView'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAppointmentList, updateUserAppointmentStatus } from 'app/Redux/Actions/AppiontmentWithUserActions';

const AppointmentWithSM = ({ navigation }: any) => {
  const [userAppointmentList, setUserAppointmentList] = useState<any>([]);
  const [offSET, setOffset] = useState(0);
  const [moreData, setMoreData] = useState(0)
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


  const dispatch: any = useDispatch();
  const { getUserListResponse = {}, userList = "" } = useSelector(
    (state: any) => state.userAppointmentData
  );
  const { updateUserStatusResponse = {}, statusUpdate = "" } = useSelector(
    (state: any) => state.updateStatusAppointmentData
  );

  useFocusEffect(
    React.useCallback(() => {
      getAppointmentWithSMList(0, {})
      return () => { };
    }, [navigation, updateUserStatusResponse])
  );


  const getAppointmentWithSMList = (offset: any, data: any) => {
    setOffset(offset);
    dispatch(
      getUserAppointmentList({
        offset: offset,
        limit: 10,
        appoiment: 1,
        start_date: data?.start_date ? data?.start_date : '',
        end_date: data?.end_date ? data?.end_date : '',
        customer_name: data?.customer_name ? data?.customer_name : '',
        status: data?.status ? data?.status : '',
      })
    );
  }

  useEffect(() => {
    if (getUserListResponse?.status === 200) {
      if (getUserListResponse?.data?.length > 0) {
        setMoreData(getUserListResponse?.total_data)
        if (offSET == 0) {
          setUserAppointmentList(getUserListResponse?.data);
        } else {
          setUserAppointmentList([
            ...userAppointmentList,
            ...getUserListResponse?.data,
          ]);
        }
      }
    } else {
      setUserAppointmentList([])
    }
  }, [getUserListResponse]);


  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };

  const hanndleUserDetailPress = (data: any) => {
    navigation.navigate("UserAppointmentDetails", data);
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
    getAppointmentWithSMList(0, {})
  };
  return (
    <AppointmentWithSMView
      handleDrawerPress={handleDrawerPress}
      userAppointmentList={userAppointmentList}
      offSET={offSET}
      setOffset={setOffset}
      filterData={filterData}
      setFilterData={setFilterData}
      hanndleUserDetailPress={hanndleUserDetailPress}
      handleOptionPress={handleOptionPress}
      setUserAppointmentList={setUserAppointmentList}
      getAppointmentWithSMList={getAppointmentWithSMList}
      moreData={moreData}
      isVisible={isVisible}
      setParams={setParams}
      setIsVisible={setIsVisible}
      handleOnPressYesInModal={handleOnPressYesInModal}
    />
  )
}

export default AppointmentWithSM