import React, { useLayoutEffect, useState } from 'react'
import LeadDetailsView from './Components/LeadDetailsView'
import { useDispatch, useSelector } from 'react-redux'
import { getVisitorDetail } from 'app/Redux/Actions/LeadsActions'

const LeadDetails = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const { response = {}, detail = "" } = useSelector((state: any) => state.visitorData)
  const [allDetails, setAllDetails] = useState({})

  useLayoutEffect(() => {
    const data = route?.params
    if (data._id) {
      dispatch(getVisitorDetail({
        lead_id: data._id
      }))
    }
  }, [detail])
  const handleBackPress = () => {
    navigation.goBack()
  }
  const handleStatusUpdate = () => {
    const data = route?.params
    navigation.navigate('FollUpAdd', data)
  }
  return (
    <>
      <LeadDetailsView
        handleBackPress={handleBackPress}
        allDetails={allDetails}
        handleStatusUpdate={handleStatusUpdate}
      />
    </>
  )
}

export default LeadDetails