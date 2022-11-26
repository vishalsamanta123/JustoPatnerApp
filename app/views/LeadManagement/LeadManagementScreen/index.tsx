import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import LeadManagementView from './Components/LeadManagementView'
import { getAllLeadsList } from 'app/Redux/Actions/LeadsActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'app/components/CommonScreen/Loader'
import { useFocusEffect } from '@react-navigation/native'

const LeadManagementScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorDataList)
  const moreData = response?.total_data || 0
  const [filterData, setFilterData] = useState({
    startdate: '',
    enddate: '',
    search_by_visisor_name: '',
    search_configuration: '',
    visit_score: ''
  })
  const [visitorList, setVisiitorList] = useState<any>([])
  const [isloading, setIsloading] = useState(false)
  const [offSET, setOffset] = useState(0)

  useFocusEffect(
    React.useCallback(() => {
      getVisitorsList(offSET, {})
      return () => { };
    }, [navigation])
  );

  useEffect(() => {
    if (list) {
      setIsloading(false)
      if (offSET === 0) {
        setVisiitorList(response?.data)
      } else {
        setVisiitorList([...visitorList, ...response?.data])
      }
    }
  }, [response])

  const getVisitorsList = (offset: any, filterData: any) => {
    setIsloading(true)
    setOffset(offset)
    dispatch(getAllLeadsList({
      offset: offset,
      limit: 3,
      start_date: filterData?.startdate ? filterData?.startdate : '',
      end_date: filterData?.enddate ? filterData?.enddate : '',
      search_by_visisor_name: filterData?.search_by_visisor_name ? filterData?.search_by_visisor_name : '',
      search_configuration: filterData?.search_configuration ? filterData?.search_configuration : '',
      visit_score: filterData?.visit_score ? filterData?.visit_score : ''
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
      {isloading ? <Loader /> : null}
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
        isloading={isloading}
        getVisitorsList={getVisitorsList}
        setIsloading={setIsloading}
      />
    </>
  )
}

export default LeadManagementScreen