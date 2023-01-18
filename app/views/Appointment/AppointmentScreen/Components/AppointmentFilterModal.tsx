import { View, Text, Image, TouchableOpacity } from "react-native";
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
import {
  DATE_FORMAT,
  GRAY_LIGHT_COLOR,
} from "app/components/utilities/constant";
import { Dropdown } from "react-native-element-dropdown";

const AppointmentFilterModal = (props: any) => {
  useEffect(() => {
    props.setParams({
      ...props.params,
      remark: '',
    });
  }, [])
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
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>Search Appointment</Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10 }}>
            {/* <View style={styles.inputWrap}>
              <InputCalender
                mode={"date"}
                leftIcon={images.event}
                //headingText={'Start Date'}
                placeholderText={"Start Date"}
                dateData={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    start_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                // dateshow={props.filterform.start_date}
                value={
                  props?.filterform?.start_date !== ""
                    ? moment(props?.filterform?.start_date).format(DATE_FORMAT)
                    : null
                }
                setDateshow={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
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
                placeholderText={"End Date"}
                dateData={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    end_date: moment(data).format(DATE_FORMAT),
                  });
                }}
                // dateshow={props.filterform.end_date}
                value={
                  props?.filterform?.end_date !== ""
                    ? moment(props?.filterform?.end_date).format(DATE_FORMAT)
                    : null
                }
                setDateshow={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    end_date: moment(data).format(DATE_FORMAT),
                  });
                }}
              />
            </View> */}
            <View style={styles.inputWrap}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={[]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Appointment With"
                value={''}
                onChange={(item) => {
                  props.setFilterform({
                    ...props.filterform,
                    property_type: item.value,
                  });
                }}
                renderItem={renderItem}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={"By Customer Name"}
                headingText={"By Customer Name"}
                handleInputBtnPress={() => { }}
                valueshow={props?.params?.remark}
                onChangeText={(val: any) => {
                  props.setParams({
                    ...props.params,
                    remark: val,
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
                data={[]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="By Status"
                value={''}
                onChange={(item) => {
                  props.setFilterform({
                    ...props.filterform,
                    property_type: item.value,
                  });
                }}
                renderItem={renderItem}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={"By Property Name"}
                headingText={"By Property Name"}
                handleInputBtnPress={() => { }}
                valueshow={props?.params?.remark}
                onChangeText={(val: any) => {
                  props.setParams({
                    ...props.params,
                    remark: val,
                  });
                }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Button
              handleBtnPress={() => props.handleOnPressYesInModal()}
              buttonText={strings.update}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppointmentFilterModal;
