import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useLayoutEffect } from 'react'
import PropertyDetailView from './components/PropertyDetailView';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyDetail } from 'app/Redux/Actions/propertyActions';

const PropertyDetails = ({navigation,route}: any) => {
  const dispatch: any = useDispatch()
  const data = route?.params || {}
  //console.log('data: in property ', data);
   useLayoutEffect(() => {
    dispatch(getPropertyDetail({
      property_id: data.property_id
    }))
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