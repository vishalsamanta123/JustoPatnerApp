import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
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

const AddNewVisitorForm = (props: any) => {
  const insets = useSafeAreaInsets();
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.visitorData
  );

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
        });
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
    }
  }, [response]);
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
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={styles.wrap}>
          <Text style={styles.headingText}>{strings.visitordetails}</Text>
          <View style={[styles.inputWrap]}>
            <DropdownInput
              headingText={"Property"}
              placeholder={
                props?.formData?.property_title
                  ? props?.formData?.property_title
                  : "Property"
              }
              data={props?.allProperty}
              disable={props.type == "edit" ? true : false}
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
          {/* <View style={[styles.inputWrap, { width: '100%' }]}>
                        <DropdownInput
                            headingText={'Propert Type'}
                            placeholder={props.formData?.property_type_title ?
                                props.formData?.property_type_title : 'Propert Type'}
                            inputWidth={'100%'}
                            disable={true}
                            paddingLeft={16}
                            maxHeight={300}
                            labelField="title"
                            valueField={'_id'}
                            value={props?.formData?.property_id}
                            onChange={(item: any) => {
                                props.setFormData({
                                    ...props.formData,
                                    property_id: item._id,
                                    property_type_title: item.title
                                })
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
                    </View> */}
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Visitor Name"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  first_name: data,
                });
              }}
              valueshow={props?.formData?.first_name}
              headingText={"Visitor Name"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Mobile No."}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  mobile: data,
                });
              }}
              valueshow={props?.formData?.mobile}
              headingText={"Mobile No."}
              keyboardtype={"number-pad"}
              maxLength={10}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Aadhaar No."}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  adhar_no: data,
                });
              }}
              valueshow={props?.formData?.adhar_no?.toString()}
              headingText={"Aadhaar No."}
              maxLength={12}
              keyboardtype={"number-pad"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Pancard No."}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  pancard_no: data,
                });
              }}
              maxLength={10}
              valueshow={props?.formData?.pancard_no}
              headingText={"Pancard No."}
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
              placeholderText={"Date of Birth"}
              headingText={"Date of Birth"}
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
              placeholderText={"WhatsApp No."}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  whatsapp_no: data,
                });
              }}
              valueshow={props?.formData?.whatsapp_no}
              headingText={"WhatsApp No."}
              keyboardtype={"number-pad"}
              maxLength={10}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Email Address"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  email: data,
                });
              }}
              valueshow={props?.formData?.email}
              headingText={"Email Address"}
            />
          </View>
          <View style={[styles.inputWrap, { width: "100%" }]}>
            <InputField
              placeholderText={"Location"}
              valueshow={props?.formData?.location}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  location: data,
                });
              }}
              headingText={"Location"}
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
              placeholderText={"Locality"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  locality: data,
                });
              }}
              valueshow={props?.formData?.locality}
              headingText={"Locality"}
            />
          </View>
          <Text style={[styles.headingText, { marginTop: 20 }]}>
            {strings.propertyrequire}
          </Text>
          <View style={[styles.inputWrap]}>
            <DropdownInput
              headingText={"Configuration"}
              placeholder={
                props.formData?.configuration
                  ? props.formData?.configuration
                  : "Configuration"
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
              placeholderText={"Expected Possession Date"}
              headingText={"Expected Possession Date"}
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
              placeholderText={"Area"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  areain_sqlft: data,
                });
              }}
              valueshow={props?.formData?.areain_sqlft}
              headingText={"Area"}
              keyboardtype={"number-pad"}
              // keyboardtype={'phone-pad'}
            />
          </View>

          <View style={styles.smallCont}>
            <Text style={[styles.headingsTxt, { width: "58%" }]}>
              Min Budget
            </Text>
            <Text style={[styles.headingsTxt, { width: "40%" }]}>
              Max Budget
            </Text>
          </View>
          <View style={styles.inputContVw}>
            <View style={styles.smallContVw}>
              <TextInput
                value={props?.formData?.min_budget?.toString()}
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    min_budget: data,
                  });
                }}
                keyboardType={"number-pad"}
                placeholder="Min Budget"
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
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    max_budget: data,
                  });
                }}
                keyboardType={"number-pad"}
                placeholder="Max Budget"
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
            <Text style={styles.headingsTxt}>Nature Of Funding</Text>
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
                  Loan
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
                  Self Funding
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
                  Both
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.smallCont}>
            <Text style={[styles.headingsTxt, { width: "58%" }]}>
              Min EMI Pay
            </Text>
            <Text style={[styles.headingsTxt, { width: "40%" }]}>
              Max EMI Pay
            </Text>
          </View>
          <View style={styles.inputContVw}>
            <View style={styles.smallContVw}>
              <TextInput
                value={props?.formData?.min_emi_budget?.toString()}
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    min_emi_budget: data,
                  });
                }}
                keyboardType={"number-pad"}
                placeholder="Min EMI Pay"
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
                onChangeText={(data: any) => {
                  props.setFormData({
                    ...props.formData,
                    max_emi_budget: data,
                  });
                }}
                keyboardType={"number-pad"}
                placeholder="Max EMI Pay"
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
            <Text style={styles.headingsTxt}>Purpose</Text>
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
                  End User
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
                  Investment
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.headingText}>Company Details</Text>
          <View style={styles.radioBtnView}>
            <Text style={styles.headingsTxt}>Occupation</Text>
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
                  Salaried
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
                  Self Employed
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
                  Professional
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Company Name"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  coumpany_name: data,
                });
              }}
              valueshow={props?.formData?.coumpany_name}
              headingText={"Company Name"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Designation"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  desigantion: data,
                });
              }}
              valueshow={props?.formData?.desigantion}
              headingText={"Designation"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Office Address"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                props.setFormData({
                  ...props.formData,
                  office_address: data,
                });
              }}
              valueshow={props?.formData?.office_address}
              headingText={"Office Address"}
            />
          </View>
          <View style={styles.btnView}>
            {props.type == "edit" ? (
              <Button
                width={150}
                height={45}
                buttonText={strings.editVisitor}
                btnTxtsize={16}
                handleBtnPress={() => {
                  props.setNavigationType(1);
                  props.OnpressCreateEdit();
                }}
              />
            ) : (
              <>
                <Button
                  width={150}
                  handleBtnPress={() => {
                    props.setNavigationType(1);
                    props.OnpressCreateEdit();
                  }}
                  height={45}
                  buttonText={strings.createVisitor}
                  btnTxtsize={16}
                />
                <Button
                  width={150}
                  handleBtnPress={() => {
                    props.setNavigationType(2);
                    props.OnpressseheduleVisit();
                  }}
                  height={45}
                  buttonText={strings.createandschedule}
                  btnTxtsize={14}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddNewVisitorForm;
