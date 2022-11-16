import React, { useLayoutEffect, useState } from 'react';
import { getAllAgentList, statusUpdate } from 'app/Redux/Actions/AgentActions';
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
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleStatusChange = () => {
    dispatch(statusUpdate({
      cp_id: changeStatus?._id,
      status: changeStatus?.status ? false : true,
    }))
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
    setChangeStatus({ _id: '', status: false })
  }
  return <AgentView
    setChangeStatus={setChangeStatus}
    handleDrawerPress={handleDrawerPress}
    handleStatusChange={handleStatusChange}
    setFilterData={setFilterData}
    filterData={filterData}
  />;
};

export default AgentListing;
