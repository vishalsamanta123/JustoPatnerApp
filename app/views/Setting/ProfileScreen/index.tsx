import React from 'react'
import ProfileView from './components/ProfileView';

const ProfileScreen = ({navigation,route}: any) => {
    
    const HandleBackPress = () => {
        navigation.goBack();
    }
    const handleEditProfilePress = () => {
      navigation.navigate('EditProfileScreen')
    }
  return (
    <ProfileView data={route.params} HandleBackPress={HandleBackPress} handleEditProfilePress={handleEditProfilePress}/>
  );
};

export default ProfileScreen;