import ErrorMessage from 'app/components/ErrorMessage';
import { RED_COLOR } from 'app/components/utilities/constant';
import { RegistrationForm } from 'app/Redux/Actions/ReggistrationAction';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import RegistrationView from './components/RegistrationView';

const RegistrationScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [resgistrationData, setResgistrationData] = useState({
    ownerName: '',
    adharno: '',
    pancardno: '',
    gender: 'male',
    dob: '',
    mobileno: '',
    whatsappno: '',
    email: '',
    workinglocation: {},
  })

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (resgistrationData.ownerName == undefined || resgistrationData.ownerName == '') {
      isError = false;
      errorMessage = "Owner Name is require. Please enter Owner Name"
    }
    else if (resgistrationData.adharno == undefined || resgistrationData.adharno == '') {
      isError = false;
      errorMessage = "Adhar No. is require. Please enter Adhar No."
    }
    else if (resgistrationData.pancardno == undefined || resgistrationData.pancardno == '') {
      isError = false;
      errorMessage = "Pancard No. is require. Please enter Pancard No."
    }
    else if (resgistrationData.gender == undefined || resgistrationData.gender == '') {
      isError = false;
      errorMessage = "Gender is require. Please enter Gender"
    }
    else if (resgistrationData.dob == undefined || resgistrationData.dob == '') {
      isError = false;
      errorMessage = "Date of Birth is require. Please enter Date of Birth"
    }
    else if (resgistrationData.mobileno == undefined || resgistrationData.mobileno == '') {
      isError = false;
      errorMessage = "Mobile No. is require. Please enter Mobile No."
    }
    else if (resgistrationData.whatsappno == undefined || resgistrationData.whatsappno == '') {
      isError = false;
      errorMessage = "WhatsaApp No. is require. Please enter WhatsaApp No."
    }
    else if (resgistrationData.email == undefined || resgistrationData.email == '') {
      isError = false;
      errorMessage = "Email is require. Please enter Email"
    }
    else if (resgistrationData.workinglocation == undefined || resgistrationData.workinglocation == '') {
      isError = false;
      errorMessage = "Working Location is require. Please enter Working Location"
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

  const onPressNext = () => {
    // if(validation()){
    //   console.log('resgistrationData: ', resgistrationData);
    //   dispatch(RegistrationForm(resgistrationData))
    //   navigation.navigate('UserBankInfo')
    // }
    navigation.navigate('UserBankInfo')
  }
  const onPressBack = () => {
    navigation.goBack()
  }
  return <RegistrationView
    setResgistrationData={setResgistrationData}
    resgistrationData={resgistrationData}
    onPressBack={onPressBack}
    onPressNext={onPressNext}
  />;
};

export default RegistrationScreen;
