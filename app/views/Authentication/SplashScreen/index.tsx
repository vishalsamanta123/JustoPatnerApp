import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import SplashScreenVeiw from './components/SplashScreenVeiw';

const SplashScreen = ({ navigation }: any) => {
  const { response, authToken = false } = useSelector((state: any) => state.login);
  useLayoutEffect(() => { navigation.replace('AuthLoading'); }, [authToken])
  setTimeout(() => {
    navigation.replace('AuthLoading');
  }, 3000);
  return <SplashScreenVeiw />;
};

export default SplashScreen;
