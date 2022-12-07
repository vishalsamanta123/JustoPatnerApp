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
import { useDispatch } from "react-redux";
import {
  getFilterProperty,
  getAllProperty,
} from "app/Redux/Actions/propertyActions";

const FilterModal = (props: any) => {
  const dispatch: any = useDispatch();
  const [startdate, setStartDate] = useState(
    new Date(moment(new Date()).format("YYYY-MM-DD"))
  );
  const [enddate, setEndDate] = useState(
    new Date(moment(new Date()).format("YYYY-MM-DD"))
  );

  const data = [
    { label: "Active", value: "1" },
    { label: "Inactive", value: "2" },
  ];
  const [statusValue, setStatusValue] = useState(null);
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  const handleInputField = (e: any) => {
    props.setFilterform({ ...props.filterform, property_name: e });
    /*  const nextFormState = {
           ...props.filterform,
           [e.target.name]: e.target.value,
         };
         props.setFilterform(nextFormState); */
  };

  const ApplyFilter = () => {
    dispatch(
      getFilterProperty({
        // offset: 0,
        // limit: 5,
        start_date: props.filterform.start_date,
        end_date: props.filterform.end_date,
        location: props.filterform.location,
        property_name: props.filterform.property_name,
        property_type: props.filterform.property_type,
      })
    );
    props.setIsVisible(false);
  };
  const ResetFilter = () => {
    props.setFilterform({
      ...props.filterform,
      start_date: "",
      end_date: "",
      location: "",
      property_name: "",
      property_type: "",
    });
    dispatch(
      getAllProperty({
        offset: 0,
        limit: 5,
      })
    );
    props.setIsVisible(false);
  };

  return (
    <Modal isVisible={props.Visible}>
      <ScrollView keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.searchProperty}</Text>
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
                placeholderText={"Start Date"}
                dateData={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    start_date: moment(data).format("YYYY-MM-DD"),
                  });
                }}
                // dateshow={props.filterform.start_date}
                value={
                  props?.filterform?.start_date !== ""
                    ? moment(props?.filterform?.start_date).format("DD-MM-YYYY")
                    : null
                }
                setDateshow={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    start_date: moment(data).format("YYYY-MM-DD"),
                  });
                }}
              />

              {/*  <Button title="Open" handleBtnPress={() => setOpen(true)} /> */}
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
                    end_date: moment(data).format("YYYY-MM-DD"),
                  });
                }}
                // dateshow={props.filterform.end_date}
                value={
                  props?.filterform?.end_date !== ""
                    ? moment(props?.filterform?.end_date).format("DD-MM-YYYY")
                    : null
                }
                setDateshow={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    end_date: moment(data).format("YYYY-MM-DD"),
                  });
                }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={"Search by Name"}
                handleInputBtnPress={() => { }}
                onChangeText={(val: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    property_name: val,
                  });
                }}
                valueshow={props.filterform.property_name}
              //name={'property_name'}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={"Search by Location"}
                handleInputBtnPress={() => { }}
                valueshow={props?.filterform?.location}
                onChangeText={(data: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    location: data,
                  })
                }}
                inputType={'location'}
                onPressSelect={(data: any, detail: any) => {
                  props.setFilterform({
                    ...props.filterform,
                    location: data?.description,
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
                placeholder="Select Status"
                value={props.filterform.property_type}
                onChange={(item) => {
                  props.setFilterform({
                    ...props.filterform,
                    property_type: item.value,
                  });
                }}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: 'center' }}>
              <Button
                width={135}
                buttonText={strings.reset}
                handleBtnPress={() => ResetFilter()}
              />
              <Button
                width={135}
                buttonText={strings.apply}
                handleBtnPress={() => ApplyFilter()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;
