import ErrorMessage from 'app/components/ErrorMessage';
import { RED_COLOR, Regexs, validateEmail } from 'app/components/utilities/constant';
import { addAgentForm, getAgentDetail } from 'app/Redux/Actions/AgentActions';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AgentBasicInfoView from './components/AgentBasicInfoView';

const AgentBasicInfo = ({ navigation, route }: any) => {
  const { response = {}, detail = "" } = useSelector((state: any) => state.agentData)
  const [agentInfoData, setAgentInfoData] = useState({
    agent_id: '', agent_name: '', whatsapp_number: '', adhar_no: '',
    pancard_no: "", gender: '', date_of_birth: '', rera_certificate_no: '',
    profile_picture: '', primary_mobile: '', email: '',
    working_location: [], location: '', propidership_declaration_letter: '', rera_certificate: ''
  })
  const dispatch: any = useDispatch()
  const [visible, setVisible] = useState(false)
  const [locationModel, setLocationModel] = useState(false)

  useEffect(() => {
    const { data = {}, type = '' } = route?.params
    if (type === 'edit') {
      if (response?.status === 200) {
        setAgentInfoData({ ...response?.data[0] })
      }
    }
  }, [response])
  useLayoutEffect(() => {
    const { data = {}, type = '' } = route?.params
    if (type === 'edit') {
      if (data._id) {
        dispatch(getAgentDetail({
          cp_id: data._id
        }))
      }
    }
  }, [detail])
  const onPressBack = () => {
    navigation.goBack()
  }
  const validation = () => {
    const { data = {}, type = '' } = route?.params
    let isError = true;
    let errorMessage: any = ''
    const { agent_name, whatsapp_number, adhar_no, pancard_no, gender,
      date_of_birth, profile_picture, primary_mobile, email, location, working_location
    } = agentInfoData
    if (profile_picture === '' || profile_picture === undefined) {
      isError = false;
      errorMessage = "Please select profile image"
    } else if (agent_name === '' || agent_name === undefined) {
      isError = false;
      errorMessage = "Please fill agent name"
    } else if (adhar_no === '' || adhar_no === undefined) {
      isError = false;
      errorMessage = "Please fill aadhar number"
    } 
    else if (
      Regexs.AadharRegex.test(adhar_no) === false
    ) {
      isError = false;
      errorMessage = "Please enter the valid Aadhaar number";
    }
    else if (pancard_no === '' || pancard_no === undefined) {
      isError = false;
      errorMessage = "Please fill pancard number"
    } 
    else if (
      Regexs.panRegex.test(pancard_no) === false
    ) {
      isError = false;
      errorMessage = "Please enter the valid Pancard number";
    }
    else if (gender === '' || gender === undefined) {
      isError = false;
      errorMessage = "Please select gender"
    } else if (date_of_birth === '' || date_of_birth === undefined) {
      isError = false;
      errorMessage = "Please select date of birth"
    } else if (primary_mobile === '' || primary_mobile === undefined) {
      isError = false;
      errorMessage = "Please fill mobile number"
    } else if (whatsapp_number === '' || whatsapp_number === undefined) {
      isError = false;
      errorMessage = "Please fill whatsapp number"
    } else if (email === '' || email === undefined) {
      isError = false;
      errorMessage = "Please fill email"
    } else if (type != 'edit' && validateEmail.test(email) === false) {
      isError = false;
      errorMessage = "Please fill corect email"
    } else if (location === '' || location === undefined) {
      isError = false;
      errorMessage = "Please select address"
    } else if (working_location.length === 0) {
      isError = false;
      errorMessage = "Please select working location"
    }
    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }
  const onPressNext = () => {
    if (validation()) {
      dispatch(addAgentForm(agentInfoData))
      navigation.navigate('AgentBankInfo', { type: route?.params?.type })
    }
  }
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
    />
  )
};

export default AgentBasicInfo;
