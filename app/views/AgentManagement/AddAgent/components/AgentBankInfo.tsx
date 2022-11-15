import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import { WHITE_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { addAgent } from "app/Redux/Actions/AgentActions";

const AgentBankInfo = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [refraCrtf, setRefraCrtf] = useState(false)
  const [propiderLettr, setPropiderLettr] = useState(false)
  const addAgentForm = useSelector((state: any) => state.addAgentForm)
  const [agentInfoData, setAgentInfoData] = useState(addAgentForm?.response)
  console.log('agentInfoData: ', agentInfoData);
  const insets = useSafeAreaInsets();
  const onPressBack = () => {
    navigation.goBack()
  }
  const onPressCreateAgent = () => {
    const formData = new FormData();
    formData.append("role_id", agentInfoData?.role_id);
    formData.append("email", agentInfoData?.email);
    formData.append("agent_name", agentInfoData?.agent_name);
    formData.append("primary_mobile", agentInfoData?.mobile_no);
    formData.append("whatsapp_number", agentInfoData?.wttsapp_no);
    formData.append("adhar_no", agentInfoData?.aadhar_no);
    formData.append("pancard_no", agentInfoData?.pancard_no);
    formData.append("gender", agentInfoData?.gender);
    formData.append("date_of_birth", '');
    formData.append("location", '');
    formData.append("latitude", agentInfoData?.latitude);
    formData.append("longitude", agentInfoData?.longitude);
    formData.append("rera_certificate_no", agentInfoData?.rera_no);
    agentInfoData?.profile_img?.path &&
      formData.append("profile_picture", {
        uri: agentInfoData?.profile_img?.path,
        type: agentInfoData?.profile_img?.mime,
        name: agentInfoData?.profile_img?.path?.substring(
          agentInfoData?.profile_img?.path?.lastIndexOf("/") + 1
        ),
      });
    agentInfoData?.rera_certificate?.path &&
      formData.append("rera_certificate", {
        uri: agentInfoData?.rera_certificate?.path,
        type: agentInfoData?.rera_certificate?.mime,
        name: agentInfoData?.rera_certificate?.path?.substring(
          agentInfoData?.rera_certificate?.path?.lastIndexOf("/") + 1
        ),
      });
    agentInfoData?.propidership_declaration_letter?.path &&
      formData.append("propidership_declaration_letter", {
        uri: agentInfoData?.propidership_declaration_letter?.path,
        type: agentInfoData?.propidership_declaration_letter?.mime,
        name: agentInfoData?.propidership_declaration_letter?.path?.substring(
          agentInfoData?.propidership_declaration_letter?.path?.lastIndexOf("/") + 1
        ),
      });
    dispatch(addAgent(formData))
    navigation.navigate('AgentListing')
  }
  return (
    <View style={styles.mainContainer}>
      {/* <View
        style={{
          backgroundColor: WHITE_COLOR,
          height: insets.top,
          flex:1
        }}
      /> */}

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
                rera_no: data
              })
            }}
            headingText={"RERA Certificat No."}
          />
        </View>
        <View style={[styles.inputWrap, { flexDirection: "row" }]}>
          <InputField
            inputWidth={"60%"}
            btnWidth={"30%"}
            browse={"browse"}
            editable={false}
            valueshow={agentInfoData?.rera_certificate?.mime}
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
            valueshow={agentInfoData?.propidership_declaration_letter?.mime}
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
            handleBtnPress={() => onPressCreateAgent()}
            buttonText={strings.createAgent}
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
