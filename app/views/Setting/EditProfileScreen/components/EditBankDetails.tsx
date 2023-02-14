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
import { removeUpdateData, updateUserSettingData } from "app/Redux/Actions/SettingActions";
import ErrorMessage from "app/components/ErrorMessage";
import { addAgentForm } from "app/Redux/Actions/AgentActions";

const EditBankDetails = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<any>({})
  const [reraVisible, setReraVisible] = useState(false)
  const [letterVisible, setLetterVisible] = useState(false)
  const [visible, setVisible] = useState(false)

  const agentdetail = useSelector(
    (state: any) => state.addAgentForm
  );
  const { response = {}, update = "" } = useSelector(
    (state: any) => state.settingData
  );
  const editUser = useSelector((state: any) => state.editUserData);

  const [editData, setEditData] = useState(agentdetail?.response);
  const [bankData, setBankData] = useState(agentdetail?.response?.cp_bank_detail);

  useEffect(() => {
    if (editUser?.response?.status === 200) {
      ErrorMessage({
        msg: response.message,
        backgroundColor: GREEN_COLOR
      })
      dispatch(removeUpdateData())
      navigation.navigate('profile', {
        heading: 'Profile',
        icon: images.user,
        type: 'profile'
      },)
    }
  }, [editUser])

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
    formData.append("working_location", JSON.stringify(editData?.working_location));
    formData.append("rera_certificate_no", editData?.rera_certificate_no);
    formData.append("bank_name", bankData?.bank_name);
    formData.append("branch_name", bankData?.branch_name);
    formData.append("account_no", bankData?.account_no);
    formData.append("ifsc_code", bankData?.ifsc_code);
    formData.append("rera_registration", editData?.agencies?.rera_registration);
    formData.append("owner_name", editData?.owner_name);
    editData?.rera_certificate?.uri  &&
      formData.append("rera_certificate", editData?.rera_certificate);
    editData?.propidership_declaration_letter?.uri &&
      formData.append("propidership_declaration_letter", editData?.propidership_declaration_letter);
    editData?.profile_picture?.uri &&
      formData.append("profile_picture", editData?.profile_picture);
    dispatch(updateUserSettingData(formData));
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
              maxLength={20}
              headingText={"RERA Certificate No."}
              onChangeText={(val: any) => {
                setEditData({
                  ...editData, rera_certificate_no: val
                })
              }}
            />
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row", }]}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.headingText}>RERA Certificate</Text>
            </View>
            <View style={{ flex: 0.6, }}>
              <TouchableOpacity
                style={styles.browseVw}
                onPress={() => setReraVisible(true)}
              >
                <Text style={{ color: PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
              </TouchableOpacity>
              {editData?.rera_certificate === null ||
                editData?.rera_certificate === "" ||
                editData?.rera_certificate === undefined ?
                null :
                <Text style={styles.addedTxt}>{"RERA Certificate Added"}</Text>
              }
            </View>
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row", }]}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.headingText}>Proprietorship Declaration Letter</Text>
            </View>
            <View style={{ flex: 0.6, }}>
              <TouchableOpacity
                style={styles.browseVw}
                onPress={() => setLetterVisible(true)}
              >
                <Text style={{ color: PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
              </TouchableOpacity>
              {editData?.propidership_declaration_letter === null ||
                editData?.propidership_declaration_letter === "" ||
                editData?.propidership_declaration_letter === undefined ?
                null :
                <Text style={styles.addedTxt}>{"Proprietorship Declaration Letter Added"}</Text>
              }
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
              maxLength={18}
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
              maxLength={11}
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
