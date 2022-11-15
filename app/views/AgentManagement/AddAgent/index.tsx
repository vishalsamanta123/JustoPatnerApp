import { addAgentForm } from 'app/Redux/Actions/AgentActions';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AgentBasicInfoView from './components/AgentBasicInfoView';

const AgentBasicInfo = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [visible, setVisible] = useState(false)
  const [agentInfoData, setAgentInfoData] = useState({
    profile_img: '',
    agent_name: '',
    aadhar_no: '',
    pancard_no: '',
    gender: '',
    dob: new Date(),
    mobile_no: '',
    wttsapp_no: '',
    email: '',
    working_location: '',
    rera_no: '',
    rera_certificate: '',
    propidership_declaration_letter: '',
    latitude: '',
    longitude: '',
    role_id: '',
  })
  const onPressNext = () => {
    dispatch(addAgentForm(agentInfoData))
    navigation.navigate('AgentBankInfo')
  }
  const onPressBack = () => {
    navigation.goBack()
  }
  return <AgentBasicInfoView
    agentInfoData={agentInfoData}
    setAgentInfoData={setAgentInfoData}
    onPressBack={onPressBack} onPressNext={onPressNext}
    visible={visible} setVisible={setVisible}
  />;
};

export default AgentBasicInfo;
