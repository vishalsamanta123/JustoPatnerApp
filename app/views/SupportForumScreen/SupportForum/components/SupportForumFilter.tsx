import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "app/components/Modals/styles";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import Button from "app/components/Button";
import InputField from "app/components/InputField";
import { Dropdown } from "react-native-element-dropdown";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";


const SuportForumFilter = (props: any) => {
  return (
    <Modal isVisible={props.Visible}>
      {/* <ScrollView keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', }}
      > */}
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.searchSupportForum}</Text>
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
                placeholderText={"Start Date"}
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
                placeholderText={" End Date"}
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
              <InputField
                placeholderText={"Search Project Name"}
                valueshow={props?.filterData?.search_title}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_title: data,
                  })
                }}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                width={135}
                buttonText={strings.reset}
                handleBtnPress={() => {
                  props.setIsVisible(false)
                  props.resetFilter()
                }} />
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
  );
};

export default SuportForumFilter;
