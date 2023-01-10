import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppointmentDetailsView from './Components/AppointmentDetailsView'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointmentDetails } from 'app/Redux/Actions/AppointmentActions'

const AppointmentDetails = ({ navigation, route }: any) => {
  const AppointmentId = route?.params || {}
  const [detailsData, setDetailsData] = useState<any>({})
  const { response = {}, detail = "" } = useSelector((state: any) => state.appointment)

  const dispatch: any = useDispatch()
  useFocusEffect(
    React.useCallback(() => {
      if (AppointmentId?._id) {
        dispatch(getAppointmentDetails({ appointment_id: AppointmentId?._id }))
      }
      return () => { };
    }, [navigation, detail]))

  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setDetailsData(response?.data[0])
      }
    }
  }, [response])

  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleStatusUpdate = (data: any) => {
    navigation.navigate('AppointmentAdd', data)
  }
  return (
    <AppointmentDetailsView
      handleStatusUpdate={handleStatusUpdate}
      handleBackPress={handleBackPress}
      detailsData={detailsData}
    />
  )
}

export default AppointmentDetails