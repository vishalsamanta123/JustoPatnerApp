import { getPermission } from 'app/Redux/Actions/permissionAction';
import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreenVeiw from './components/SplashScreenVeiw';
import { navigate } from 'app/components/utilities/GlobalFuncations';

const SplashScreen = ({ navigation, route }: any) => {
  const {
    notificationType,
    data
  } = route?.params || {}
  const dispatch: any = useDispatch()
  const { response, authToken = false } = useSelector((state: any) => state.login);
  // useLayoutEffect(() => { navigation.replace('AuthLoading'); }, [authToken])
  setTimeout(() => {
    navigation.replace('AuthLoading');
  }, 3000);

  useEffect(() => {
    dispatch(getPermission({}))
  }, [navigation])
  useEffect(() => {
    handleNotification()
  }, [route])

  const handleNotification = () => {
    console.log("data SplashScreen: IN handleNotification", data);
    console.log("notificationType SplashScreen: ", notificationType);

    setTimeout(() => {
      switch (notificationType) {
        case 'lead':
          console.log('LEAD CALLED ++ + + ++ ++ ++ ++ +')
          navigate('LeadManagement', {})
          // navigation.dispatch(
          //   CommonActions.navigate({
          //     name: 'LeadManagementScreen',
          //     params: {},
          //   })
          // );
          break;
        case 'appoinment':
          navigate('Appointments', {})
          break;
        // case 'ready to book':
        //   navigate('BookingList', { type: 'readyToBook', })
        //   break;
        // case 'booking':
        //   navigate('BookingList', { type: 'request', })
        //   break;
        case 'followUp':
          navigate('FollowUpScreen', {})
          break;
        case 'property':
          navigate('PropertyScreenView', {})
          break;
        // case 'registration':
        //   navigate('BookingList', { type: 'register' })
        //   break;
        case 'support':
          navigate('Support', {})
          break;
        case 'user appointment':
          navigate('appointmentWithSM', {})
          break;
        case 'cpassign':
          navigate('AgentListing', {})
          break;
        case 'announcement':
          navigate('notification', {})
          break;
        default:
          navigate('AuthLoading', {})
          break;
      }
    }, 3020);
  };


  return <SplashScreenVeiw />;
};

export default SplashScreen;
