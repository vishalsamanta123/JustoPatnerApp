import { getPermission } from 'app/Redux/Actions/permissionAction';
import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreenVeiw from './components/SplashScreenVeiw';

const SplashScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response, authToken = false } = useSelector((state: any) => state.login);
  // useLayoutEffect(() => { navigation.replace('AuthLoading'); }, [authToken])
  setTimeout(() => {
    navigation.replace('AuthLoading');
  }, 3000);
  
  useEffect(() => {
    dispatch(getPermission({}))
  }, [navigation])
  return <SplashScreenVeiw />;
};

export default SplashScreen;
