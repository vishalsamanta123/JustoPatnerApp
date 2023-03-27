import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import { DATE_FORMAT } from "app/components/utilities/constant";
import { useDispatch, useSelector } from "react-redux";
import { getUserVisitList } from "app/Redux/Actions/LeadsActions";
import DropdownInput from "app/components/DropDown";

const FilterModal = (props: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorData) || []
  const [visitorList, setVisiitorList] = useState<any>([])

  useEffect(() => {
    if (props.Visible) {
      dispatch(getUserVisitList({}))
    }
  }, [props.Visible])

  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setVisiitorList(response?.data)
      }
    }
  }, [response])
  const resetFilter = () => {
    props.setFilterData({
      start_date: '',
      end_date: '',
      followup_for: '',
      lead_id: '',
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
              placeholderText={strings.startDate}//can edit
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
              placeholderText={strings.endDate}//can edit
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
            <DropdownInput
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={[
                { value: 1, label: strings.STSLead },
                { value: 2, label: strings.STSSiteVisitnAppointment },
                { value: 3, label: strings.STSBooking },
                { value: 4, label: strings.STSRegistration },
              ]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={strings.searchByType}
              value={props.filterData?.followup_for}
              onChange={(item: any) => {
                props.setFilterData({
                  ...props.filterData, followup_for: item.value
                });
              }}
              renderItem={renderItem}
            />
          </View>
          <View style={styles.inputWrap}>
            <DropdownInput
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={visitorList}
              maxHeight={300}
              labelField="first_name"
              valueField={'_id'}
              placeholder={strings.searchByLead}
              value={props.filterData.lead_id}
              onChange={(item: any) => {
                props.setFilterData({
                  ...props.filterData,
                  lead_id: item._id
                })
              }}
              newRenderItem={(item: any) => {
                return (
                  <View style={styles.item}>
                    <Text style={styles.textItem}>{item.first_name}</Text>
                  </View>
                );
              }}
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
  );
};

export default FilterModal;
