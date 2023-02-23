import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import {
  BLACK_COLOR,
  PRIMARY_THEME_COLOR,
} from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputField from "../../../../components/InputField";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import moment from "moment";
import { useSelector } from "react-redux";
import InputCalender from "app/components/InputCalender";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import { normalizeSpacing } from "app/components/scaleFontSize";

const EditProfileView = (props: any) => {
  const insets = useSafeAreaInsets();
  const [profileVisible, setProfileVisible] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.editProfile}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.onPressBack}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.wrap}>
          {/*  <Text style={styles.headingText}>{strings.basicInfoText}</Text> */}
          {/* <View style={styles.nderlineStyle} /> */}
          <TouchableOpacity
            style={styles.imageCircle}
            onPress={() => setProfileVisible(true)}
          >
            {props?.editData?.profile_picture || props?.editData?.local_profile_picture?.uri ?
              <Image
                style={styles.userImage}
                source={{
                  uri: props.editData?.local_profile_picture?.uri
                    ? props.editData?.local_profile_picture?.uri
                    : props.editData?.profile_base_url + props.editData?.profile_picture,
                }}
              />
              :
              <Image
                style={styles.userImage}
                source={images.dummyUser}
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
              valueshow={props.editData?.agent_name}
              handleInputBtnPress={() => { }}
              onChangeText={(e: any) => {
                props.setEditData({
                  ...props.editData,
                  agent_name: e,
                });
              }}
              headingText={"Agent Name"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              valueshow={props.editData?.adhar_no}
              keyboardtype={'number-pad'}
              handleInputBtnPress={() => { }}
              onChangeText={(e: any) => {
                props.setEditData({
                  ...props.editData,
                  adhar_no: e,
                });
              }}
              inputType={'aadhaar'}
              headingText={"Aadhaar No."}
              maxLength={14}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              valueshow={props.editData?.pancard_no}
              handleInputBtnPress={() => { }}
              onChangeText={(e: any) => {
                props.setEditData({
                  ...props.editData,
                  pancard_no: e,
                });
              }}
              headingText={"Pancard No."}
            />
          </View>
          <View style={styles.genderView}>
            <Text style={styles.genderTxt}>{strings.gender}</Text>
            <View style={styles.radioView}>
              <RadioButton.Android
                value={props.editData?.gender}
                status={props.editData?.gender === 1 ? "checked" : "unchecked"}
                onPress={() =>
                  props.setEditData({
                    ...props.editData,
                    gender: 1,
                  })
                }
                color={PRIMARY_THEME_COLOR}
              />
              <Text
                style={[
                  styles.radioTxt,
                  {
                    color:
                      props.editData?.gender === 1 ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                  },
                ]}
              >
                {strings.male}
              </Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton.Android
                value={props.editData?.gender}
                status={props.editData?.gender === 2 ? "checked" : "unchecked"}
                onPress={() =>
                  props.setEditData({
                    ...props.editData,
                    gender: 2,
                  })
                }
                color={PRIMARY_THEME_COLOR}
              />
              <Text
                style={[
                  styles.radioTxt,
                  {
                    color:
                      props.editData?.gender === 2 ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                  },
                ]}
              >
                {strings.female}
              </Text>
            </View>
          </View>
          <View style={[styles.inputWrap, { marginTop: normalizeSpacing(10) }]}>
            <InputCalender
              mode={"date"}
              leftIcon={images.event}
              placeholderText={"Date of Birth"} //can edit
              headingText={"Date of Birth"}
              editable={false}
              dateData={(data: any) => {
                props.setEditData({
                  ...props.editData,
                  date_of_birth: data,
                });
              }}
              setDateshow={(data: any) => {
                props.setEditData({
                  ...props.editData,
                  date_of_birth: data,
                });
              }}
              value={moment(props.editData?.date_of_birth).format("DD/MM/YYYY")}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              valueshow={props.editData?.primary_mobile?.toString()}
              handleInputBtnPress={() => { }}
              onChangeText={(e: any) => {
                props.setEditData({
                  ...props.editData,
                  primary_mobile: e,
                });
              }}
              headingText={"Mobile No."}
              editable={false}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              valueshow={props.editData?.whatsapp_number?.toString()}
              handleInputBtnPress={() => { }}
              onChangeText={(e: any) => {
                props.setEditData({
                  ...props.editData,
                  whatsapp_number: e,
                });
              }}
              headingText={"WhatsApp No."}
              keyboardtype={'number-pad'}
              maxLength={10}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              valueshow={props.editData?.email}
              handleInputBtnPress={() => { }}
              onChangeText={(e: any) => {
                props.setEditData({
                  ...props.editData,
                  email: e,
                });
              }}
              editable={false}
              headingText={"Email Address"}
            />
          </View>
          <View style={{ marginTop: normalizeSpacing(30) }}>
            <InputField
              placeholderText={"Address"}
              headingText={"Address"}
              onChangeText={(data: any) => {
                props.setEditData({
                  ...props.editData,
                  location: data
                })
              }}
              valueshow={props?.editData?.location}
              inputType={'location'}
              onPressSelect={(data: any, detail: any) => {
                props.setEditData({
                  ...props.editData,
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
              onChangeText={(e: any) => {
                props.setEditData({
                  ...props.editData,
                  adhar_no: e
                })
              }}
              headingText={"Sourcing Manager"}
            />
          </View> */}
          <View style={{ marginTop: 10 }}>
            <Button
              handleBtnPress={() => props.handleNextPress()}
              width={300}
              btnTxtsize={15}
              buttonText={strings.next}
              textTransform={"uppercase"}
            />
          </View>
          <PicturePickerModal
            Visible={profileVisible}
            setVisible={setProfileVisible}
            imageData={(data: any) => {
              props.setEditData({
                ...props.editData,
                profile_picture: data,
                local_profile_picture: data,
              });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileView;
