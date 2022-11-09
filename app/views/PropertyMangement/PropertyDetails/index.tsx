import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import PropertyDetailView from './components/PropertyDetailView';

const PropertyDetails = ({navigation,route}: any) => {
  const data = route?.params || {}
  const handleBackPress = () => {
    navigation.goBack();
  };
  const onPressCreatevisit = () => {
    navigation.navigate('AddNewVisitorScreen')
  };
  return (
   <PropertyDetailView data={data} handleBackPress={handleBackPress} onPressCreatevisit={onPressCreatevisit} />
  )
}

export default PropertyDetails;