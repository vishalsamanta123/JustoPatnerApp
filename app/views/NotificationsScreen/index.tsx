import { View, Text } from 'react-native'
import React from 'react'
import NotificationView from './components/NotificationView';

const NotificationScreen = ({navigation}: any) => {
  const handleDrawerPress = () => {
    navigation.toggleDrawer();
  }
  return <NotificationView handleDrawerPress={handleDrawerPress}/>
};

export default NotificationScreen;
