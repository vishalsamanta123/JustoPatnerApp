import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import LeadManagementView from './Components/LeadManagementView'
import { getAllLeadsList } from 'app/Redux/Actions/LeadsActions'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import moment from 'moment'
import { DATE_FORMAT } from 'app/components/utilities/constant'

const LeadManagementScreen = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorDataList)
  const moreData = response?.total_data || 0
  const [filterData, setFilterData] = useState({
    startdate: '',
    enddate: '',
    search_by_visisor_name: '',
    search_configuration: '',
    visit_score: '',
    visit_status: '',
    lead_status: ''
  })
  const [visitorList, setVisiitorList] = useState<any>([])
  const [offSET, setOffset] = useState(0)

  const todayDate = {
    startdate: moment(new Date()).format(DATE_FORMAT),
    enddate: moment(new Date()).format(DATE_FORMAT),
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log('Route', route.params)
      if(route.params === 'today') {
        getVisitorsList(0, todayDate)
      } else {
        getVisitorsList(0, {})
      }
      return () => { };
    }, [navigation])
  );

  useEffect(() => {
    if (response?.status === 200) {
      if (offSET === 0) {
        setVisiitorList(response?.data)
      } else {
        setVisiitorList([...visitorList, ...response?.data])
      }
    } else {
      setVisiitorList([])
    }
  }, [response])

  const getVisitorsList = (offset: any, filterData: any) => {
    setOffset(offset)
    dispatch(getAllLeadsList({
      offset: offset,
      limit: 10,
      start_date: filterData?.startdate ? filterData?.startdate : '',
      end_date: filterData?.enddate ? filterData?.enddate : '',
      search_by_visisor_name: filterData?.search_by_visisor_name ? filterData?.search_by_visisor_name : '',
      search_configuration: filterData?.search_configuration ? filterData?.search_configuration : '',
      visit_score: filterData?.visit_score ? filterData?.visit_score : '',
      visit_status: filterData?.visit_status ? filterData?.visit_status : '',
      lead_status: filterData?.lead_status ? filterData?.lead_status : ''
    }))
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleBulkUploadPress = () => {
    navigation.navigate('BulkUpload')
  }
  const handleAddNewPress = (data: any) => {
    navigation.navigate('AddNewVisitorScreen', { type: 'add', data: {} })
  }
  return (
    <>
      <LeadManagementView
        handleDrawerPress={handleDrawerPress}
        handleBulkUploadPress={handleBulkUploadPress}
        handleAddNewPress={handleAddNewPress}
        visitorList={visitorList}
        setVisiitorList={setVisiitorList}
        moreData={moreData}
        setFilterData={setFilterData}
        filterData={filterData}
        offSET={offSET}
        getVisitorsList={getVisitorsList}
      />
    </>
  )
}

export default LeadManagementScreen