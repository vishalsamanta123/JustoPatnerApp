import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getAgentDetail, getAllAgentList, statusUpdate } from 'app/Redux/Actions/AgentActions';
import { useDispatch, useSelector } from 'react-redux';
import AgentView from './components/AgentView';
import Loader from 'app/components/CommonScreen/Loader';

const AgentListing = ({ navigation }: any) => {
  const agentData = useSelector((state: any) => state.agentData) || {}
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
  const [filter, setFilter] = useState(null)
  const [changeStatus, setChangeStatus] = useState({ _id: '', status: false })
  const [type, setType] = useState(null)
  const dispatch: any = useDispatch()

  useLayoutEffect(() => {
    getAgentList()
  }, [filter])
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
      status: filterData.status
    }))
  }
  useEffect(() => {
    if (type === 'edit') {
       navigation.navigate('AddnewAgent', { type })
      setType(null)
    } else {
      if (type === 'view') {
        navigation.navigate('AgentDetails')
        setType(null)
      }
    }
  }, [type])

  useEffect(() => {
    if (agentData?.response) {
      const { response, loading } = agentData;
      if (response?.status === 200) {
        setAgentList(response?.data);
        setIsloading(loading);
      } else {
        setAgentList([]);
      }
    }
  }, [agentData]);
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
    if (data._id) {
      dispatch(getAgentDetail({
        cp_id: data._id
      }))
      setType(type)
      setIsloading(true)
    }
  }
  const Onreachedend = (offSet: any) => {
    setOffset(offSet)
    dispatch(getAllAgentList({
      offset: offSet,
      limit: 2,
      module_id: '',
      start_date: filterData.startdate,
      end_date: filterData.enddate,
      user_type: 2,
      search_by_name: filterData.search_by_name,
      search_by_location: filterData.search_by_location,
      status: filterData.status
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
        offset={offset}
        getAgentList={getAgentList}
      />
    </>
  )
};

export default AgentListing;
