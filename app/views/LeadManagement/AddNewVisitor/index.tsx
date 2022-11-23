import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import AddNewVisitorForm from './Components/AddNewVisitorForm'
import { useDispatch, useSelector } from 'react-redux'
import { addVisitor, editVisitor, getVisitorDetail } from 'app/Redux/Actions/LeadsActions'
import Loader from 'app/components/CommonScreen/Loader'
import ErrorMessage from 'app/components/ErrorMessage'
import { RED_COLOR } from 'app/components/utilities/constant'
import { getAllMaster } from 'app/Redux/Actions/MasterActions'
import { getAllProperty } from 'app/Redux/Actions/propertyActions'

const AddNewVisitorScreen = ({ navigation, route }: any) => {
  const { type } = route?.params || {}
  const dispatch: any = useDispatch()
  const [isloading, setIsloading] = useState(false)
  const { response = {}, detail = "", edit = "", create = "" } = useSelector((state: any) => state.visitorData)
  const [formData, setFormData] = useState<any>({
    lead_id: '',
    first_name: '',
    min_budget_type: 'L',
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
    min_budget: '',
    max_budget: '',
    max_budget_type: '',
    funding_type: '',
    funding_emi_type: '',
    purpose: '',
    occupation: '',
    desigantion: '',
    office_address: '',
    module_id: '',
    property_id: '',
    property_type_title: '',
    min_emi_budget: '',
    min_emi_budget_type: 'L',
    max_emi_budget: '',
    max_emi_budget_type: 'L',
    areain_sqlft: ''
  })
  const [masterDatas, setMasterDatas] = useState<any>([])
  const [allProperty, setAllProperty] = useState<any>([])
  const masterData = useSelector((state: any) => state.masterData) || {}
  const propertyData = useSelector((state: any) => state.propertyData) || {}
  useEffect(() => {
    // if (edit || create) {
    //   if (response?.status === 200) {
    //     navigation.navigate('LeadManagement')
    //     setIsloading(false)
    //   } else {
    //     ErrorMessage({
    //       msg: response?.message,
    //       backgroundColor: RED_COLOR
    //     })
    //   }
    // }
  }, [edit, create])
  const handleMasterDatas = (data: any) => {
    setIsloading(true)
    dispatch(getAllMaster({
      type: data
    }))
  }
  useEffect(() => {
    if (masterData?.response?.status === 200) {
      setIsloading(false)
      setMasterDatas(masterData?.response?.data?.length > 0 ? masterData?.response?.data : [])
    }
  }, [masterData])
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
        lead_id: response?.data[0]?._id,
        property_id: response?.data[0]?.property_id,
        property_title: response?.data[0]?.property_title,
        property_type_title: response?.data[0]?.property_type_title,
        locality: ''
      })
    }
  }

  const handleBackPress = () => {
    navigation.goBack()
  }
  const OnpressseheduleVisit = () => {
    navigation.navigate('AddAppointmentScreen')
  }
  const handleProperty = () => {
    setIsloading(true)
    dispatch(getAllProperty({
      offset: 0,
      limit: 10,
    }))
    getAllPropertyData()
  }
  const getAllPropertyData = () => {
    if (propertyData?.response?.status === 200) {
      setIsloading(false)
      setAllProperty(propertyData?.response?.data)
    }
  }
  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
    if (formData?.property_id === '' || formData?.property_type_title === '') {
      isError = false;
      errorMessage = "Please fill property name"
    } else {
      if (formData?.first_name === '') {
        isError = false;
        errorMessage = "Please fill visitor name"
      } else {
        if (formData?.adhar_no === '') {
          isError = false;
          errorMessage = "Please fill aadhar number"
        } else {
          if (formData?.pancard_no === '') {
            isError = false;
            errorMessage = "Please fill pancard number"
          } else {
            if (formData?.gender === '') {
              isError = false;
              errorMessage = "Please fill gender"
            } else {
              if (formData?.birth_date === '') {
                isError = false;
                errorMessage = "Please fill date of birth"
              } else {
                if (formData?.mobile === '') {
                  isError = false;
                  errorMessage = "Please fill mobile number"
                } else {
                  if (formData?.whatsapp_no === '') {
                    isError = false;
                    errorMessage = "Please fill wattsapp number"
                  } else {
                    if (formData?.email === '') {
                      isError = false;
                      errorMessage = "Please fill email id"
                    } else {
                      if (formData?.location === '') {
                        isError = false;
                        errorMessage = "Please fill location"
                      } else {
                        if (formData?.locality === '') {
                          isError = false;
                          errorMessage = "Please fill locality"
                        } else {
                          if (formData?.configuration_id === '') {
                            isError = false;
                            errorMessage = "Please fill configuration"
                          } else {
                            if (formData?.property_id === '') {
                              isError = false;
                              errorMessage = "Please fill property"
                            } else {
                              if (formData?.expected_possession_date === '') {
                                isError = false;
                                errorMessage = "Please fill expected possession date"
                              } else {
                                if (formData?.areain_sqlft === '') {
                                  isError = false;
                                  errorMessage = "Please fill area filled"
                                } else {
                                  if (formData?.min_budget === '') {
                                    isError = false;
                                    errorMessage = "Please fill minimum budget"
                                  } else {
                                    if (formData?.min_budget_type === '') {
                                      isError = false;
                                      errorMessage = "Please fill minimum budget type"
                                    } else {
                                      if (formData?.max_budget === '') {
                                        isError = false;
                                        errorMessage = "Please fill maximum budget"
                                      } else {
                                        if (formData?.funding_type === '') {
                                          isError = false;
                                          errorMessage = "Please fill funding type"
                                        } else {
                                          if (formData?.min_emi_budget === '') {
                                            isError = false;
                                            errorMessage = "Please fill minimum emi budget"
                                          } else {
                                            if (formData?.min_emi_budget_type === '') {
                                              isError = false;
                                              errorMessage = "Please fill minimum emi budget type"
                                            } else {
                                              if (formData?.max_emi_budget === '') {
                                                isError = false;
                                                errorMessage = "Please fill maximum emi budget"
                                              } else {
                                                if (formData?.max_emi_budget_type === '') {
                                                  isError = false;
                                                  errorMessage = "Please fill maximum emi budget type"
                                                } else {
                                                  if (formData?.purpose === '') {
                                                    isError = false;
                                                    errorMessage = "Please fill purpose"
                                                  } else {
                                                    if (formData?.occupation === '') {
                                                      isError = false;
                                                      errorMessage = "Please fill occupation"
                                                    } else {
                                                      if (formData?.desigantion === '') {
                                                        isError = false;
                                                        errorMessage = "Please fill desigantion"
                                                      } else {
                                                        if (formData?.office_address === '') {
                                                          isError = false;
                                                          errorMessage = "Please fill office address"
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
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
  const OnpressCreateEdit = () => {
    //if (validation()) {
      setIsloading(true)
      if (type === 'edit') {
        const edit_params = {
          //all for edit
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
          agent_code: formData?.agent_code,//not in add time
          adhar_no: formData?.adhar_no,
          pancard_no: formData?.pancard_no,
          whatsapp_no: formData?.whatsapp_no,
          funding_emi_type: formData?.funding_emi_type,
          min_budget: formData?.min_budget,
          min_budget_type: formData?.min_budget_type,
          max_budget: formData?.max_budget,
          max_budget_type: formData?.max_budget_type,
          expected_possession_date: formData?.expected_possession_date,
          property_id: formData?.property_id,
          property_type_title: '',
          min_emi_budget: formData?.min_emi_budget ? formData.min_emi_budget : '',
          min_emi_budget_type: formData?.min_emi_budget_type ? formData?.min_emi_budget_type : '',
          max_emi_budget: formData?.max_emi_budget ? formData?.max_emi_budget : '',
          max_emi_budget_type: formData?.max_emi_budget_type ? formData?.max_emi_budget_type : '',
          locality: formData?.locality,
        }
        dispatch(editVisitor(edit_params))
      } else {
        const add_params = {
          //all for add
          module_id: '',
          first_name: formData?.first_name,
          email: formData?.email,
          mobile: formData?.mobile,
          gender: formData?.gender,
          birth_date: formData?.birth_date,
          address: formData.location,
          location: formData?.location,
          latitude: '',
          longitude: '',
          city: formData?.location,
          occupation: formData?.occupation,
          coumpany_name: 'itinformatix',
          desigantion: formData?.desigantion,
          office_address: formData?.office_address,
          configuration_id: formData?.configuration_id,
          configuration: formData?.configuration,
          areain_sqlft: formData?.areain_sqlft,
          budget: formData.max_budget,
          funding_type: formData?.funding_type,
          purpose: formData?.purpose,
          adhar_no: formData?.adhar_no,
          pancard_no: formData?.pancard_no,
          whatsapp_no: formData?.whatsapp_no,
          funding_emi_type: '',
          min_budget: formData?.min_budget,
          min_budget_type: formData?.min_budget_type,
          max_budget: formData?.max_budget,
          max_budget_type: formData?.max_budget_type,
          expected_possession_date: formData?.expected_possession_date,
          property_id: formData?.property_id,
          property_type_title: formData.property_type_title,
          min_emi_budget: formData?.min_emi_budget ? formData?.min_emi_budget : '',
          min_emi_budget_type: formData?.min_emi_budget_type ? formData?.min_emi_budget_type : '',
          max_emi_budget: formData?.max_emi_budget ? formData?.max_emi_budget : '',
          max_emi_budget_type: formData?.max_emi_budget_type ? formData?.max_emi_budget_type : '',
          locality: formData?.locality,
        }
        setIsloading(false)
        dispatch(addVisitor(add_params))
        // navigation.navigate('LeadManagement')
      }
    //}
  }

  return (
    <>
      {isloading ? <Loader /> : null}
      <AddNewVisitorForm
        handleBackPress={handleBackPress}
        OnpressseheduleVisit={OnpressseheduleVisit}
        OnpressCreateEdit={OnpressCreateEdit}
        type={type}
        isloading={isloading}
        formData={formData}
        setFormData={setFormData}
        handleMasterDatas={handleMasterDatas}
        masterDatas={masterDatas}
        handleProperty={handleProperty}
        allProperty={allProperty}
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
