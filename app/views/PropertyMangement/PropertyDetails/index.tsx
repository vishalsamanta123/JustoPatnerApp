import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useLayoutEffect } from 'react'
import PropertyDetailView from './components/PropertyDetailView';
import { useSelector } from 'react-redux';

const PropertyDetails = ({navigation,route}: any) => {
  const data = route?.params || {}
  useLayoutEffect(() => {
    
  }, [])
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