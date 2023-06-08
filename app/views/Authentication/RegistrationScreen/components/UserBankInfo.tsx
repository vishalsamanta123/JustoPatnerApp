import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
  BackHandler,
  Image,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import { BLACK_COLOR, GRAY_LIGHT_COLOR, Isios, PRIMARY_THEME_COLOR, RED_COLOR, Regexs, WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import Styles from "../../../../components/DropDown/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import DropdownInput from "app/components/DropDown";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { normalize, normalizeHeight, normalizeSpacing, normalizeWidth } from "app/components/scaleFontSize";
import ErrorMessage from "app/components/ErrorMessage";
import { RegistrationForm } from "app/Redux/Actions/ReggistrationAction";
import { getAllMaster, getAllSourcingManager } from "app/Redux/Actions/MasterActions";
import { RadioButton } from "react-native-paper";
import { handleValues } from "app/components/utilities/handleValues";

const UserBankInfo = ({ navigation }: any) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  const dispatch: any = useDispatch()
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState<any>({})
  const [reravisible, setreraVisible] = useState(false)
  const [lettervisible, setletterVisible] = useState(false)
  const [cheaquevisible, setcheaqueVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const registrationData = useSelector((state: any) => state.registrationForm)
  const [masterDatas, setMasterDatas] = useState<any>([])
  const masterData = useSelector((state: any) => state.masterData) || {}

  useEffect(() => {
    if (typeof registrationData?.response === 'object') {
      setFormData({ ...registrationData.response })
    }
  }, [registrationData, navigation])

  useEffect(() => {
    if (masterData?.response?.status === 200) {
      setMasterDatas(masterData?.response?.data?.length > 0 ? masterData?.response?.data : [])
    } else {
    }
  }, [masterData])

  const handleMasterDatas = () => {
    dispatch(getAllSourcingManager({
      limit: 100,
      offset: 0
    }))
  }

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    console.log("🚀 ~ file: UserBankInfo.tsx:112 ~ validation ~ formData?.ifsc_code:", formData?.ifsc_code)

    // if (formData.norera_register === null) {
    //   isError = false;
    //   errorMessage = strings.noReraRegReqVal;
    // }
    // else
     if (formData.rera_certificate_no == '' || formData.rera_certificate_no == undefined) {
      isError = false;
      errorMessage = strings.reraCertNoReqVal
    }
    else if (formData.rera_certificate == '' || formData.rera_certificate == undefined) {
      isError = false;
      errorMessage = strings.reraCertImgReqVal
    }
    // if (formData.propidership_declaration_letter == '' || formData.propidership_declaration_letter == undefined) {
    //   isError = false;
    //   errorMessage = strings.propDeclrLttrImgReqVal
    // } 
    //   else if (formData.bank_name == '' || formData.bank_name == undefined) {
    //   isError = false;
    //   errorMessage = strings.bankNameReqVal
    // } else if (formData.branch_name == '' || formData.branch_name == undefined) {
    //   isError = false;
    //   errorMessage = strings.branchNameReqVal
    // } else if (formData.account_no == '' || formData.account_no == undefined) {
    //   isError = false;
    //   errorMessage = strings.accountNoReqVal
    // } 
    else if (
      formData.account_no !== '' && formData.account_no !== undefined &&
      Regexs.accountnumRegex.test(formData.account_no) === false
    ) {
      isError = false;
      errorMessage = strings.accountNoValidVal;
    } 
    //else if (formData.ifsc_code == '' || formData.ifsc_code == undefined) {
    //   isError = false;
    //   errorMessage = strings.ifscReqVal
    // } 
    else if (
      formData?.ifsc_code !== '' && formData.ifsc_code !== undefined &&
      Regexs.ifscRegex.test(formData.ifsc_code) === false
    ) {
      isError = false;
      errorMessage = strings.ifscValidVal;
    } 
    //else if (formData.cancel_cheaque == '' || formData.cancel_cheaque == undefined) {
    //   isError = false;
    //   errorMessage = strings.cancelChqImgReqVal
    // }
    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    if(!isError){
      Keyboard.dismiss()
    }
    return isError;
  }
  const onPressBack = () => {
    navigation.goBack()
    dispatch(RegistrationForm(formData))
  }
  const onPressNext = () => {
    if (validation()) {
      dispatch(RegistrationForm(formData))
      navigation.navigate('CompanyDetails')
    }
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
        <ScrollView contentContainerStyle={styles.wrap}
          automaticallyAdjustKeyboardInsets={Isios ? true : false}
          keyboardShouldPersistTaps={'handled'}
        >
          <View style={styles.inputWrap}>
            {/* <DropdownInput
              headingText={"Sourcing Manager"}
              placeholder={"Sourcing Manager"}
              // inputWidth={'100%'}
              value={formData.sourcing_manager}
              setValue={(val: any) => {
                setFormData({
                  ...formData, sourcing_manager: val
                })
              }}
            /> */}
            <DropdownInput
              headingText={strings.sourcingMngr}
              placeholder={strings.sourcingMngr}
              data={masterDatas}
              inputWidth={'100%'}
              paddingLeft={16}
              maxHeight={300}
              onFocus={() => handleMasterDatas()}
              labelField="user_name"
              valueField={'_id'}
              value={formData?.sourcing_manager}
              onChange={(item: any) => {
                setFormData({
                  ...formData,
                  sourcing_manager: item._id,
                })
              }}
              newRenderItem={(item: any) => {
                return (
                  <>
                    <View style={Styles.item}>
                      <Text style={Styles.textItem}>{item.user_name}</Text>
                    </View>
                  </>
                );
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              require={true}
              placeholderText={strings.reraCertificate + " " + strings.shortNum}
              handleInputBtnPress={() => { }}
              maxLength={20}
              headingText={strings.reraCertificate + " " + strings.shortNum}
              valueshow={formData?.rera_certificate_no}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData,
                  rera_certificate_no: val,
                  norera_register: (val === "" && handleValues(formData?.rera_certificate) === false) ? null : ""
                })
              }}
            />
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.headingText}>{strings.reraCertificate}</Text>
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
                  setreraVisible(true)
                  setVisible(true)
                }}
              >
                <Text style={{ color: formData?.rera_certificate ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {typeof formData?.rera_certificate === 'object' ?
            <Text style={styles.addedTxt}>{strings.reraCertificate + " " + strings.added}</Text> : null
          }
          <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.headingText}>{strings.proprietorDeclarLttr}</Text>
              {/* <Image
                source={images.star}
                style={{
                  width: normalizeWidth(8),
                  height: normalizeHeight(8),
                  marginLeft: normalizeSpacing(5),
                  marginBottom: normalizeSpacing(5),
                }}
              /> */}
            </View>
            <View>
              <TouchableOpacity
                style={styles.browseVw}
                onPress={() => {
                  setletterVisible(true)
                  setVisible(true)
                }}
              >
                <Text style={{ color: formData?.propidership_declaration_letter ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {typeof formData?.propidership_declaration_letter === 'object' ?
            <Text style={styles.addedTxt}>{strings.proprietorDeclarLttr + " " + strings.added}</Text>
            : null
          }
          {/* <View style={styles.straightVw}>
            <RadioButton.Android
              value={formData?.norera_register}
              status={formData.norera_register === 1 ? "checked" : "unchecked"}
              onPress={() => {
                setFormData({
                  ...formData,
                  norera_register: 1,
                  rera_certificate: '',
                  rera_certificate_no: '',
                });
              }}
              color={PRIMARY_THEME_COLOR}
            />
            <Text
              style={[
                styles.radioTxt,
                {
                  color:
                    formData.norera_register === 1
                      ? PRIMARY_THEME_COLOR
                      : BLACK_COLOR,
                },
              ]}
            >
              {strings.noReraRegistr}
            </Text>
          </View> */}
          <View style={styles.inputWrap}>
            <Text style={styles.headingText}>{strings.bankDetail}</Text>
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              // require={true}
              placeholderText={strings.bankName}
              handleInputBtnPress={() => { }}
              headingText={strings.bankName}
              valueshow={formData?.bank_name}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData, bank_name: val
                })
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              // require={true}
              placeholderText={strings.branchName}
              handleInputBtnPress={() => { }}
              headingText={strings.branchName}
              valueshow={formData?.branch_name}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData, branch_name: val
                })
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              // require={true}
              placeholderText={strings.accountNo}
              handleInputBtnPress={() => { }}
              headingText={strings.accountNo}
              maxLength={18}
              keyboardtype={'number-pad'}
              valueshow={formData?.account_no}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData, account_no: val
                })
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              // require={true}
              placeholderText={strings.ifscCode}
              handleInputBtnPress={() => { }}
              headingText={strings.ifscCode}
              valueshow={formData?.ifsc_code}
              maxLength={11}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData, ifsc_code: val
                })
              }}
            />
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.headingText}>{strings.cancelCheque}</Text>
              {/* <Image
                source={images.star}
                style={{
                  width: normalizeWidth(8),
                  height: normalizeHeight(8),
                  marginLeft: normalizeSpacing(5),
                  marginBottom: normalizeSpacing(5),
                }}
              /> */}
            </View>
            <View>
              <TouchableOpacity
                style={styles.browseVw}
                onPress={() => {
                  setcheaqueVisible(true)
                  setVisible(true)
                }}
              >
                <Text style={{
                  color: formData?.cancel_cheaque ? BLACK_COLOR : PRIMARY_THEME_COLOR,
                  fontSize: normalize(15)
                }}>{strings.browse}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {typeof formData?.cancel_cheaque === 'object' ?
            <Text style={styles.addedTxt}>{strings.cancelCheque + " " + strings.added}</Text> : null
          }
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
        docType={'all'}
        setVisible={setVisible}
        imageData={(data: any) => {
          if (reravisible) {
            setFormData({
              ...formData, rera_certificate: data,
              norera_register: "",
            })
            setreraVisible(false)
          }
          else if (lettervisible) {
            setFormData({
              ...formData, propidership_declaration_letter: data
            })
            setletterVisible(false)
          }
          else {
            setFormData({
              ...formData, cancel_cheaque: data
            })
            setcheaqueVisible(false)
          }
        }}
      />
    </>
  );
};

export default UserBankInfo;