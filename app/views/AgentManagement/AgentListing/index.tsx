import React, { useEffect, useState } from 'react';
import { getAgentDetail, getAllAgentList, statusUpdate } from 'app/Redux/Actions/AgentActions';
import { useDispatch, useSelector } from 'react-redux';
import AgentView from './components/AgentView';
import Loader from 'app/components/CommonScreen/Loader';
import { AGENT_LIST } from 'app/Redux/types';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const AgentListing = ({ navigation }: any) => {
  const isFocused = useIsFocused()
  const { response = {}, list = false } = useSelector((state: any) => state.agentData)
  const [agentList, setAgentList] = useState([])
  const [isloading, setIsloading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [filterData, setFilterData] = useState({
    startdate: '',
    enddate: '',
    search_by_name: '',
    search_by_location: '',
    status: ''
  })
  const [filter, setFilter] = useState(false)
  const [changeStatus, setChangeStatus] = useState({ _id: '', status: false })
  const [type, setType] = useState(null)
  const dispatch: any = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      getAgentList()
      return () => { };
    }, [navigation])
  );

  const getAgentList = () => {
    setIsloading(true)
    dispatch(getAllAgentList({
      offset: 0,
      limit: 4,
      module_id: '',
      start_date: filterData.startdate,
      end_date: filterData.enddate,
      user_type: 2,
      search_by_name: filterData.search_by_name,
      search_by_location: filterData.search_by_location,
      status: filterData.status,
    }))
    toGetDatas()
  }
  const toGetDatas = () => {
    if (list) {
      setIsloading(false)
      setAgentList(response?.data)
    }
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleStatusChange = () => {
    // dispatch(statusUpdate({
    //   cp_id: changeStatus?._id,
    //   status: changeStatus?.status ? false : true,
    // }))
    // dispatch(getAllAgentList({
    //   offset: 0,
    //   limit: 5,
    //   module_id: '',
    //   start_date: '',
    //   end_date: '',
    //   user_type: 2,
    //   search_by_name: '',
    //   search_by_location: '',
    //   status: ''
    // }))
    setChangeStatus({ _id: '', status: false })
  }
  const onPressView = (data: any, type: any) => {
    if (type === 'edit') {
      navigation.navigate('AddnewAgent', { type, data })
    } else {
      if (type === 'view') {
        navigation.navigate('AgentDetails', { data })
      }
    }
  }
  // const Onreachedend = (offSet: any) => {
  //   setOffset(offSet)
  //   dispatch(getAllAgentList({
  //     offset: offSet,
  //     limit: 2,
  //     module_id: '',
  //     start_date: filterData.startdate,
  //     end_date: filterData.enddate,
  //     user_type: 2,
  //     search_by_name: filterData.search_by_name,
  //     search_by_location: filterData.search_by_location,
  //     status: filterData.status,
  //   }))
  // };
  return (
    <>
      {isloading ? <Loader /> : null}
      <AgentView
        setChangeStatus={setChangeStatus}
        handleDrawerPress={handleDrawerPress}
        handleStatusChange={handleStatusChange}
        setFilterData={setFilterData}
        filterData={filterData}
        onPressView={onPressView}
        setFilter={setFilter}
        agentList={agentList}
        // Onreachedend={Onreachedend}
        offset={offset}
        filter={filter}
        getAgentList={getAgentList}
      />
    </>
  )
};

export default AgentListing;
