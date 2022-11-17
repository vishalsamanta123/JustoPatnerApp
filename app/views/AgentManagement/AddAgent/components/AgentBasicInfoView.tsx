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
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";


const AgentBasicInfoView = (props: any) => {
  const insets = useSafeAreaInsets();
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
            {props?.agentInfoData?.profile_picture === undefined ||
              props?.agentInfoData?.profile_picture === '' ?
              <Text>Image</Text>
              :
              <Image
                source={{
                  uri: props?.agentInfoData?.profile_picture?.path ?
                    props?.agentInfoData?.profile_picture?.path : props?.agentInfoData?.profile_picture
                }}
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
              valueshow={props?.agentInfoData?.agent_name}
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
                  adhar_no: data
                })
              }}
              valueshow={props?.agentInfoData?.adhar_no?.toString()}
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
              valueshow={props?.agentInfoData?.pancard_no?.toString()}
              headingText={"Pancard No."}
            />
          </View>
          <View style={styles.genderView}>
            <Text style={styles.genderTxt}>{strings.gender}</Text>
            <View style={styles.radioView}>
              <RadioButton
                value={"1"}
                status={props?.agentInfoData?.gender === 1 ? "checked" : 'unchecked'}
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
                      props?.agentInfoData?.gender === 1 ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                  },
                ]}
              >
                {strings.male}
              </Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton
                value={"2"}
                status={props?.agentInfoData?.gender === 2 ? "checked" : 'unchecked'}
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
                      props?.agentInfoData?.gender === 2 ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                  },
                ]}
              >
                {strings.female}
              </Text>
            </View>
          </View>
          <View style={styles.inputWrap}>
            <InputCalender
              placeholderText={"Date of Birth"}
              editable={false}
              onChangeText={() => { }}
              dateData={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  date_of_birth: moment(data).format()
                })
              }}
              setDateshow={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  date_of_birth: moment(data).format()
                })
              }}
              value={props?.filterData?.date_of_birth?.toString()}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Mobile No."}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  primary_mobile: data
                })
              }}
              valueshow={props?.agentInfoData?.primary_mobile?.toString()}
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
                  whatsapp_number: data
                })
              }}
              valueshow={props?.agentInfoData?.whatsapp_number?.toString()}
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
              valueshow={props?.agentInfoData?.email}
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
              {props?.agentInfoData?.working_location?.length > 0 &&
                props?.agentInfoData?.working_location?.map((item: any) => {
                  return (
                    <View style={{ paddingVertical: 5, paddingHorizontal: 5 }}>
                      <Text style={{ color: BLACK_COLOR, borderBottomWidth: 0.7 }}>{item.location}</Text>
                    </View>
                  )
                })
              }
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
              profile_picture: data
            })
          }}
          setVisible={props.setVisible}
        />
      </ScrollView>
    </View>
  );
};

export default AgentBasicInfoView;
