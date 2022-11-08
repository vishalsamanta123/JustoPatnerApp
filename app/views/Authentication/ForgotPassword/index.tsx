import React from 'react'
import ForgotPasswordView from './components/ForgotPasswordView'

const ForgotPassword = ({navigation}: any) => {
  const handleOtp = () => {
    navigation.navigate('OtpVerificationScreenView')
  }
  return (
   <ForgotPasswordView handleOtp={handleOtp}/> 
  )
}

export default ForgotPassword