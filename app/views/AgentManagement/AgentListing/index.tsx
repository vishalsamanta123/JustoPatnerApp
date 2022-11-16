import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getAgentDetail, getAllAgentList, statusUpdate } from 'app/Redux/Actions/AgentActions';
import { useDispatch } from 'react-redux';
import AgentView from './components/AgentView';

const AgentListing = ({ navigation }: any) => {
  const [filterData, setFilterData] = useState({
    startdate: '',
    enddate: '',
    search_by_name: '',
    search_by_location: '',
    status: ''
  })
  const [changeStatus, setChangeStatus] = useState({ _id: '', status: false })
  const [type, setType] = useState(null)
  const dispatch: any = useDispatch()
  useLayoutEffect(() => {
    dispatch(getAllAgentList({
      offset: 0,
      limit: 5,
      module_id: '',
      start_date: '',
      end_date: '',
      user_type: 2,
      search_by_name: '',
      search_by_location: '',
      status: ''
    }))

  }, [])
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
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleStatusChange = () => {
    dispatch(statusUpdate({
      cp_id: changeStatus?._id,
      status: changeStatus?.status ? false : true,
    }))
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
    }
  }
  return <AgentView
    setChangeStatus={setChangeStatus}
    handleDrawerPress={handleDrawerPress}
    handleStatusChange={handleStatusChange}
    setFilterData={setFilterData}
    filterData={filterData}
    onPressView={onPressView}
  />;
};

export default AgentListing;
