import { getAllProperty, statusUpdate } from 'app/Redux/Actions/propertyActions';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropertyView from './components/PropertyView';
import { useFocusEffect } from '@react-navigation/native';

const PropertyScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [offSET, setOffset] = useState(0)
  const [currentStatus, setCurrentStatus] = useState(1)
  const [currentProperty, setCurrentProperty] = useState({})
  const [resion, setResion] = useState('')
  const propertyData = useSelector((state: any) => state.propertydetailData) || []
  const { response, loading, updateStatus } = propertyData;

  useFocusEffect(
    React.useCallback(() => {
      getallproperty(0, {})
      return () => { };
    }, [navigation])
  );
  useEffect(() => {
    getallproperty(0, {})
  }, [])

  useEffect(() => {
    if (response && response?.status === 200 && updateStatus) {
      getallproperty(0, {})
    }
  }, [propertyData])

  const handleStatusChange = () => {
    dispatch(statusUpdate({
      property_id: currentProperty,
      approve_status: currentStatus === 1 ? 2 : currentStatus === 2 ? 3 : 2,
      resion_id: resion,
    }))
  }


  const getallproperty = (offset: any, data: any) => {
    setOffset(offset)
    dispatch(getAllProperty({
      offset: offset,
      limit: 3,
      start_date: data?.start_date ? data?.start_date : '',
      end_date: data?.end_date ? data?.end_date : '',
      location: data?.location ? data?.location : '',
      property_name: data?.property_name ? data?.property_name : '',
      property_type: data?.property_type ? data?.property_type : '',
    }))
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return (
    <>
      <PropertyView
        handleDrawerPress={handleDrawerPress}
        getallproperty={getallproperty}
        handleStatusChange={() => handleStatusChange()}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
        setCurrentProperty={setCurrentProperty}
        setResion={setResion}
        resion={resion}
        offSET={offSET}
      />
    </>
  );
};

export default PropertyScreen;
