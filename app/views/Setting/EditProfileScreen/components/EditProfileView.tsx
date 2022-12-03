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

const EditProfileView = (props: any) => {
  const { onPressBack, allDetails, setEditData, editData } = props;
  const insets = useSafeAreaInsets();
  const [gender, setGender] = useState("Male");
  const [checked, setChecked] = useState("first");
  const [profileVisible, setProfileVisible] = useState(false);

  const allDetailsall = useSelector((state: any) => state.agentData);
  // useEffect(() => {
  //   // setEditData(allDetails)
  //   setEditData(allDetailsall?.response)
  // }, [allDetailsall])

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.editProfile}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={onPressBack}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView>
        <View style={styles.wrap}>
          {/*  <Text style={styles.headingText}>{strings.basicInfoText}</Text> */}
          {/* <View style={styles.nderlineStyle} /> */}

          <TouchableOpacity
            style={styles.imageCircle}
            onPress={() => setProfileVisible(true)}
          >
            <Image
              style={styles.userImage}
              source={{
                uri: editData?.local_profile_picture?.uri
                  ? editData?.local_profile_picture?.uri
                  : editData?.profile_picture,
              }}
            />
          </TouchableOpacity>
          <View style={styles.inputWrap}>
            <InputField
              valueshow={editData?.agent_name}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  agent_name: e,
                });
              }}
              headingText={"Agent Name"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              valueshow={editData?.adhar_no}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  adhar_no: e,
                });
              }}
              headingText={"Adhar No."}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              valueshow={editData?.pancard_no}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  pancard_no: e,
                });
              }}
              headingText={"Pancard No."}
            />
          </View>
          <View style={styles.genderView}>
            <Text style={styles.genderTxt}>{strings.gender}</Text>
            <View style={styles.radioView}>
              <RadioButton
                value={editData?.gender}
                status={editData?.gender === 1 ? "checked" : "unchecked"}
                onPress={() =>
                  setEditData({
                    ...editData,
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
                      checked === "first" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                  },
                ]}
              >
                {strings.male}
              </Text>
            </View>
            <View style={styles.radioView}>
              <RadioButton
                value={editData?.gender}
                status={editData?.gender === 2 ? "checked" : "unchecked"}
                onPress={() =>
                  setEditData({
                    ...editData,
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
                      checked === "second" ? PRIMARY_THEME_COLOR : BLACK_COLOR,
                  },
                ]}
              >
                {strings.female}
              </Text>
            </View>
          </View>
          {/* <View style={styles.inputWrap}>
            <InputField
              valueshow={moment(editData?.date_of_birth).format("DD/MM/YYYY")}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  date_of_birth: e,
                });
              }}
              headingText={"Date of Birth"}
              rightImgSrc={images.event}
            />
          </View> */}
          <InputCalender
            mode={"date"}
            leftIcon={images.event}
            placeholderText={"Date of Birth"} //can edit
            headingText={"Date of Birth"}
            editable={false}
            dateData={(data: any) => {
              setEditData({
                ...editData,
                date_of_birth: data,
              });
            }}
            setDateshow={(data: any) => {
              setEditData({
                ...editData,
                date_of_birth: data,
              });
            }}
            value={moment(editData?.date_of_birth).format("DD/MM/YYYY")}
          />
          <View style={styles.inputWrap}>
            <InputField
              valueshow={editData?.primary_mobile?.toString()}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  primary_mobile: e,
                });
              }}
              headingText={"Mobile No."}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              valueshow={editData?.whatsapp_number?.toString()}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  whatsapp_number: e,
                });
              }}
              headingText={"WhatsApp No."}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              valueshow={editData?.email}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
                  email: e,
                });
              }}
              headingText={"Email Address"}
            />
          </View>
          {/*  <View style={styles.inputWrap}>
            <InputField
              placeholderText={"Sourcing Manager"}
              handleInputBtnPress={() => {}}
              onChangeText={(e: any) => {
                setEditData({
                  ...editData,
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
              setEditData({
                ...editData,
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
