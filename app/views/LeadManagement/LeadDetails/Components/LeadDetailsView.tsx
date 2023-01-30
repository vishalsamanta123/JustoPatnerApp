import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import {
  BLACK_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LeadDetailsIteam from "./LeadDetailsIteam";
import Button from "../../../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const LeadDetailsView = (props: any) => {
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();
  const [userDetails, setuserDetails] = useState({});
  const getleaddata = useSelector((state: any) => state.visitorData);
  console.log('getleaddata: ', getleaddata?.response?.data);

  useEffect(() => {
    if (getleaddata?.response?.status === 200) {
      if (getleaddata?.response?.data?.length > 0) {
        setuserDetails(getleaddata?.response?.data[0]);
      }
    }
  }, [getleaddata]);

  const OnpressseheduleVisit = () => {
    navigation.navigate("AddAppointmentScreen", { data: userDetails, type: 'Add' });
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <Header
          leftImageSrc={images.backArrow}
          rightSecondImageScr={images.notification}
          headerText={strings.visitordetails}
          leftImageIconStyle={styles.RightFirstIconStyle}
          handleOnLeftIconPress={props.handleBackPress}
          headerStyle={styles.headerStyle}
        />
        <View style={styles.leadDetailsItemView}>
          <LeadDetailsIteam items={userDetails} />
        </View>
        <View style={styles.btnContainer}>
          <Button
            handleBtnPress={() => OnpressseheduleVisit()}
            buttonText={strings.ScheduleSitevisite}
            width={150}
            height={45}
            bgcolor={PRIMARY_THEME_COLOR_DARK}
            btnTxtcolor={WHITE_COLOR}
            btnTxtsize={13}
            textTransform={"uppercase"}
          />
          <Button
            buttonText={strings.Statusupdate}
            width={150}
            height={45}
            bgcolor={PRIMARY_THEME_COLOR_DARK}
            btnTxtcolor={WHITE_COLOR}
            btnTxtsize={15}
            textTransform={"uppercase"}
            handleBtnPress={() => props.handleStatusUpdate()}
          />
        </View>
      </View>
    </>
  );
};

export default LeadDetailsView;
