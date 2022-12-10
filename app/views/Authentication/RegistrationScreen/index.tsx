import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR, RED_COLOR } from 'app/components/utilities/constant';
import { checkEmailMobile, emailCheckRemove, RegistrationForm } from 'app/Redux/Actions/ReggistrationAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegistrationView from './components/RegistrationView';

const RegistrationScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [isError, setisError] = useState(false)
  const [locationModel, setLocationModel] = useState(false)
  const emailAndMobileData = useSelector((state: any) => state.emailAndMobileData)
  const registrationData = useSelector((state: any) => state.registerForm)
  const [registerForm, setRegisterForm] = useState({
    profile_picture: {},
    owner_name: '',
    adhar_no: '',
    pancard_no: '',
    gender: '',
    date_of_birth: '',
    primary_mobile: '',
    whatsapp_number: '',
    email: '',
    working_location: [],
  })
  useEffect(() => {
    if (registrationData?.response) {
      setRegisterForm({
        ...registrationData?.response
      })
    }
  }, [registrationData])

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (registerForm.owner_name == undefined || registerForm.owner_name == '') {
      isError = false;
      errorMessage = "Owner Name is require. Please enter Owner Name"
    }
    else if (registerForm.adhar_no == undefined || registerForm.adhar_no == '') {
      isError = false;
      errorMessage = "Aadhar No. is require. Please enter Aadhar No."
    }
    else if (registerForm.pancard_no == undefined || registerForm.pancard_no == '') {
      isError = false;
      errorMessage = "Pancard No. is require. Please enter Pancard No."
    }
    else if (registerForm.gender == undefined || registerForm.gender == '') {
      isError = false;
      errorMessage = "Gender is require. Please enter Gender"
    }
    else if (registerForm.date_of_birth == undefined || registerForm.date_of_birth == '') {
      isError = false;
      errorMessage = "Date of Birth is require. Please enter Date of Birth"
    }
    else if (registerForm.primary_mobile == undefined || registerForm.primary_mobile == '') {
      isError = false;
      errorMessage = "Mobile No. is require. Please enter Mobile No."
    }
    else if (registerForm.whatsapp_number == undefined || registerForm.whatsapp_number == '') {
      isError = false;
      errorMessage = "WhatsaApp No. is require. Please enter WhatsaApp No."
    }
    else if (registerForm.email == undefined || registerForm.email == '') {
      isError = false;
      errorMessage = "Email is require. Please enter Email"
    }
    else if (registerForm.working_location.length === 0 || registerForm.working_location === undefined) {
      isError = false;
      errorMessage = "Working Location is require. Please enter Working Location"
    }

    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    // console.log('isError: ', isError);
    return isError;
  }

  const onPressNext = () => {
    if (validation()) {
      dispatch(RegistrationForm(registerForm))
      navigation.navigate('UserBankInfo')
    }
    // navigation.navigate('UserBankInfo')
  }

  useEffect(() => {
    if (emailAndMobileData?.response?.status === 200) {
      dispatch(emailCheckRemove())
      // ErrorMessage({
      //   msg: emailAndMobileData?.response?.message,
      //   backgroundColor: GREEN_COLOR
      // })
    }
  }, [emailAndMobileData])
  const handleCheckEmailMobile = (type: any) => {
    const params = type == 1 ? { mobile: registerForm?.primary_mobile } : { email: registerForm?.email }
    dispatch(checkEmailMobile(params))
  }
  const onPressBack = () => {
    navigation.goBack()
  }
  return <RegistrationView
    setRegisterForm={setRegisterForm}
    registerForm={registerForm}
    onPressBack={onPressBack}
    onPressNext={onPressNext}
    locationModel={locationModel}
    setLocationModel={setLocationModel}
    handleCheckEmailMobile={handleCheckEmailMobile}
  />;
};

export default RegistrationScreen;
