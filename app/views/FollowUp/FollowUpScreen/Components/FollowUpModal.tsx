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
import { DATE_FORMAT } from "app/components/utilities/constant";
const FilterModal = (props: any) => {
  const resetFilter = () => {
    props.setFilterData({
      start_date: '',
      end_date: '',
      followup_for: ''
    })
    props.onReset()
    props.setIsVisible(false)
  }
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
                mode={'date'}
                leftIcon={images.event}
                placeholderText={"Start Date"}//can edit
                editable={false}
                // onChangeText={() => { }}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    start_date: moment(data).format(DATE_FORMAT)
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    start_date: moment(data).format(DATE_FORMAT)
                  })
                }}
                value={props.filterData?.start_date}
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
                  props.setFilterData({
                    ...props.filterData,
                    end_date: moment(data).format(DATE_FORMAT)
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    end_date: moment(data).format(DATE_FORMAT)
                  })
                }}
                value={props.filterData?.end_date}
              />
            </View>
            <View style={styles.inputWrap}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={[
                  { value: 1, label: 'Lead' },
                  { value: 2, label: 'Site visit/Appoiment' },
                  { value: 3, label: 'Booking' },
                  { value: 4, label: 'Regstration' },
                ]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Search by Type"
                value={props.filterData?.followup_for}
                onChange={(item) => {
                  props.setFilterData({
                    ...props.filterData, followup_for: item.value
                  });
                }}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                width={135}
                buttonText={strings.reset}
                handleBtnPress={() => resetFilter()} />
              <Button
                width={135}
                handleBtnPress={() => {
                  props.setIsVisible(false)
                  props.handleFilterApply()
                }}
                buttonText={strings.apply} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
