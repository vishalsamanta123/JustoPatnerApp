import { View, Text } from 'react-native'
import React from 'react'
import AddNewVisitorForm from './Components/AddNewVisitorForm'

const AddNewVisitorScreen = ({ navigation, route }: any) => {
  const {type} = route?.params || {}
  const handleBackPress = () => {
    navigation.goBack()
  }
  const OnpressseheduleVisit = () => {
    navigation.navigate('AddAppointmentScreen')
  }
  const OnpressCreateVisit = () => {
    navigation.navigate('LeadManagement')
  }
  return (
    <AddNewVisitorForm
      handleBackPress={handleBackPress}
      OnpressseheduleVisit={OnpressseheduleVisit}
      OnpressCreateVisit={OnpressCreateVisit}
      type={type}
    />
  )
}

export default AddNewVisitorScreen