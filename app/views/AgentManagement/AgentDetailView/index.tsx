import React, { useEffect, useLayoutEffect, useState } from 'react';
import AgentDetailView from './components/AgentDetailView';
import { useDispatch, useSelector } from 'react-redux';
import { getAgentDetail } from 'app/Redux/Actions/AgentActions';
import Loader from 'app/components/CommonScreen/Loader';
import { GET_AGENT_DETAIL } from 'app/Redux/types';

const AgentDetail = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const [isloading, setIsloading] = useState(false)
  const { response = {}, detail = "" } = useSelector((state: any) => state.agentData)
  const [allDetails, setAllDetails] = useState({})

  useLayoutEffect(() => {
    const { data = {} } = route?.params
    if (data._id) {
      setIsloading(true)
      dispatch(getAgentDetail({
        cp_id: data._id
      }))
      toGetDatas()
    }
  }, [detail])
  const toGetDatas = () => {
    if (detail) {
      setIsloading(false)
      setAllDetails(response.data[0])
    }
  }

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <>
      {isloading ? <Loader /> : null}
      <AgentDetailView
        setIsloading={setIsloading}
        allDetails={allDetails}
        setAllDetails={setAllDetails}
        handleBackPress={handleBackPress}
      />
    </>
  )
}
export default AgentDetail;
