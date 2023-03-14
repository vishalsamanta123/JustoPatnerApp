import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddAppointmentView from './Components/AddAppointmentView'
import { useFocusEffect } from '@react-navigation/native'
import { getAllLeadsList } from 'app/Redux/Actions/LeadsActions'
import { useDispatch, useSelector } from 'react-redux'
import { addAppointment, addEditAppointmntRemove, editAppointment, getAppointmentDetails } from 'app/Redux/Actions/AppointmentActions'
import ErrorMessage from 'app/components/ErrorMessage'
import { GREEN_COLOR, RED_COLOR } from 'app/components/utilities/constant'
import strings from 'app/components/utilities/Localization'
import { getAllAlloctaeProperty } from 'app/Redux/Actions/propertyActions'

const AddAppointmentScreen = ({ navigation, route }: any) => {
  const { data = {}, type = "" } = route?.params || {}
  console.log('data: ', data);
  const dispatch: any = useDispatch()
  const { response = {}, list = "" } = useSelector((state: any) => state.visitorDataList)
  const addAppointmentData = useSelector((state: any) => state.appointment)
  const editAddAppointmentData = useSelector((state: any) => state.editAddAppointment)
  const propertyData = useSelector((state: any) => state.propertyData) || {};
  const [visitorList, setVisiitorList] = useState<any>([])
  const [allProperty, setAllProperty] = useState<any>([]);
  const [PropertyStatus, setPropertyStatus] = useState(false)

  const [addAppointmentForm, setAddAppointmentForm] = useState<any>({
    lead_id: '',
    property_id: '',
    property_title: '',
    appointment_date: '',
    appointment_time: '',
    type: 1,
    pickup: '',
    pickup_location: '',
    number_of_guest: '',
    pickup_address: '',
    lead_name: '',
    pickup_latitude: '',
    pickup_longitude: '',
  })

  useFocusEffect(
    React.useCallback(() => {
      if (type === strings.edit) {
        if (data?._id) {
          dispatch(getAppointmentDetails({ appointment_id: data?._id }))
        }
      } else if (type === 'Add') {
        setAddAppointmentForm({
          ...addAppointmentForm,
          lead_id: data?._id,
          lead_name: data?.customer_first_name ? data?.customer_first_name : data?.customer_detail?.first_name,
          pickup: data?.pickup ? data?.pickup : addAppointmentForm?.pickup,
          property_id: data?.property_id,
          property_title: data?.property_title
        })
      }
      dispatch(
        getAllAlloctaeProperty({
          offset: 0,
        })
      );

      handlePropertSelect()
      return () => { };
    }, [navigation]))

  const handlePropertSelect = () => {
    if (type === 'Add') {
      if (data?.property_id !== '' && data?.property_id !== null) {
        setPropertyStatus(true)
      }
      else {
        setPropertyStatus(false)
      }
    } else {
      setPropertyStatus(false)
    }
  }

  useEffect(() => {
    if (
      propertyData?.response?.status === 200 &&
      propertyData?.type === "ALLOCATE"
    ) {
      setAllProperty(propertyData?.response?.data);
    }
  }, [propertyData]);


  useEffect(() => {
    if (type === strings.edit) {
      if (addAppointmentData?.response?.status === 200) {
        setAddAppointmentForm({
          lead_id: addAppointmentData?.response?.data[0]?.lead_id ?
            addAppointmentData?.response?.data[0]?.lead_id : '',
          property_id: addAppointmentData?.response?.data[0]?.property_id ?
            addAppointmentData?.response?.data[0]?.property_id : '',
          appointment_date: addAppointmentData?.response?.data[0]?.appointment_date ?
            addAppointmentData?.response?.data[0]?.appointment_date : '',
          appointment_time: addAppointmentData?.response?.data[0]?.appointment_time ?
            addAppointmentData?.response?.data[0]?.appointment_time : '',
          type: 1,
          pickup: addAppointmentData?.response?.data[0]?.pickup ?
            addAppointmentData?.response?.data[0]?.pickup : '',
          pickup_location: addAppointmentData?.response?.data[0]?.pickup_location ?
            addAppointmentData?.response?.data[0]?.pickup_location : '',
          number_of_guest: addAppointmentData?.response?.data[0]?.number_of_guest ?
            addAppointmentData?.response?.data[0]?.number_of_guest : '',
          pickup_address: addAppointmentData?.response?.data[0]?.pickup_address ?
            addAppointmentData?.response?.data[0]?.pickup_address : '',
          lead_name: addAppointmentData?.response?.data[0]?.customer_first_name ?
            addAppointmentData?.response?.data[0]?.customer_first_name : '',
          pickup_latitude: addAppointmentData?.response?.data[0]?.pickup_latitude ?
            addAppointmentData?.response?.data[0]?.pickup_latitude : '',
          pickup_longitude: addAppointmentData?.response?.data[0]?.pickup_longitude ?
            addAppointmentData?.response?.data[0]?.pickup_longitude : '',
          appointment_id: addAppointmentData?.response?.data[0]?._id ?
            addAppointmentData?.response?.data[0]?._id : '',
        })
        if (addAppointmentData?.response?.data[0]?.property_id !== '' && addAppointmentData?.response?.data[0]?.property_id !== null) {
          setPropertyStatus(true)
        } else {
          setPropertyStatus(false)
        }
      }
    }
  }, [addAppointmentData, type])
  useEffect(() => {
    if (response?.status === 200) {
      setVisiitorList(response?.data)
    } else {
      setVisiitorList([])
    }
  }, [response])

  const getVisitorsList = (offset: any, array: any) => {
    dispatch(getAllLeadsList({
      offset: 0,
      limit: 10,
      lead_status: 1,
    }))
  }

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (addAppointmentForm.lead_id == undefined || addAppointmentForm.lead_id == '') {
      isError = false;
      errorMessage = "Lead is require. Please Select the lead Status"
    }
    else if (
      addAppointmentForm?.property_id === "" || addAppointmentForm?.property_id === undefined
      || addAppointmentForm?.property_id === null
    ) {
      isError = false;
      errorMessage = "Please select property name";
    }
    else if (addAppointmentForm.appointment_date == undefined || addAppointmentForm.appointment_date == '') {
      isError = false;
      errorMessage = "Appointment Date is require. Please Select the Appointment Date Status"
    }
    else if (addAppointmentForm.appointment_time == undefined || addAppointmentForm.appointment_time == '') {
      isError = false;
      errorMessage = "Appointment Time is require. Please Select the Appointment Time Status"
    } else if (addAppointmentForm.pickup === strings.yes) {
      if (addAppointmentForm.pickup_location === '' || addAppointmentForm.pickup_location === undefined) {
        isError = false;
        errorMessage = "Pickup Location is require. Please Select the Pickup Location"
      } else if (addAppointmentForm.pickup_address === '' || addAppointmentForm.pickup_address === undefined) {
        isError = false;
        errorMessage = "Pickup Area is require. Please Select the Pickup Area"
      } else if (addAppointmentForm.number_of_guest === '' || addAppointmentForm.number_of_guest === undefined) {
        isError = false;
        errorMessage = "Number Of Guest is require. Please Enter the Number Of Guest"
      }
    }
    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }
  const handleBtnPress = () => {
    if (validation()) {
      if (type === strings.edit) {
        dispatch(editAppointment(addAppointmentForm))
      } else {
        dispatch(addAppointment(addAppointmentForm))
      }
    }
  }
  useEffect(() => {
    if (editAddAppointmentData?.response?.status === 200) {
      navigation.navigate('AppointmentScreen')
      dispatch(addEditAppointmntRemove())
      ErrorMessage({
        msg: editAddAppointmentData?.response?.message,
        backgroundColor: GREEN_COLOR
      })
    }
  }, [editAddAppointmentData])

  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <AddAppointmentView
      handleBackPress={handleBackPress}
      visitorList={visitorList}
      getVisitorsList={getVisitorsList}
      type={type}
      data={data}
      handleBtnPress={handleBtnPress}
      addAppointmentForm={addAppointmentForm}
      setAddAppointmentForm={setAddAppointmentForm}
      allProperty={allProperty}
      PropertyStatus={PropertyStatus}
      setPropertyStatus={setPropertyStatus}
      pickup={data?.pickup}
    />
  )
}

export default AddAppointmentScreen