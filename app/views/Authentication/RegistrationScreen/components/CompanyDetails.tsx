import { View, Text, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import images from "../../../../assets/images";
import { normalizeWidth, normalizeHeight, normalize } from "app/components/scaleFontSize";
import PicturePickerModal from "app/components/Modals/PicturePicker";

const CompanyDetails = ({ navigation }: any) => {
  const [visible, setVisible] = useState(false)
  const insets = useSafeAreaInsets();
  const onPressBack = () => {
    navigation.goBack('')
  }
  const onPressRegister = () => {
    navigation.navigate('OtpVerificationScreenView')
  }
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR,
          height: insets.top,
        }}
      />

      <StatusBar barStyle={"light-content"} backgroundColor={PRIMARY_THEME_COLOR} />
      <Header
        headerText={strings.companyDetails}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={onPressBack}
        leftImageIconStyle={{ tintColor: WHITE_COLOR }}
      />
      <ScrollView contentContainerStyle={styles.wrap}>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Agency Name"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"RealeEstate Company"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"GST"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"RERA Registration"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Pan Card</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: normalizeWidth(120),
                height: normalizeHeight(50),
                backgroundColor: WHITE_COLOR,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
                borderRadius: 10,
              }}
              onPress={() => setVisible(true)}
            >
              <Text style={{ color: PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Decalaration Latter of Company</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                width: normalizeWidth(120),
                height: normalizeHeight(50),
                backgroundColor: WHITE_COLOR,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
                borderRadius: 10,
              }}
              onPress={() => setVisible(true)}
            >
              <Text style={{ color: PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.headingText}>Bank details</Text>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Bank Name"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Bank Name"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Branch Name"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Branch Name"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Account No."}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"Account No."}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"IFSC Code"}
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            headingText={"IFSC Code"}
          />
        </View>
        <View style={styles.btnView}>
          <Button handleBtnPress={onPressRegister} buttonText={strings.createnewagency} textTransform={'uppercase'} />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={visible}
        setVisible={setVisible}
      />
    </View>
  );
};

export default CompanyDetails;
