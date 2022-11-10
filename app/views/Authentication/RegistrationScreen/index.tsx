import React, { useState } from 'react';
import RegistrationView from './components/RegistrationView';

const RegistrationScreen = ({ navigation }: any) => {
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

  const onPressNext = () => {
    console.log('resgistrationData: ', resgistrationData);
    // navigation.navigate('UserBankInfo')
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
