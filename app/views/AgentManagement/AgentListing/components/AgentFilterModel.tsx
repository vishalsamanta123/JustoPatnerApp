import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import InputCalender from "../../../../components/InputCalender";
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";
import { useDispatch } from 'react-redux';
import { DATE_FORMAT } from "app/components/utilities/constant";

const FilterModal = (props: any) => {
  const dispatch: any = useDispatch()
  const resetFilter = () => {
    props.setFilterData({
      startdate: '',
      enddate: '',
      search_by_name: '',
      search_by_location: '',
      status: '',
    })
    props.onReset()
    props.setIsVisible(false)
  }
  const handleFilter = () => {
    props.setIsVisible(false)
    props.getAgentList(0, props.filterData)
    props.setAgentList([])
  }
  const data = [
    { label: strings.active, value: true },
    { label: strings.inActive, value: false },

  ];
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.searchAgent}</Text>
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
                placeholderText={strings.startDate}
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format(DATE_FORMAT)
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format(DATE_FORMAT)
                  })
                }}
                value={props?.filterData?.startdate}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={'date'}
                leftIcon={images.event}
                placeholderText={strings.endDate}
                editable={false}
                value={props?.filterData?.enddate}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format(DATE_FORMAT)
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format(DATE_FORMAT)
                  })
                }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={strings.searchBy + " " + strings.name}
                headingText={strings.searchBy + " " + strings.name}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_name: data
                  })
                }}
                valueshow={props?.filterData?.search_by_name}
                handleInputBtnPress={() => { }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                valueshow={props?.filterData?.search_by_location}
                inputType={'location'}
                onPressSelect={(data: any, detail: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_location: data?.description,
                  })
                }}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_location: data?.description,
                  })
                }}
              />
            </View>
            <View style={styles.inputWrap}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={strings.selectStatus}
                value={props?.filterData?.status}
                onChange={(item) => {
                  props.setFilterData({
                    ...props.filterData,
                    status: item.value
                  })
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
                handleBtnPress={() => handleFilter()}
                buttonText={strings.apply} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal >
  );
};

export default FilterModal;
