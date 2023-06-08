import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR, RED_COLOR, Regexs, validateEmail } from "app/components/utilities/constant";
import strings from "app/components/utilities/Localization";
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
    norera_register: null,
  });
  useEffect(() => {
    if (typeof registrationData?.response === 'object' && registrationData?.response?.emailMobvalidation) {
      setRegisterForm({
        ...registrationData?.response,
        working_location: registrationData?.response?.working_location ?? []
      });
      setEmailMobValidation(registrationData?.response?.emailMobvalidation)
    }
  }, [registrationData, navigation]);

  const validation = () => {
    if (emailMobvalidation.primary_mobile === "mobileStart" ||
      emailMobvalidation.email === "emailStart") {
      Keyboard.dismiss()
    } else {
      let isError = true;
      let errorMessage: any = "";
      if (registerForm.owner_name == undefined || registerForm.owner_name == "") {
        isError = false;
        errorMessage = strings.ownerNameReqVal;
      } else if (
        registerForm.adhar_no == undefined || registerForm.adhar_no == ""
      ) {
        isError = false;
        errorMessage = strings.aadharReqVal;
      } else if (
        Regexs.AadharRegex.test(registerForm.adhar_no) === false
      ) {
        isError = false;
        errorMessage = strings.aadharValidVal;
      } 
      // else if (
      //   registerForm.pancard_no == undefined || registerForm.pancard_no == ""
      // ) {
      //   isError = false;
      //   errorMessage = strings.pancardReqVal;
      // } 
      else if (
        registerForm.pancard_no !== "" &&
        Regexs.panRegex.test(registerForm.pancard_no) === false
      ) {
        isError = false;
        errorMessage = strings.pancardValidVal;
      } 
      // else if (
      //   registerForm.gender == undefined || registerForm.gender == "") {
      //   isError = false;
      //   errorMessage = strings.genderReqVal;
      // } else if (
      //   registerForm.date_of_birth == undefined || registerForm.date_of_birth == ""
      // ) {
      //   isError = false;
      //   errorMessage = strings.dateOfBirthReqVal;
      // }
       else if (
        registerForm.primary_mobile == undefined || registerForm.primary_mobile == ""
      ) {
        isError = false;
        errorMessage = strings.mobileNoReqVal;
      } else if (Regexs.mobilenumRegex.test(registerForm.primary_mobile) === false) {
        isError = false;
        errorMessage = strings.mobileNoValidReqVal;
      } else if (emailMobvalidation.primary_mobile == null) {
        isError = false;
        errorMessage = strings.mobileAlreadyValidReqVal;
      }
       else if (
        registerForm.whatsapp_number !== "" && Regexs.mobilenumRegex.test(registerForm.whatsapp_number) === false
      ) {
        isError = false;
        errorMessage = strings.whatsappNoReqVal;
      }
       else if (registerForm.email == undefined || registerForm.email == "") {
        isError = false;
        errorMessage = strings.emailReqVal;
      } else if (validateEmail.test(registerForm.email) === false) {
        isError = false;
        errorMessage = strings.correctEmailReqVal;
      } else if (emailMobvalidation.email == null) {
        isError = false;
        errorMessage = strings.emailAlreadyReqVal;
      } else if (
        registerForm.location === '' ||
        registerForm.location === undefined
      ) {
        isError = false;
        errorMessage = strings.addressReqVal;
      } 
      // else if (
      //   registerForm.working_location.length === 0 ||
      //   registerForm.working_location === undefined
      // ) {
      //   isError = false;
      //   errorMessage = strings.workingLocationReqVal;
      // }
      if (errorMessage !== "") {
        ErrorMessage({
          msg: errorMessage,
          backgroundColor: RED_COLOR,
        });
      }
      if(!isError){
        Keyboard.dismiss()
      }
      return isError;
    }
  };

  const onPressNext = () => {
    if (validation()) {
      dispatch(RegistrationForm({ ...registerForm, emailMobvalidation: emailMobvalidation }));
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