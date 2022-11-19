import React, { useState, useEffect } from 'react'
import OtpVerificationView from './components/OtpVerificationView'
import ErrorMessage from 'app/components/ErrorMessage';
import { RED_COLOR, GREEN_COLOR } from 'app/components/utilities/constant';
import { useDispatch, useSelector } from 'react-redux';
import { otpVerify, Resendotp } from 'app/Redux/Actions/AuthActions';
import { OTPVERIFY_NULL } from 'app/Redux/types';
import Loader from 'app/components/CommonScreen/Loader';
import strings from 'app/components/utilities/Localization';

const OtpVerificationScreen = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState(route?.params);
  const [isloading, setIsloading] = useState(false)
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
        setIsloading(otpVerifySelector.loading)
        if (!otpVerifySelector?.resend) {
          navigation.navigate('ChangePasswordScreenView', email);
        } else {

          ErrorMessage({
            msg: otpVerifySelector.response.message,
            backgroundColor: GREEN_COLOR
          })

        }
      } else {
        if (otpVerifySelector?.error) {
          dispatch({
            type: OTPVERIFY_NULL,
            payload: []
          })
          setIsloading(otpVerifySelector.loading)
          ErrorMessage({
            msg: otpVerifySelector.response.message,
            backgroundColor: RED_COLOR
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
      setIsloading(true)
      const params = {
        email: email,
        otp: otp
      }
      dispatch(otpVerify(params))
      //navigation.navigate('ChangePasswordScreenView')
    }
  }
  const handleResendOtp = () => {
    setIsloading(true)
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
      {isloading ? <Loader /> : null}
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