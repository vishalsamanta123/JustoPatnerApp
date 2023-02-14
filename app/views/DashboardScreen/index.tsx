import React, { useEffect, useLayoutEffect, useState } from 'react';
import DashboardView from './components/DashboardView';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardData, generateQrCode, userStatusUpdateData, userStatusUpdater } from 'app/Redux/Actions/Dashboard';
import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR } from 'app/components/utilities/constant';
import { useFocusEffect } from '@react-navigation/native';
import { getChatListForProperty } from 'app/Redux/Actions/ChatActions';
import { Alert, BackHandler } from 'react-native';

const DashboardScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, data = false } = useSelector((state: any) => state.dashboardData) || {}
  const statusData = useSelector((state: any) => state.statusUpdate) || {}
  const qrCodeResponse = useSelector((state: any) => state.qrCodeData) || {}
  const activepropertyData = useSelector((state: any) => state.propertyChatData);
  const [dashBoardData, setDashBoardData] = useState<any>({})
  const [isEnabled, setIsEnabled] = useState<any>();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to close this app ?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  useFocusEffect(
    React.useCallback(() => {
      getDashboard()
      return () => { };
    }, [navigation, isEnabled])
  );
  useEffect(() => {
    dispatch(
      getChatListForProperty({
        limit: 10,
        offset: 0,
      })
    );
  }, []);
  useEffect(() => {
    if (response?.status === 200) {
      setDashBoardData(response?.data)
      setIsEnabled(response?.data?.online_status)
    }
  }, [response, qrCodeResponse])
  useEffect(() => {
    if (dashBoardData?.qr_code === "") {
      dispatch(generateQrCode({}))
    } else {
      // dispatch(generateQrCode({}))
    }
  }, [response, dashBoardData])

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
  const onPressView = (items: any) => {
    navigation.navigate('PropertyDetails', items)
  }
  const onPressMore = () => {
    navigation.navigate('PropertyScreenView')
  }

  const onpressButton = (type: any) => {
    if (type === 'visit') {
      navigation.navigate('LeadManagement')
    } else if (type === 'appointment') {
      navigation.navigate('AppointmentScreen')
    } else {
      navigation.navigate('AgentListing')
    }

  }


  return <DashboardView
    handleDrawerPress={handleDrawerPress}
    dashBoardData={dashBoardData}
    updateStatusPress={updateStatusPress}
    isEnabled={isEnabled}
    activepropertyData={activepropertyData?.response?.data}
    onPressView={onPressView}
    onpressButton={onpressButton}
    onPressMore={onPressMore}
  />;
};

export default DashboardScreen;
