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
import usePermission from "app/components/utilities/UserPermissions";

const LeadDetailsView = (props: any) => {
  const insets = useSafeAreaInsets();
  const navigation: any = useNavigation();
  const [userDetails, setuserDetails] = useState<any>({});
  const getleaddata = useSelector((state: any) => state.visitorData);
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
  const { create, status } = usePermission({
    create: 'add_appointment',
    status: 'add_followup',
  })
  console.log('userDetails: ', userDetails);

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
      {/* {userDetails?.lead_status === 1 || userDetails?.lead_status === 2 || userDetails?.lead_status === 3 ? */}
        <View style={[styles.btnContainer, {
          justifyContent: create &&
            userDetails?.lead_status === 1 ||
            userDetails?.lead_status === 2 ||
            userDetails?.lead_status !== 3 ||
            userDetails?.booking_status === 4 ||
            userDetails?.appointment_status === 4 ||
            userDetails?.appointment_status === 5 ||
            userDetails?.appointment_status === 6 ? 'space-between' :
            'center'
        }]}>
          {create &&
            <>
              {(userDetails?.lead_status === 1 ||
                userDetails?.lead_status === 2 ||
                userDetails?.lead_status !== 3 ||
                userDetails?.booking_status === 4 ||
                userDetails?.appointment_status === 4 ||
                userDetails?.appointment_status === 5 ||
                userDetails?.appointment_status === 6 ?
                (<Button
                  handleBtnPress={() => OnpressseheduleVisit()}
                  buttonText={strings.ScheduleSitevisite}
                  width={150}
                  height={45}
                  bgcolor={PRIMARY_THEME_COLOR_DARK}
                  btnTxtcolor={WHITE_COLOR}
                  btnTxtsize={11}
                  textTransform={"uppercase"}
                />) : null)
              }
            </>
          }
          {status &&
            (<Button
              buttonText={strings.Statusupdate}
              width={150}
              height={45}
              bgcolor={PRIMARY_THEME_COLOR_DARK}
              btnTxtcolor={WHITE_COLOR}
              btnTxtsize={14}
              textTransform={"uppercase"}
              handleBtnPress={() => props.handleStatusUpdate()}
            />)
          }
        </View> 
        {/* : null} */}
      </View>
    </>
  );
};

export default LeadDetailsView;
