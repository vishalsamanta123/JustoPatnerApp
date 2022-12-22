import React, { useState, useEffect } from 'react'
import OtpVerificationView from './components/OtpVerificationView'
import ErrorMessage from 'app/components/ErrorMessage';
import { RED_COLOR, GREEN_COLOR } from 'app/components/utilities/constant';
import { useDispatch, useSelector } from 'react-redux';
import { otpVerify, Resendotp } from 'app/Redux/Actions/AuthActions';
import { OTPVERIFY_NULL } from 'app/Redux/types';
import strings from 'app/components/utilities/Localization';

const OtpVerificationScreen = ({ navigation, route }: any) => {
  const { type, email } = route?.params || {}
  const dispatch: any = useDispatch()
  const [otp, setOtp] = useState('');
  // const [email, setEmail,] = useState();
  const handleOtpChange = (value: any) => {
    setOtp(value);
  }

  const otpVerifySelector = useSelector((state: any) => state.otpVerifyResponce);
  //const loading = otpVerifySelector.loading
  //console.log("OtpVerificationScreen -> otpVerifySelector", otpVerifySelector)

  useEffect(() => {
    checkverify()
  }, [otpVerifySelector])

  const checkverify = async () => {
    if (otpVerifySelector.response && otpVerifySelector?.otpverify) {
      if (otpVerifySelector?.response.status === 200) {
        dispatch({
          type: OTPVERIFY_NULL,
          payload: []
        })
        if (!otpVerifySelector?.resend) {
          if (type == strings.registration) {
            navigation.navigate('LoginScreenView');
          } else {
            navigation.navigate('ChangePasswordScreenView', email);
          }
        } else {
          ErrorMessage({
            msg: otpVerifySelector.response.message,
            backgroundColor: GREEN_COLOR
          })
        }
      }
    }/* else {
        ErrorMessage({
          msg: otpVerifySelector.response.message,
          backgroundColor: RED_COLOR
        })
        
      } */
  }


  const OnpressConfirm = () => {
    if (validation()) {
      const params = {
        email: email,
        otp: otp
      }
      dispatch(otpVerify(params))
      //navigation.navigate('ChangePasswordScreenView')
    }
  }
  const handleResendOtp = () => {
    const params = {
      email: email,
    }
    //console.log("handleResendOtp -> params", params)
    dispatch(Resendotp(params))
  }

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''

    if (otp == undefined || otp == '') {
      isError = false;
      errorMessage = strings.otprequired
    }

    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }

  return (
    <>
      <OtpVerificationView
        otp={otp}
        setOtp={setOtp}
        OnpressConfirm={OnpressConfirm}
        handleOtpChange={handleOtpChange}
        handleResendOtp={handleResendOtp}
        email={email}
      />
    </>
  )
}

export default OtpVerificationScreen