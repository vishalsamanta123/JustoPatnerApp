import { View, Text, StatusBar } from "react-native";
import React from "react";
import styles from "./Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PRIMARY_THEME_COLOR_DARK } from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import AppointmentDtailsItem from "./AppointmentDtailsItem";
import Button from "../../../../components/Button";
import { useSelector } from "react-redux";
import usePermission from "app/components/utilities/UserPermissions";

const AppointmentDetailsView = (props: any) => {
  const insets = useSafeAreaInsets();
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.appointment
  );
  const { status } = usePermission({
    status: 'appointment_status_update',
  })
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.appointmnetdetail}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
      />
      <View style={styles.propertyListView}>
        <AppointmentDtailsItem item={props?.detailsData} />
      </View>
      {status ?
        (props?.detailsData?.status === 1 || props?.detailsData?.status === 2)
          && props?.detailsData?.checkin_status === false ? (
          <View style={styles.bntView}>
            <Button
              handleBtnPress={() => props.handleStatusUpdate(props?.detailsData)}
              buttonText={strings.updatestatus}
            />
          </View>
        ) : null : null}
    </View>
  );
};

export default AppointmentDetailsView;
