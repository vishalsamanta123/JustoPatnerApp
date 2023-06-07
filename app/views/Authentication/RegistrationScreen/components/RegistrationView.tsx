import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import Header from "../../../../components/Header";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import {
  BLACK_COLOR,
  DATE_FORMAT,
  GRAY_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  validateEmail,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import InputField from "../../../../components/InputField";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import { normalizeHeight, normalizeSpacing, normalizeWidth } from "app/components/scaleFontSize";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import InputCalender from "app/components/InputCalender";
import moment from "moment";
import MultiLocation from "app/components/MultiLocation";

const RegistrationView = (props: any) => {
  useEffect(() => {

  }, [])
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
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
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
                source={{ uri: `${props.registerForm?.profile_picture?.uri}` }}
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
            disableSpecialCharacters={true}
            placeholderText={strings.ownerName}
            require={true}
            handleInputBtnPress={() => { }}
            headingText={strings.ownerName}
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
            require={true}
            placeholderText={"Ex:- 3675 9834 6012"}
            handleInputBtnPress={() => { }}
            headingText={strings.aadhaar}
            inputType={'aadhaar'}
            keyboardtype={"number-pad"}
            valueshow={props.registerForm?.adhar_no}
            onChangeText={(val: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                adhar_no: val,
              });
            }}
            maxLength={14}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={"BNZAA2318JM"}
            handleInputBtnPress={() => { }}
            headingText={strings.pancard + " " + strings.shortNum}
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
          {/* <Image
            source={images.star}
            style={{
              width: normalizeWidth(8),
              height: normalizeHeight(8),
              marginLeft: normalizeSpacing(5),
              marginBottom: normalizeSpacing(5),
            }}
          /> */}
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
            // require={true}
            leftIcon={images.event}
            mode={"date"}
            placeholderText={strings.dateOfBirth}
            headingText={strings.dateOfBirth}
            editable={false}
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
            disableSpecialCharacters={true}
            require={true}
            placeholderText={strings.mobileNo}
            handleInputBtnPress={() => { }}
            headingText={strings.mobileNo}
            keyboardtype={"number-pad"}
            rightImageVw={styles.tickImgVw}
            rightImageSty={styles.tickImg}
            valueshow={props.registerForm?.primary_mobile}
            rightImgSrc={props?.emailMobvalidation?.primary_mobile === 'mobile' ? images.check : null}
            onFocus={() => {
              if (props.registerForm?.primary_mobile !== props.registerForm?.primary_mobile) {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  primary_mobile: null,
                })
              }
            }}
            onChangeText={(val: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                primary_mobile: val,
              });
              if (val?.length === 10) {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  primary_mobile: 'mobileStart',
                })
              } else {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  primary_mobile: null,
                })
              }
            }}
            maxLength={10}
            onBlur={(val: any) => {
              if (props.registerForm?.primary_mobile?.length === 10) {
                props.handleCheckEmailMobile(1);
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  primary_mobile: null,
                })
              }
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            disableSpecialCharacters={true}
            // require={true}
            placeholderText={strings.whatsappNo}
            handleInputBtnPress={() => { }}
            headingText={strings.whatsappNo}
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
            require={true}
            placeholderText={strings.email + " " + strings.address}
            handleInputBtnPress={() => { }}
            headingText={strings.email + " " + strings.address}
            valueshow={props.registerForm?.email}
            onChangeText={(val: any) => {
              props.setRegisterForm({
                ...props.registerForm,
                email: val,
              });
              if (validateEmail.test(val)) {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  email: 'emailStart',
                })
              } else {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  email: null,
                })
              }
            }}
            onFocus={() => {
              if (props.registerForm?.email !== props.registerForm?.email) {
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  email: null,
                })
              }
            }}
            rightImgSrc={props?.emailMobvalidation?.email === 'email' ? images.check : null}
            rightImageVw={styles.tickImgVw}
            rightImageSty={styles.tickImg}
            onBlur={(val: any) => {
              if (validateEmail.test(props.registerForm.email)) {
                props.handleCheckEmailMobile();
                props.setEmailMobValidation({
                  ...props.emailMobvalidation,
                  email: null,
                })
              }
            }}
          />
        </View>
        <View style={{ marginTop: normalizeSpacing(30) }}>
          <InputField
            require={true}
            placeholderText={strings.address}
            headingText={strings.address}
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
              flexDirection: 'row', alignItems: "center"
            }}
          >
            <Text style={styles.workTxt}>{strings.workingLocation}</Text>
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
          <TouchableOpacity
            onPress={() => props.setLocationModel(true)}
            style={styles.addBtn}
          >
            <Text style={styles.addTxt}>+ {strings.addLocation}</Text>
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
