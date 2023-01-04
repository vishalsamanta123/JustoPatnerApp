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
  DATE_FORMAT,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputField from "../../../../components/InputField";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import PicturePickerModal from "../../../../components/Modals/PicturePicker";
import { normalizeSpacing, } from "app/components/scaleFontSize";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import MultiLocation from 'app/components/MultiLocation'


const AgentBasicInfoView = (props: any) => {
  const handleDelete = (item: any, index: any) => {
    var array: any[] = [...props?.agentInfoData.working_location];
    array?.splice(index, 1);
    props?.setAgentInfoData({
      ...props?.agentInfoData,
      working_location: array
    })
  }
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.basicInfoText}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.onPressBack}
      />
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.wrap}>
          {/*  <Text style={styles.headingText}>{strings.basicInfoText}</Text> */}
          {/* <View style={styles.underlineStyle} /> */}
          <TouchableOpacity onPress={() => props.setVisible(true)}
            style={styles.imageCircle}>
            {props?.agentInfoData?.profile_picture === undefined ||
              props?.agentInfoData?.profile_picture === '' ?
              <Image
                style={styles.DummyloginBanner}
                source={images.user}
                resizeMode="contain"
              />
              :
              <Image
                source={{
                  uri: props?.agentInfoData?.profile_picture?.uri ?
                    props?.agentInfoData?.profile_picture?.uri : props?.agentInfoData?.profile_picture
                }}
                resizeMode={'contain'}
                style={styles.imageVw}
              />
            }
            <View style={styles.editView}>
              <Image
                style={styles.editImage}
                source={images.edit}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Name"}//can edit
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  agent_name: data
                })
              }}
              valueshow={props?.agentInfoData?.agent_name}
              headingText={" Name"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Aadhaar No."}//can edit
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  adhar_no: data
                })
              }}
              valueshow={props?.agentInfoData?.adhar_no?.toString()}
              headingText={"Aadhaar No."}
              keyboardtype={'number-pad'}
              maxLength={12}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Pancard No."}//can edit
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  pancard_no: data
                })
              }}
              valueshow={props?.agentInfoData?.pancard_no?.toString()}
              headingText={"Pancard No."}
              maxLength={10}
            />
          </View>
          <View style={styles.genderView}>
            <Text style={styles.genderTxt}>{strings.gender}</Text>
            <View style={styles.radioView}>
              <RadioButton.Android
                value={"1"}//can edit
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
              <RadioButton.Android
                value={"2"}//can edit
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
              mode={'date'}
              leftIcon={images.event}
              placeholderText={"Date of Birth"}//can edit
              headingText={"Date of Birth"}//can edit
              editable={false}
              dateData={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  date_of_birth: moment(data).format(DATE_FORMAT)
                })
              }}
              setDateshow={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  date_of_birth: moment(data).format(DATE_FORMAT)
                })
              }}
              value={props?.agentInfoData?.date_of_birth === '' || props?.agentInfoData?.date_of_birth === undefined ?
                "" :
                moment(props?.agentInfoData?.date_of_birth).format(DATE_FORMAT)}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Mobile No."}
              editable={props.type === 'add' ? true : false}
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
              placeholderText={"WhatsApp No."}//can edit
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
              editable={props.type === 'add' ? true : false}
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
          <View style={[styles.inputWrap, {}]}>
            <InputField
              placeholderText={"Address"}
              onChangeText={(data: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  location: data
                })
              }}
              valueshow={props?.agentInfoData?.location}
              headingText={"Address"}
              inputType={'location'}
              onPressSelect={(data: any, detail: any) => {
                props.setAgentInfoData({
                  ...props.agentInfoData,
                  location: data?.description,
                  latitude: detail?.geometry?.location?.lat,
                  longitude: detail?.geometry?.location?.lng,
                })
              }}
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
            <View style={{
              top: props.agentInfoData?.working_location?.length > 0 ? 8 : 0
            }}>
              <Text style={styles.workTxt}>Working Location</Text>
            </View>
            <TouchableOpacity
              onPress={() => { props.setLocationModel(true) }}
              // onPress={() => { props.type === 'add' ? props.setLocationModel(true) : null }}
              style={styles.addBtn}>
              <Text style={styles.addTxt}>+ Add location</Text>
            </TouchableOpacity>
          </View>
          {props.agentInfoData?.working_location?.length > 0 ?
            <View style={styles.inputBoxVw}>
              {props.agentInfoData?.working_location?.map((item: any, index: any) => {
                return (
                  <View style={[styles.inputBoxItmVw, {
                    borderBottomWidth: props?.agentInfoData?.working_location?.length - 1 === index ? 0 : 0.6
                  }]}>
                    <Text style={styles.inputBoxItmTxt}>{item.location}</Text>
                    <TouchableOpacity onPress={() => handleDelete(item, index)}>
                      <Image
                        source={images.close}
                        style={styles.crossVw}
                      />
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
            : null
          }
          <View style={{ marginVertical: normalizeSpacing(12) }}>
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
        <MultiLocation
          Visible={props.locationModel}
          setVisible={() => props.setLocationModel(false)}
          value={props.agentInfoData?.working_location}
          handleAddTarget={(data: any) => {
            if (data?.length > 0) {
              props.setAgentInfoData({
                ...props.agentInfoData,
                working_location: data
              })
            }
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AgentBasicInfoView;
