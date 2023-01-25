import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
  BackHandler,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import { BLACK_COLOR, GRAY_LIGHT_COLOR, PRIMARY_THEME_COLOR, RED_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
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
    if (formData.rera_certificate_no == '' || formData.rera_certificate_no == undefined) {
      isError = false;
      errorMessage = "Rera Certificate No. is require. Please enter Rera Certificate No."
    }
    else if (formData.rera_certificate == '' || formData.rera_certificate == undefined) {
      isError = false;
      errorMessage = "Rera Certificate Image is require. Please Choose Rera Certificate Image"
    }
    else if (formData.propidership_declaration_letter == '' || formData.propidership_declaration_letter == undefined) {
      isError = false;
      errorMessage = "Proprietorship Declaration Letter Image is require. Please Choose Proprietorship Declaration Letter Image"
    }
    else if (formData.cancel_cheaque == '' || formData.cancel_cheaque == undefined) {
      isError = false;
      errorMessage = "Cancel Cheaque Image is require. Please Choose Cancel Cheaque Image"
    }
    else if (formData.bank_name == '' || formData.bank_name == undefined) {
      isError = false;
      errorMessage = "Bank Name is require. Please enter Bank Name"
    }
    else if (formData.branch_name == '' || formData.branch_name == undefined) {
      isError = false;
      errorMessage = "Branch Name is require. Please enter Branch Name"
    }
    else if (formData.account_no == '' || formData.account_no == undefined) {
      isError = false;
      errorMessage = "Account No. is require. Please enter Account No."
    }
    else if (formData.ifsc_code == '' || formData.ifsc_code == undefined) {
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
        <ScrollView contentContainerStyle={styles.wrap}>
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
              headingText={'Sourcing Manager'}
              placeholder={'Sourcing Manager'}
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
              placeholderText={"RERA Certificate No."}
              handleInputBtnPress={() => { }}
              headingText={"RERA Certificate No."}
              valueshow={formData?.rera_certificate_no}
              onChangeText={(val: any) => {
                setFormData({
                  ...formData, rera_certificate_no: val
                })
              }}
            />
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }]}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.headingText}>RERA Certificate</Text>
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
            <Text style={styles.addedTxt}>{"RERA Certificate Added"}</Text> : null
          }
          <View style={[styles.inputWrap, { flexDirection: "row", alignItems: 'center' }]}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.headingText}>Proprietorship Declaration Letter</Text>
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
                }}
              >
                <Text style={{ color: formData?.propidership_declaration_letter ? BLACK_COLOR : PRIMARY_THEME_COLOR, fontSize: normalize(15) }}>{strings.browse}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {typeof formData?.propidership_declaration_letter === 'object' ?
            <Text style={styles.addedTxt}>{"Proprietorship Declaration Letter Added"}</Text>
            : null
          }
          <View style={styles.inputWrap}>
            <Text style={styles.headingText}>Bank Details</Text>
          </View>
          <View style={styles.inputWrap}>
            <InputField
              require={true}
              placeholderText={"Bank Name"}
              handleInputBtnPress={() => { }}
              headingText={"Bank Name"}
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
              require={true}
              placeholderText={"Branch Name"}
              handleInputBtnPress={() => { }}
              headingText={"Branch Name"}
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
              require={true}
              placeholderText={"Account No."}
              handleInputBtnPress={() => { }}
              headingText={"Account No."}
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
              require={true}
              placeholderText={"IFSC Code"}
              handleInputBtnPress={() => { }}
              headingText={"IFSC Code"}
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
              <Text style={styles.headingText}>Cancel Cheaque</Text>
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
            <Text style={styles.addedTxt}>{"Cancel Cheaque Added"}</Text> : null
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
        setVisible={setVisible}
        imageData={(data: any) => {
          if (reravisible) {
            setFormData({
              ...formData, rera_certificate: data
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
