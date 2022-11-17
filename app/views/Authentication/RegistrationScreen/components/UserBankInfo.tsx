import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import { GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { useSelector } from "react-redux";
import DropdownInput from "app/components/DropDown";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { normalize, normalizeHeight, normalizeWidth } from "app/components/scaleFontSize";

const UserBankInfo = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<any>({})
  const [visible, setVisible] = useState(false)
  const registrationData = useSelector((state: any) => state.registrationForm)

  useEffect(() => {
    setFormData({ ...registrationData.response })
  }, [registrationData])


  const onPressBack = () => {
    navigation.goBack()
  }
  const onPressNext = () => {
    navigation.navigate('CompanyDetails')
  }
  return (
    <>
      <View style={styles.mainContainer}>
        <View
          style={{
            backgroundColor: PRIMARY_THEME_COLOR,
            height: insets.top,
          }}
        />
        <StatusBar barStyle={"light-content"} backgroundColor={PRIMARY_THEME_COLOR} />
        <Header
          headerText={strings.userbankinfo}
          headerStyle={styles.headerStyle}
          headerTextStyle={styles.headerTextStyle}
          leftImageSrc={images.backArrow}
          handleOnLeftIconPress={onPressBack}
          leftImageIconStyle={{ tintColor: WHITE_COLOR }}
        />
        <ScrollView contentContainerStyle={styles.wrap}>
          <View style={styles.inputWrap}>
            {/* <InputField
            placeholderText={"Sourcing Manager"}
            handleInputBtnPress={() => { }}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, ownerName: val
              })
            }}
            headingText={"Sourcing Manager"}
          /> */}
            <DropdownInput
              headingText={"Sourcing Manager"}
              placeholder={"Sourcing Manager"}
              inputWidth={'100%'}
              value={formData.sourcingmanager}
              setValue={(val: any) => {
                setFormData({
                  ...formData, sourcingmanager: val
                })
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"RERA Certificate No."}
              handleInputBtnPress={() => { }}
              headingText={"RERA Certificate No."}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData, rerano: val
                })
              }}
            />
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headingText}>RERA Certificate</Text>
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
          <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headingText}>Propidership Declaration Letter</Text>
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
              headingText={"Bank Name"}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData, bankname: val
                })
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Branch Name"}
              handleInputBtnPress={() => { }}
              headingText={"Branch Name"}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData, branchName: val
                })
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Account No."}
              handleInputBtnPress={() => { }}
              headingText={"Account No."}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData, accountno: val
                })
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"IFSC Code"}
              handleInputBtnPress={() => { }}
              headingText={"IFSC Code"}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData, ifsccode: val
                })
              }}
            />
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Text style={styles.headingText}>Cancel Cheaque</Text>
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
          <View style={{ marginVertical: 20 }}>
            <Button
              handleBtnPress={onPressNext}
              buttonText={strings.next}
              textTransform={"uppercase"}
            />
          </View>
        </ScrollView>
      </View>
      <PicturePickerModal
        Visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default UserBankInfo;
