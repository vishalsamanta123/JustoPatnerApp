import ErrorMessage from 'app/components/ErrorMessage';
import { RED_COLOR } from 'app/components/utilities/constant';
import { checkEmailMobile, RegistrationForm } from 'app/Redux/Actions/ReggistrationAction';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegistrationView from './components/RegistrationView';

const RegistrationScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [isError, setisError] = useState(false)
  const createChannelPartnerData = useSelector((state: any) => state.createChannlePartner)
  const registrationData = useSelector((state: any) => state.registrationForm)
  const [resgistrationData, setResgistrationData] = useState({
    profile_picture: {},
    owner_name: '',
    adhar_no: '',
    pancard_no: '',
    gender: 'male',
    date_of_birth: '',
    primary_mobile: '',
    whatsapp_number: '',
    email: '',
    working_location: [],
  })
  console.log('resgistrationData: ', resgistrationData);
  useEffect(() => {
    setResgistrationData({ ...registrationData.response })
  }, [registrationData])
  useEffect(() => {
    handleError()
  }, [createChannelPartnerData])

  const handleError = () => {
    setisError(true)
    if (isError) {
      setTimeout(() => {
        ErrorMessage({
          msg: createChannelPartnerData?.response?.message,
          backgroundColor: RED_COLOR
        })
      }, 250);
      setisError(createChannelPartnerData?.isError)
    }
  }

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (resgistrationData.owner_name == undefined || resgistrationData.owner_name == '') {
      isError = false;
      errorMessage = "Owner Name is require. Please enter Owner Name"
    }
    else if (resgistrationData.adhar_no == undefined || resgistrationData.adhar_no == '') {
      isError = false;
      errorMessage = "Adhar No. is require. Please enter Adhar No."
    }
    else if (resgistrationData.pancard_no == undefined || resgistrationData.pancard_no == '') {
      isError = false;
      errorMessage = "Pancard No. is require. Please enter Pancard No."
    }
    else if (resgistrationData.gender == undefined || resgistrationData.gender == '') {
      isError = false;
      errorMessage = "Gender is require. Please enter Gender"
    }
    else if (resgistrationData.date_of_birth == undefined || resgistrationData.date_of_birth == '') {
      isError = false;
      errorMessage = "Date of Birth is require. Please enter Date of Birth"
    }
    else if (resgistrationData.primary_mobile == undefined || resgistrationData.primary_mobile == '') {
      isError = false;
      errorMessage = "Mobile No. is require. Please enter Mobile No."
    }
    else if (resgistrationData.whatsapp_number == undefined || resgistrationData.whatsapp_number == '') {
      isError = false;
      errorMessage = "WhatsaApp No. is require. Please enter WhatsaApp No."
    }
    else if (resgistrationData.email == undefined || resgistrationData.email == '') {
      isError = false;
      errorMessage = "Email is require. Please enter Email"
    }
    else if (resgistrationData.working_location == undefined || resgistrationData.working_location == null) {
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
      dispatch(RegistrationForm(resgistrationData))
      navigation.navigate('UserBankInfo')
    }
    // navigation.navigate('UserBankInfo')
  }

  const handleCheckEmailMobile = (type: any) => {
    const params = type == 1 ? { mobile: resgistrationData?.primary_mobile } : { email: resgistrationData?.email }
    dispatch(checkEmailMobile(params))
  }
  const onPressBack = () => {
    navigation.goBack()
  }
  return <RegistrationView
    setResgistrationData={setResgistrationData}
    resgistrationData={resgistrationData}
    onPressBack={onPressBack}
    onPressNext={onPressNext}
    handleCheckEmailMobile={handleCheckEmailMobile}
  />;
};

export default RegistrationScreen;
