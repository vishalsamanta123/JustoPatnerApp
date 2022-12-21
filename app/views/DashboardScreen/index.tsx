import React, { useEffect, useLayoutEffect, useState } from 'react';
import DashboardView from './components/DashboardView';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardData, userStatusUpdateData, userStatusUpdater } from 'app/Redux/Actions/Dashboard';
import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR } from 'app/components/utilities/constant';
import { useFocusEffect } from '@react-navigation/native';

const DashboardScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, data = false } = useSelector((state: any) => state.dashboardData) || {}
  const statusData = useSelector((state: any) => state.statusUpdate) || {}
  const [dashBoardData, setDashBoardData] = useState<any>()
  const [isEnabled, setIsEnabled] = useState<any>();

  useFocusEffect(
    React.useCallback(() => {
      getDashboard()
      return () => { };
    }, [navigation, isEnabled])
  );
  useEffect(() => {
    if (response?.status === 200) {
      setDashBoardData(response?.data)
      setIsEnabled(response?.data?.online_status)
    }
  }, [response])
  const getDashboard = () => {
    dispatch(dashboardData({}))
  }
  const updateStatusPress = (data: any) => {
    dispatch(userStatusUpdateData({
      online_status: data === 1 ? 2 : 1
    }))
  }
  useEffect(() => {
    if (statusData?.data && statusData?.response?.status === 200) {
      setIsEnabled(isEnabled === 1 ? 2 : 1)
      dispatch(userStatusUpdater())
      ErrorMessage({
        msg: statusData?.response?.message,
        backgroundColor: GREEN_COLOR
      })
    }
  }, [statusData])
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return <DashboardView
    handleDrawerPress={handleDrawerPress}
    dashBoardData={dashBoardData}
    updateStatusPress={updateStatusPress}
    isEnabled={isEnabled}
  />;
};

export default DashboardScreen;
