import React, { useEffect, useLayoutEffect, useState } from 'react';
import DashboardView from './components/DashboardView';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardData, userStatusUpdateData, userStatusUpdater } from 'app/Redux/Actions/Dashboard';
import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR } from 'app/components/utilities/constant';

const DashboardScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, data = false } = useSelector((state: any) => state.dashboardData) || {}
  const statusData = useSelector((state: any) => state.statusUpdate) || {}
  const [dashBoardData, setDashBoardData] = useState<any>()
  const [isEnabled, setIsEnabled] = useState<any>();

  useLayoutEffect(() => {
    getDashboard()
  }, [isEnabled])
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
      online_status: data === 0 ? 1 : 0
    }))
  }
  useEffect(() => {
    if (statusData?.data && statusData?.response?.status === 200) {
      setIsEnabled(isEnabled === 0 ? 1 : 0)
      dispatch(userStatusUpdater())
      ErrorMessage({
        msg: response?.message,
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
