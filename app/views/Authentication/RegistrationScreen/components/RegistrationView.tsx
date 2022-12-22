import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import {
  BLACK_COLOR,
  DATE_FORMAT,
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
import MultiLocation from "app/components/MultiLocation";

const RegistrationView = (props: any) => {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState(false);

  const handleDelete = (item: any, index: any) => {
    var array: any[] = [...props?.registerForm.working_location];
    array?.splice(index, 1);
    props?.setRegisterForm({
      ...props?.registerForm,
      working_location: array,
    });
  };
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR,
          height: insets.top,
        }}
      />
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={PRIMARY_THEME_COLOR}
      />
      <Header
        headerText={strings.basicInfoText}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        handleOnLeftIconPress={props.onPressBack}
        leftImageIconStyle={{ tintColor: WHITE_COLOR }}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={styles.wrap}
      >
        {/*  <Text style={styles.headingText}>{strings.basicInfoText}</Text> */}
        {/* <View style={styles.underlineStyle} /> */}

        <TouchableOpacity
          onPress={() => setProfile(true)}
          style={[styles.imageCircle, { backgroundColor: GRAY_COLOR }]}
        >
          {!props.registerForm?.profile_picture?.uri ? (
            <Image
              style={styles.DummyloginBanner}
              source={images.user}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.imageCircle}>
              <Image
                style={styles.loginBanner}
                source={{ uri: props.registerForm?.profile_picture?.uri }}
                resizeMode="contain"
              />
            </View>
          )}
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
            placeholderText={"Name"}
            handleInputBtnPress={() => { }}
            headingText={"Owner Name"}
            valueshow={props.registerForm?.owner_name}
            onChangeText={(val: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                owner_name: val,
              });
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Aadhaar No."}
            handleInputBtnPress={() => { }}
            headingText={"Aadhaar No."}
            keyboardtype={"number-pad"}
            valueshow={props.registerForm?.adhar_no}
            onChangeText={(val: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                adhar_no: val,
              });
            }}
            maxLength={12}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Pancard No."}
            handleInputBtnPress={() => { }}
            headingText={"Pancard No."}
            valueshow={props.registerForm?.pancard_no}
            onChangeText={(val: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                pancard_no: val,
              });
            }}
            maxLength={10}
          />
        </View>
        <View style={styles.genderView}>
          <Text style={styles.genderTxt}>{strings.gender}</Text>
          <View style={styles.radioView}>
            <RadioButton.Android
              value={props.registerForm?.gender}
              status={props.registerForm.gender === 1 ? "checked" : "unchecked"}
              onPress={() => {
                props.setRegisterForm({
                  ...props.registerForm,
                  gender: 1,
                });
              }}
              color={PRIMARY_THEME_COLOR}
            />
            <Text
              style={[
                styles.radioTxt,
                {
                  color:
                    props.registerForm.gender === 1
                      ? PRIMARY_THEME_COLOR
                      : BLACK_COLOR,
                },
              ]}
            >
              {strings.male}
            </Text>
          </View>
          <View style={styles.radioView}>
            <RadioButton.Android
              value={props.registerForm?.gender}
              status={props.registerForm.gender === 2 ? "checked" : "unchecked"}
              onPress={() => {
                props.setRegisterForm({
                  ...props.registerForm,
                  gender: 2,
                });
              }}
              color={PRIMARY_THEME_COLOR}
            />
            <Text
              style={[
                styles.radioTxt,
                {
                  color:
                    props.registerForm.gender === 2
                      ? PRIMARY_THEME_COLOR
                      : BLACK_COLOR,
                },
              ]}
            >
              {strings.female}
            </Text>
          </View>
        </View>
        <View style={styles.inputWrap}>
          <InputCalender
            leftIcon={images.event}
            mode={"date"}
            placeholderText={"Date of Birth"}
            headingText={"Date of Birth"}
            editable={false}
            maximumDate={new Date()}
            dateData={(data: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                date_of_birth: moment(data).format(DATE_FORMAT),
              });
            }}
            setDateshow={(data: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                date_of_birth: moment(data).format(DATE_FORMAT),
              });
            }}
            value={props?.registerForm?.date_of_birth}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Mobile No."}
            handleInputBtnPress={() => { }}
            headingText={"Mobile No."}
            keyboardtype={"number-pad"}
            rightImageVw={styles.tickImgVw}
            rightImageSty={styles.tickImg}
            valueshow={props.registerForm?.primary_mobile}
            rightImgSrc={props?.emailMobvalidation?.primary_mobile === 'mobile' ? images.check : null}
            onFocus={() => props.setEmailMobValidation({
              ...props.emailMobvalidation,
              primary_mobile: null,
            })}
            onChangeText={(val: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                primary_mobile: val,
              });
            }}
            maxLength={10}
            onBlur={(val: any) => {
              props.handleCheckEmailMobile(1);
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"WhatsApp No."}
            handleInputBtnPress={() => { }}
            headingText={"WhatsApp No."}
            keyboardtype={"number-pad"}
            valueshow={props.registerForm?.whatsapp_number}
            onChangeText={(val: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                whatsapp_number: val,
              });
            }}
            maxLength={10}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={"Email Address"}
            handleInputBtnPress={() => { }}
            headingText={"Email Address"}
            valueshow={props.registerForm?.email}
            onChangeText={(val: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                email: val,
              });
            }}
            onFocus={() => props.setEmailMobValidation({
              ...props.emailMobvalidation,
              email: null,
            })}
            rightImgSrc={props?.emailMobvalidation?.email === 'email' ? images.check : null}
            rightImageVw={styles.tickImgVw}
            rightImageSty={styles.tickImg}
            onBlur={(val: any) => {
              props.handleCheckEmailMobile();
            }}
          />
        </View>
        <View style={{ marginTop: normalizeSpacing(30) }}>
          <InputField
            placeholderText={"Address"}
            headingText={"Address"}
            valueshow={props.registerForm?.location}
            onChangeText={(val: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                location: val,
              });
            }}
            inputType={"location"}
            onPressSelect={(data: any, detail: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                location: data?.description,
                latitude: detail?.geometry?.location?.lat,
                longitude: detail?.geometry?.location?.lng,
              });
            }}
          />
        </View>
        <View style={styles.workingView}>
          <View
            style={{
              top: props.registerForm?.working_location?.length > 0 ? 5 : 0,
            }}
          >
            <Text style={styles.workTxt}>Working Location</Text>
          </View>
          <TouchableOpacity
            onPress={() => props.setLocationModel(true)}
            style={styles.addBtn}
          >
            <Text style={styles.addTxt}>+ Add location</Text>
          </TouchableOpacity>
        </View>
        {props.registerForm?.working_location?.length > 0 ? (
          <View style={styles.inputBoxVw}>
            {props.registerForm?.working_location?.map(
              (item: any, index: any) => {
                return (
                  <View
                    style={[
                      styles.inputBoxItmVw,
                      {
                        borderBottomWidth:
                          props?.registerForm?.working_location?.length - 1 ===
                            index
                            ? 0
                            : 0.6,
                      },
                    ]}
                  >
                    <Text style={styles.inputBoxItmTxt}>{item.location}</Text>
                    <TouchableOpacity onPress={() => handleDelete(item, index)}>
                      <Image source={images.close} style={styles.crossVw} />
                    </TouchableOpacity>
                  </View>
                );
              }
            )}
          </View>
        ) : null}
        <View style={{ marginVertical: normalizeSpacing(20) }}>
          <Button
            handleBtnPress={props.onPressNext}
            rightImage={images.forwardArrow}
            buttonText={strings.next}
            textTransform={"uppercase"}
          />
        </View>
        <PicturePickerModal
          Visible={profile}
          setVisible={setProfile}
          imageData={(data: any) => {
            props.setRegisterForm({
              ...props.registerForm,
              profile_picture: data,
            });
          }}
        />
        <MultiLocation
          Visible={props.locationModel}
          setVisible={() => props.setLocationModel(false)}
          value={props.registerForm?.working_location}
          handleAddTarget={(data: any) => {
            if (data?.length > 0) {
              props.setRegisterForm({
                ...props.registerForm,
                working_location: data,
              });
            }
          }}
        />
      </ScrollView>
    </View>
  );
};

export default RegistrationView;
