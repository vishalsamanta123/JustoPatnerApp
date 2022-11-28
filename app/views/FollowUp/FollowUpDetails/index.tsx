import React, { useEffect, useLayoutEffect, useState } from 'react'
import FollowUpDetailsView from './Components/FollowUpDetailsView'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFollowUpDetails } from 'app/Redux/Actions/FollowUpActions'
import { useFocusEffect } from '@react-navigation/native'

const FollowUpDetails = ({ navigation, route }: any) => {
  const followUpId = route?.params || ''
  const { response = {}, detail = "" } = useSelector((state: any) => state.followUp)


  const dispatch: any = useDispatch()
  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleStatusUpdate = () => {
    navigation.navigate('FollUpAdd', followUpId)
  }

  useFocusEffect(
    React.useCallback(() => {
      if (followUpId?._id) {
        dispatch(getAllFollowUpDetails({ followup_id: followUpId?._id }))
      }
      return () => { };
    }, [navigation, detail]))

  return (
    <>
      <FollowUpDetailsView
        handleBackPress={handleBackPress}
        handleStatusUpdate={handleStatusUpdate} />
    </>
  )
}

export default FollowUpDetails