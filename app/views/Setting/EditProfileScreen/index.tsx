import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import EditProfileView from "./components/EditProfileView";
import { updateUserSettingData } from "app/Redux/Actions/SettingActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ErrorMessage from "app/components/ErrorMessage";
import { GREEN_COLOR } from "app/components/utilities/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addAgentForm, getAgentDetail } from "app/Redux/Actions/AgentActions";
import { GET_AGENT_DETAIL } from "app/Redux/types";

const EditProfileScreen = ({ navigation, route }: any) => {
  const allDetails = route?.params;
  const dispatch: any = useDispatch();
  const { response = {}, update = "" } = useSelector(
    (state: any) => state.settingData
  );
 
  const agentdetail  = useSelector(
    (state: any) => state.addAgentForm
    );
    


  useEffect(() => {
    getDetail()
  }, [allDetails])

  const getDetail = async () => {
    const userData: any = await AsyncStorage.getItem("loginData");
    if (JSON.parse(userData).data._id) {
      // setIsloading(true);
      dispatch(
        getAgentDetail({
          cp_id: JSON.parse(userData).data?.cp_id,
        })
      );
    }
  };

  const handleResponse=()=>{
    if (update) {
      getDetail();
      ErrorMessage({
        msg: response.message,
        backgroundColor: GREEN_COLOR
      })
      // navigation.goBack()
    }
  }

  const [editData, setEditData] = useState(agentdetail.response);
  console.log('editData: ', editData);
  
  
  
  const handleNextPress = () => {
    dispatch(addAgentForm(editData))
    navigation.navigate('EditBankDetails', {
      // handleUpdatePress: handleUpdatePress,
      // editData: editData,
      // setEditData: setEditData

    })
  }


  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <EditProfileView
      onPressBack={onPressBack}
      allDetails={allDetails}
      setEditData={setEditData}
      editData={editData}
      handleNextPress={handleNextPress}
      // handleUpdatePress={handleUpdatePress}
    />
  );
};

export default EditProfileScreen;
