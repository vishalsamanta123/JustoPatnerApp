import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import { BLACK_COLOR, GREEN_COLOR, PRIMARY_THEME_COLOR, RED_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { addAgent, addAgentRemove, editAgent } from "app/Redux/Actions/AgentActions";
import ErrorMessage from "app/components/ErrorMessage";
import { normalize } from "app/components/scaleFontSize";

const AgentBankInfo = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const { response = {} } = useSelector((state: any) => state.addAgentForm)
  const [agentInfoData, setAgentInfoData] = useState({ ...response })
  const editData = useSelector((state: any) => state.editAgentData) || {}
  const addData = useSelector((state: any) => state.addAgentData) || {}

  useEffect(() => {
    if (editData?.update || addData?.create) {
      dispatch(addAgentRemove());
      navigation.navigate('AgentListing')
      ErrorMessage({
        msg: editData?.update ? editData?.response?.message :
          addData?.create ? addData?.response?.message : '',
        backgroundColor: GREEN_COLOR
      })
    }
  }, [editData, addData])
  const [refraCrtf, setRefraCrtf] = useState(false)
  const [propiderLettr, setPropiderLettr] = useState(false)
  const insets = useSafeAreaInsets();
  const onPressBack = () => {
    navigation.goBack()
  }
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    const { rera_certificate_no, rera_certificate, propidership_declaration_letter } = agentInfoData
    if (rera_certificate_no === '' || rera_certificate_no === undefined) {
      isError = false;
      errorMessage = "Please fill rera certificate number"
    } else if (rera_certificate === '' || rera_certificate === undefined) {
      isError = false;
      errorMessage = "Please select rera certificate image"
    } else if (propidership_declaration_letter === '' || propidership_declaration_letter === undefined) {
      isError = false;
      errorMessage = "Please select Proprietorship declaration letter"
    }
    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }
  const onPressCreateAgent = (type: any) => {
    if (validation()) {
      const formData = new FormData();
      if (type === 'edit') {
        formData.append("agent_id", agentInfoData?._id);
      } else {
        // formData.append("role_id", agentInfoData?.role_id);
      }
      formData.append("email", agentInfoData?.email);
      formData.append("agent_name", agentInfoData?.agent_name);
      formData.append("primary_mobile", agentInfoData?.primary_mobile);
      formData.append("whatsapp_number", agentInfoData?.whatsapp_number);
      formData.append("adhar_no", agentInfoData?.adhar_no);
      formData.append("pancard_no", agentInfoData?.pancard_no);
      formData.append("gender", agentInfoData?.gender);
      formData.append("date_of_birth", agentInfoData?.date_of_birth ? agentInfoData?.date_of_birth : '10/11/2000');
      formData.append("location", agentInfoData?.location);
      formData.append("latitude", agentInfoData?.latitude);
      formData.append("longitude", agentInfoData?.longitude);
      formData.append("working_location", JSON.stringify(agentInfoData?.working_location));
      formData.append("rera_certificate_no", agentInfoData?.rera_certificate_no);
      agentInfoData?.profile_picture?.uri &&
        formData.append("profile_picture", agentInfoData?.profile_picture);
      agentInfoData?.rera_certificate?.uri &&
        formData.append("rera_certificate", agentInfoData?.rera_certificate);
      agentInfoData?.propidership_declaration_letter?.uri &&
        formData.append("propidership_declaration_letter", agentInfoData?.propidership_declaration_letter);
      if (type === 'edit') {
        dispatch(editAgent(formData))
      } else {
        dispatch(addAgent(formData))
      }
    }
  }
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.rerainfo}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={onPressBack}
      />
      <View style={styles.wraptop}>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"RERA Certificate No."}//can edit
            handleInputBtnPress={() => { }}
            onChangeText={(data: any) => {
              setAgentInfoData({
                ...agentInfoData,
                rera_certificate_no: data
              })
            }}
            valueshow={
              agentInfoData?.rera_certificate_no?.toString()
            }
            headingText={"RERA Certificat No."}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row" }]}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[styles.headingText, { fontSize: normalize(17), }]}>RERA Certificate</Text>
          </View>
          <View style={{ flex: 0.5, }}>
            <TouchableOpacity
              onPress={() => setRefraCrtf(true)}
              style={styles.browseVw}
            >
              <Text style={{
                color: agentInfoData?.rera_certificate === "" ?
                  BLACK_COLOR : PRIMARY_THEME_COLOR
              }}>{strings.browse}</Text>
            </TouchableOpacity>
            {agentInfoData?.rera_certificate === null ||
              agentInfoData?.rera_certificate === "" ||
              agentInfoData?.rera_certificate === undefined ?
              null :
              <Text style={styles.addedTxt}>{"RERA Certificate Added"}</Text>
            }
          </View>
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row" }]}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={[styles.headingText, { fontSize: normalize(17) }]}>Proprietorship Declaration Letter</Text>
          </View>
          <View style={{ flex: 0.5, }}>
            <TouchableOpacity
              onPress={() => setPropiderLettr(true)}
              style={styles.browseVw}
            >
              <Text style={{
                color: agentInfoData?.propidership_declaration_letter === "" ?
                  BLACK_COLOR : PRIMARY_THEME_COLOR
              }}>{strings.browse}</Text>
            </TouchableOpacity>
            {agentInfoData?.propidership_declaration_letter === null ||
              agentInfoData?.propidership_declaration_letter === "" ||
              agentInfoData?.propidership_declaration_letter === undefined ?
              null :
              <Text style={styles.addedTxt}>{"Proprietorship Declaration Letter Added"}</Text>
            }
          </View>
        </View>
      </View>
      <View style={styles.wrapbottum}>
        {/*  <View style={styles.inputWrap}>
          <Text style={styles.headingText}>Bank details</Text>
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Bank Name"}
            handleInputBtnPress={() => {}}
            onChangeText={() => {}}
            headingText={"Bank Name"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Branch Name"}
            handleInputBtnPress={() => {}}
            onChangeText={() => {}}
            headingText={"Branch Name"}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Account No."}
            handleInputBtnPress={() => {}}
            onChangeText={() => {}}
            headingText={"Account No."}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"IFSC Code"}
            handleInputBtnPress={() => {}}
            onChangeText={() => {}}
            headingText={"IFSC Code"}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row" }]}>
          <InputField
            inputWidth={"60%"}
            btnWidth={"30%"}
            browse={"browse"}
            handleInputBtnPress={() => {}}
            onChangeText={() => {}}
            headingText={"Cancel Cheaque"}
          />
          <TouchableOpacity
            style={{
              width: "25%",
              backgroundColor: WHITE_COLOR,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 10,
              borderRadius: 10
            }}
          >
            <Text>browse</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <Button
            handleBtnPress={()=>onPressCreateAgent()}
            buttonText={strings.createAgent}
            textTransform={"uppercase"}
          />
        </View>
       */}
        <View style={{ marginTop: 20 }}>
          <Button
            handleBtnPress={() => onPressCreateAgent(route?.params?.type)}
            buttonText={route?.params?.type === 'edit' ? strings.editAgent :
              strings.createAgent}
            textTransform={"uppercase"}
          />
        </View>
      </View>
      <PicturePickerModal
        Visible={refraCrtf}
        setVisible={setRefraCrtf}
        imageData={(data: any) => {
          setAgentInfoData({
            ...agentInfoData,
            rera_certificate: data
          })
        }}
      />
      <PicturePickerModal
        Visible={propiderLettr}
        setVisible={setPropiderLettr}
        imageData={(data: any) => {
          setAgentInfoData({
            ...agentInfoData,
            propidership_declaration_letter: data
          })
        }}
      />
    </View>
  );
};

export default AgentBankInfo;
