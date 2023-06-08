import { View, Text, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { BLACK_COLOR, GREEN_COLOR, Isios, PRIMARY_THEME_COLOR, RED_COLOR, Regexs, WHITE_COLOR } from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import InputField from "../../../../components/InputField";
import Button from "../../../../components/Button";
import images from "../../../../assets/images";
import ErrorMessage from "app/components/ErrorMessage";
import { removeUpdateData, updateUserSettingData } from "app/Redux/Actions/SettingActions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { normalize, } from "app/components/scaleFontSize";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { addAgentForm } from "app/Redux/Actions/AgentActions";

const EditCompanyDetails = ({ navigation }: any) => {
    const dispatch: any = useDispatch()
    const editUser = useSelector((state: any) => state.editUserData);
    const agentdetail = useSelector((state: any) => state.addAgentForm);
    const bankDetail = agentdetail?.response?.agencies?.agency_bank_detail || {}
    const [editData, setEditData] = useState({
        ...agentdetail?.response?.agencies,
        ...agentdetail?.response,
        company_bank_name: bankDetail?.bank_name ? bankDetail?.bank_name : '',
        company_branch_name: bankDetail?.branch_name ? bankDetail?.branch_name : '',
        company_account_no: bankDetail?.account_no ? bankDetail?.account_no : '',
        company_ifsc_code: bankDetail?.ifsc_code ? bankDetail?.ifsc_code : '',
    });
    console.log('editData: ', editData);

    const [panCardVisible, setPanCardVisible] = useState(false)
    const [declarLttrVisible, setDeclarLttrVisible] = useState(false)
    useEffect(() => {
        if (editUser?.response?.status === 200) {
            ErrorMessage({
                msg: editUser?.response?.message,
                backgroundColor: GREEN_COLOR,
            })
            dispatch(removeUpdateData())
            navigation.navigate('profile', {
                heading: 'Profile',
                icon: images.user,
                type: 'profile'
            },)
        }
    }, [editUser])
    // const validation = () => {
    //     let isError = true;
    //     let errorMessage: any = "";
    //     if (editData?.company_account_no && Regexs.accountnumRegex.test(editData?.company_account_no) === false) {
    //         isError = false;
    //         errorMessage = strings.accountNoValidVal;
    //     } else if (editData?.company_ifsc_code && Regexs.ifscRegex.test(editData?.company_ifsc_code) === false) {
    //         isError = false;
    //         errorMessage = strings.ifscValidVal;
    //     }
    //     if (errorMessage !== "") {
    //         ErrorMessage({
    //             msg: errorMessage,
    //             backgroundColor: RED_COLOR,
    //         });
    //     }
    //     return isError
    // }
    const validation = () => {
        let isError = true;
        let errorMessage: any = ''
        if (editData?.agency_name == '' || editData?.agency_name == undefined) {
          isError = false;
          errorMessage = strings.agencyNameReqVal
        } 
        // else if (editData?.gst == '' || editData?.gst == undefined) {
        //   isError = false;
        //   errorMessage = strings.gstReqVal
        // }
         else if (editData?.rera_registration == '' || editData?.rera_registration == undefined) {
          isError = false;
          errorMessage = strings.reraRegstrReqVal
        } 
        // else if (editData?.pancard == '' || editData?.pancard == undefined) {
        //   isError = false;
        //   errorMessage = strings.comPanCardImgReqVal
        // } else if (editData?.declaration_letter_of_company == '' || editData?.declaration_letter_of_company == undefined) {
        //   isError = false;
        //   errorMessage = strings.declLttrComImgReqVal
        // } else if (editData?.company_bank_name == '' || editData?.company_bank_name == undefined) {
        //   isError = false;
        //   errorMessage = strings.bankNameReqVal
        // } else if (editData?.company_branch_name == '' || editData?.company_branch_name == undefined) {
        //   isError = false;
        //   errorMessage = strings.branchNameReqVal
        // } else if (editData?.company_account_no == '' || editData?.company_account_no == undefined) {
        //   isError = false;
        //   errorMessage = strings.accountNoReqVal
        // } else if (
        //   Regexs.accountnumRegex.test(editData?.company_account_no) === false
        // ) {
        //   isError = false;
        //   errorMessage = strings.accountNoValidVal;
        // } else if (editData?.company_ifsc_code == '' || editData?.company_ifsc_code == undefined) {
        //   isError = false;
        //   errorMessage = strings.ifscReqVal
        // } else if (
        //   Regexs.ifscRegex.test(editData?.company_ifsc_code) === false
        // ) {
        //   isError = false;
        //   errorMessage = strings.ifscValidVal;
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
    const handleUpdatePress = () => {
        if (validation()) {
            const editFormData: any = new FormData();
            editFormData.append("cp_id", editData?.cp_id);
            editFormData.append("location", editData?.location);
            editFormData.append("pin_code", editData?.pin_code);
            // editFormData.append("working_location", JSON.stringify(editData?.working_location));
            editFormData.append("owner_name", editData?.owner_name);
            //1st
            editData?.profile_picture?.uri &&
                editFormData.append("profile_picture", editData?.profile_picture);
            editFormData.append("agent_name", editData?.agent_name);
            editFormData.append("adhar_no", editData?.adhar_no);
            editFormData.append("pancard_no", editData?.pancard_no);
            editFormData.append("gender", editData?.gender ? editData?.gender : "");
            editFormData.append("working_location", JSON.stringify(editData?.working_location))
            editFormData.append("date_of_birth", moment(editData?.date_of_birth).format());
            editFormData.append("primary_mobile", editData?.primary_mobile);
            editFormData.append("whatsapp_number", editData?.whatsapp_number ? editData?.whatsapp_number : "");
            editFormData.append("email", editData?.email);
            editFormData.append("address", editData?.address);
            editFormData.append("latitude", editData?.latitude);
            editFormData.append("longitude", editData?.longitude);
            //2nd 
            editFormData.append("rera_certificate_no", editData?.rera_certificate_no);
            editData?.rera_certificate &&
                editFormData.append("rera_certificate", editData?.rera_certificate);
            editData?.propidership_declaration_letter?.uri &&
                editFormData.append("propidership_declaration_letter", editData?.propidership_declaration_letter);
            editFormData.append("bank_name", editData?.bank_name);
            editFormData.append("branch_name", editData?.branch_name);
            editFormData.append("account_no", editData?.account_no);
            editFormData.append("ifsc_code", editData?.ifsc_code);
            //3rd 
            editFormData.append("agency_name", editData?.agency_name);
            editFormData.append("gst", editData?.gst);
            editFormData.append("rera_registration", editData?.rera_registration);
            editData?.company_pancard?.uri &&
                editFormData.append("company_pancard", editData?.company_pancard);
            editData?.declaration_letter_of_company?.uri &&
                editFormData.append("declaration_letter_of_company", editData?.declaration_letter_of_company);
            editFormData.append("company_bank_name", editData?.company_bank_name);
            editFormData.append("company_branch_name", editData?.company_branch_name);
            editFormData.append("company_account_no", editData?.company_account_no);
            editFormData.append("company_ifsc_code", editData?.company_ifsc_code);
            dispatch(updateUserSettingData(editFormData));
        }
    };
    const insets = useSafeAreaInsets();
    const onPressBack = () => {
        navigation.goBack('')
        dispatch(addAgentForm(editData))
    }
    return (
        <View style={styles.mainContainer}>
            <Header
                headerText={strings.companyDetails}
                headerStyle={styles.headerStyle}
                headerTextStyle={styles.headerTextStyle}
                leftImageSrc={images.backArrow}
                handleOnLeftIconPress={onPressBack}
                leftImageIconStyle={{ tintColor: WHITE_COLOR }}
            />
            <ScrollView
                keyboardShouldPersistTaps={'handled'}
                contentContainerStyle={styles.wrap}
                automaticallyAdjustKeyboardInsets={Isios ? true : false}>
                <View style={styles.inputWrap}>
                    <InputField
                        require={true}
                        disableSpecialCharacters={true}
                        // require={true}
                        placeholderText={strings.agency + " " + strings.name}
                        handleInputBtnPress={() => { }}
                        headingText={strings.realEstateCom}
                        valueshow={editData?.agency_name}
                        onChangeText={(val: any) => {
                            setEditData({
                                ...editData, agency_name: val
                            })
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        // require={true}
                        disableSpecialCharacters={true}
                        // require={true}
                        placeholderText={strings.gst}
                        headingText={strings.gst}
                        handleInputBtnPress={() => { }}
                        valueshow={editData?.gst}
                        maxLength={20}
                        onChangeText={(val: any) => {
                            setEditData({
                                ...editData, gst: val
                            })
                        }}
                    />
                </View>
                <View style={styles.inputWrap}>
                    <InputField
                        require={true}
                        // require={true}
                        placeholderText={strings.RERA + " " + strings.registration}
                        maxLength={20}
                        headingText={strings.RERA + " " + strings.registration}
                        handleInputBtnPress={() => { }}
                        valueshow={editData?.rera_registration}
                        onChangeText={(val: any) => {
                            setEditData({
                                ...editData, rera_registration: val
                            })
                        }}
                    />
                </View>
                <View style={[styles.inputWrap, styles.starightVw]}>
                    <View style={styles.textVw}>
                        <Text style={styles.headingText}>{strings.pancard}</Text>
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
                            onPress={() => { setPanCardVisible(true) }}
                        >
                            <Text style={{
                                color: editData?.company_pancard ?
                                    BLACK_COLOR : PRIMARY_THEME_COLOR,
                                fontSize: normalize(15)
                            }}>{strings.browse}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {editData?.company_pancard === '' || editData?.company_pancard === undefined ||
                    editData?.company_pancard === null ?
                    null :
                    <Text style={styles.addedTxt}>{strings.pancard + " " + strings.added}</Text>
                }
                <View style={[styles.inputWrap, styles.starightVw]}>
                    <View style={styles.textVw}>
                        <Text style={styles.headingText}>{strings.declrLttrCom}</Text>
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
                            onPress={() => { setDeclarLttrVisible(true) }}
                        >
                            <Text style={{
                                color: editData?.declaration_letter_of_company ?
                                    BLACK_COLOR : PRIMARY_THEME_COLOR,
                                fontSize: normalize(15)
                            }}>{strings.browse}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {editData?.declaration_letter_of_company === '' || editData?.declaration_letter_of_company === undefined ||
                    editData?.declaration_letter_of_company === null ?
                    null :
                    <Text style={styles.addedTxt}>{strings.declrLttrCom + " " + strings.added}</Text>
                }
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
                        valueshow={editData?.company_bank_name}
                        onChangeText={(val: any) => {
                            setEditData({
                                ...editData, company_bank_name: val
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
                        valueshow={editData?.company_branch_name}
                        onChangeText={(val: any) => {
                            setEditData({
                                ...editData, company_branch_name: val
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
                        valueshow={editData?.company_account_no}
                        onChangeText={(val: any) => {
                            setEditData({
                                ...editData, company_account_no: val
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
                        valueshow={editData?.company_ifsc_code}
                        maxLength={11}
                        onChangeText={(val: any) => {
                            setEditData({
                                ...editData, company_ifsc_code: val
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
            <PicturePickerModal
                Visible={panCardVisible}
                setVisible={setPanCardVisible}
                // docType={'all'}
                imageData={(data: any) => {
                    setEditData({
                        ...editData,
                        company_pancard: data
                    })
                }}
            />
            <PicturePickerModal
                Visible={declarLttrVisible}
                setVisible={setDeclarLttrVisible}
                docType={'all'}
                imageData={(data: any) => {
                    setEditData({
                        ...editData,
                        declaration_letter_of_company: data
                    })
                }}
            />
        </View>
    );
};

export default EditCompanyDetails;
