import { addAgentForm } from 'app/Redux/Actions/AgentActions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AgentBasicInfoView from './components/AgentBasicInfoView';

const AgentBasicInfo = ({ navigation, route }: any) => {
  console.log('route: ', route);
  const { response = {} } = useSelector((state: any) => state.agentData)
  const [agentInfoData, setAgentInfoData] = useState(
    route.params === undefined ? {} :
      { ...response?.data[0] })
  const dispatch: any = useDispatch()
  const [visible, setVisible] = useState(false)
  const onPressNext = () => {
    dispatch(addAgentForm(agentInfoData))
    navigation.navigate('AgentBankInfo', { type: 'edit' })
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
