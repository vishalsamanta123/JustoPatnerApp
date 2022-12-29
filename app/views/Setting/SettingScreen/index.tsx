import { userLogout } from 'app/Redux/Actions/AuthActions';
import React from 'react'
import { useDispatch } from 'react-redux';
import SettingView from './components/SettingView';
import auth from '@react-native-firebase/auth';


const SettingScreen = ({navigation,route}: any) => {
    const dispatch: any = useDispatch()
    const handleDrawerPress = () => {
        navigation.toggleDrawer()
      };
      const handleNavigation = (navigateTo: any, data: any) => {
      if(navigateTo === 'logout'){
        dispatch(userLogout())
        auth().signOut();
        navigation.navigate('AuthLoading');
      } else{
        navigation.navigate(navigateTo, data)
      }
    }
  return (
    <SettingView handleDrawerPress={handleDrawerPress} handleNavigation={handleNavigation} />
  );
};

export default SettingScreen;