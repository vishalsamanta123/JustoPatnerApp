import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import DropdownInput from "../../../../components/DropDown";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { DATE_FORMAT, Isios, } from "app/components/utilities/constant";
import { Dropdown } from "react-native-element-dropdown";

const AppointmentFilterModal = (props: any) => {
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <View>
      <Modal isVisible={props.Visible}>
        <View style={styles.mainContainer}>
          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            automaticallyAdjustKeyboardInsets={Isios ? true : false}
            contentContainerStyle={{ flexGrow: 1, }}
          >
            <View style={styles.topContainer}>
              <Text style={styles.topTxt}>{strings.searchappointment}</Text>
              <View>
                <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                  <Image source={images.close} style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.borderView} />
            <View style={{ marginHorizontal: 10 }}>
              <View style={styles.inputWrap}>
                <InputCalender
                  mode={"date"}
                  leftIcon={images.event}
                  //headingText={'Start Date'}
                  placeholderText={strings.startDate}
                  dateData={(data: any) => {
                    props.setParams({
                      ...props.params,
                      start_date: moment(data).format(DATE_FORMAT),
                    });
                  }}
                  // dateshow={props.params.start_date}
                  value={
                    props?.params?.start_date !== ""
                      ? moment(props?.params?.start_date).format(DATE_FORMAT)
                      : null
                  }
                  setDateshow={(data: any) => {
                    props.setParams({
                      ...props.params,
                      start_date: moment(data).format(DATE_FORMAT),
                    });
                  }}
                />

              </View>
              <View style={styles.inputWrap}>
                <InputCalender
                  mode={"date"}
                  leftIcon={images.event}
                  //headingText={'Start Date'}
                  placeholderText={strings.endDate}
                  dateData={(data: any) => {
                    props.setParams({
                      ...props.params,
                      end_date: moment(data).format(DATE_FORMAT),
                    });
                  }}
                  // dateshow={props.params.end_date}
                  value={
                    props?.params?.end_date !== ""
                      ? moment(props?.params?.end_date).format(DATE_FORMAT)
                      : null
                  }
                  setDateshow={(data: any) => {
                    props.setParams({
                      ...props.params,
                      end_date: moment(data).format(DATE_FORMAT),
                    });
                  }}
                />
              </View>
              <View style={styles.inputWrap}>
                <InputField
                  placeholderText={strings.searchBy + " " + strings.name}
                  headingText={strings.searchBy + " " + strings.name}
                  handleInputBtnPress={() => { }}
                  valueshow={props?.params?.customer_name}
                  onChangeText={(val: any) => {
                    props.setParams({
                      ...props.params,
                      customer_name: val,
                    });
                  }}
                />
              </View>
              <View style={styles.inputWrap}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={
                    props.type === 'appWithSm' ?
                      [
                        // 1= Pending, 2 = Confirm, 3= Compleat
                        { label: strings.STSPending, value: 1 },
                        { label: strings.STSConfirm, value: 2 },
                        { label: strings.STSComplete, value: 3 },
                        { label: strings.STSAppointMentCancl, value: 4 },
                      ]
                      :
                      [
                        // 1= Pending, 2 = Confirm, 3= Compleat
                        { label: 'Upcoming', value: 1 },
                        { label: 'Revisit', value: 2 },
                        { label: 'Complete', value: 3 },
                        { label: 'Visit Cancelled', value: 4 },
                        { label: 'Reschedule', value: 5 },
                        { label: 'Not Fit for Sale', value: 6 },
                      ]}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={strings.byStatus}
                  value={props?.params?.status}
                  onChange={(item) => {
                    props.setParams({
                      ...props.params,
                      status: item.value,
                    });
                  }}
                  renderItem={renderItem}
                />
              </View>
            </View>
            <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button
                handleBtnPress={() => props.onPressReset()}
                buttonText={strings.reset}
                width={150}
              />
              <Button
                handleBtnPress={() => props.handleFilterApply()}
                buttonText={strings.apply}
                width={150}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default AppointmentFilterModal;
