import React, { useState } from 'react'
import OtpVerificationView from './components/OtpVerificationView'

const OtpVerificationScreen = ({navigation}: any) => {
    const [otp, setOtp] = useState();
    const handleOtpChange = (value: any) => {
        setOtp(value);
    }
    const OnpressConfirm = () => {
      navigation.navigate('ChangePasswordScreenView')
    }
  return (
    <OtpVerificationView otp={otp} setOtp={setOtp} OnpressConfirm={OnpressConfirm} handleOtpChange={handleOtpChange}/>
  )
}

export default OtpVerificationScreen