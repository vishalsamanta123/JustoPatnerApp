import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import images from "../../../../assets/images";
import InputField from "../../../../components/InputField";
import {
  BLACK_COLOR,
  GREEN_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import {
  addAgent,
  addAgentRemove,
  editAgent,
} from "app/Redux/Actions/AgentActions";
import ErrorMessage from "app/components/ErrorMessage";
import { normalize } from "app/components/scaleFontSize";
import auth from "@react-native-firebase/auth";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import CheckBox from "@react-native-community/checkbox";

const AgentBankInfo = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch();
  const { response = {} } = useSelector((state: any) => state.addAgentForm);
  const [agentInfoData, setAgentInfoData] = useState({ ...response });
  const editData = useSelector((state: any) => state.editAgentData) || {};
  const addData = useSelector((state: any) => state.addAgentData) || {};
  console.log("agentInfoData: ", agentInfoData);

  useEffect(() => {
    if (editData?.update || addData?.create) {
      dispatch(addAgentRemove());
      navigation.navigate("AgentListing");
      // auth()
      //   .createUserWithEmailAndPassword(agentInfoData?.email, "123456")
      //   .then(async (res: any) => {
      //     console.log("res: IN CREATE", res);
      //     console.log("User account created & signed in!");
      //   });
      ErrorMessage({
        msg: editData?.update
          ? editData?.response?.message
          : addData?.create
          ? addData?.response?.message
          : "",
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [editData, addData]);
  const [refraCrtf, setRefraCrtf] = useState(false);
  const [propiderLettr, setPropiderLettr] = useState(false);
  const [cancelcheque, setCancelcheque] = useState(false);
  const insets = useSafeAreaInsets();
  const onPressBack = () => {
    navigation.goBack();
  };
  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    const {
      rera_certificate_no,
      rera_certificate,
      propidership_declaration_letter,
      bank_name,
      branch_name,
      account_no,
      ifsc_code,
      cancel_cheaque,
    } = agentInfoData;
    if (rera_certificate_no === "" || rera_certificate_no === undefined) {
      isError = false;
      errorMessage = "Please fill rera certificate number";
    } else if (rera_certificate === "" || rera_certificate === undefined) {
      isError = false;
      errorMessage = "Please select rera certificate image";
    } else if (
      propidership_declaration_letter === "" ||
      propidership_declaration_letter === undefined
    ) {
      isError = false;
      errorMessage = "Please select Proprietorship declaration letter";
    } else if (bank_name === "" || bank_name === undefined) {
      isError = false;
      errorMessage = "Please enter Bank Name";
    } else if (branch_name === "" || branch_name === undefined) {
      isError = false;
      errorMessage = "Please enter Branch Name";
    } else if (account_no === "" || account_no === undefined) {
      isError = false;
      errorMessage = "Please enter Account No.";
    } else if (ifsc_code === "" || ifsc_code === undefined) {
      isError = false;
      errorMessage = "Please enter Bank Ifsc Code";
    } else if (cancel_cheaque === "" || cancel_cheaque === undefined) {
      isError = false;
      errorMessage = "Please select Cancel cheque image";
    }

    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };
  const onPressCreateAgent = (type: any) => {
    if (validation()) {
      const formData = new FormData();
      if (type === "edit") {
        formData.append("agent_id", agentInfoData?._id);
      } else {
        // formData.append("role_id", agentInfoData?.role_id);
      }
      formData.append("email", agentInfoData?.email);
      formData.append("agent_name", agentInfoData?.agent_name);
      formData.append("primary_mobile", agentInfoData?.primary_mobile);
      formData.append("whatsapp_number", agentInfoData?.whatsapp_number);
      formData.append("adhar_no", agentInfoData?.adhar_no);
      formData.append("pancard_no", agentInfoData?.pancard_no);
      formData.append("gender", agentInfoData?.gender);
      formData.append("bank_name", agentInfoData?.bank_name);
      formData.append("branch_name", agentInfoData?.branch_name);
      formData.append("account_no", agentInfoData?.account_no);
      formData.append("ifsc_code", agentInfoData?.ifsc_code);
      formData.append(
        "date_of_birth",
        agentInfoData?.date_of_birth
          ? agentInfoData?.date_of_birth
          : "10/11/2000"
      );
      formData.append("location", agentInfoData?.location);
      formData.append("latitude", agentInfoData?.latitude);
      formData.append("longitude", agentInfoData?.longitude);
      formData.append(
        "working_location",
        JSON.stringify(agentInfoData?.working_location)
      );
      formData.append(
        "rera_certificate_no",
        agentInfoData?.rera_certificate_no
      );
      agentInfoData?.profile_picture?.uri &&
        formData.append("profile_picture", agentInfoData?.profile_picture);
      agentInfoData?.rera_certificate?.uri &&
        formData.append("rera_certificate", agentInfoData?.rera_certificate);
      agentInfoData?.cancel_cheaque?.uri &&
        console.log(
          "agentInfoData?.cancel_cheaque: ",
          agentInfoData?.cancel_cheaque
        );
      formData.append("cancel_cheaque", agentInfoData?.cancel_cheaque);
      agentInfoData?.propidership_declaration_letter?.uri &&
        formData.append(
          "propidership_declaration_letter",
          agentInfoData?.propidership_declaration_letter
        );
      if (type === "edit") {
        dispatch(editAgent(formData));
      } else {
        dispatch(addAgent(formData));
      }
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.rerainfo}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={onPressBack}
      />
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
      >
        <View style={styles.wraptop}>
          <View style={styles.inputWrap}>
            <InputField
              require={true}
              placeholderText={"RERA Certificate No."} //can edit
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                setAgentInfoData({
                  ...agentInfoData,
                  rera_certificate_no: data,
                });
              }}
              valueshow={agentInfoData?.rera_certificate_no?.toString()}
              maxLength={20}
              headingText={"RERA Certificate No."}
            />
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row" }]}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[styles.headingText, { fontSize: normalize(17) }]}>
                RERA Certificate
              </Text>
              <RequiredStart />
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                onPress={() => setRefraCrtf(true)}
                style={styles.browseVw}
              >
                <Text
                  style={{
                    color:
                      agentInfoData?.rera_certificate === ""
                        ? BLACK_COLOR
                        : PRIMARY_THEME_COLOR,
                  }}
                >
                  {strings.browse}
                </Text>
              </TouchableOpacity>
              {agentInfoData?.rera_certificate === null ||
              agentInfoData?.rera_certificate === "" ||
              agentInfoData?.rera_certificate === undefined ? null : (
                <Text style={styles.addedTxt}>{"RERA Certificate Added"}</Text>
              )}
            </View>
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row" }]}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={[styles.headingText, { fontSize: normalize(17) }]}>
                Proprietorship Declaration Letter
              </Text>
              <RequiredStart />
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                onPress={() => setPropiderLettr(true)}
                style={styles.browseVw}
              >
                <Text
                  style={{
                    color:
                      agentInfoData?.propidership_declaration_letter === ""
                        ? BLACK_COLOR
                        : PRIMARY_THEME_COLOR,
                  }}
                >
                  {strings.browse}
                </Text>
              </TouchableOpacity>
              {agentInfoData?.propidership_declaration_letter === null ||
              agentInfoData?.propidership_declaration_letter === "" ||
              agentInfoData?.propidership_declaration_letter ===
                undefined ? null : (
                <Text style={styles.addedTxt}>
                  {"Proprietorship Declaration Letter Added"}
                </Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.wrapbottum}>
          <View style={styles.inputWrap}>
            <Text style={styles.headingText}>Bank details</Text>
          </View>
          <View style={styles.inputWrap}>
            <InputField
              require={true}
              placeholderText={"Bank Name"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                setAgentInfoData({
                  ...agentInfoData,
                  bank_name: data,
                });
              }}
              valueshow={agentInfoData?.bank_name?.toString()}
              headingText={"Bank Name"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              require={true}
              placeholderText={"Branch Name"}
              handleInputBtnPress={() => {}}
              onChangeText={(data: any) => {
                setAgentInfoData({
                  ...agentInfoData,
                  branch_name: data,
                });
              }}
              valueshow={agentInfoData?.branch_name?.toString()}
              headingText={"Branch Name"}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              require={true}
              placeholderText={"Account No."}
              handleInputBtnPress={() => {}}
              maxLength={18}
              keyboardtype={"number-pad"}
              onChangeText={(data: any) => {
                setAgentInfoData({
                  ...agentInfoData,
                  account_no: data,
                });
              }}
              valueshow={agentInfoData?.account_no?.toString()}
              headingText={"Account No."}
            />
          </View>
          <View style={styles.inputWrap}>
            <InputField
              require={true}
              placeholderText={"IFSC Code"}
              handleInputBtnPress={() => {}}
              maxLength={11}
              onChangeText={(data: any) => {
                setAgentInfoData({
                  ...agentInfoData,
                  ifsc_code: data,
                });
              }}
              valueshow={agentInfoData?.ifsc_code?.toString()}
              headingText={"IFSC Code"}
            />
          </View>
          <View style={[styles.inputWrap, { flexDirection: "row" }]}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[styles.headingText, { fontSize: normalize(17) }]}>
                Cancel Cheque
              </Text>
              <RequiredStart />
            </View>
            <View style={{ flex: 0.5 }}>
              <TouchableOpacity
                onPress={() => setCancelcheque(true)}
                style={styles.browseVw}
              >
                <Text
                  style={{
                    color:
                      agentInfoData?.cancel_cheaque === ""
                        ? BLACK_COLOR
                        : PRIMARY_THEME_COLOR,
                  }}
                >
                  {strings.browse}
                </Text>
              </TouchableOpacity>
              {agentInfoData?.cancel_cheaque === null ||
              agentInfoData?.cancel_cheaque === "" ||
              agentInfoData?.cancel_cheaque === undefined ? null : (
                <Text style={styles.addedTxt}>{"Cancel Cheque Added"}</Text>
              )}
            </View>
          </View>
          {/* <View style={{marginTop: 20}}>
          <Button
            handleBtnPress={()=>onPressCreateAgent()}
            buttonText={strings.createAgent}
            textTransform={"uppercase"}
          />
        </View> */}

          <View style={{ marginTop: 10 }}>
            <Button
              handleBtnPress={() => onPressCreateAgent(route?.params?.type)}
              buttonText={
                route?.params?.type === "edit"
                  ? strings.editAgent
                  : strings.createAgent
              }
              textTransform={"uppercase"}
            />
          </View>
        </View>
        <View style={[styles.bottomView, { alignItems: "center" }]}>
          <CheckBox
            value={true}
            tintColors={{ true: PRIMARY_THEME_COLOR }}
            // onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
          <Text style={styles.bottomText}>{strings.iAknowledge}</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://justoverse.com/termandcondition")
            }
            style={styles.spanTouch}
          >
            <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
          </TouchableOpacity>
          <Text style={styles.bottomText}> {strings.applicable} </Text>
          {/* <TouchableOpacity style={styles.spanTouch}>
            <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
          </TouchableOpacity> */}
        </View>

        <PicturePickerModal
          Visible={refraCrtf}
          docType={"all"}
          setVisible={setRefraCrtf}
          imageData={(data: any) => {
            setAgentInfoData({
              ...agentInfoData,
              rera_certificate: data,
            });
          }}
        />
        <PicturePickerModal
          Visible={propiderLettr}
          docType={"all"}
          setVisible={setPropiderLettr}
          imageData={(data: any) => {
            setAgentInfoData({
              ...agentInfoData,
              propidership_declaration_letter: data,
            });
          }}
        />
        <PicturePickerModal
          Visible={cancelcheque}
          docType={"all"}
          setVisible={setCancelcheque}
          imageData={(data: any) => {
            console.log("data: ", data);
            setAgentInfoData({
              ...agentInfoData,
              cancel_cheaque: data,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

export default AgentBankInfo;
