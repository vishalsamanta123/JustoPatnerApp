import { getAllProperty } from 'app/Redux/Actions/propertyActions';
import React, { useLayoutEffect, useState ,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import PropertyView from './components/PropertyView';

const PropertyScreen = ({navigation}: any) => {
  const dispatch: any = useDispatch()
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    getallproperty()
  }, [])

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
     /*  setOffset(offset+1)
      dispatch(getAllProperty({
        offset: offset+1,
        limit: limit,
        
      })) */
  };
  return <PropertyView 
  handleDrawerPress={handleDrawerPress} 
  Onreachedend = {Onreachedend}
  getallproperty={getallproperty}
   />;
};

export default PropertyScreen;
