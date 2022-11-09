import React from 'react';
import RegistrationView from './components/RegistrationView';

const RegistrationScreen = ({navigation}: any) => {
  const onPressNext = () => {
    navigation.navigate('UserBankInfo')
  }
  const onPressBack = () => {
    navigation.goBack()
  }
  return <RegistrationView onPressBack={onPressBack} onPressNext={onPressNext} />;
};

export default RegistrationScreen;
