import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import styles from "./styles";
import images from "../../assets/images";
import strings from "../utilities/Localization";
import { Dropdown } from "react-native-element-dropdown";
import Button from "../Button";
import { PRIMARY_THEME_COLOR, BG_MAIN_COLOUR } from "../utilities/constant";
const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];
const ConfirmModal = (props: any) => {
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
                    <Button buttonText={strings.no} width={120} height={40} handleBtnPress={() => props.setIsVisible(false)}
                      bgcolor={BG_MAIN_COLOUR}
                      btnTxtcolor={PRIMARY_THEME_COLOR} />
                  </View>

                  <View style={{ marginVertical: 10, flexDirection: 'row' }}>

                    <View style={styles.btnview}>
                      <Button buttonText={strings.no} width={120} height={40} handleBtnPress={() => props.setIsVisible(false)} />
                    </View>

                    <View style={styles.btnview}>
                      <Button buttonText={strings.yes} width={120} height={40} handleBtnPress={() => props.setIsVisible(false)} />
                    </View>

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
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Reasone"
                    value={value}
                    onChange={(item) => {
                      setValue(item.value);
                    }}
                    renderItem={renderItem}
                  />
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Button buttonText={strings.Confirm} handleBtnPress={() => props.setIsVisible(false)} />
                </View>
              </>

          }
            </View>
      </Modal>
    </View>
  );
};

export default ConfirmModal;
