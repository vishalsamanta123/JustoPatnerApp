import { View, Text, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { BLACK_COLOR, GRAY_LIGHT_COLOR, GREEN_COLOR, PRIMARY_THEME_COLOR, RED_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import images from "../../../../assets/images";
import { normalizeWidth, normalizeHeight, normalize } from "app/components/scaleFontSize";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "app/components/ErrorMessage";
import { createChannelPartner, RegistrationForm, removeRegisterData } from "app/Redux/Actions/ReggistrationAction";

const CompanyDetails = ({ navigation }: any) => {
  const [isError, setisError] = useState(false)
  const [visible, setVisible] = useState(false)
  const [panvisible, setpanVisible] = useState(false)
  const [lettervisible, setletterVisible] = useState(false)
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<any>({})
  const registrationData = useSelector((state: any) => state.registrationForm)
  const createChannelPartnerData = useSelector((state: any) => state.registerData)
  const dispatch: any = useDispatch()

  useEffect(() => {
    setFormData({ ...registrationData.response })
  }, [registrationData])

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (formData.agency_name == '' || formData.agency_name == undefined) {
      isError = false;
      errorMessage = "Agency Name is require. Please enter Agency Name"
    }
    else if (formData.gst == '' || formData.gst == undefined) {
      isError = false;
      errorMessage = "GST No. is require. Please enter GST No."
    }
    else if (formData.pancard == '' || formData.pancard == undefined) {
      isError = false;
      errorMessage = "Company pancard Image is require. Please Choose Company pancard"
    }
    else if (formData.declaration_letter_of_company == '' || formData.declaration_letter_of_company == undefined) {
      isError = false;
      errorMessage = "Declaration letter of company Image is require. Please Choose Declaration letter of company"
    }
    else if (formData.rera_registration == '' || formData.rera_registration == undefined) {
      isError = false;
      errorMessage = "Rera Registration is require. Please enter Rera Registration"
    }
    else if (formData.company_bank_name == '' || formData.company_bank_name == undefined) {
      isError = false;
      errorMessage = "Bank Name is require. Please enter Bank Name"
    }
    else if (formData.company_branch_name == '' || formData.company_branch_name == undefined) {
      isError = false;
      errorMessage = "Branch Name is require. Please enter Branch Name"
    }
    else if (formData.company_account_no == '' || formData.company_account_no == undefined) {
      isError = false;
      errorMessage = "Account No. is require. Please enter Account No."
    }
    else if (formData.company_ifsc_code == '' || formData.company_ifsc_code == undefined) {
      isError = false;
      errorMessage = "IFSC Code is require. Please enter IFSC Code"
    }
    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }

  const onPressBack = () => {
    navigation.goBack('')
  }
  useEffect(() => {
    if (createChannelPartnerData?.response?.status === 200) {
      dispatch(removeRegisterData())
      navigation.navigate('OtpVerificationScreenView', { type: strings.registration, email: formData?.email })
      ErrorMessage({
        msg: createChannelPartnerData?.response?.message,
        backgroundColor: GREEN_COLOR
      })
    }
  }, [createChannelPartnerData])
  const onPressRegister = () => {
    if (validation()) {
      const newFormData = new FormData();
      newFormData.append("module_id", '')
      if (formData?.profile_picture?.uri) {
        newFormData.append("profile_picture", formData?.profile_picture)
      }
      newFormData.append("owner_name", formData?.owner_name)
      newFormData.append("adhar_no", formData?.adhar_no)
      newFormData.append("pancard_no", formData?.pancard_no)
      newFormData.append("gender", formData?.gender)
      newFormData.append("date_of_birth", formData?.date_of_birth)
      newFormData.append("primary_mobile", formData?.primary_mobile)
      newFormData.append("whatsapp_number", formData?.whatsapp_number)
      newFormData.append("email", formData?.email)
      newFormData.append("working_location", JSON.stringify(formData?.working_location))
      newFormData.append("rera_certificate_no", formData?.rera_certificate_no)
      newFormData.append("rera_certificate", formData?.rera_certificate)
      newFormData.append("propidership_declaration_letter", formData?.propidership_declaration_letter)
      newFormData.append("bank_name", formData?.bank_name)
      newFormData.append("branch_name", formData?.branch_name)
      newFormData.append("account_no", formData?.account_no)
      newFormData.append("ifsc_code", formData?.ifsc_code)
      newFormData.append("cancel_cheaque", formData?.cancel_cheaque)
      newFormData.append("agency_name", formData?.agency_name)
      newFormData.append("gst", formData?.gst)
      newFormData.append("rera_registration", formData?.rera_registration)
      newFormData.append("pancard", formData?.pancard)
      newFormData.append("declaration_letter_of_company", formData?.declaration_letter_of_company)
      newFormData.append("company_bank_name", formData?.company_bank_name)
      newFormData.append("company_branch_name", formData?.company_branch_name)
      newFormData.append("company_account_no", formData?.company_account_no)
      newFormData.append("company_ifsc_code", formData?.company_ifsc_code)
      newFormData.append("sourcing_manager", formData?.sourcing_manager)
      newFormData.append("location", formData?.location)
      newFormData.append("latitude", formData?.latitude)
      newFormData.append("longitude", formData?.longitude)
      dispatch(RegistrationForm(formData))
      dispatch(createChannelPartner(newFormData))
    }
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
            headingText={"RealEstate Company"}
            valueshow={formData?.agency_name}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, agency_name: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"GST"}
            handleInputBtnPress={() => { }}
            valueshow={formData?.gst}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, gst: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"RERA Registration"}
            handleInputBtnPress={() => { }}
            valueshow={formData?.rera_certificate}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, rera_registration: val
              })
            }}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Pancard</Text>
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
              onPress={() => {
                setpanVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{ color: formData?.pancard ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Declaration Latter of Company</Text>
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
              onPress={() => {
                setletterVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{ color: formData?.declaration_letter_of_company ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
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
            valueshow={formData?.company_bank_name}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, company_bank_name: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Branch Name"}
            handleInputBtnPress={() => { }}
            headingText={"Branch Name"}
            valueshow={formData?.company_branch_name}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, company_branch_name: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Account No."}
            handleInputBtnPress={() => { }}
            headingText={"Account No."}
            keyboardtype={'number-pad'}
            valueshow={formData?.company_account_no}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, company_account_no: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"IFSC Code"}
            handleInputBtnPress={() => { }}
            headingText={"IFSC Code"}
            valueshow={formData?.company_ifsc_code}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, company_ifsc_code: val
              })
            }}
          />
        </View>
        <View style={styles.btnView}>
          <Button handleBtnPress={onPressRegister} buttonText={strings.createnewagency} textTransform={'uppercase'} />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={visible}
        setVisible={setVisible}
        imageData={(data: any) => {
          if (panvisible) {
            setFormData({
              ...formData, pancard: data
            })
            setpanVisible(false)
          } else {
            setFormData({
              ...formData, declaration_letter_of_company: data
            })
            setletterVisible(false)
          }
        }}
      />
    </View>
  );
};

export default CompanyDetails;
