import React, { useState, useEffect } from 'react'
import PrivacyPolicyView from './components/PrivacyPolicyView'
import strings from 'app/components/utilities/Localization'

const PrivacyPolicy = ({navigation, route }: any) => {
  const contentShow = route?.params;
  const onPressBack = () => {
    navigation.goBack()
  }

  return (
    <PrivacyPolicyView  onPressBack={onPressBack} contentShow={contentShow}/> 
  )
}

export default PrivacyPolicy