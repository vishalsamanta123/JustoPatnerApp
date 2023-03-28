import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
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
  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (editData?.adhar_no && editData?.adhar_no !== null) {
      if (Regexs.AadharRegex.test(editData?.adhar_no) === false) {
        isError = false;
        errorMessage = strings.aadharValidVal;
      } else {
        if (editData?.pancard_no && editData?.pancard_no !== null) {
          if (Regexs.panRegex.test(editData?.pancard_no) === false) {
            isError = false;
            errorMessage = strings.pancardValidVal;
          }
        }
      }
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError
  }
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
