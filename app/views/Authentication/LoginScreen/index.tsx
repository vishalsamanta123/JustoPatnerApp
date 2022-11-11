import ErrorMessage from 'app/components/ErrorMessage';
import { setDefaultHeader } from 'app/components/utilities/httpClient';
import { userLogin } from 'app/Redux/Actions/AuthActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail, RED_COLOR } from '../../../components/utilities/constant';
import LoginView from './components/LoginView';

const LoginScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [validEmail, setIsValidEmail] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  // console.log('loginData: ', loginData);
  const loginSelector = useSelector((state: any) => state.login);

  useEffect(() => {
    checklogin()
  }, [loginSelector])

  const checklogin = async () => {
    if (loginSelector.response && loginSelector.authToken) {
      if (loginSelector.response.status === 200) {
        await setDefaultHeader("token", loginSelector.response.token);
        navigation.navigate('DashboardScreenView');
      } else {
        console.log('loginSelector.response.message: ', loginSelector.response.message);
        ErrorMessage({
          msg: loginSelector.response.message,
          backgroundColor: RED_COLOR
        })
      }
    }
  }
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (loginData.password == undefined || loginData.password == '' && loginData.email == undefined || loginData.email == '') {
      isError = false;
      errorMessage = "Username and Password is require. Please enter Username and password"
    }
    else if (loginData.email == undefined || loginData.email == '') {
      isError = false;
      errorMessage = "Username is require. Please enter username"
    }
    else if (loginData.password == undefined || loginData.password == '') {
      isError = false;
      errorMessage = "Password is require. Please enter password"
    }

    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    console.log('isError: ', isError);
    return isError;
  }
  const handleLoginPress = () => {
    // if (validation()) {
    //   dispatch(userLogin(loginData))
    // }
    navigation.navigate('DashboardScreenView');
  };
  const handleSingupPress = () => {
    navigation.navigate('RegistrationScreenView');
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
      setLoginData={setLoginData}
      loginData={loginData}
    />
  );
};

export default LoginScreen;
