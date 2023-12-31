import ErrorMessage from 'app/components/ErrorMessage';
import { setDefaultHeader } from 'app/components/utilities/httpClient';
import { userLogin } from 'app/Redux/Actions/AuthActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail, RED_COLOR, Regexs } from '../../../components/utilities/constant';
import LoginView from './components/LoginView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from 'app/components/CommonScreen/Loader';
import strings from 'app/components/utilities/Localization';
import { RegistrationFormRemv } from 'app/Redux/Actions/ReggistrationAction';
import { Keyboard } from 'react-native';

const LoginScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [validEmail, setIsValidEmail] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    login_type: 2
  })

  const { response = {} } = useSelector((state: any) => state.login)

  useEffect(() => {
    if (response?.status === 203) {
      ErrorMessage({
        msg: response?.message,
        backgroundColor: RED_COLOR
      })
      navigation.navigate('OtpVerificationScreenView', { email: response?.data?.email, type: strings.registration, });
    }
  }, [response])
  
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (loginData.password == undefined || loginData.password == '' && loginData.email == undefined || loginData.email == '') {
      isError = false;
      errorMessage = strings.usernamepasswordempty
    }
    else if ( Regexs.emailOrPhone.test(loginData.email) === false) {
      isError = false;
      errorMessage = strings.correctemail
    }
    else if (loginData.email == undefined || loginData.email == '') {
      isError = false;
      errorMessage = strings.usernamerequired
    }
    else if (loginData.password == undefined || loginData.password == '') {
      isError = false;
      errorMessage = strings.passwordrequired
    }
    if(!isError){
      Keyboard.dismiss()
    }
    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }
  const handleLoginPress = async () => {
    const localFCM = await AsyncStorage.getItem('fcm');
    if (validation()) {
      dispatch(userLogin({...loginData, device_id: localFCM}))
    }

  };
  const handleSingupPress = () => {
    navigation.navigate('RegistrationScreenView');
    dispatch(RegistrationFormRemv())
  };
  const handlePrivacy = (data: any) => {
    navigation.navigate('privacyPolicy', data);
  };

  const handleForgotPress = () => {
    navigation.navigate('ForgotPassword');
  };
  return (
    <LoginView
      validEmail={validEmail}
      handleLoginPress={handleLoginPress}
      handleSingupPress={handleSingupPress}
      handleForgotPress={handleForgotPress}
      handlePrivacy={(data: any) => handlePrivacy(data)}
      setLoginData={setLoginData}
      loginData={loginData}
    />
  );
};

export default LoginScreen;
