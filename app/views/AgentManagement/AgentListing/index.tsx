import React, { useEffect, useState } from 'react';
import { getAgentDetail, getAllAgentList, statusUpdate } from 'app/Redux/Actions/AgentActions';
import { useDispatch, useSelector } from 'react-redux';
import AgentView from './components/AgentView';
import Loader from 'app/components/CommonScreen/Loader';
import { AGENT_LIST } from 'app/Redux/types';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const AgentListing = ({ navigation }: any) => {
  // const isFocused = useIsFocused()
  const { response = {}, list = false } = useSelector((state: any) => state.agentData)
  const moreData = response?.total_data || 0
  const [agentList, setAgentList] = useState<any>([])
  console.log('agentList: ', agentList);
  const [isloading, setIsloading] = useState(false)
  const [offSET, setOffset] = useState(0)
  console.log('offSET: ', offSET);
  const [filterData, setFilterData] = useState({
    startdate: '',
    enddate: '',
    search_by_name: '',
    search_by_location: '',
    status: ''
  })
  const [filter, setFilter] = useState(false)
  const [changeStatus, setChangeStatus] = useState({ _id: '', status: false })
  const dispatch: any = useDispatch()

  useFocusEffect(
    React.useCallback(() => {
      getAgentList(offSET, [])
      return () => { };
    }, [navigation])
  );
  const getAgentList = (offset: any, array: any) => {
    setIsloading(true)
    setOffset(offset)
    dispatch(getAllAgentList({
      offset: offset,
      limit: 3,
      module_id: '',
      start_date: filterData.startdate,
      end_date: filterData.enddate,
      user_type: 2,
      search_by_name: filterData.search_by_name,
      search_by_location: filterData.search_by_location,
      status: filterData.status,
    }))
    toGetDatas(offset, array)
  }
  const toGetDatas = (offset: any, array: any) => {
    if (list) {
      setIsloading(false)
      if (offSET === 0 && offset === 0) {
        console.log("TO THE END")
        setAgentList(response?.data)
      } else {
        setAgentList([...array, ...response?.data])
      }
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
    //   limit: 3,
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
  const Onreachedend = (offSet: any) => {
    setOffset(offSet)
    dispatch(getAllAgentList({
      offset: offSet,
      limit: 3,
      module_id: '',
      start_date: filterData.startdate,
      end_date: filterData.enddate,
      user_type: 2,
      search_by_name: filterData.search_by_name,
      search_by_location: filterData.search_by_location,
      status: filterData.status,
    }))
  };
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
        Onreachedend={Onreachedend}
        offSET={offSET}
        moreData={moreData}
        filter={filter}
        getAgentList={getAgentList}
        setOffset={setOffset}
      />
    </>
  )
};

export default AgentListing;
