import React, { useEffect, useState } from "react";
import { View, Text, Keyboard } from "react-native";
import EditProfileView from "./components/EditProfileView";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addAgentForm, getAgentDetail } from "app/Redux/Actions/AgentActions";
import { useFocusEffect } from "@react-navigation/native";
import { RED_COLOR, Regexs } from "app/components/utilities/constant";
import ErrorMessage from "app/components/ErrorMessage";
import strings from "app/components/utilities/Localization";

const EditProfileScreen = ({ navigation, route }: any) => {
  const { response = {}, detail = "" } = useSelector((state: any) => state.agentData);
  const dispatch: any = useDispatch();
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    if (detail && response?.status === 200) {
      setEditData({ ...response.data[0] });
    }
  }, [response])
  // const validation = () => {
  //   let isError = true;
  //   let errorMessage: any = "";
  //   if (Regexs.AadharRegex.test(editData?.adhar_no) === false) {
  //     isError = false;
  //     errorMessage = strings.aadharValidVal;
  //   } else if (editData?.pancard_no && Regexs.panRegex.test(editData?.pancard_no) === false) {
  //     isError = false;
  //     errorMessage = strings.pancardValidVal;
  //   }
  //   if (errorMessage !== "") {
  //     ErrorMessage({
  //       msg: errorMessage,
  //       backgroundColor: RED_COLOR,
  //     });
  //   }
  //   return isError
  // }
  const validation = () => {
      let isError = true;
      let errorMessage: any = "";
      if (editData?.agent_name == undefined || editData?.agent_name == "") {
        isError = false;
        errorMessage = strings.CPNameReqVal;
      } else if (
        editData?.adhar_no == undefined || editData?.adhar_no == ""
      ) {
        isError = false;
        errorMessage = strings.aadharReqVal;
      } else if (
        Regexs.AadharRegex.test(editData?.adhar_no) === false
      ) {
        isError = false;
        errorMessage = strings.aadharValidVal;
      } 
      // else if (
      //   editData?.pancard_no == undefined || editData?.pancard_no == ""
      // ) {
      //   isError = false;
      //   errorMessage = strings.pancardReqVal;
      // } else if (
      //   Regexs.panRegex.test(editData?.pancard_no) === false
      // ) {
      //   isError = false;
      //   errorMessage = strings.pancardValidVal;
      // } else if (
      //   editData?.gender == undefined || editData?.gender == "") {
      //   isError = false;
      //   errorMessage = strings.genderReqVal;
      // } else if (
      //   editData?.date_of_birth == undefined || editData?.date_of_birth == ""
      // ) {
      //   isError = false;
      //   errorMessage = strings.dateOfBirthReqVal;
      // } 
      else if (
        editData?.primary_mobile == undefined || editData?.primary_mobile == ""
      ) {
        isError = false;
        errorMessage = strings.mobileNoReqVal;
      } else if (editData?.primary_mobile?.length < 10) {
        isError = false;
        errorMessage = strings.mobileNoValidReqVal;
      } 
      // else if (
      //   editData?.whatsapp_number == undefined || editData?.whatsapp_number == ""
      // ) {
      //   isError = false;
      //   errorMessage = strings.whatsappNoReqVal;
      // } 
      else if (
        (editData?.whatsapp_number !== "" || editData?.whatsapp_number === null) &&
        editData?.whatsapp_number?.length < 10
      ) {
        isError = false;
        errorMessage = strings.whatsappNoReqVal;
      } 
      else if (editData?.email == undefined || editData?.email == "") {
        isError = false;
        errorMessage = strings.emailReqVal;
      } else if (
        editData?.location === '' ||
        editData?.location === undefined
      ) {
        isError = false;
        errorMessage = strings.addressReqVal;
      } 
      // else if (
      //   editData?.working_location.length === 0 ||
      //   editData?.working_location === undefined
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
  };
  const handleNextPress = () => {
    if (validation()) {
      dispatch(addAgentForm(editData))
      navigation.navigate('EditBankDetails')
    }
  }

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <EditProfileView
      onPressBack={onPressBack}
      setEditData={setEditData}
      editData={editData}
      handleNextPress={handleNextPress}
    // handleUpdatePress={handleUpdatePress}
    />
  );
};

export default EditProfileScreen;
