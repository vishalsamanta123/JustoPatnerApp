import React, { useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import LeadManagementView from './Components/LeadManagementView'
import { getAllLeadsList } from 'app/Redux/Actions/LeadsActions'
import { useDispatch, useSelector } from 'react-redux'

const LeadManagementScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const visitorData = useSelector((state: any) => state.visitorData)
  console.log('visitorData: ', visitorData);
  const [filterData, setFilterData] = useState({
    startdate: '',
    enddate: '',
    search_by_visisor_name: '',
    search_configuration: '',
    visit_score: ''
  })
  const [filter, setFilter] = useState(null)
  const [isloading, setIsloading] = useState(false)

  useLayoutEffect(() => {
    getVisitorsList()
  }, [filter])
  const getVisitorsList = () => {
    setIsloading(true)
    dispatch(getAllLeadsList({
      offset: 0,
      limit: 4,
      start_date: filterData.startdate,
      end_date: filterData.enddate,
      search_by_visisor_name: filterData.search_by_visisor_name,
      search_configuration: '',
      visit_score: 2
    }))
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleBulkUploadPress = () => {
    navigation.navigate('BulkUpload')
  }
  const handleAddNewPress = () => {
    navigation.navigate('AddNewVisitorScreen')
  }
  return (
    <LeadManagementView
      handleDrawerPress={handleDrawerPress}
      handleBulkUploadPress={handleBulkUploadPress}
      handleAddNewPress={handleAddNewPress}
    />
  )
}

export default LeadManagementScreen