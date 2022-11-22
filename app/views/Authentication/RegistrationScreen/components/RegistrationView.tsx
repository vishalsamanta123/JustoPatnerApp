import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputField from "../../../../components/InputField";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import { normalizeSpacing } from "app/components/scaleFontSize";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import InputCalender from "app/components/InputCalender";
import moment from "moment";

const RegistrationView = (props: any) => {
  const insets = useSafeAreaInsets();
  const [gender, setGender] = useState("Male");
  const [profile, setProfile] = useState(false);
  const [profileData, setProfileData] = useState('');
  const [checked, setChecked] = React.useState("first");

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={"light-content"} backgroundColor={PRIMARY_THEME_COLOR} />
      <Header
        headerText={strings.basicInfoText}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={props.onPressBack}
        leftImageIconStyle={{ tintColor: WHITE_COLOR }}
      />
      <ScrollView contentContainerStyle={styles.wrap}>
        {/*  <Text style={styles.headingText}>{strings.basicInfoText}</Text> */}
        {/* <View style={styles.underlineStyle} /> */}
        {!profileData ?
          <TouchableOpacity
            onPress={() => setProfile(true)}
            style={[styles.imageCircle, { backgroundColor: GRAY_COLOR }]}
          >
            <Image
              style={styles.DummyloginBanner}
              source={images.user}
              resizeMode="contain"
            />
            <View style={styles.editView}>
              <Image
                style={styles.editImage}
                source={images.edit}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          :
          <View style={styles.imageCircle}>
            <Image
              style={styles.loginBanner}
              source={images.dummyUser}
              resizeMode="contain"
            />
          </View>
        }
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Name"}
            handleInputBtnPress={() => { }}
            headingText={"Owner Name"}
            onChangeText={(val: any) => {
              props.setResgistrationData({
                ...props.resgistrationData, owner_name: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Adhar No."}
            handleInputBtnPress={() => { }}
            headingText={"Adhar No."}
            keyboardtype={'number-pad'}
            onChangeText={(val: any) => {
              props.setResgistrationData({
                ...props.resgistrationData, adhar_no: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Pancard No."}
            handleInputBtnPress={() => { }}
            headingText={"Pancard No."}
            keyboardtype={'number-pad'}
            onChangeText={(val: any) => {
              props.setResgistrationData({
                ...props.resgistrationData, pancard_no: val
              })
            }}
          />
        </View>
        <View style={styles.genderView}>
          <Text style={styles.genderTxt}>{strings.gender}</Text>
          <View style={styles.radioView}>
            <RadioButton
              value="first"
              status={props.resgistrationData.gender === "male" ? "checked" : "unchecked"}
              onPress={() => {
                props.setResgistrationData({
                  ...props.resgistrationData, gender: 'male'
                })
              }}
              color={PRIMARY_THEME_COLOR}
            />
            <Text
              style={[
                styles.radioTxt,
                {
                  color:
                    props.resgistrationData.gender === "male" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                },
              ]}
            >
              {strings.male}
            </Text>
          </View>
          <View style={styles.radioView}>
            <RadioButton
              value="second"
              status={props.resgistrationData.gender === "female" ? "checked" : "unchecked"}
              onPress={() => {
                props.setResgistrationData({
                  ...props.resgistrationData, gender: 'female'
                })
              }}
              color={PRIMARY_THEME_COLOR}
            />
            <Text
              style={[
                styles.radioTxt,
                {
                  color:
                    props.resgistrationData.gender === "female" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
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
            onChangeText={(val: any) => {
              props.setResgistrationData({
                ...props.resgistrationData, date_of_birth: val
              })
            }}
          /> */}
          <InputCalender
            placeholderText={"Date of Birth"}//can edit
            editable={false}
            // onChangeText={() => { }}
            dateData={(data: any) => {
              props.setResgistrationData({
                ...props.resgistrationData,
                date_of_birth: moment(data).format()
              })
            }}
            setDateshow={(data: any) => {
              props.setResgistrationData({
                ...props.resgistrationData,
                date_of_birth: moment(data).format()
              })
            }}
            value={moment(props?.resgistrationData?.date_of_birth).format('DD / MM / YY')}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Mobile No."}
            handleInputBtnPress={() => { }}
            headingText={"Mobile No."}
            keyboardtype={'number-pad'}
            onChangeText={(val: any) => {
              props.setResgistrationData({
                ...props.resgistrationData, primary_mobile: val
              })
            }}
            onBlur={(val: any) => {
              props.handleCheckEmailMobile(1)
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"WhatsApp No."}
            handleInputBtnPress={() => { }}
            headingText={"WhatsApp No."}
            keyboardtype={'number-pad'}
            onChangeText={(val: any) => {
              props.setResgistrationData({
                ...props.resgistrationData, whatsapp_number: val
              })
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Email Address"}
            handleInputBtnPress={() => { }}
            headingText={"Email Address"}
            onChangeText={(val: any) => {
              props.setResgistrationData({
                ...props.resgistrationData, email: val
              })
            }}
            onBlur={(val: any) => {
              props.handleCheckEmailMobile()
            }}
          />
        </View>
        <View style={styles.workingView}>
          <View>
            <Text style={styles.workTxt}>Working Location</Text>
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addTxt}>+ Add location</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: normalizeSpacing(20) }}>
          <Button handleBtnPress={props.onPressNext} rightImage={images.forwardArrow} buttonText={strings.next} textTransform={"uppercase"} />
        </View>
        <PicturePickerModal
          Visible={profile}
          setVisible={setProfile}
          imageData={(data: any) => {
            props.setResgistrationData({
              ...props.resgistrationData, profile_picture: data
            })
          }}
        />
      </ScrollView>
    </View>
  );
};

export default RegistrationView;
