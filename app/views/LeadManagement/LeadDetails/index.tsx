import React, { useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import LeadDetailsView from './Components/LeadDetailsView'
import { useDispatch, useSelector } from 'react-redux'
import { getVisitorDetail } from 'app/Redux/Actions/LeadsActions'
import Loader from 'app/components/CommonScreen/Loader'

const LeadDetails = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch()
  const [isloading, setIsloading] = useState(false)
  const { response = {}, detail = "" } = useSelector((state: any) => state.visitorData)
  console.log('response:yyyyyyy ', response);
  const [allDetails, setAllDetails] = useState({})

  useLayoutEffect(() => {
    const data = route?.params
    if (data._id) {
      setIsloading(true)
      dispatch(getVisitorDetail({
        lead_id: data._id
      }))
      toGetDatas()
    }
  }, [detail])
  const toGetDatas = () => {
    if (detail) {
      setIsloading(false)
      setAllDetails(response.data[0])
    }
  }
  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <>
     
      <LeadDetailsView
        handleBackPress={handleBackPress}
        allDetails={allDetails}
      />
    </>
  )
}

export default LeadDetails