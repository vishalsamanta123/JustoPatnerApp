import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { Dropdown } from "react-native-element-dropdown";
import { dropdownData } from "../../../../components/utilities/DemoData";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
const FilterModal = (props: any) => {
  const [value, setValue] = useState(null);

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
            <Text style={styles.topTxt}>{strings.searchfollowup}</Text>
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
                mode={'Date'}
                leftIcon={images.event}
                placeholderText={"Start Date"}//can edit
                editable={false}
                // onChangeText={() => { }}
                dateData={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    next_followup_date: moment(data).format('DD-MM-YYYY')
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    next_followup_date: moment(data).format('DD-MM-YYYY')
                  })
                }}
                value={props?.formData?.next_followup_date}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={'date'}
                leftIcon={images.event}
                placeholderText={" End Date"}//can edit
                editable={false}
                // onChangeText={() => { }}
                dateData={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    next_followup_date: moment(data).format('DD-MM-YYYY')
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    next_followup_date: moment(data).format('DD-MM-YYYY')
                  })
                }}
                value={props?.formData?.next_followup_date}
              />
            </View>
            <View style={styles.inputWrap}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={dropdownData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Search by Type"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Button handleBtnPress={() => props.setIsVisible(false)} buttonText={strings.apply} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
