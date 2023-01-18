import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "./styles";
import images from "../../assets/images";
import strings from "../utilities/Localization";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../Button";
import { PRIMARY_THEME_COLOR, BG_MAIN_COLOUR } from "../utilities/constant";
 /* const data = [
  { name: "Item 1", value: "1" },
  { name: "Item 2", value: "2" },
  { name: "Item 3", value: "3" },
  { name: "Item 4", value: "4" },
  { name: "Item 5", value: "5" },
  { name: "Item 6", value: "6" },
  { name: "Item 7", value: "7" },
  { name: "Item 8", value: "8" },
];  */
/* const data = [
  {
      "_id": "637765e45db23e661ea6c825",
      "type": "7",
      "title": "Not interested",
      "status": true,
      "createdDate": "2022-11-18T11:00:52.325Z",
      "__v": 0
  },
  {
      "_id": "637767105db23e661ea6c828",
      "type": "7",
      "title": "Out side propert",
      "status": true,
      "createdDate": "2022-11-18T11:05:52.621Z",
      "__v": 0
  }
]; */

const ConfirmModal = (props: any) => {
  const [value, setValue] = useState('');
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View>
      <Modal isVisible={props.Visible}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <View />
            <Text style={styles.topTxt}>{(props.stringshow) ? props.stringshow : strings.confirmation}</Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>

          
          {(props.confirmtype === 'CONFIRMATION') ?
          
            <>
              <View style={styles.borderView} />
              <View style={styles.conteconfirm}>
                <View style={styles.MiddleContainer}>
                  <Text style={styles.bottomTxt}>{props.textshow}</Text>
                </View>

                <View style={{ marginVertical: 10, marginHorizontal: 25, flexDirection: 'row' }}>
                  <View style={styles.btnview}>
                    <Button buttonText={strings.no} width={120} height={40}
                      handleBtnPress={() => props.handleNoPress ? props.handleNoPress() : props.setIsVisible(false)}
                      bgcolor={BG_MAIN_COLOUR}
                      btnTxtcolor={PRIMARY_THEME_COLOR} />
                  </View>
                  <View style={styles.btnview}>
                    <Button buttonText={strings.yes} width={120} height={40}
                      handleBtnPress={() => props.handleYesPress ? props.handleYesPress() : props.setIsVisible(false)} />
                  </View>
                </View>
              </View>
            </>

            :
            <>
              <View style={styles.borderView} />
              <View style={styles.MiddleContainer}>
                <Text style={styles.bottomTxt}>{strings.ConfirmationModalTxt}</Text>
              </View>
              <View>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={props.masterDataShow}
                  //data={data}
                  maxHeight={300}
                  labelField="title"
                  valueField="_id"
                  placeholder="Select Reason"
                  value={props.resion}
                  onChange={(item) => {
                    props.setResion(item._id);
                  }}
                  renderItem={renderItem}
                />
              </View>
              <View style={{ marginVertical: 10 }}>
                <Button buttonText={strings.Confirm} 
                //handleBtnPress={() => props.setIsVisible(false)} />
                handleBtnPress={() => props.handleConfirmPress ? props.handleConfirmPress() : props.setIsVisible(false)} 
                
                />
                
              </View>
            </>

          }
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmModal;
