import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import AddNewVisitorForm from './Components/AddNewVisitorForm'
import { useDispatch, useSelector } from 'react-redux'
import { getVisitorDetail } from 'app/Redux/Actions/LeadsActions'
import Loader from 'app/components/CommonScreen/Loader'

const AddNewVisitorScreen = ({ navigation, route }: any) => {
  console.log('route: ', route);
  const { type } = route?.params || {}
  const dispatch: any = useDispatch()
  const [isloading, setIsloading] = useState(false)
  const { response = {}, detail = "" } = useSelector((state: any) => state.visitorData)
  const [formData, setFormData] = useState({})

  useLayoutEffect(() => {
    if (type === 'edit') {
      const { data = {} } = route?.params
      if (data._id) {
        setIsloading(true)
        dispatch(getVisitorDetail({
          lead_id: data._id
        }))
        toGetDatas()
      }
    }
  }, [detail])
  const toGetDatas = () => {
    if (detail) {
      setIsloading(false)
      setFormData({
        ...response?.data[0].customer_detail,
        expected_possession_date: response?.data[0].expected_possession_date
      })
    }
  }
  const handleBackPress = () => {
    navigation.goBack()
  }
  const OnpressseheduleVisit = () => {
    navigation.navigate('AddAppointmentScreen')
  }
  const OnpressCreateVisit = () => {
    navigation.navigate('LeadManagement')
  }
  return (
    <> {isloading ? <Loader /> : null}
      <AddNewVisitorForm
        handleBackPress={handleBackPress}
        OnpressseheduleVisit={OnpressseheduleVisit}
        OnpressCreateVisit={OnpressCreateVisit}
        type={type}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  )
}

export default AddNewVisitorScreen

// lead_id: '',
    // first_name: '',
    // last_name: '',
    // email: '',
    // mobile: '',
    // gender: '',
    // birth_date: '',
    // address: '',
    // latitude: '',
    // longitude: '',
    // city: '',
    // occupation: '',
    // coumpany_name: '',
    // desigantion: '',
    // office_address: '',
    // configuration_id: '',
    // configuration: '',
    // areain_sqlft: '',
    // income: '',
    // budget: '',
    // funding_type: '',
    // purpose: '',
    // whenby: '',
    // agent_code: '',
    // adhar_no: '',
    // pancard_no: '',
    // whatsapp_no: '',
    // funding_emi_type: '',
    // min_budget: '',
    // min_budget_type: '',
    // max_budget: '',
    // max_budget_type: '',
    // area: '',
    // expected_possession_date: '',