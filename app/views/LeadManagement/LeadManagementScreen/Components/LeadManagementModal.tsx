import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "../../../../components/Modals/styles";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import { Dropdown } from "react-native-element-dropdown";
import InputCalender from "../../../../components/InputCalender";
const FilterModal = (props: any) => {

  const [startdate, setStartDate] = useState(new Date())
  const [enddate, setEndDate] = useState(new Date())

  const datavisitingscore = [
      { label: "High to low", value: "1" },
      { label: "Low to high", value: "2" }
    ];
  const dataconfiguration = [
      { label: "1 BHK", value: "1" },
      { label: "2 BHK", value: "2" },
      { label: "3 BHK", value: "2" }
    ];
 const [valuevisitingscore, setValuevisitingscore] = useState(null);
 const [valueconfiguration, setValueconfiguration] = useState(null);
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
            <Text style={styles.topTxt}>{strings.searchvisitor}</Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{marginHorizontal: 10}}>
            <View style={styles.inputWrap}>
               <InputCalender
                    //headingText={'Start Date'}
                    placeholderText={"Start Date"}
                    dateshow={startdate}
                    setDateshow={setStartDate}

                />
            </View>
            <View style={styles.inputWrap}>
            <InputCalender
                  //headingText={'Start Date'}
                  placeholderText={"End Date"}
                  dateshow={enddate}
                  setDateshow={setEndDate}

              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                placeholderText={"Search by Visitor Name"}
                handleInputBtnPress={() => {}}
                onChangeText={() => {}}
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
                  labelField="label"
                  valueField="value"
                  placeholder="By Configuration"
                  value={valueconfiguration}
                  onChange={(item) => {
                    setValueconfiguration(item.value);
                  }}
                  renderItem={renderItem}
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
                  value={valuevisitingscore}
                  onChange={(item) => {
                    setValuevisitingscore(item.value);
                  }}
                  renderItem={renderItem}
              />
            </View>
          </View>
          <View style={{marginVertical: 20}}>
          <Button  handleBtnPress={() => props.setIsVisible(false)} buttonText={strings.apply}  />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;
