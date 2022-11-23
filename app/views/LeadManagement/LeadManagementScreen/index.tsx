import React, { useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import LeadManagementView from './Components/LeadManagementView'
import { getAllLeadsList } from 'app/Redux/Actions/LeadsActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'app/components/CommonScreen/Loader'
import { useFocusEffect } from '@react-navigation/native'

const LeadManagementScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorDataList)
  //console.log('response: hhhhhhhhh', response);
  const moreData = response?.total_data
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
      getVisitorsList(offSET, [])
      return () => { };
    }, [navigation])
  );
  const getVisitorsList = (offset: any, array: any) => {
    setIsloading(true)
    setOffset(offset)
    dispatch(getAllLeadsList({
      offset: offset,
      limit: 4,
      start_date: filterData.startdate,
      end_date: filterData.enddate,
      search_by_visisor_name: filterData.search_by_visisor_name,
      search_configuration: filterData.search_configuration,
      visit_score: filterData.visit_score
    }))
    toGetDatas(array)
  }
  const toGetDatas = (array: any) => {
    console.log('list: ', list);
    if (list) {
      setIsloading(false)
      if (offSET === 0) {
        setVisiitorList(response?.data)
      } else {
        setVisiitorList([...array, ...response?.data])
      }
    }
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const handleBulkUploadPress = () => {
    navigation.navigate('BulkUpload')
  }
  const handleAddNewPress = (data: any) => {
    navigation.navigate('AddNewVisitorScreen')
  }
  // const Onreachedend = (offSet: any) => {
  //   setOffset(offSet)
  //   setIsloading(true)
  //   dispatch(getAllLeadsList({
  //     offset: offSet,
  //     limit: 4,
  //     start_date: filterData.startdate,
  //     end_date: filterData.enddate,
  //     search_by_visisor_name: filterData.search_by_visisor_name,
  //     search_configuration: filterData.search_configuration,
  //     visit_score: filterData.visit_score
  //   }))
  //   toGetDatas()
  // };
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
        // Onreachedend={Onreachedend}
        getVisitorsList={getVisitorsList}
      />
    </>
  )
}

export default LeadManagementScreen