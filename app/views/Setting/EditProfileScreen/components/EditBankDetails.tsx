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
import { BLACK_COLOR, GRAY_LIGHT_COLOR, GREEN_COLOR, PRIMARY_THEME_COLOR, RED_COLOR, Regexs, WHITE_COLOR } from "../../../../components/utilities/constant";
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
import { RadioButton } from "react-native-paper";
import { handleValues } from "app/components/utilities/handleValues";

const EditBankDetails = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const insets = useSafeAreaInsets();
  const [reraVisible, setReraVisible] = useState(false)
  const [letterVisible, setLetterVisible] = useState(false)
  const agentdetail = useSelector((state: any) => state.addAgentForm);
  const [editData, setEditData] = useState(agentdetail?.response);
  const [bankData, setBankData] = useState(agentdetail?.response?.cp_bank_detail);

  const onPressBack = () => {
    navigation.goBack()
  }
  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (bankData?.account_no && Regexs.accountnumRegex.test(bankData?.account_no) === false) {
      isError = false;
      errorMessage = strings.accountNoValidVal;
    } else if (bankData?.ifsc_code && Regexs.ifscRegex.test(bankData?.ifsc_code) === false) {
      isError = false;
      errorMessage = strings.ifscValidVal;
    }
    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError
  }
  const onPressNext = () => {
    const allData = { ...editData, ...bankData }
    if (validation()) {
      dispatch(addAgentForm(allData))
      navigation.navigate('EditCompanyDetail')
    }
  }
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.userbankinfo}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={onPressBack}
        leftImageIconStyle={{ tintColor: WHITE_COLOR }}
      />
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.wrap}>
        <View style={styles.inputWrap}>
          <InputField
            valueshow={editData?.rera_certificate_no}
            handleInputBtnPress={() => { }}
            maxLength={20}
            headingText={strings.reraCertificate + " " + strings.shortNum}
            onChangeText={(val: any) => {
              setEditData({
                ...editData, rera_certificate_no: val,
                norera_register: (val === "" && handleValues(editData?.rera_certificate) === false) ? null : ""
              })
            }}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", }]}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.headingText}>{strings.reraCertificate}</Text>
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
              <Text style={styles.addedTxt}>{strings.reraCertificate + " " + strings.added}</Text>
            }
          </View>
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row", }]}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.headingText}>{strings.proprietorDeclarLttr}</Text>
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
              <Text style={styles.addedTxt}>{strings.proprietorDeclarLttr + " " + strings.added}</Text>
            }
          </View>
        </View>
        <View style={styles.straightVw}>
          <RadioButton.Android
            value={editData?.norera_register}
            status={editData?.norera_register === 1 ? "checked" : "unchecked"}
            onPress={() => {
              setEditData({
                ...editData,
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
                  editData?.norera_register === 1
                    ? PRIMARY_THEME_COLOR
                    : BLACK_COLOR,
              },
            ]}
          >
            {strings.noReraRegistr}
          </Text>
        </View>
        <View style={styles.inputWrap}>
          <Text style={styles.headingText}>{strings.bankDetail}</Text>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            valueshow={bankData?.bank_name}
            handleInputBtnPress={() => { }}
            headingText={strings.bankName}
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
            headingText={strings.branchName}
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
            headingText={strings.accountNo}
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
            headingText={strings.ifscCode}
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
            handleBtnPress={() => onPressNext()}
            width={300}
            btnTxtsize={15}
            buttonText={strings.next}
            textTransform={"uppercase"}
          />
        </View>
      </ScrollView>
      <PicturePickerModal
        Visible={reraVisible}
        setVisible={setReraVisible}
        docType={'all'}
        imageData={(data: any) => {
          setEditData({
            ...editData,
            rera_certificate: data,
            norera_register: ''
          })
        }}
      />
      <PicturePickerModal
        Visible={letterVisible}
        setVisible={setLetterVisible}
        docType={'all'}
        imageData={(data: any) => {
          setEditData({
            ...editData,
            propidership_declaration_letter: data
          })
        }}
      />
    </View>
  );
};

export default EditBankDetails;
