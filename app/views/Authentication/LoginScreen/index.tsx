import ErrorMessage from 'app/components/ErrorMessage';
import { setDefaultHeader } from 'app/components/utilities/httpClient';
import { userLogin } from 'app/Redux/Actions/AuthActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateEmail, RED_COLOR } from '../../../components/utilities/constant';
import LoginView from './components/LoginView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from 'app/components/CommonScreen/Loader';
import strings from 'app/components/utilities/Localization';

const LoginScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [isloading, setIsloading] = useState(false)
  const [validEmail, setIsValidEmail] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    login_type: 2
  })
  const loginSelector = useSelector((state: any) => state.login);
  //console.log("LoginScreen -> loginSelector", loginSelector)
  useEffect(() => {
    checklogin()
  }, [loginSelector])

  const checklogin = async () => {
    const authval = await AsyncStorage.getItem("AuthToken");
      if (loginSelector.response && loginSelector.authToken) {
        setIsloading(loginSelector.loading)
        // console.log("checklogin -> loginSelector.response.status", loginSelector.response.status)
        if (loginSelector.response.status === 200) {
         await setDefaultHeader("token", loginSelector.response.token);
         await AsyncStorage.setItem('loginData',JSON.stringify(loginSelector.response))
          navigation.navigate('DashboardScreenView');
        } else {
          
          ErrorMessage({
            msg: loginSelector?.response?.message,
            backgroundColor: RED_COLOR
          })
        }
      }else {
        setIsloading(loginSelector.loading)
        if(authval != null){
          await setDefaultHeader("token", authval);
         navigation.navigate('DashboardScreenView');
        }else{
          ErrorMessage({
            msg: loginSelector?.response?.message,
            backgroundColor: RED_COLOR
          })

        }

      /*   await setDefaultHeader("token", authval);
        navigation.navigate('DashboardScreenView'); */
        
      }
  }
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (loginData.password == undefined || loginData.password == '' && loginData.email == undefined || loginData.email == '') {
      isError = false;
      errorMessage = strings.usernamepasswordempty
    }
    else if (reg.test(loginData.email) === false) {
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

    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    //console.log('isError: ', isError);
    return isError;
  }
  const handleLoginPress = () => {
    if (validation()) {
      setIsloading(true)
      const respon = dispatch(userLogin(loginData))
      // console.log("handleLoginPress -> respon", respon)
      //navigation.navigate('DashboardScreenView');
    }
    
  };
  const handleSingupPress = () => {
    navigation.navigate('RegistrationScreenView');
  };
  const handlePrivacy = (data : any) => {
    navigation.navigate('privacyPolicy',data);
  };
 
  const handleForgotPress = () => {
    navigation.navigate('ForgotPassword');
  };
  return (
    <>
      {/* {isloading ? <Loader /> : null} */}
      <LoginView
        validEmail={validEmail}
        handleLoginPress={handleLoginPress}
        handleSingupPress={handleSingupPress}
        handleForgotPress={handleForgotPress}
        handlePrivacy={(data : any) => handlePrivacy(data)}
        setLoginData={setLoginData}
        loginData={loginData}
      />
    </>
  );
};

export default LoginScreen;
