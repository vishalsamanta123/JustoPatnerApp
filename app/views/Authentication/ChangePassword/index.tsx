import React, {useState} from 'react';
import {validateEmail} from '../../../components/utilities/constant';
import ChangePasswordView from './components/ChangePasswordView';

const ChangePassword = ({navigation}: any) => {
  const [validEmail, setIsValidEmail] = useState(false);
  const handleEmailChange = (val: any) => {
    if (val.length <= 0) {
      setIsValidEmail(false);
    } else if (validateEmail.test(val) === false) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };
  const handlePasswordChange = (val: any) => {
    console.log('val', val);
  };
  const handlechanngePress = () => {
    navigation.navigate('LoginScreenView');
  };
  
  return (
    <ChangePasswordView
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      validEmail={validEmail}
      handlechanngePress={handlechanngePress}
     
    />
  );
};

export default ChangePassword;
