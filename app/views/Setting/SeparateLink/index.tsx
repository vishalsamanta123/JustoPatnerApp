import { View, Text } from 'react-native'
import React from 'react'
import SeparateLinkView from './components/SeparateLinkView';
import { useSelector } from 'react-redux';

const SeparateLinkScreen = ({navigation,route}: any) => {
  const { response = {} } = useSelector((state: any) => state.dashboardData) || {}
    const handleBackPress = () => {
        navigation.goBack();
    }
  return (
    <SeparateLinkView data={route.params} handleBackPress={handleBackPress} response={response.data}/>
  );
}

export default SeparateLinkScreen;