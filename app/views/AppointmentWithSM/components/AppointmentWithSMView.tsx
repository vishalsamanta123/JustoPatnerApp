import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "app/components/Header";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import styles from "./Styles";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import SmAppointment from "app/views/Appointment/AppointmentScreen/Components/SmAppointment";
import AppointmentModal from "app/views/Appointment/AppointmentScreen/Components/AppointmentModal";
import AppointmentFilterModal from "app/views/Appointment/AppointmentScreen/Components/AppointmentFilterModal";
import Button from "app/components/Button";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";

const AppointmentWithSMView = (props: any) => {
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const todayDate = {
    start_date: moment(new Date()).format(DATE_FORMAT),
    end_date: moment(new Date()).format(DATE_FORMAT),
  };

  const handleFilterApply = () => {
    setFilterisVisible(false);
    props.getAppointmentWithSMList(0, props.filterData);
  };
  const onPressToday = (type: any) => {
    if (type === "today") {
      props.setFilterData(todayDate);
      props.getAppointmentWithSMList(0, todayDate);
    } else {
      onPressReset();
    }
  };

  const onPressReset = () => {
    props.setFilterData({
      start_date: "",
      end_date: "",
      customer_name: "",
      status: "",
    });
    props.getAppointmentWithSMList(0, {});
    setFilterisVisible(false);
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.appointmentWIthSMHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
      />
      <View style={styles.topVw}>
        <Button
          buttonText={
            props?.filterData?.start_date === "" ||
            props?.filterData?.end_date === ""
              ? strings.today
              : strings.reset
          }
          width={150}
          height={30}
          btnTxtsize={15}
          handleBtnPress={() => {
            if (
              props?.filterData?.start_date === "" ||
              props?.filterData?.end_date === ""
            ) {
              onPressToday("today");
            } else {
              onPressToday("");
            }
          }}
        />
      </View>
      <View style={styles.propertyListView}>
        <FlatList
          data={
            Array.isArray(props.userAppointmentList)
              ? props.userAppointmentList
              : []
          }
          renderItem={({ item }) => (
            <SmAppointment
              items={item}
              hanndleUserDetailPress={props.hanndleUserDetailPress}
              handleOptionPress={props.handleOptionPress}
            />
          )}
          ListEmptyComponent={
            <EmptyListScreen message={strings.appointmentWIthSMHeader} />
          }
          onRefresh={() => {
            props.setFilterData({
              start_date: "",
              end_date: "",
              customer_name: "",
              status: "",
            });
            props.getAppointmentWithSMList(0, {});
            props.setUserAppointmentList([]);
          }}
          refreshing={false}
          onEndReached={() => {
            if (props.userAppointmentList?.length < props.moreData) {
              props.getAppointmentWithSMList(
                props.userAppointmentList?.length > 9 ? props.offSET + 1 : 0,
                props.filterData
              );
            }
          }}
        />
      </View>
      <AppointmentModal
        Visible={props.isVisible}
        setIsVisible={props.setIsVisible}
        params={props.params}
        setParams={props.setParams}
        handleOnPressYesInModal={props.handleOnPressYesInModal}
      />
      <AppointmentFilterModal
        type={"appWithSm"}
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        params={props.filterData}
        setParams={props.setFilterData}
        handleFilterApply={handleFilterApply}
        onPressReset={onPressReset}
      />
    </View>
  );
};

export default AppointmentWithSMView;
