import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import PropertyDetailView from './components/PropertyDetailView';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyDetail } from 'app/Redux/Actions/propertyActions';
import Loader from 'app/components/CommonScreen/Loader';

const PropertyDetails = ({ navigation, route }: any) => {
  const [isloading, setIsloading] = useState(false)
  const dispatch: any = useDispatch()
  const data = route?.params || {}
  //console.log('data: in property ', data);
  useLayoutEffect(() => {
    setIsloading(true)
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
    <>
     
      <PropertyDetailView data={data} handleBackPress={handleBackPress} onPressCreatevisit={onPressCreatevisit} setIsloading={setIsloading} />
    </>
  )
}

export default PropertyDetails;