import React, { useState, useEffect } from 'react'
import ForgotPasswordView from './components/ForgotPasswordView'
import ErrorMessage from 'app/components/ErrorMessage'
import { RED_COLOR, BLACK_COLOR } from 'app/components/utilities/constant'
import { useDispatch, useSelector } from 'react-redux'
import { forgotemailverify } from 'app/Redux/Actions/AuthActions';
import { FORGOT_PASSWORD,FORGOT_NULL } from 'app/Redux/types'
import Loader from 'app/components/CommonScreen/Loader'
import strings from 'app/components/utilities/Localization'

const ForgotPassword = ({navigation}: any) => {
  const dispatch: any = useDispatch()
  const [email, setEmail] = useState('')
  const [isloading, setIsloading] = useState(false)

  const forgotSelector = useSelector((state: any) => state.forgotResponce);
  useEffect(() => {
    checklogin()
  }, [forgotSelector])

  const checklogin = async () => {
      if (forgotSelector.response && forgotSelector.forgot) {
        // console.log("checklogin -> forgotSelector.response.status", forgotSelector.response.status)
        if (forgotSelector.response.status === 200) {
              dispatch({
                type: FORGOT_NULL,
                payload: []
            })
            setIsloading(forgotSelector.loading)
           navigation.navigate('OtpVerificationScreenView',{email: email});
        } else {
          if(forgotSelector.error){
            setIsloading(forgotSelector.loading)
            ErrorMessage({
              msg: forgotSelector.response.message,
              backgroundColor: RED_COLOR
            })
          }
        }
      }/* else {
        ErrorMessage({
          msg: forgotSelector.response.message,
          backgroundColor: RED_COLOR
        })
        
      } */
  }

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
   
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      isError = false;
      errorMessage = strings.correctemail
    }
    if (email == undefined || email == '') {
      isError = false;
      errorMessage = strings.emailrequired
  }
   
   if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }
  
  const handleOtp = () => {
    if(validation()){
      setIsloading(true)
      const params = {
        email:email
      }
      dispatch(forgotemailverify(params))

       //navigation.navigate('OtpVerificationScreenView')
    }
  }
  return (
    <>
    {isloading ? <Loader /> : null}
   <ForgotPasswordView 
   handleOtp={handleOtp} 
   email={email} 
   setEmail={setEmail}/> 
   </>
  )
}

export default ForgotPassword