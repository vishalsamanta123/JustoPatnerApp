import { getAllProperty, statusUpdate } from 'app/Redux/Actions/propertyActions';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropertyView from './components/PropertyView';

const PropertyScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [currentStatus, setCurrentStatus] = useState(1)
  const [currentProperty, setCurrentProperty] = useState({})
  const [resion, setResion] = useState('')

  const propertyData = useSelector((state: any) => state.propertydetailData) || []
  const { response, loading, updateStatus } = propertyData;


  useEffect(() => {
    getallproperty()
  }, [])

  useEffect(() => {
    if (response && response?.status === 200 && updateStatus) {
      getallproperty()
    } else {
      //errorToast(response.message);
    }
  }, [propertyData])

  const handleStatusChange = () => {
    dispatch(statusUpdate({
      property_id: currentProperty,
      approve_status: currentStatus === 1 ? 2 : currentStatus === 2 ? 3 : 2,
      resion_id: resion,
    }))


    // dispatch(getAllAgentList({
    //   offset: 0,
    //   limit: 5,
    //   module_id: '',
    //   start_date: '',
    //   end_date: '',
    //   user_type: 2,
    //   search_by_name: '',
    //   search_by_location: '',
    //   status: ''
    // }))
    //setChangeStatus({ _id: '', status: false })
  }


  const getallproperty = () => {
    dispatch(getAllProperty({
      offset: 0,
      limit: limit,

    }))
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const Onreachedend = () => {
    //  setOffset(offset + 1)
    dispatch(getAllProperty({
      offset: offset + 1,
      limit: limit,
    }))
  };
  return (
    <>
      <PropertyView
        handleDrawerPress={handleDrawerPress}
        Onreachedend={Onreachedend}
        getallproperty={getallproperty}
        handleStatusChange={() => handleStatusChange()}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        setCurrentProperty={setCurrentProperty}
        setResion={setResion}
        resion={resion}
      />
    </>
  );
};

export default PropertyScreen;
