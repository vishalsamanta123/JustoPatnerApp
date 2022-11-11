import { getAllProperty } from 'app/Redux/Actions/propertyActions';
import React, { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropertyView from './components/PropertyView';

const PropertyScreen = ({navigation}: any) => {
  const dispatch: any = useDispatch()

  useLayoutEffect(() => {
    dispatch(getAllProperty({
      offset: 0,
      limit: 5
    }))
  }, [])
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  };
  return <PropertyView handleDrawerPress={handleDrawerPress} />;
};

export default PropertyScreen;
