import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR, Regexs, validateEmail } from "app/components/utilities/constant";
import {
  checkEmailMobile,
  emailCheckRemove,
  RegistrationForm,
  RegistrationFormRemv,
} from "app/Redux/Actions/ReggistrationAction";
import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RegistrationView from "./components/RegistrationView";

const RegistrationScreen = ({ navigation }: any) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const dispatch: any = useDispatch();
  const [isError, setisError] = useState(false);
  const [locationModel, setLocationModel] = useState(false);
  const [emailMobvalidation, setEmailMobValidation] = useState({
    primary_mobile: null,
    email: null,
  });
  const emailAndMobileData = useSelector(
    (state: any) => state.emailAndMobileData
  );
  const registrationData = useSelector((state: any) => state.registrationForm);
  const [registerForm, setRegisterForm] = useState({
    profile_picture: {},
    owner_name: "",
    adhar_no: "",
    pancard_no: "",
    gender: "",
    date_of_birth: "",
    primary_mobile: "",
    whatsapp_number: "",
    email: "",
    working_location: [],
    location: '',
    latitude: '',
    longitude: '',
  });
  useEffect(() => {
    if (typeof registrationData?.response === 'object') {
      setRegisterForm({
        ...registrationData?.response,
        working_location: registrationData?.response?.working_location ?? []
      });
    }
  }, [registrationData, navigation]);

  const validation = () => {
    Keyboard.dismiss()
    if (!isKeyboardVisible) {
      let isError = true;
      let errorMessage: any = "";
      if (registerForm.owner_name == undefined || registerForm.owner_name == "") {
        isError = false;
        errorMessage = "Owner Name is require. Please enter Owner Name";
      }
      //  else if (
      //   registerForm.adhar_no == undefined || registerForm.adhar_no == ""
      // ) {
      //   isError = false;
      //   errorMessage = "Aadhaar No. is require. Please enter Aadhaar No.";
      // } 
      // else if (
      //   Regexs.AadharRegex.test(registerForm.adhar_no) === false
      // ) {
      //   isError = false;
      //   errorMessage = "Please enter the valid Aadhaar number";
      // }
      // else if (
      //   registerForm.pancard_no == undefined || registerForm.pancard_no == ""
      // ) {
      //   isError = false;
      //   errorMessage = "Pancard No. is require. Please enter Pancard No.";
      // } 
      // else if (
      //   Regexs.panRegex.test(registerForm.pancard_no) === false
      // ) {
      //   isError = false;
      //   errorMessage = "Please enter the valid Pancard number";
      // }
      else if (
        registerForm.gender == undefined || registerForm.gender == "") {
        isError = false;
        errorMessage = "Gender is require. Please enter Gender";
      } else if (
        registerForm.date_of_birth == undefined || registerForm.date_of_birth == ""
      ) {
        isError = false;
        errorMessage = "Date of Birth is require. Please enter Date of Birth";
      } else if (
        registerForm.primary_mobile == undefined || registerForm.primary_mobile == ""
      ) {
        isError = false;
        errorMessage = "Mobile No. is require. Please enter Mobile No.";
      } else if (emailMobvalidation.primary_mobile == null) {
        isError = false;
        errorMessage = "Mobile No. is already registered. Please enter other Mobile No.";
      } else if (
        registerForm.whatsapp_number == undefined || registerForm.whatsapp_number == ""
      ) {
        isError = false;
        errorMessage = "WhatsaApp No. is require. Please enter WhatsaApp No.";
      } else if (registerForm.email == undefined || registerForm.email == "") {
        isError = false;
        errorMessage = "Email is require. Please enter Email";
      } else if (validateEmail.test(registerForm.email) === false) {
        isError = false;
        errorMessage = "Email format is wrong. Please enter correct Email";
      } else if (emailMobvalidation.email == null) {
        isError = false;
        errorMessage = "Email is already registered. Please enter other Email";
      } else if (
        registerForm.working_location.length === 0 ||
        registerForm.working_location === undefined
      ) {
        isError = false;
        errorMessage =
          "Working Location is require. Please enter Working Location";
      } else if (
        registerForm.location === '' ||
        registerForm.location === undefined
      ) {
        isError = false;
        errorMessage = "Address is require. Please enter address";
      }
      if (errorMessage !== "") {
        ErrorMessage({
          msg: errorMessage,
          backgroundColor: RED_COLOR,
        });
      }
      return isError;
    }
  };

  const onPressNext = () => {
    if (validation()) {
      dispatch(RegistrationForm(registerForm));
      navigation.navigate("UserBankInfo");
    }
  };

  useEffect(() => {
    if (emailAndMobileData?.response?.status === 200) {
      dispatch(emailCheckRemove());
      switch (emailAndMobileData?.check_type) {
        case 'mobile':
          setEmailMobValidation({
            ...emailMobvalidation,
            primary_mobile: emailAndMobileData?.check_type,
          })
          break;
        case 'email':
          setEmailMobValidation({
            ...emailMobvalidation,
            email: emailAndMobileData?.check_type,
          })
          break;
        default:
          break;
      }
      // ErrorMessage({
      //   msg: emailAndMobileData?.response?.message,
      //   backgroundColor: GREEN_COLOR
      // })
    }
  }, [emailAndMobileData]);
  const handleCheckEmailMobile = (type: any) => {
    const params =
      type == 1
        ? { mobile: registerForm?.primary_mobile }
        : { email: registerForm?.email };
    dispatch(checkEmailMobile(params));
  };
  const onPressBack = () => {
    navigation.goBack();
    dispatch(RegistrationFormRemv())
  };
  return (
    <RegistrationView
      setRegisterForm={setRegisterForm}
      registerForm={registerForm}
      onPressBack={onPressBack}
      onPressNext={onPressNext}
      locationModel={locationModel}
      setLocationModel={setLocationModel}
      handleCheckEmailMobile={handleCheckEmailMobile}
      emailMobvalidation={emailMobvalidation}
      setEmailMobValidation={setEmailMobValidation}
    />
  );
};

export default RegistrationScreen;
