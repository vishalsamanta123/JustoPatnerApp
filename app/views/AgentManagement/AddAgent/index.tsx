import ErrorMessage from "app/components/ErrorMessage";
import {
  Isios,
  RED_COLOR,
  Regexs,
  validateEmail,
} from "app/components/utilities/constant";
import { handleValues } from "app/components/utilities/handleValues";
import strings from "app/components/utilities/Localization";
import { addAgentForm, getAgentDetail } from "app/Redux/Actions/AgentActions";
import { checkEmailMobile, emailCheckRemove } from "app/Redux/Actions/ReggistrationAction";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AgentBasicInfoView from "./components/AgentBasicInfoView";

const AgentBasicInfo = ({ navigation, route }: any) => {
  const { response = {}, detail = "" } = useSelector(
    (state: any) => state.agentData
  );
  const emailAndMobileData = useSelector((state: any) => state.emailAndMobileData);
  const [agentInfoData, setAgentInfoData] = useState({
    agent_id: "",
    agent_name: "",
    whatsapp_number: "",
    adhar_no: "",
    pancard_no: "",
    gender: "",
    date_of_birth: "",
    rera_certificate_no: "",
    profile_picture: "",
    primary_mobile: "",
    email: "",
    working_location: [],
    location: "",
    propidership_declaration_letter: "",
    rera_certificate: "",
    cancel_cheaque: "",
    bank_name: "",
    branch_name: "",
    account_no: "",
    ifsc_code: "",
    norera_register: null,
  });
  const [emailMobvalidation, setEmailMobValidation] = useState({
    primary_mobile: null,
    email: null,
  });
  const dispatch: any = useDispatch();
  const [visible, setVisible] = useState(false);
  const [locationModel, setLocationModel] = useState(false);

  useEffect(() => {
    const { data = {}, type = "" } = route?.params;
    if (type === "edit") {
      if (response?.status === 200) {
        console.log('response', response)
        const allDatas = response?.data[0] || {}
        const bankdata = response?.data[0]?.cp_bank_detail || {}
        setAgentInfoData({
          ...response?.data[0],
          cancel_cheaque: bankdata?.cancel_cheaque,
          bank_name: bankdata?.bank_name,
          branch_name: bankdata?.branch_name,
          account_no: bankdata?.account_no,
          ifsc_code: bankdata?.ifsc_code,
          norera_register: (handleValues(allDatas?.rera_certificate_no) &&
            handleValues(allDatas?.rera_certificate) === false) ? null : "",
            profile_base_url: allDatas?.profile_base_url ? allDatas?.profile_base_url : ''
        });
      }
    }
  }, [response]);
  useLayoutEffect(() => {
    const { data = {}, type = "" } = route?.params;
    if (type === "edit") {
      if (data._id) {
        dispatch(
          getAgentDetail({
            cp_id: data._id,
          })
        );
      }
    }
  }, [detail]);
  const onPressBack = () => {
    navigation.goBack();
  };
  const validation = () => {
    if (emailMobvalidation.primary_mobile === "mobileStart" ||
      emailMobvalidation.email === "emailStart") {
      Keyboard.dismiss()
    } else {
      const { data = {}, type = "" } = route?.params;
      let isError = true;
      let errorMessage: any = "";
      const {
        agent_name,
        whatsapp_number,
        adhar_no,
        pancard_no,
        gender,
        date_of_birth,
        profile_picture,
        primary_mobile,
        email,
        location,
        working_location,
      } = agentInfoData;
      // if (profile_picture === '' || profile_picture === undefined) {
      //   isError = false;
      //   errorMessage = "Please select profile image"
      // } else
      if (agent_name === "" || agent_name === undefined) {
        isError = false;
        errorMessage = strings.agentNameReqVal;
      } else if (adhar_no === "" || adhar_no === undefined) {
        isError = false;
        errorMessage = strings.aadharReqVal;
      } else if (Regexs.AadharRegex.test(adhar_no) === false) {
        isError = false;
        errorMessage = strings.aadharValidVal;
      } else if (pancard_no === "" || pancard_no === undefined) {
        isError = false;
        errorMessage = strings.pancardReqVal;
      } else if (Regexs.panRegex.test(pancard_no) === false) {
        isError = false;
        errorMessage = strings.pancardValidVal;
      } else if (gender === "" || gender === undefined) {
        isError = false;
        errorMessage = strings.genderReqVal;
      } else if (date_of_birth === "" || date_of_birth === undefined) {
        isError = false;
        errorMessage = strings.dateOfBirthReqVal;
      } else if (primary_mobile === "" || primary_mobile === undefined) {
        isError = false;
        errorMessage = strings.mobileNoReqVal;
      } else if (primary_mobile?.length < 10) {
        isError = false;
        errorMessage = strings.mobileNoValidReqVal;
      } else if (type != "edit" && emailMobvalidation.primary_mobile == null) {
        isError = false;
        errorMessage = strings.mobileAlreadyValidReqVal;
      } else if (whatsapp_number === "" || whatsapp_number === undefined) {
        isError = false;
        errorMessage = strings.whatsappNoReqVal;
      } else if (email === "" || email === undefined) {
        isError = false;
        errorMessage = strings.emailReqVal;
      } else if (type != "edit" && validateEmail.test(email) === false) {
        isError = false;
        errorMessage = strings.correctEmailReqVal;
      } else if (type != "edit" && emailMobvalidation.email == null) {
        isError = false;
        errorMessage = strings.emailAlreadyReqVal;
      } else if (location === "" || location === undefined) {
        isError = false;
        errorMessage = strings.addressReqVal;
      } else if (working_location.length === 0) {
        isError = false;
        errorMessage = strings.workingLocationReqVal;
      }
      if (errorMessage !== "") {
        ErrorMessage({
          msg: errorMessage,
          backgroundColor: RED_COLOR,
        });
      }
      if(!isError){
        Keyboard.dismiss()
      }
      return isError;
    }

  };
  useEffect(() => {
    if (emailAndMobileData?.response?.status === 200) {
      dispatch(emailCheckRemove());
      switch (emailAndMobileData?.check_type) {
        case 'mobile':
          setEmailMobValidation({
            ...emailMobvalidation,
            primary_mobile: emailAndMobileData?.check_type,
          })
          break;
        case 'email':
          setEmailMobValidation({
            ...emailMobvalidation,
            email: emailAndMobileData?.check_type,
          })
          break;
        default:
          break;
      }
      // ErrorMessage({
      //   msg: emailAndMobileData?.response?.message,
      //   backgroundColor: GREEN_COLOR
      // })
    }
  }, [emailAndMobileData]);
  const handleCheckEmailMobile = (type: any) => {
    const params =
      type == 1
        ? { mobile: agentInfoData?.primary_mobile }
        : { email: agentInfoData?.email };
    dispatch(checkEmailMobile(params));
  };
  const onPressNext = () => {
    // Isios && Keyboard.dismiss()
    if (validation()) {
      dispatch(addAgentForm(agentInfoData));
      navigation.navigate("AgentBankInfo", { type: route?.params?.type });
    }
  };
  return (
    <AgentBasicInfoView
      type={route?.params?.type}
      agentInfoData={agentInfoData}
      setAgentInfoData={setAgentInfoData}
      onPressBack={onPressBack}
      onPressNext={onPressNext}
      visible={visible}
      setVisible={setVisible}
      locationModel={locationModel}
      setLocationModel={setLocationModel}
      handleCheckEmailMobile={handleCheckEmailMobile}
      emailMobvalidation={emailMobvalidation}
      setEmailMobValidation={setEmailMobValidation}
    />
  );
};

export default AgentBasicInfo;
