import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import {
  BLACK_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputField from "../../../../components/InputField";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import PicturePickerModal from "../../../../components/Modals/PicturePicker";
import { normalizeHeight, normalizeWidth } from "app/components/scaleFontSize";
import InputCalender from "app/components/InputCalender";
import moment from "moment";


const AgentBasicInfoView = (props: any) => {
  const insets = useSafeAreaInsets();
  const [gender, setGender] = useState("Male");
  const [checked, setChecked] = React.useState("first");

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: WHITE_COLOR,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={"light-content"} />
      <Header
        headerText={strings.basicInfoText}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.onPressBack}
      />
      <ScrollView>
        <View style={styles.wrap}>
          {/*  <Text style={styles.headingText}>{strings.basicInfoText}</Text> */}
          {/* <View style={styles.underlineStyle} /> */}
          <TouchableOpacity onPress={() => props.setVisible(true)}
            style={styles.imageCircle}>
            {props?.agentInfoData?.profile_img === '' ?
              <Text>Image</Text>
              :
              <Image
                source={{ uri: props?.agentInfoData?.profile_img?.path }}
                resizeMode={'contain'}
                style={styles.imageVw}
              />
            }
          </TouchableOpacity>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Name"}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  agent_name: data
                })
              }}
              headingText={"Agent Name"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Adhar No."}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  aadhar_no: data
                })
              }}
              headingText={"Adhar No."}
              keyboardtype={'number-pad'}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Pancard No."}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  pancard_no: data
                })
              }}
              headingText={"Pancard No."}
            />
          </View>
          <View style={styles.genderView}>
            <Text style={styles.genderTxt}>{strings.gender}</Text>
            <View style={styles.radioView}>
              <RadioButton
                value={"1"}
                status={props.agentInfoData.gender === 1 ? "checked" : 'unchecked'}
                onPress={() => props.setAgentInfoData({
                  ...props.agentInfoData,
                  gender: 1
                })}
                color={PRIMARY_THEME_COLOR}
              />
              <Text
                style={[
                  styles.radioTxt,
                  {
                    color:
                      checked === "first" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                  },
                ]}
              >
                {strings.male}
              </Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton
                value={"2"}
                status={props.agentInfoData.gender === 2 ? "checked" : 'unchecked'}
                onPress={() => props.setAgentInfoData({
                  ...props.agentInfoData,
                  gender: 2
                })}
                color={PRIMARY_THEME_COLOR}
              />
              <Text
                style={[
                  styles.radioTxt,
                  {
                    color:
                      checked === "second" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                  },
                ]}
              >
                {strings.female}
              </Text>
            </View>
          </View>
          <View style={styles.inputWrap}>
            {/* <InputField
              placeholderText={"Date of Birth"}
              handleInputBtnPress={() => { }}
              headingText={"Date of Birth"}
              rightImgSrc={images.event}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  dob: data
                })
              }}
            /> */}
            <InputCalender
              placeholderText={"Date of Birth"}
              headingText={"Date of Birth"}
              dateshow={props.agentInfoData.dob}
              setDateshow={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  dob: new Date(data)
                })
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Mobile No."}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  mobile_no: data
                })
              }}
              headingText={"Mobile No."}
              maxLength={10}
              keyboardtype={'number-pad'}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"WhatsApp No."}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  wttsapp_no: data
                })
              }}
              headingText={"WhatsApp No."}
              maxLength={10}
              keyboardtype={'number-pad'}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Email Address"}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  email: data
                })
              }}
              headingText={"Email Address"}
            />
          </View>
          {/*  <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Sourcing Manager"}
            handleInputBtnPress={() => {}}
            onChangeText={() => {}}
            headingText={"Sourcing Manager"}
          />
        </View> */}
          <View style={styles.workingView}>
            <View>
              <Text style={styles.workTxt}>Working Location</Text>
            </View>
            <TouchableOpacity style={styles.addBtn}>
              <Text style={styles.addTxt}>+ Add location</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Button
              handleBtnPress={props.onPressNext}
              rightImage={images.forwardArrow}
              buttonText={strings.next}
              textTransform={"uppercase"} />
          </View>
        </View>
        <PicturePickerModal
          Visible={props.visible}
          imageData={(data: any) => {
            props.setAgentInfoData({
              ...props.agentInfoData,
              profile_img: data
            })
          }}
          setVisible={props.setVisible}
        />
      </ScrollView >
    </View >
  );
};

export default AgentBasicInfoView;
