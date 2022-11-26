import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddAppointmentView from './Components/AddAppointmentView'
import { useFocusEffect } from '@react-navigation/native'
import { getAllLeadsList } from 'app/Redux/Actions/LeadsActions'
import { useDispatch, useSelector } from 'react-redux'
import { addAppointment, getAppointmentDetails } from 'app/Redux/Actions/AppointmentActions'
import ErrorMessage from 'app/components/ErrorMessage'
import { RED_COLOR } from 'app/components/utilities/constant'

const AddAppointmentScreen = ({ navigation, route }: any) => {
  const {data, type} = route?.params || {}
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorDataList)
  console.log('response: ', response);
  const addAppointmentData = useSelector((state: any) => state.appointment)
  console.log('addAppointmentData: ', addAppointmentData);
  const [visitorList, setVisiitorList] = useState<any>([])
  const [isloading, setIsloading] = useState(false)
  const [offSET, setOffset] = useState(0)

  useEffect(() => {
    if (list) {
      setIsloading(false)
      setVisiitorList(response?.data)
    }
  }, [response])

  const getVisitorsList = (offset: any, array: any) => {
    setIsloading(true)
    setOffset(offset)
    dispatch(getAllLeadsList({
      offset: offset,
      limit: 10,
      lead_status: 1
    }))
    // toGetDatas(array)
  }
  useEffect(() => {
    
  }, [])
  

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (data?._id) {
  //       setIsloading(true)
  //       dispatch(getAppointmentDetails({ appointment_id: data?._id }))
  //       toGetDatas()
  //     }
  //     return () => { };
  //   }, [navigation, addAppointmentData?.detail]))

  // const toGetDatas = () => {
  //   if (response?.status) {
  //     setIsloading(false)
  //   }
  // }
  const handleAddAppointment = (params: any) => {
    setIsloading(true)
    dispatch(addAppointment(params))
    if (addAppointmentData?.response?.status) {
      setIsloading(false)
      navigation.navigate('AppointmentScreen')
    } else {
      ErrorMessage({
        msg: addAppointmentData?.response?.message,
        backgroundColor: RED_COLOR
      })
    }
  }
  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <AddAppointmentView
      handleBackPress={handleBackPress}
      visitorList={visitorList}
      isloading={isloading}
      getVisitorsList={getVisitorsList}
      handleAddAppointment={handleAddAppointment}
      type={type}
      data={data}
    />
  )
}

export default AddAppointmentScreen