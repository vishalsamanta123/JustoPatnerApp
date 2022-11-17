import { getAllProperty } from 'app/Redux/Actions/propertyActions';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropertyView from './components/PropertyView';
import Loader from 'app/components/CommonScreen/Loader';

const PropertyScreen = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)
  const [isloading, setIsloading] = useState(false)

  useEffect(() => {
    getallproperty()
  }, [])

  const getallproperty = () => {
    setIsloading(true)
    dispatch(getAllProperty({
      offset: 0,
      limit: limit,

    }))
  }
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  const Onreachedend = () => {
   setOffset(offset + 1)
    dispatch(getAllProperty({
      offset: offset + 1,
      limit: limit,
    }))
  };
  return (
    <>
      {isloading ? <Loader /> : null}
      <PropertyView
        handleDrawerPress={handleDrawerPress}
        Onreachedend={Onreachedend}
        getallproperty={getallproperty}
        setIsloading={setIsloading}
      />
    </>
  );
};

export default PropertyScreen;
