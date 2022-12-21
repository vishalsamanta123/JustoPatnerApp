import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import EditProfileView from "./components/EditProfileView";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addAgentForm, getAgentDetail } from "app/Redux/Actions/AgentActions";
import { useFocusEffect } from "@react-navigation/native";

const EditProfileScreen = ({ navigation, route }: any) => {
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.agentData
  );
  const dispatch: any = useDispatch();
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (detail && response?.status === 200) {
      setEditData({ ...response.data[0] });
    }
  }, [response])
  const handleNextPress = () => {
    dispatch(addAgentForm(editData))
    navigation.navigate('EditBankDetails')
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
