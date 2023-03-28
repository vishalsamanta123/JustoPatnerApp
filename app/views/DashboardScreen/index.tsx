import React, { useEffect, useLayoutEffect, useState } from 'react';
import DashboardView from './components/DashboardView';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardData, generateQrCode, userStatusUpdateData, userStatusUpdater } from 'app/Redux/Actions/Dashboard';
import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR } from 'app/components/utilities/constant';
import { useFocusEffect } from '@react-navigation/native';
import { getChatListForProperty } from 'app/Redux/Actions/ChatActions';
import { Alert, BackHandler } from 'react-native';
import { getPermission } from 'app/Redux/Actions/permissionAction';
import strings from 'app/components/utilities/Localization';

const DashboardScreen = ({ navigation, route }: any) => {
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
        Alert.alert(strings.holdOn, strings.exitAppAlert, [
          {
            text: strings.cancel,
            onPress: () => null,
            style: 'cancel',
          },
          { text: strings.yes, onPress: () => BackHandler.exitApp() },
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
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getPermission({}))
      return () => { };
    }, [navigation])
  )
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
  }, [response])
  useEffect(() => {
    if (response?.data?.qr_code === "" || response?.data?.qr_code === undefined ||
      response?.data?.qr_code === null) {
      getQrCode()
      getDashboard()
    }
  }, [response, qrCodeResponse])

  const getQrCode = () => {
    dispatch(generateQrCode({}))
  }
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
    navigation.navigate('PropertyDetails', { ...items, property_id: items._id })
  }
  const onPressMore = () => {
    navigation.navigate('PropertyScreenView')
  }

  const onpressButton = (type: any, onPressType: any) => {
    if (type === 'visit') {
      navigation.navigate('LeadManagement', 'today')
    } else if (type === 'appointment') {
      navigation.navigate('AppointmentScreen', onPressType)
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
    getDashboard={getDashboard}
  />;
};

export default DashboardScreen;
