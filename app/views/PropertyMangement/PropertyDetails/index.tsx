import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import PropertyDetailView from './components/PropertyDetailView';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyDetail } from 'app/Redux/Actions/propertyActions';

const PropertyDetails = ({ navigation, route }: any) => {
  const [isloading, setIsloading] = useState(false)
  const dispatch: any = useDispatch()
  const data = route?.params || {}

  useLayoutEffect(() => {
    setIsloading(true)
    dispatch(getPropertyDetail({
      property_id: data.property_id ? data.property_id : ''
    }))
  }, [])
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <>
      <PropertyDetailView data={data} handleBackPress={handleBackPress}
        setIsloading={setIsloading} />
    </>
  )
}

export default PropertyDetails;