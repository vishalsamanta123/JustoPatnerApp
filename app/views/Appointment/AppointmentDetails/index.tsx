import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AppointmentDetailsView from './Components/AppointmentDetailsView'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointmentDetails } from 'app/Redux/Actions/AppointmentActions'

const AppointmentDetails = ({navigation, route}: any) => {
  const AppointmentId = route?.params || {}
  const [isloading, setIsloading] = useState(false)
  const { response = {}, detail = "" } = useSelector((state: any) => state.appointment)


  const dispatch: any = useDispatch()
  useFocusEffect(
    React.useCallback(() => {
      if (AppointmentId?._id) {
        setIsloading(true)
        dispatch(getAppointmentDetails({ appointment_id: AppointmentId?._id }))
        toGetDatas()
      }
      return () => { };
    }, [navigation, detail]))

  const toGetDatas = () => {
    if (response?.status) {
      setIsloading(false)
    }
  }


  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleStatusUpdate = (data: any) => {
    navigation.navigate('AppointmentAdd', data)
  }
  return (
   <AppointmentDetailsView handleStatusUpdate={handleStatusUpdate} handleBackPress={handleBackPress} data={route?.params} />
  )
}

export default AppointmentDetails