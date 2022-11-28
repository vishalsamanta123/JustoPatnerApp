import React, { useEffect, useLayoutEffect, useState } from 'react';
import AgentDetailView from './components/AgentDetailView';
import { useDispatch, useSelector } from 'react-redux';
import { getAgentDetail } from 'app/Redux/Actions/AgentActions';
import { GET_AGENT_DETAIL } from 'app/Redux/types';

const AgentDetail = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, detail = "" } = useSelector((state: any) => state.agentData)
  const [allDetails, setAllDetails] = useState({})

  useLayoutEffect(() => {
    const { data = {} } = route?.params
    if (data._id) {
      dispatch(getAgentDetail({
        cp_id: data._id
      }))
      toGetDatas()
    }
  }, [detail])
  const toGetDatas = () => {
    if (detail) {
      setAllDetails(response.data[0])
    }
  }

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <AgentDetailView
      allDetails={allDetails}
      setAllDetails={setAllDetails}
      handleBackPress={handleBackPress}
    />
  )
}
export default AgentDetail;
