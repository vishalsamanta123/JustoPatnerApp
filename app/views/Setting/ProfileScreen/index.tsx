import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { getAgentDetail } from "app/Redux/Actions/AgentActions";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileView from "./components/ProfileView";

const ProfileScreen = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch();
  const isFocused = useIsFocused()
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.agentData
  );

  const userdata = useSelector((state: any) => state.agentData);

  const [allDetails, setAllDetails] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      getDetail()
      return () => { };
    }, [navigation, route])
  );
  // useEffect(() => {
  //   getDetail();
  // }, [isFocused]);

  useEffect(() => {
    if (detail && response?.status === 200) {
      setAllDetails({ ...response.data[0] });
    }
  }, [response])
  const getDetail = async () => {
    const userData: any = await AsyncStorage.getItem("loginData");
    if (JSON.parse(userData)?.data?.cp_id) {
      dispatch(
        getAgentDetail({
          cp_id: JSON?.parse(userData)?.data?.cp_id,
        })
      );
    }
  };



  const onpresContent = (name: any, items: any) => {
    navigation.navigate(name, items);
  };

  const HandleBackPress = () => {
    navigation.goBack();
  };
  const handleEditProfilePress = () => {
    navigation.navigate("EditProfileScreen", { allDetails: allDetails });
  };
  return (
    <>
      <ProfileView
        data={route.params}
        HandleBackPress={HandleBackPress}
        handleEditProfilePress={handleEditProfilePress}
        allDetails={allDetails}
        onpresContent={onpresContent}
      />
    </>
  );
};

export default ProfileScreen;
