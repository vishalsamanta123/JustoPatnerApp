import React from 'react'
import SettingView from './components/SettingView';

const SettingScreen = ({navigation,route}: any) => {
    const handleDrawerPress = () => {
        navigation.toggleDrawer()
      };
      const handleNavigation = (navigateTo: any, data: any) => {
        navigation.navigate(navigateTo, data)
    }
  return (
    <SettingView handleDrawerPress={handleDrawerPress} handleNavigation={handleNavigation} />
  );
};

export default SettingScreen;