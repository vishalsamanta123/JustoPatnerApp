import { View, Text, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { BLACK_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, RED_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
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
import { createChannelPartner, RegistrationForm } from "app/Redux/Actions/ReggistrationAction";
import Loader from "app/components/CommonScreen/Loader";

const CompanyDetails = ({ navigation }: any) => {
  const [isLoading, setisLoading] = useState(false)
  const [isError, setisError] = useState(false)
  const [visible, setVisible] = useState(false)
  const [panvisible, setpanVisible] = useState(false)
  const [lettervisible, setletterVisible] = useState(false)
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<any>({})
  // console.log('formData: ', formData);
  const registrationData = useSelector((state: any) => state.registrationForm)
  const createChannelPartnerData = useSelector((state: any) => state.createChannlePartner)
  const dispatch: any = useDispatch()

  useEffect(() => {
    setFormData({ ...registrationData.response })
  }, [registrationData])

  useEffect(() => {
    setisLoading(createChannelPartnerData?.isLoading)
    handleError()
  }, [createChannelPartnerData])

  const handleError = () => {
    setisError(true)
    if(isError){
      ErrorMessage({
        msg: createChannelPartnerData?.response?.message,
        backgroundColor: RED_COLOR
      })
      setisError(createChannelPartnerData?.isError)
    }
  }

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
    else if (formData.company_pancard == '' || formData.company_pancard == undefined) {
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
    // console.log('isError: ', isError);
    return isError;
  }

  const onPressBack = () => {
    navigation.goBack('')
  }
  const onPressRegister = () => {
    if (validation()) {
      setisLoading(true)
      dispatch(RegistrationForm(formData))
      dispatch(createChannelPartner(formData))
      // navigation.navigate('OtpVerificationScreenView')
    }
    // navigation.navigate('OtpVerificationScreenView')
  }
  return (
    <View style={styles.mainContainer}>
      {isLoading ? <Loader /> : null}
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
            headingText={"RealeEstate Company"}
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
            onChangeText={(val: any) => {
              setFormData({
                ...formData, rera_registration: val
              })
            }}
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
              onPress={() => {
                setpanVisible(true)
                setVisible(true)
              }}
            >
              <Text style={{ color: formData?.pancard_no ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
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
              ...formData, company_pancard: data
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
