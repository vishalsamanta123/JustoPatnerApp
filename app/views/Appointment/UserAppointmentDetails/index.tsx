import { View, Text } from 'react-native'
import React, { useState } from 'react'
import UserAppointmentDetailsView from './Components/UserAppointmentDetailsView'

const UserAppointmentDetails = ({navigation,route}: any) => {
 
  const [status , setStatus] = useState(route?.params)
  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
   <UserAppointmentDetailsView handleBackPress={handleBackPress} status={status} />
  )
}

export default UserAppointmentDetails