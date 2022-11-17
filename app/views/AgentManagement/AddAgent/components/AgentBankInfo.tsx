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
import { RED_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { addAgent, editAgent } from "app/Redux/Actions/AgentActions";
import ErrorMessage from "app/components/ErrorMessage";
import Loader from "app/components/CommonScreen/Loader";

const AgentBankInfo = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const [isloading, setIsloading] = useState(false)
  const { response = {} } = useSelector((state: any) => state.addAgentForm)
  const formFiledData = useSelector((state: any) => state.agentData) || null
  const [agentInfoData, setAgentInfoData] = useState({ ...response })
  console.log('agentInfoData: ', agentInfoData);
  const [formFilledDone, setFormFilledDone] = useState(null)
  useEffect(() => {
    if (formFilledDone != null) {
      if (formFiledData?.response?.status === 200) {
        navigation.navigate('AgentListing')
        setIsloading(false)
      }
    }
  }, [formFilledDone])
  const [refraCrtf, setRefraCrtf] = useState(false)
  const [propiderLettr, setPropiderLettr] = useState(false)
  const insets = useSafeAreaInsets();
  const onPressBack = () => {
    navigation.goBack()
  }
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (route?.params?.type === 'add') {
      if (Object.keys(agentInfoData).length < 12) {
        isError = false;
        errorMessage = "All Fields are required ,please fill all filled"
      }
    } else {
      const { agent_id, agent_name, whatsapp_number, adhar_no,
        pancard_no, gender, date_of_birth, rera_certificate_no
      } = agentInfoData
      if (agent_id === '' || agent_name === '' || whatsapp_number === '' || adhar_no === '' ||
        pancard_no === '' || gender === '' || date_of_birth === '' || rera_certificate_no === ''
      ) {
        isError = false;
        errorMessage = "All Fields are required ,please fill all filled"
      }
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
      setIsloading(true)
      const formData = new FormData();
      if (type === 'edit') {
        formData.append("agent_id", agentInfoData?.agent_id);
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
      formData.append("location", '');
      formData.append("latitude", '');
      formData.append("longitude", '');
      formData.append("rera_certificate_no", agentInfoData?.rera_certificate_no);
      agentInfoData?.profile_picture?.path &&
        formData.append("profile_picture", {
          uri: agentInfoData?.profile_picture?.path,
          type: agentInfoData?.profile_picture?.mime,
          name: agentInfoData?.profile_picture?.path?.substring(
            agentInfoData?.profile_picture?.path?.lastIndexOf("/") + 1
          ),
        });
      agentInfoData?.rera_certificate?.path &&//no 
        formData.append("rera_certificate", {
          uri: agentInfoData?.rera_certificate?.path,
          type: agentInfoData?.rera_certificate?.mime,
          name: agentInfoData?.rera_certificate?.path?.substring(
            agentInfoData?.rera_certificate?.path?.lastIndexOf("/") + 1
          ),
        });
      agentInfoData?.propidership_declaration_letter?.path &&//no 
        formData.append("propidership_declaration_letter", {
          uri: agentInfoData?.propidership_declaration_letter?.path,
          type: agentInfoData?.propidership_declaration_letter?.mime,
          name: agentInfoData?.propidership_declaration_letter?.path?.substring(
            agentInfoData?.propidership_declaration_letter?.path?.lastIndexOf("/") + 1
          ),
        });
      if (type === 'edit') {
        dispatch(editAgent(formData))
        setFormFilledDone(type)
      } else {
        dispatch(addAgent(formData))
        setFormFilledDone(type)
      }
    }
  }
  return (
    <View style={styles.mainContainer}>
      {isloading ? <Loader /> : null}
      <StatusBar barStyle={"light-content"} />
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
            placeholderText={"RERA Certificat No."}
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
          <InputField
            inputWidth={"60%"}
            btnWidth={"30%"}
            browse={"browse"}
            editable={false}
            valueshow={
              agentInfoData?.rera_certificate?.path ?
                agentInfoData?.rera_certificate?.path.substring(
                  agentInfoData?.rera_certificate?.path?.lastIndexOf("/")) :
                agentInfoData?.rera_certificate?.substring(agentInfoData?.rera_certificate?.lastIndexOf("/"))
            }
            handleInputBtnPress={() => { }}
            headingText={"RERA Certificat"}
          />
          <TouchableOpacity
            onPress={() => setRefraCrtf(true)}
            style={styles.browseVw}
          >
            <Text>browse</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row" }]}>
          <InputField
            inputWidth={"60%"}
            btnWidth={"30%"}
            browse={"browse"}
            editable={false}
            valueshow={
              agentInfoData?.propidership_declaration_letter?.path ?
                agentInfoData?.propidership_declaration_letter?.path.substring(
                  agentInfoData?.propidership_declaration_letter?.path?.lastIndexOf("/")) :
                agentInfoData?.propidership_declaration_letter?.substring(agentInfoData?.propidership_declaration_letter?.lastIndexOf("/"))
            }
            handleInputBtnPress={() => { }}
            onChangeText={() => { }}
            topping={16}
            headingText={"Propidership Declaration Letter"}
          />
          <TouchableOpacity
            onPress={() => setPropiderLettr(true)}
            style={styles.browseVw}
          >
            <Text>browse</Text>
          </TouchableOpacity>
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
