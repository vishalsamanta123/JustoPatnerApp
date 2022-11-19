import React, { useState, useEffect } from 'react';
import { validateEmail, RED_COLOR } from '../../../components/utilities/constant';
import ChangePasswordView from './components/ChangePasswordView';
import ErrorMessage from 'app/components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { updatepassword } from 'app/Redux/Actions/AuthActions';
import { UPDATEPASSWORD_NULL } from 'app/Redux/types';
import Loader from 'app/components/CommonScreen/Loader';
import strings from 'app/components/utilities/Localization';

const ChangePassword = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const [email, setEmail] = useState(route?.params);
  const [isloading, setIsloading] = useState(false)
  const [validEmail, setIsValidEmail] = useState(false);
  const [passwordDate, setPasswordDate] = useState({
    password: '',
    cpassword: ''
  });

  const uPasswordSelector = useSelector((state: any) => state.updatepasswordResponce);

  useEffect(() => {
    checklogin()
  }, [uPasswordSelector])

  const checklogin = async () => {
    if (uPasswordSelector.response && uPasswordSelector.updatepassword) {
      // console.log("checklogin -> uPasswordSelector.response.status", uPasswordSelector.response.status)
      if (uPasswordSelector.response.status === 200) {
        dispatch({
          type: UPDATEPASSWORD_NULL,
          payload: []
        })
        setIsloading(uPasswordSelector.loading)
        navigation.navigate('LoginScreenView');
      } else {
        if (uPasswordSelector.error) {
          setIsloading(uPasswordSelector.loading)

          ErrorMessage({
            msg: uPasswordSelector.response.message,
            backgroundColor: RED_COLOR
          })

          dispatch({
            type: UPDATEPASSWORD_NULL,
            payload: []
          })
        }
      }
    }/* else {
        ErrorMessage({
          msg: uPasswordSelector.response.message,
          backgroundColor: RED_COLOR
        })
        
      } */
  }


  const validation = () => {
    let isError = true;
    let errorMessage: any = ''

    if (passwordDate?.password !== passwordDate?.cpassword) {
      isError = false;
      errorMessage = strings.passwordnotmatch
    }

    if (passwordDate?.password == undefined || passwordDate?.password == '' || passwordDate?.cpassword == undefined || passwordDate?.cpassword == '') {
      isError = false;
      errorMessage = strings.requiredpassword
    }
    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }

  const handlechanngePress = () => {
    if (validation()) {
      setIsloading(true)
      const params = {
        email: email,
        password: passwordDate?.password
      }
      dispatch(updatepassword(params))
      
    }
    //navigation.navigate('LoginScreenView');
  };

  return (
    <>
      {isloading ? <Loader /> : null}
      <ChangePasswordView
        setPasswordDate={setPasswordDate}
        passwordDate={passwordDate}
        validEmail={validEmail}
        handlechanngePress={handlechanngePress}

      />
    </>
  );
};

export default ChangePassword;
