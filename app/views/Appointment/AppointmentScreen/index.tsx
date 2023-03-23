import { View, Text } from 'react-native'
import React from 'react'
import AppointmentView from './Components/AppointmentView'

const AppointmentScreen = ({navigation, route}: any) => {
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
      }; 
  return (
    <AppointmentView handleDrawerPress={handleDrawerPress} params={route.params}/>
  )
}

export default AppointmentScreen