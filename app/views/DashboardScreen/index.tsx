import React, { useEffect, useLayoutEffect, useState } from 'react';
import DashboardView from './components/DashboardView';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardData, userStatusUpdateData, userStatusUpdater } from 'app/Redux/Actions/Dashboard';
import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR } from 'app/components/utilities/constant';

const DashboardScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, data = false } = useSelector((state: any) => state.dashboardData) || {}
  // const statusData = useSelector((state: any) => state.statusUpdate) || {}
  const [dashBoardData, setDashBoardData] = useState<any>()

  useLayoutEffect(() => {
    getDashboard()
  }, [])
  useEffect(() => {
    if (response?.status === 200) {
      setDashBoardData(response?.data)
    }
  }, [response])
  const getDashboard = () => {
    dispatch(dashboardData({}))
  }
  const updateStatusPress = (data: any) => {
    dispatch(userStatusUpdateData({
      online_status: data === 0 ? 1 : 0
    }))
    getDashboard()
  }
  // useEffect(() => {
  //   if (statusData?.data && statusData?.response?.status === 200) {
  //     dispatch(userStatusUpdater())
  //     ErrorMessage({
  //       msg: response?.message,
  //       backgroundColor: GREEN_COLOR
  //     })
  //     getDashboard()
  //   }
  // }, [statusData])
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return <DashboardView
    handleDrawerPress={handleDrawerPress}
    dashBoardData={dashBoardData}
    updateStatusPress={updateStatusPress}
  />;
};

export default DashboardScreen;
