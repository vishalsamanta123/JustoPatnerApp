import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddAppointmentView from './Components/AddAppointmentView'
import { useFocusEffect } from '@react-navigation/native'
import { getAllLeadsList } from 'app/Redux/Actions/LeadsActions'
import { useDispatch, useSelector } from 'react-redux'
import { addAppointment, editAppointment, getAppointmentDetails } from 'app/Redux/Actions/AppointmentActions'
import ErrorMessage from 'app/components/ErrorMessage'
import { RED_COLOR } from 'app/components/utilities/constant'
import strings from 'app/components/utilities/Localization'

const AddAppointmentScreen = ({ navigation, route }: any) => {
  const { data, type } = route?.params || {}
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorDataList)
  const addAppointmentData = useSelector((state: any) => state.appointment)
  const [visitorList, setVisiitorList] = useState<any>([])
  const [offSET, setOffset] = useState(0)

  useEffect(() => {
    if (response?.status === 200) {
      setVisiitorList(response?.data)
    } else {
      setVisiitorList([])
    }
  }, [response])

  const getVisitorsList = (offset: any, array: any) => {
    dispatch(getAllLeadsList({
      offset: 0,
      limit: 10,
      lead_status: 1
    }))
  }


  useFocusEffect(
    React.useCallback(() => {
      if (data?._id) {
        dispatch(getAppointmentDetails({ appointment_id: data?._id }))
      }
      return () => { };
    }, [navigation, addAppointmentData?.detail]))

  const handleAddAppointment = (params: any) => {
    if (type === strings.edit) {
      dispatch(editAppointment(params))
      if (addAppointmentData?.response?.status === 200) {
        navigation.navigate('AppointmentScreen')
      } else {
        ErrorMessage({
          msg: addAppointmentData?.response?.message,
          backgroundColor: RED_COLOR
        })
      }
    } else {
      dispatch(addAppointment(params))
      if (addAppointmentData?.response?.status === 200) {
        navigation.navigate('AppointmentScreen')
      } else {
        ErrorMessage({
          msg: addAppointmentData?.response?.message,
          backgroundColor: RED_COLOR
        })
      }
    }
  }
  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <AddAppointmentView
      handleBackPress={handleBackPress}
      visitorList={visitorList}
      getVisitorsList={getVisitorsList}
      handleAddAppointment={handleAddAppointment}
      type={type}
      data={data}
    />
  )
}

export default AddAppointmentScreen