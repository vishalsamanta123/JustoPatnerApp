import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import AddNewVisitorForm from './Components/AddNewVisitorForm'
import { useDispatch, useSelector } from 'react-redux'
import { editVisitor, getVisitorDetail } from 'app/Redux/Actions/LeadsActions'
import Loader from 'app/components/CommonScreen/Loader'
import ErrorMessage from 'app/components/ErrorMessage'
import { RED_COLOR } from 'app/components/utilities/constant'
import { getAllMaster } from 'app/Redux/Actions/MasterActions'

const AddNewVisitorScreen = ({ navigation, route }: any) => {
  const { type } = route?.params || {}
  const dispatch: any = useDispatch()
  const [isloading, setIsloading] = useState(false)
  const { response = {}, detail = "", edit = "", create = "" } = useSelector((state: any) => state.visitorData)
  const [formData, setFormData] = useState<any>({
    lead_id: '',
    first_name: '',
    min_budget_type: '',
    adhar_no: '',
    pancard_no: '',
    gender: '',
    birth_date: '',
    mobile: '',
    whatsapp_no: '',
    email: '',
    location: '',
    locality: '',
    configuration_id: '',
    expected_possession_date: '',
    area: '',
    min_budget: '',
    max_budget: '',
    funding_type: '',
    funding_emi_type: '',
    purpose: '',
    occupation: '',
    desigantion: '',
    office_address: '',
    module_id: "",
    property_id: '',
  })
  const [masterDatas, setMasterDatas] = useState([])
  useEffect(() => {
    if (edit || create) {
      if (response.status === 200) {
        navigation.navigate('LeadManagement')
        setIsloading(false)
      } else {
        ErrorMessage({
          msg: response?.message,
          backgroundColor: RED_COLOR
        })
      }
    }
  }, [edit, create])
  const masterData = useSelector((state: any) => state.masterData) || {}
  const handleMasterDatas = (data: any) => {
    setIsloading(true)
    dispatch(getAllMaster({
      type: data
    }))
    if (masterData?.response?.status === 200) {
      setIsloading(false)
      setMasterDatas(masterData?.response?.data?.length > 0 ? masterData?.response?.data : [])
    }
  }
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
        ...response?.data[0]?.customer_detail,
        expected_possession_date: response?.data[0]?.expected_possession_date,
        lead_id: response?.data[0]?._id
      })
    }
  }

  const handleBackPress = () => {
    navigation.goBack()
  }
  const OnpressseheduleVisit = () => {
    navigation.navigate('AddAppointmentScreen')
  }

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (formData?.lead_id === '' || formData?.first_name === '' || formData?.min_budget_type === '' ||
      formData?.adhar_no === '' || formData?.pancard_no === '' || formData?.gender === '' ||
      formData?.birth_date === '' || formData?.mobile === '' || formData?.whatsapp_no === '' ||
      formData?.email === '' || formData?.location === '' || formData?.locality === '' ||
      formData?.configuration_id === '' || formData?.expected_possession_date === '' ||
      formData?.area === '' || formData?.min_budget === '' || formData?.max_budget === '' ||
      formData?.funding_type === '' || formData?.funding_emi_type === '' || formData?.purpose === '' ||
      formData?.occupation === '' || formData?.desigantion === '' || formData?.office_address === ''
    ) {
      isError = false;
      errorMessage = "All Fields are required ,Please fill all"
    }
    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }
  const OnpressCreateEdit = () => {
    if (validation()) {
      const params = {
        lead_id: formData?.lead_id,
        first_name: formData?.first_name,
        email: formData?.email,
        mobile: formData?.mobile,
        gender: formData?.gender,
        birth_date: formData?.birth_date,
        address: formData?.address,
        location: formData?.location,
        latitude: formData?.latitude,
        longitude: formData?.longitude,
        city: formData?.city,
        occupation: formData?.occupation,
        coumpany_name: formData?.coumpany_name,
        desigantion: formData?.desigantion,
        office_address: formData?.office_address,
        configuration_id: formData?.configuration_id,
        configuration: formData?.configuration,
        areain_sqlft: formData?.areain_sqlft,
        income: formData?.income,
        budget: formData?.budget,
        funding_type: formData?.funding_type,
        purpose: formData?.purpose,
        whenby: formData?.whenby,
        agent_code: formData?.agent_code,
        adhar_no: formData?.adhar_no,
        pancard_no: formData?.pancard_no,
        whatsapp_no: formData?.whatsapp_no,
        funding_emi_type: formData?.funding_emi_type,
        min_budget: formData?.min_budget,
        min_budget_type: formData?.min_budget_type,
        max_budget: formData?.max_budget,
        max_budget_type: formData?.max_budget_type,
        area: formData?.area,
        expected_possession_date: formData?.expected_possession_date,
      }
      setIsloading(true)
      if (type === 'edit') {
        dispatch(editVisitor(params))
      } else {
        navigation.navigate('LeadManagement')
      }
    }
  }

  return (
    <>
      {isloading ? <Loader /> : null}
      <AddNewVisitorForm
        handleBackPress={handleBackPress}
        OnpressseheduleVisit={OnpressseheduleVisit}
        OnpressCreateEdit={OnpressCreateEdit}
        type={type}
        formData={formData}
        setFormData={setFormData}
        handleMasterDatas={handleMasterDatas}
        masterDatas={masterDatas}
      />
    </>
  )
}

export default AddNewVisitorScreen

// lead_id: '',/////
    // first_name: '',
    // last_name: '',////
    // address: '',////
    // latitude: '',////
    // longitude: '',////
    // city: '',////
    // coumpany_name: '',////
    // configuration_id: '',////
    // areain_sqlft: '',////
    // income: '',////
    // budget: '',///
    // whenby: '',////
    // agent_code: '',////
    // min_budget_type: '',///
    // max_budget_type: '',////
