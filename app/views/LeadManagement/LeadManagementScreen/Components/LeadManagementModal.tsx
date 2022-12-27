import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { Dropdown } from "react-native-element-dropdown";
import InputCalender from "../../../../components/InputCalender";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllMaster } from "app/Redux/Actions/MasterActions";
const FilterModal = (props: any) => {
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(getAllMaster({
      type: 2
    }))
  }, [])
  const { response = { data: [] } } = useSelector((state: any) => state.masterData) || {}
  const datavisitingscore = [
    { label: "High to low", value: 2 },
    { label: "Low to high", value: 1 }
  ];
  const dataconfiguration = response?.data?.length > 0 ? response?.data : [];
  const resetFilter = () => {
    props.setFilterData({
      startdate: '',
      enddate: '',
      search_by_visisor_name: '',
      search_configuration: '',
      visit_score: '',
    })
    props.setIsVisible(false)
    props.onRefresh()
  }

  const configRender = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.title}</Text>
      </View>
    );
  };

  const visitorRender = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.searchvisitor}</Text>
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
                placeholderText={"Search by Visitor Name"}
                handleInputBtnPress={() => { }}
                onChangeText={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_by_visisor_name: data
                  })
                }}
                valueshow={props.filterData.search_by_visisor_name}
              />
            </View>
            <View style={styles.inputWrap}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={dataconfiguration}
                maxHeight={300}
                labelField="title"
                valueField={'_id'}
                placeholder="By Configuration"
                value={props.filterData.search_configuration}
                onChange={(item) => {
                  props.setFilterData({
                    ...props.filterData,
                    search_configuration: item._id
                  })
                  // set
                }}
                renderItem={configRender}
              />
            </View>
            <View style={styles.inputWrap}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={datavisitingscore}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="By visiting score"
                value={props.filterData.visit_score}
                onChange={(item) => {
                  props.setFilterData({
                    ...props.filterData,
                    visit_score: item.value
                  })
                }}
                renderItem={visitorRender}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Button
                width={135}
                buttonText={strings.reset}
                handleBtnPress={() => resetFilter()}
              />
              <Button
                width={135}
                handleBtnPress={() => {
                  props.setIsVisible(false)
                  props.getVisitorsList(0, props.filterData)
                  props.setVisiitorList([])
                }} buttonText={strings.apply}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;
