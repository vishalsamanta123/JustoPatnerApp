import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Linking,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import {
  PRIMARY_THEME_COLOR,
  BLACK_COLOR,
  GRAY_LIGHT_COLOR,
  DATE_FORMAT,
  AMOUNT_TYPE,
  Isios,
  Regexs,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";
import Styles from "../../../../components/Modals/styles";
import Header from "../../../../components/Header";
import Button from "../../../../components/Button";
import moment from "moment";
import InputCalender from "app/components/InputCalender";
import DropdownInput from "app/components/DropDown";
import { useSelector } from "react-redux";
import usePermission from "app/components/utilities/UserPermissions";
import CheckBox from "@react-native-community/checkbox";
import VisitConfirmModal from "./VisitConfirmModal";

const AddNewVisitorForm = (props: any) => {
  const [PropertyStatus, setPropertyStatus] = useState(false);
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.visitorData
  );
  const userData = useSelector((state: any) => state.userData)
  const userId = userData?.response?.data ? userData?.response?.data : {}

  useEffect(() => {
    if (props.type == "edit") {
      if (response?.status === 200) {
        props.setFormData({
          ...response?.data[0]?.customer_detail,
          expected_possession_date: response?.data[0]?.expected_possession_date,
          lead_id: response?.data[0]?._id,
          property_id: response?.data[0]?.property_id,
          property_title: response?.data[0]?.property_title,
          property_type_title: response?.data[0]?.property_type_title,
          locality: response?.data[0]?.customer_detail?.locality
            ? response?.data[0]?.customer_detail?.locality
            : "",
          configuration_id: response?.data[0]?.configuration_id,
          configuration: response?.data[0]?.configuration,
          areain_sqlft: response?.data[0]?.areain_sqlft,
          min_budget: response?.data[0]?.min_budget,
          min_budget_type: response?.data[0]?.min_budget_type,
          max_budget: response?.data[0]?.max_budget,
          max_budget_type: response?.data[0]?.max_budget_type,
          funding_type: response?.data[0]?.funding_type,
          funding_emi_type: response?.data[0]?.funding_emi_type,
          purpose: response?.data[0]?.purpose,
          min_emi_budget: response?.data[0]?.min_emi_budget,
          min_emi_budget_type: response?.data[0]?.min_emi_budget_type,
          max_emi_budget: response?.data[0]?.max_emi_budget,
          max_emi_budget_type: response?.data[0]?.max_emi_budget_type,
          create_by: response?.data[0]?.create_by,
        });
      }
      if (
        response?.data[0]?.property_id !== "" &&
        response?.data[0]?.property_id !== null
      ) {
        setPropertyStatus(true);
      } else {
        setPropertyStatus(false);
      }
    } else {
      if (props.type === "propertySelect") {
        props.setFormData({
          ...props.formData,
          property_id: props?.data?._id,
          property_type_title: props?.data?.property_type_title,
          property_title: props?.data?.property_title,
        });
      }
      setPropertyStatus(true);
    }
    if (props.type === "add") {
      setPropertyStatus(false);
    }
    // if (props?.formData?.property_id !== "" && props?.formData?.property_id !== null) {
    // } else {
    // }
  }, [response]);
  const { edit, create, status } = usePermission({
    edit: "edit_visitor",
    create: "add_visitor",
    status: "add_appointment",
  });
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={
          props.type == "edit" ? strings.editVisitor : strings.addnewvisitor
        }
        headerStyle={styles.headerStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
      />
      <ScrollView keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
      >
        <View style={styles.wrap}>
          <Text style={styles.headingText}>{strings.visitordetails}</Text>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              require={true}
              placeholderText={strings.visitor + " " + strings.name}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  first_name: data,
                });
              }}
              valueshow={props?.formData?.first_name}
              headingText={strings.visitor + " " + strings.name}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              require={true}
              placeholderText={strings.mobileNo}
              headingText={strings.mobileNo}
              handleInputBtnPress={() => { }}
              editable={props.type === 'edit' ?
                props?.formData?.create_by === userId._id ? true : false : true}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  mobile: data,
                })
                if (props.type === "add" || props.type === "propertySelect") {
                  if (Regexs.mobilenumRegex.test(data)) {
                    props.setEmailMobValidation({
                      ...props.emailMobvalidation,
                      mobile: '',
                    })
                  }
                } else {
                  props.setEmailMobValidation({
                    ...props.emailMobvalidation,
                    mobile: null,
                  })
                }
              }}
              valueshow={
                props.type === 'edit' ?
                  props?.formData?.create_by === userId._id ? props?.formData?.mobile : `${props?.formData?.mobile?.slice(0, 2)}******${props?.formData?.mobile?.slice(-2)}` :
                  props?.formData?.mobile}
              keyboardtype={"number-pad"}
              maxLength={10}
              rightImageVw={styles.tickImgVw}
              rightImageSty={styles.tickImg}
              rightImgSrc={props?.emailMobvalidation?.mobile === 'mobile' ? images.check : null}
              onFocus={() => {
                if (props.type == "edit") {
                } else {
                  if (props?.formData?.mobile !== props?.formData?.mobile) {
                    props.setEmailMobValidation({
                      ...props.emailMobvalidation,
                      mobile: null,
                    })
                  }
                }
              }}
              onBlur={(val: any) => {
                if (props.type == "edit") {
                  { }
                } else {
                  if (Regexs.mobilenumRegex.test(props?.formData?.mobile)) {
                    props.handleCheckEmailMobile(1);
                  }
                }
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Ex:- 3675 9834 6012"}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  adhar_no: data,
                });
              }}
              valueshow={props?.formData?.adhar_no?.toString()}
              headingText={strings.aadhaar}
              inputType={"aadhaar"}
              maxLength={14}
              keyboardtype={"number-pad"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={"BNZAA2318JM"}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  pancard_no: data,
                });
              }}
              maxLength={10}
              valueshow={props?.formData?.pancard_no}
              headingText={strings.pancard + " " + strings.shortNum}
            />
          </View>
          <View style={styles.genderView}>
            <Text style={styles.genderTxt}>{strings.gender}</Text>
            <View style={styles.radioView}>
              <RadioButton.Android
                value="1"
                status={props?.formData?.gender === 1 ? "checked" : "unchecked"}
                onPress={() =>
                  props.setFormData({
                    ...props.formData,
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
                      props?.formData?.gender === 1
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
                value="2"
                status={props?.formData?.gender === 2 ? "checked" : "unchecked"}
                onPress={() =>
                  props.setFormData({
                    ...props.formData,
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
                      props?.formData?.gender === 2
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
              mode={"date"}
              leftIcon={images.event}
              placeholderText={strings.dateOfBirth}
              headingText={strings.dateOfBirth}
              editable={false}
              dateData={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  birth_date: moment(data).format(DATE_FORMAT),
                });
              }}
              setDateshow={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  birth_date: moment(data).format(DATE_FORMAT),
                });
              }}
              value={
                props?.formData?.birth_date === "" ||
                  props?.formData?.birth_date === undefined ||
                  props?.formData?.birth_date === null
                  ? ""
                  : moment(props?.formData?.birth_date).format(DATE_FORMAT)
              }
            />
          </View>

          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={strings.whatsappNo}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  whatsapp_no: data,
                });
              }}
              valueshow={props?.formData?.whatsapp_no}
              headingText={strings.whatsappNo}
              keyboardtype={"number-pad"}
              maxLength={10}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={strings.email + " " + strings.address}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  email: data,
                });
              }}
              valueshow={props?.formData?.email}
              headingText={strings.email + " " + strings.address}
            />
          </View>
          <View style={[styles.inputWrap, { width: "100%" }]}>
            <InputField
              placeholderText={strings.location}
              valueshow={props?.formData?.location}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  location: data,
                });
              }}
              headingText={strings.location}
              inputType={"location"}
              onPressSelect={(data: any, detail: any) => {
                props.setFormData({
                  ...props.formData,
                  location: data?.description,
                });
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={strings.locality}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  locality: data,
                });
              }}
              valueshow={props?.formData?.locality}
              headingText={strings.locality}
            />
          </View>
          <View style={[styles.inputWrap]}>
            <DropdownInput
              headingText={strings.maritalStatus}
              placeholder={
                props.formData?.marital_status
                  ? props.formData?.marital_status
                  : strings.maritalStatus
              }
              data={[
                { label: strings.Married, value: 2 },
                { label: strings.Unmarried, value: 1 },
              ]}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              labelField={"label"}
              valueField={"value"}
              value={props?.formData?.marital_status}
              onChange={(item: any) => {
                props.setFormData({
                  ...props.formData,
                  marital_status: item.value,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <View style={Styles.item}>
                    <Text style={Styles.textItem}>{item.label}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View
            style={[
              styles.inputWrap,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              },
            ]}
          >
            <Text
              style={[
                styles.headingsTxt,
                { width: "40%", textAlign: "center" },
              ]}
            >
              {strings.noOfFamilyMembr}
            </Text>
            <TextInput
              value={props?.formData?.no_of_family_member?.toString()}
              maxLength={2}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  no_of_family_member: data,
                });
              }}
              keyboardType={"number-pad"}
              placeholder={strings.noOfFamilyMembr}
              style={styles.budgetInput}
            />
          </View>

          <View style={[styles.inputWrap]}>
            <DropdownInput
              headingText={strings.currentStay}
              placeholder={
                props.formData?.current_stay
                  ? props.formData?.current_stay
                  : strings.currentStay
              }
              data={[
                { label: strings.Rented, value: strings.Rented },
                { label: strings.Owned, value: strings.Owned },
              ]}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              labelField={"label"}
              valueField={"value"}
              value={props?.formData?.current_stay}
              onChange={(item: any) => {
                props.setFormData({
                  ...props.formData,
                  current_stay: item.value,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <View style={Styles.item}>
                    <Text style={Styles.textItem}>{item.label}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={[styles.inputWrap]}>
            <DropdownInput
              headingText={strings.propertyType}
              placeholder={
                props.formData?.property_type
                  ? props.formData?.property_type
                  : strings.propertyType
              }
              data={[
                { label: strings.MoveIn, value: strings.MoveIn },
                {
                  label: strings.Underonstruction,
                  value: strings.Underonstruction,
                },
              ]}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              labelField={"label"}
              valueField={"value"}
              value={props?.formData?.property_type}
              onChange={(item: any) => {
                props.setFormData({
                  ...props.formData,
                  property_type: item.value,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <View style={Styles.item}>
                    <Text style={Styles.textItem}>{item.label}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.radioBtnView}>
            <Text style={styles.headingsTxt}>{strings.preferredBank}</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value={strings.yes}
                  status={
                    props?.formData?.preferred_bank === strings.yes
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      preferred_bank: strings.yes,
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.preferred_bank === strings.yes
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.yes}
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value={strings.no}
                  status={
                    props?.formData?.preferred_bank === strings.no
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      preferred_bank: strings.no,
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.preferred_bank === strings.no
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.no}
                </Text>
              </View>
            </View>
          </View>
          <Text style={[styles.headingText, { marginTop: 20 }]}>
            {strings.propertyrequire}
          </Text>
          <View style={[styles.inputWrap]}>
            <DropdownInput
              // require={true}
              headingText={strings.propertyHeader}
              placeholder={
                props?.formData?.property_title
                  ? props?.formData?.property_title
                  : strings.propertyHeader
              }
              data={props?.allProperty}
              // disable={props?.formData?.property_id !== "" && props?.formData?.property_id !== null ? true : false}
              disable={PropertyStatus}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              labelField="property_title"
              valueField={"_id"}
              value={props?.formData?.property_id}
              onChange={(item: any) => {
                props.setFormData({
                  ...props.formData,
                  property_id: item.property_id,
                  property_type_title: item.property_type,
                  property_title: item.property_title,
                  pickup: item.pickup,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <>
                    <View style={Styles.item}>
                      <Text style={Styles.textItem}>{item.property_title}</Text>
                    </View>
                  </>
                );
              }}
            />
          </View>
          <View style={[styles.inputWrap]}>
            <DropdownInput
              headingText={strings.configurations}
              placeholder={
                props.formData?.configuration
                  ? props.formData?.configuration
                  : strings.configurations
              }
              data={props?.masterDatas}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              labelField={"title"}
              valueField={"_id"}
              value={props?.formData?.configuration_id}
              onChange={(item: any) => {
                props.setFormData({
                  ...props.formData,
                  configuration_id: item._id,
                  configuration: item.title,
                });
              }}
              newRenderItem={(item: any) => {
                return (
                  <>
                    <View style={Styles.item}>
                      <Text style={Styles.textItem}>{item.title}</Text>
                    </View>
                  </>
                );
              }}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputCalender
              mode={"date"}
              leftIcon={images.event}
              placeholderText={strings.expectdPossessionDate}
              headingText={strings.expectdPossessionDate}
              editable={false}
              minimumDate={new Date()}
              dateData={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  expected_possession_date: moment(data).format(DATE_FORMAT),
                });
              }}
              setDateshow={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  expected_possession_date: moment(data).format(DATE_FORMAT),
                });
              }}
              value={
                props?.formData?.expected_possession_date === "" ||
                  props?.formData?.expected_possession_date === undefined ||
                  props?.formData?.expected_possession_date === null
                  ? ""
                  : moment(props?.formData?.expected_possession_date).format(
                    DATE_FORMAT
                  )
              }
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={strings.areaSqft}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  areain_sqlft: data,
                });
              }}
              valueshow={props?.formData?.areain_sqlft}
              headingText={strings.areaSqft}
              keyboardtype={"number-pad"}
            // keyboardtype={'phone-pad'}
            />
          </View>

          <View style={styles.smallCont}>
            <Text style={[styles.headingsTxt, { width: "58%" }]}>
              {strings.minBudget}
            </Text>
            <Text style={[styles.headingsTxt, { width: "40%" }]}>
              {strings.maxBudget}
            </Text>
          </View>
          <View style={styles.inputContVw}>
            <View style={styles.smallContVw}>
              <TextInput
                value={props?.formData?.min_budget?.toString()}
                maxLength={4}
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    min_budget: data,
                  });
                }}
                keyboardType={"number-pad"}
                placeholder={strings.minBudget}
                style={styles.budgetInput}
              />
              <DropdownInput
                inputWidth={Isios ? 45 : 49}
                inputheight={Isios ? 20 : 38}
                paddingLeft={10}
                itemContainerStyle={{ width: 100 }}
                iconStyle={{ width: 15, height: 15 }}
                data={AMOUNT_TYPE}
                itemTextStyle={{ fontSize: 8 }}
                labelField="value"
                valueField={"value"}
                placeholder={props?.formData?.min_budget_type}
                value={props?.formData?.min_budget_type}
                onChange={(item: any) => {
                  props.setFormData({
                    ...props.formData,
                    min_budget_type: item.value,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.value}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
            <View style={[styles.smallContVw, { justifyContent: "flex-end" }]}>
              <TextInput
                value={props?.formData?.max_budget}
                maxLength={4}
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    max_budget: data,
                  });
                }}
                keyboardType={"number-pad"}
                placeholder={strings.maxBudget}
                style={styles.budgetInput}
              />
              <DropdownInput
                inputWidth={Isios ? 45 : 49}
                inputheight={Isios ? 20 : 38}
                paddingLeft={10}
                itemContainerStyle={{ width: 100 }}
                iconStyle={{ width: 15, height: 15 }}
                data={AMOUNT_TYPE}
                itemTextStyle={{ fontSize: 8 }}
                labelField="value"
                valueField={"value"}
                placeholder={props?.formData?.max_budget_type}
                value={props?.formData?.max_budget_type}
                onChange={(item: any) => {
                  props.setFormData({
                    ...props.formData,
                    max_budget_type: item.value,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.value}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.radioBtnView}>
            <Text style={styles.headingsTxt}>{strings.natureOfFunding}</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="loan"
                  status={
                    props?.formData?.funding_type === "loan"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      funding_type: "loan",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.funding_type === "loan"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.loan}
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="self"
                  status={
                    props?.formData?.funding_type === "self"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      funding_type: "self",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.funding_type === "self"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.selfFunding}
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="both"
                  status={
                    props?.formData?.funding_type === "both"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      funding_type: "both",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.funding_type === "both"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.both}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.smallCont}>
            <Text style={[styles.headingsTxt, { width: "58%" }]}>
              {strings.minEmiPay}
            </Text>
            <Text style={[styles.headingsTxt, { width: "40%" }]}>
              {strings.maxEmiPay}
            </Text>
          </View>
          <View style={styles.inputContVw}>
            <View style={styles.smallContVw}>
              <TextInput
                value={props?.formData?.min_emi_budget?.toString()}
                maxLength={4}
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    min_emi_budget: data,
                  });
                }}
                keyboardType={"number-pad"}
                placeholder={strings.minEmiPay}
                style={styles.budgetInput}
              />
              <DropdownInput
                inputWidth={Isios ? 45 : 49}
                inputheight={Isios ? 20 : 38}
                paddingLeft={10}
                itemContainerStyle={{ width: 100 }}
                iconStyle={{ width: 15, height: 15 }}
                data={AMOUNT_TYPE}
                itemTextStyle={{ fontSize: 8 }}
                labelField="value"
                valueField={"value"}
                placeholder={props?.formData?.min_emi_budget_type}
                value={props?.formData?.min_emi_budget_type}
                onChange={(item: any) => {
                  props.setFormData({
                    ...props.formData,
                    min_emi_budget_type: item.value,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.value}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
            <View style={[styles.smallContVw, { justifyContent: "flex-end" }]}>
              <TextInput
                value={props?.formData?.max_emi_budget}
                maxLength={4}
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    max_emi_budget: data,
                  });
                }}
                keyboardType={"number-pad"}
                placeholder={strings.maxEmiPay}
                style={styles.budgetInput}
              />
              <DropdownInput
                inputWidth={Isios ? 45 : 49}
                inputheight={Isios ? 20 : 38}
                paddingLeft={10}
                itemContainerStyle={{ width: 100 }}
                iconStyle={{ width: 15, height: 15 }}
                data={AMOUNT_TYPE}
                itemTextStyle={{ fontSize: 8 }}
                labelField="value"
                valueField={"value"}
                placeholder={props?.formData?.max_emi_budget_type}
                value={props?.formData?.max_emi_budget_type}
                onChange={(item: any) => {
                  props.setFormData({
                    ...props.formData,
                    max_emi_budget_type: item.value,
                  });
                }}
                newRenderItem={(item: any) => {
                  return (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item.value}</Text>
                      </View>
                    </>
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.radioBtnView}>
            <Text style={styles.headingsTxt}>{strings.purpose}</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="end user"
                  status={
                    props?.formData?.purpose === "end user"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      purpose: "end user",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.purpose === "end user"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.endUser}
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="invest"
                  status={
                    props?.formData?.purpose === "invest"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      purpose: "invest",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.purpose === "invest"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.investMent}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.headingText}>{strings.companyDetails}</Text>
          <View style={styles.radioBtnView}>
            <Text style={styles.headingsTxt}>{strings.occupation}</Text>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="salaried"
                  status={
                    props?.formData?.occupation === "salaried"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      occupation: "salaried",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.occupation === "salaried"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.salaried}
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="self employee"
                  status={
                    props?.formData?.occupation === "self employee"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      occupation: "self employee",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.occupation === "self employee"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.selfEmployed}
                </Text>
              </View>
              <View style={styles.radioView}>
                <RadioButton.Android
                  value="professional"
                  status={
                    props?.formData?.occupation === "professional"
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() =>
                    props.setFormData({
                      ...props.formData,
                      occupation: "professional",
                    })
                  }
                  color={PRIMARY_THEME_COLOR}
                />
                <Text
                  style={[
                    styles.radioTxt,
                    {
                      color:
                        props?.formData?.occupation === "professional"
                          ? PRIMARY_THEME_COLOR
                          : BLACK_COLOR,
                    },
                  ]}
                >
                  {strings.professional}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={strings.company + " " + strings.name}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  coumpany_name: data,
                });
              }}
              valueshow={props?.formData?.coumpany_name}
              headingText={strings.company + " " + strings.name}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={strings.designation}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  desigantion: data,
                });
              }}
              valueshow={props?.formData?.desigantion}
              headingText={strings.designation}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              disableSpecialCharacters={true}
              placeholderText={strings.offcAddress}
              handleInputBtnPress={() => { }}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  office_address: data,
                });
              }}
              valueshow={props?.formData?.office_address}
              headingText={strings.offcAddress}
            />
          </View>
          <View style={styles.bottomView}>
            <CheckBox
              value={true}
              disabled={true}
              tintColors={{ true: PRIMARY_THEME_COLOR }}
              style={{ transform: Isios ? [{ scaleX: 0.8 }, { scaleY: 0.8 }] : [{ scaleX: 1 }, { scaleY: 1 }] }}
            // onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text style={styles.bottomText}>{strings.iAknowledge}</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://justoverse.com/termandcondition')} style={styles.spanTouch}>
              <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
            </TouchableOpacity>
            <Text style={styles.bottomText}> {strings.applicable} </Text>
            {/* <TouchableOpacity style={styles.spanTouch}>
              <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.btnView}>
            {edit && props.type == "edit" ? (
              <Button
                width={150}
                height={45}
                buttonText={strings.editVisitor}
                btnTxtsize={16}
                handleBtnPress={() => {
                  Isios && Keyboard.dismiss()
                  props.setNavigationType(1);
                  props.OnpressCreateEdit();
                }}
              />
            ) : (
              <>
                {create && (
                  <Button
                    width={150}
                    handleBtnPress={() => {
                      Isios && Keyboard.dismiss()
                      props.setNavigationType(1);
                      props.OnpressCreateEdit();
                    }}
                    height={45}
                    buttonText={strings.createVisitor}
                    btnTxtsize={16}
                  />
                )}
                {create && status ? (
                  <Button
                    width={150}
                    handleBtnPress={() => {
                      Isios && Keyboard.dismiss()
                      props.setNavigationType(2);
                      props.OnpressseheduleVisit();
                    }}
                    height={45}
                    buttonText={strings.createandschedule}
                    btnTxtsize={14}
                  />
                ) : null}
              </>
            )}
          </View>
        </View>
        <VisitConfirmModal
          Visible={props.visitCheckModal}
          setIsVisible={props.setVisitCheckModal}
          setFormData={props?.setFormData}
          formData={props?.formData}
        />
      </ScrollView>
    </View>
  );
};

export default AddNewVisitorForm;
