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
  import { GRAY_LIGHT_COLOR, GREEN_COLOR, PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
  import strings from "../../../../components/utilities/Localization";
  import styles from "./styles";
  import { useSafeAreaInsets } from "react-native-safe-area-context";
  import Button from "../../../../components/Button";
  import Header from "../../../../components/Header";
  import { useDispatch, useSelector } from "react-redux";
  import DropdownInput from "app/components/DropDown";
  import PicturePickerModal from "app/components/Modals/PicturePicker";
  import { normalize, normalizeHeight, normalizeWidth } from "app/components/scaleFontSize";
import moment from "moment";
import { updateUserSettingData } from "app/Redux/Actions/SettingActions";
import ErrorMessage from "app/components/ErrorMessage";
  
  const EditBankDetails = ({ navigation }: any) => {
    const dispatch: any = useDispatch()
    const insets = useSafeAreaInsets();
    const [formData, setFormData] = useState<any>({})
    const [reraVisible, setReraVisible] = useState(false)
    const [letterVisible, setLetterVisible] = useState(false)
    const [visible, setVisible] = useState(false)

    const agentdetail  = useSelector(
      (state: any) => state.addAgentForm
    );
    const { response = {}, update = "" } = useSelector(
        (state: any) => state.settingData
    );
    const allDetailsall = useSelector((state: any) => state.agentData);

    const [editData, setEditData] = useState(agentdetail?.response);
    const [bankData, setBankData] = useState(agentdetail?.response?.cp_bank_detail);

    const handleResponse=()=>{
      console.log('agentdetail: ', agentdetail);
      if (update) {
        ErrorMessage({
          msg: response.message,
          backgroundColor: GREEN_COLOR
        })
        // navigation.goBack()
      }
    }
    
    const handleUpdatePress = () => {
      const formData: any = new FormData();
      formData.append("cp_id", editData?.cp_id);
      formData.append("agent_name", editData?.agent_name);
      formData.append("adhar_no", editData?.adhar_no);
      formData.append("pancard_no", editData?.pancard_no);
      formData.append("gender", editData?.gender);
      formData.append("date_of_birth", moment(editData?.date_of_birth).format());
      formData.append("primary_mobile", editData?.primary_mobile);
      formData.append("whatsapp_number", editData?.whatsapp_number);
      formData.append("email", editData?.email);
      formData.append("location", editData?.location);
      formData.append("latitude", editData?.latitude);
      formData.append("longitude", editData?.longitude);
      formData.append("address", editData?.agencies?.address);
      formData.append("pin_code", editData?.agencies?.pin_code);
      formData.append("gst", editData?.agencies?.gst);
      formData.append("working_location", editData?.working_location);
      formData.append("rera_certificate_no", editData?.rera_certificate_no);
      formData.append("bank_name", bankData?.bank_name);
      formData.append("branch_name", bankData?.branch_name);
      formData.append("account_no", bankData?.account_no);
      formData.append("ifsc_code", bankData?.ifsc_code);
      formData.append("rera_registration", editData?.agencies?.rera_registration);
      formData.append("owner_name", editData?.owner_name);
      editData?.rera_certificate?.path &&
        formData.append("rera_certificate", {
          uri: editData?.rera_certificate?.path,
          type: editData?.rera_certificate?.mime,
          name: editData?.rera_certificate?.path?.substring(
            editData?.rera_certificate?.path?.lastIndexOf("/") + 1
          ),
        });
      editData?.propidership_declaration_letter?.path &&
      formData.append("propidership_declaration_letter", {
        uri: editData?.propidership_declaration_letter?.path,
        type: editData?.propidership_declaration_letter?.mime,
        name: editData?.propidership_declaration_letter?.path?.substring(
          editData?.propidership_declaration_letter?.path?.lastIndexOf("/") + 1
        ),
      });
      editData?.profile_picture?.path &&
        formData.append("profile_picture", {
          uri: editData?.profile_picture?.path,
          type: editData?.profile_picture?.mime,
          name: editData?.profile_picture?.path?.substring(
            editData?.profile_picture?.path?.lastIndexOf("/") + 1
          ),
        });
      console.log('formData: ', formData);
      dispatch(updateUserSettingData(formData));
      handleResponse()
    };
      
  
  
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
              <InputField
                valueshow={editData?.rera_certificate_no}
                handleInputBtnPress={() => { }}
                headingText={"RERA Certificate No."}
                onChangeText={(val: any) => {
                  setEditData({
                    ...editData, rera_certificate_no: val
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
                  onPress={() => setReraVisible(true)}
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
                  onPress={() => setLetterVisible(true)}
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
                valueshow={bankData?.bank_name}
                handleInputBtnPress={() => { }}
                headingText={"Bank Name"}
                onChangeText={(val: any) => {
                  setBankData({
                    ...bankData, bank_name: val
                  })
                }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                valueshow={bankData?.branch_name}
                handleInputBtnPress={() => { }}
                headingText={"Branch Name"}
                onChangeText={(val: any) => {
                  setBankData({
                    ...bankData, branch_name: val
                  })
                }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                valueshow={bankData?.account_no}
                handleInputBtnPress={() => { }}
                headingText={"Account No."}
                onChangeText={(val: any) => {
                  setBankData({
                    ...bankData, account_no: val
                  })
                }}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputField
                valueshow={bankData?.ifsc_code}
                handleInputBtnPress={() => { }}
                headingText={"IFSC Code"}
                onChangeText={(val: any) => {
                  setBankData({
                    ...bankData, ifsc_code: val
                  })
                }}
              />
            </View>
            <View style={{ marginVertical: 30 }}>
              <Button
                handleBtnPress={handleUpdatePress}
                buttonText={strings.updateProfile}
                textTransform={"uppercase"}
              />
            </View>
          </ScrollView>
        </View>
        <PicturePickerModal
          Visible={reraVisible}
          setVisible={setReraVisible}
          imageData={(data: any) => {
          console.log('data: ', data);
            setEditData({
              ...editData,
              rera_certificate: data
            })
          }}
        />
        <PicturePickerModal
          Visible={letterVisible}
          setVisible={setLetterVisible}
          imageData={(data: any) => {
          console.log('data: ', data);
            setEditData({
              ...editData,
              propidership_declaration_letter: data
            })
          }}
        />
      </>
    );
  };
  
  export default EditBankDetails;
  