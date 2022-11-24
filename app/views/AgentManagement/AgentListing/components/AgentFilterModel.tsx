import { View, Text, Image, TouchableOpacity } from "react-native";
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
import { getAllAgentList } from "app/Redux/Actions/AgentActions";

const FilterModal = (props: any) => {
  const dispatch: any = useDispatch()
  const resetFilter = () => {
    props.setFilterData({
      startdate: '',
      enddate: '',
      search_by_name: '',
      search_by_location: '',
      status: ''
    })
    props.setIsVisible(false)
    props.setFilter({})
  }
  const handleFilter = () => {
    props.setFilter(props.filterData)
    props.setIsVisible(false)
  }
  const data = [
    { label: "Active", value: true },
    { label: "InActive", value: false },

  ];
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
                mode={'time'}
                leftIcon={images.timer}
                placeholderText={"Start Date"}
                editable={false}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format()
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format()
                  })
                }}
                value={props.filterData.startdate}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={'time'}
                leftIcon={images.timer}
                placeholderText={"End Date"}
                editable={false}
                value={props.filterData.enddate}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format()
                  })
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format()
                  })
                }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={"Search by Name"}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_name: data
                  })
                }}
                valueshow={props.filterData.search_by_name}
                handleInputBtnPress={() => { }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={"Search by Location"}
                handleInputBtnPress={() => { }}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_location: data
                  })
                }}
                valueshow={props.filterData.search_by_location}
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
                placeholder="Select Status"
                value={props.filterData.status}
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
            <View style={{ flexDirection: 'row' }}>
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
      </Modal>
    </View>
  );
};

export default FilterModal;
