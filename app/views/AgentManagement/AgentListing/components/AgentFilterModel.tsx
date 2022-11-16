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

const FilterModal = (props: any) => {
  const [startdate, setStartDate] = useState(new Date())
  const [enddate, setEndDate] = useState(new Date())
  const data = [
    { label: "Active", value: true },
    { label: "InActive", value: false },

  ];
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
                placeholderText={"Start Date"}
                dateshow={startdate}
                setDateshow={(val: any) =>                 //headingText={'Start Date'}
                (val)}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                //headingText={'Start Date'}
                placeholderText={"End Date"}
                dateshow={enddate}
                setDateshow={(val: any) => setEndDate(val)}

              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={"Search by Name"}
                handleInputBtnPress={() => { }}
                onChangeText={() => { }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={"Search by Location"}
                handleInputBtnPress={() => { }}
                onChangeText={() => { }}
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
