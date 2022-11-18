import Loader from 'app/components/CommonScreen/Loader';
import ErrorMessage from 'app/components/ErrorMessage';
import { RED_COLOR } from 'app/components/utilities/constant';
import { addAgentForm, getAgentDetail } from 'app/Redux/Actions/AgentActions';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AgentBasicInfoView from './components/AgentBasicInfoView';

const AgentBasicInfo = ({ navigation, route }: any) => {
  const { response = {}, detail = "" } = useSelector((state: any) => state.agentData)
  const [agentInfoData, setAgentInfoData] = useState({
    agent_id: '', agent_name: '', whatsapp_number: '', adhar_no: '',
    pancard_no: "", gender: '', date_of_birth: '', rera_certificate_no: '',
    profile_picture: '', primary_mobile: '', email: ''
  })
  const dispatch: any = useDispatch()
  const [visible, setVisible] = useState(false)
  const [isloading, setIsloading] = useState(false)

  useLayoutEffect(() => {
    const { data = {}, type = '' } = route?.params
    if (type === 'edit') {
      if (data._id) {
        setIsloading(true)
        dispatch(getAgentDetail({
          cp_id: data._id
        }))
        toGetDatas()
      }
    }
  }, [detail])
  const toGetDatas = () => {
    if (detail) {
      setIsloading(false)
      setAgentInfoData({ ...response?.data[0] })
    }
  }
  const onPressBack = () => {
    navigation.goBack()
  }
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (route?.params?.type === 'add') {
      const { agent_name, whatsapp_number, adhar_no, pancard_no, gender,
        date_of_birth, profile_picture, primary_mobile, email
      } = agentInfoData
      if (agent_name === '' || whatsapp_number === '' || adhar_no === '' || pancard_no === '' || gender === '' ||
        date_of_birth === '' || profile_picture === '' || primary_mobile === '' || email === '') {
        isError = false;
        errorMessage = "All Fields are required"
      }
    } else {
      const { agent_id, agent_name, whatsapp_number, adhar_no,
        pancard_no, gender, date_of_birth,
      } = agentInfoData
      if (agent_id === '' || agent_name === '' || whatsapp_number === '' || adhar_no === '' ||
        pancard_no === '' || gender === '' || date_of_birth === ''
      ) {
        isError = false;
        errorMessage = "All Fields are required"
      }
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
    <>
      {isloading ? <Loader /> : null}
      <AgentBasicInfoView
        type={route?.params?.type}
        agentInfoData={agentInfoData}
        setAgentInfoData={setAgentInfoData}
        onPressBack={onPressBack} onPressNext={onPressNext}
        visible={visible} setVisible={setVisible}
      />
    </>
  )
};

export default AgentBasicInfo;
