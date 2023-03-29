import { View, Text, StatusBar, TouchableOpacity, ScrollView, BackHandler, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { BLACK_COLOR, GREEN_COLOR, Isios, PRIMARY_THEME_COLOR, RED_COLOR, Regexs, WHITE_COLOR } from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import images from "../../../../assets/images";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "app/components/scaleFontSize";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "app/components/ErrorMessage";
import { createChannelPartner, RegistrationForm, RegistrationFormRemv, removeRegisterData } from "app/Redux/Actions/ReggistrationAction";
import { useFocusEffect } from "@react-navigation/native";

const CompanyDetails = ({ navigation }: any) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  const [isError, setisError] = useState(false)
  const [visible, setVisible] = useState(false)
  const [docType, setDocType] = useState('')
  const [panvisible, setpanVisible] = useState(false)
  const [lettervisible, setletterVisible] = useState(false)
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<any>({})
  const registrationData = useSelector((state: any) => state.registrationForm)
  const createChannelPartnerData = useSelector((state: any) => state.registerData)
  const dispatch: any = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      if (typeof registrationData?.response === 'object') {
        setFormData({ ...registrationData.response })
      }
      return () => { };
    }, [registrationData, navigation])
  );

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (formData.agency_name == '' || formData.agency_name == undefined) {
      isError = false;
      errorMessage = strings.agencyNameReqVal
    } else if (formData.gst == '' || formData.gst == undefined) {
      isError = false;
      errorMessage = strings.gstReqVal
    } else if (formData.rera_registration == '' || formData.rera_registration == undefined) {
      isError = false;
      errorMessage = strings.reraRegstrReqVal
    } else if (formData.pancard == '' || formData.pancard == undefined) {
      isError = false;
      errorMessage = strings.comPanCardImgReqVal
    } else if (formData.declaration_letter_of_company == '' || formData.declaration_letter_of_company == undefined) {
      isError = false;
      errorMessage = strings.declLttrComImgReqVal
    } else if (formData.company_bank_name == '' || formData.company_bank_name == undefined) {
      isError = false;
      errorMessage = strings.bankNameReqVal
    } else if (formData.company_branch_name == '' || formData.company_branch_name == undefined) {
      isError = false;
      errorMessage = strings.branchNameReqVal
    } else if (formData.company_account_no == '' || formData.company_account_no == undefined) {
      isError = false;
      errorMessage = strings.accountNoReqVal
    } else if (
      Regexs.accountnumRegex.test(formData.company_account_no) === false
    ) {
      isError = false;
      errorMessage = strings.accountNoValidVal;
    } else if (formData.company_ifsc_code == '' || formData.company_ifsc_code == undefined) {
      isError = false;
      errorMessage = strings.ifscReqVal
    } else if (
      Regexs.ifscRegex.test(formData.company_ifsc_code) === false
    ) {
      isError = false;
      errorMessage = strings.ifscValidVal;
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
    dispatch(RegistrationForm(formData))
  }
  useEffect(() => {
    if (createChannelPartnerData?.response?.status === 200) {
      dispatch(removeRegisterData())
      dispatch(RegistrationFormRemv())
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
      if (formData?.sourcing_manager) {
        newFormData.append("sourcing_manager", formData?.sourcing_manager)
      }
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
      <ScrollView keyboardShouldPersistTaps={'handled'}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={styles.wrap}>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={strings.agency + " " + strings.name}
            handleInputBtnPress={() => { }}
            headingText={strings.realEstateCom}
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
            require={true}
            placeholderText={strings.gst}
            headingText={strings.gst}
            handleInputBtnPress={() => { }}
            valueshow={formData?.gst}
            maxLength={20}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, gst: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={strings.RERA + " " + strings.registration}
            maxLength={20}
            headingText={strings.RERA + " " + strings.registration}
            handleInputBtnPress={() => { }}
            valueshow={formData?.rera_registration}
            onChangeText={(val: any) => {
              setFormData({
                ...formData, rera_registration: val
              })
            }}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.headingText}>{strings.pancard}</Text>
            <Image
              source={images.star}
              style={{
                width: normalizeWidth(8),
                height: normalizeHeight(8),
                marginLeft: normalizeSpacing(5),
                marginBottom: normalizeSpacing(5),
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setpanVisible(true)
                setVisible(true)
                setDocType('')
              }}
            >
              <Text style={{ color: formData?.pancard ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {typeof formData?.pancard === 'object' ?
          <Text style={styles.addedTxt}>{strings.pancard + " " + strings.added}</Text> : null
        }
        <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.headingText}>{strings.declrLttrCom}</Text>
            <Image
              source={images.star}
              style={{
                width: normalizeWidth(8),
                height: normalizeHeight(8),
                marginLeft: normalizeSpacing(5),
                marginBottom: normalizeSpacing(5),
              }}
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.browseVw}
              onPress={() => {
                setletterVisible(true)
                setVisible(true)
                setDocType('all')
              }}
            >
              <Text style={{ color: formData?.declaration_letter_of_company ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {typeof formData?.declaration_letter_of_company === 'object' ?
          <Text style={styles.addedTxt}>{strings.declrLttrCom + " " + strings.added}</Text> : null
        }
        <View style={styles.inputWrap}>
          <Text style={styles.headingText}>{strings.bankDetail}</Text>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            placeholderText={strings.bankName}
            handleInputBtnPress={() => { }}
            headingText={strings.bankName}
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
            require={true}
            placeholderText={strings.branchName}
            handleInputBtnPress={() => { }}
            headingText={strings.branchName}
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
            require={true}
            placeholderText={strings.accountNo}
            handleInputBtnPress={() => { }}
            headingText={strings.accountNo}
            maxLength={18}
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
            require={true}
            placeholderText={strings.ifscCode}
            handleInputBtnPress={() => { }}
            headingText={strings.ifscCode}
            valueshow={formData?.company_ifsc_code}
            maxLength={11}
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
        docType={docType}
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
