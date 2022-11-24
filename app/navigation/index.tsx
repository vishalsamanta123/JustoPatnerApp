import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../views/DashboardScreen';
import NotificationScreen from '../views/NotificationsScreen';
import customDrawer from './customDrawer';
import PropertyScreen from '../views/PropertyMangement/PropertyScreen';
import PropertyDetails from '../views/PropertyMangement/PropertyDetails';
import AgentDetails from '../views/AgentManagement/AgentDetailView';
import AgentListingScreen from '../views/AgentManagement/AgentListing';
import PendingAgentListScreen from '../views/AgentManagement/PendingAgentListing';
import LoginScreen from '../views/Authentication/LoginScreen';
import RegistrationScreen from '../views/Authentication/RegistrationScreen';
import OnboardingScreen from '../views/Authentication/OnboardingScreen';
import SplashScreen from '../views/Authentication/SplashScreen';
import OtpVerificationScreen from '../views/Authentication/OtpVerification';
import ImageContent from '../views/PropertyMangement/PropertyDetails/components/ImageContent';
import VideoContent from '../views/PropertyMangement/PropertyDetails/components/VideoContent';
import CatalogueContent from '../views/PropertyMangement/PropertyDetails/components/CatalogueContent';
import CompanyDetails from '../views/Authentication/RegistrationScreen/components/CompanyDetails';
import UserBankInfo from '../views/Authentication/RegistrationScreen/components/UserBankInfo';
import ForgotPassword from '../views/Authentication/ForgotPassword';
import LeadManagementScreen from '../views/LeadManagement/LeadManagementScreen';
import BulkUpload from '../views/LeadManagement/LeadManagementScreen/Components/BulkUpload';
import AddNewVisitorScreen from '../views/LeadManagement/AddNewVisitor';
import UpdatePasswordScreen from '../views/Authentication/ChangePassword';
import LeadDetails from '../views/LeadManagement/LeadDetails';
import FollowUpScreen from '../views/FollowUp/FollowUpScreen';


import AddnewAgent from '../views/AgentManagement/AddAgent';
import AgentBankInfo from '../views/AgentManagement/AddAgent/components/AgentBankInfo';
import FollowUpDetails from '../views/FollowUp/FollowUpDetails';
import EditFollowUp from '../views/FollowUp/FollowUpScreen/Components/EditFollowUp';
import AllFollowUpScreen from '../views/FollowUp/AllFollowUp';
import AppointmentScreen from '../views/Appointment/AppointmentScreen';
import AppointmentDetails from '../views/Appointment/AppointmentDetails';
import AddAppointmentScreen from '../views/Appointment/AddAppointment';

import SettingScreen from '../views/Setting/SettingScreen';
import ProfileScreen from '../views/Setting/ProfileScreen';
import EditProfileScreen from '../views/Setting/EditProfileScreen';
import ChangePasswordScreen from '../views/Setting/ChangePassword';
import SeparateLinkScreen from '../views/Setting/SeparateLink';
import PrivacyPolicyScreen from '../views/Authentication/PrivacyPolicy';


import { setDefaultHeader, apiCall } from 'app/components/utilities/httpClient';
import { useDispatch, useSelector } from 'react-redux';
import { jwtTokenGenrate } from 'app/Redux/Actions/AuthActions';
import apiEndPoints from 'app/components/utilities/apiEndPoints';
//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FollowUpAddScreen from 'app/views/FollowUp/FollowUpAdd';
import EditBankDetails from 'app/views/Setting/EditProfileScreen/components/EditBankDetails';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const screenOptions = { headerShown: false, gestureEnabled: true };
const DrawerComponent = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, drawerType: 'front' }}
      drawerContent={props => customDrawer(props)}>
      <Drawer.Screen name="DashboardScreen" component={DashboardScreen} />
      <Drawer.Screen name="Notifications" component={NotificationScreen} />
      <Drawer.Screen  name="PropertyScreenView" component={PropertyScreen} />
      <Drawer.Screen name="AgentListing" component={AgentListingScreen}  />
      <Drawer.Screen name="LeadManagement" component={LeadManagementScreen}  />
      <Drawer.Screen name="FollowUpScreen" component={FollowUpScreen}  />
      <Drawer.Screen name="AppointmentScreen" component={AppointmentScreen}  />
      <Drawer.Screen name="SettingScreen" component={SettingScreen}  />
      
      {/* <Stack.Screen component={PropertyScreen} name="PropertyScreenView" /> */}
    </Drawer.Navigator>
  );
};
const Route =  () => {
  const dispatch: any = useDispatch();
  const loginSelector = useSelector((state: any) => state.login);
  useEffect( () => {
    // const authval = AsyncStorage.removeItem("AuthToken");
    // console.log('authval: vv', authval);
  
      if (loginSelector?.response == null ||  loginSelector?.response?.status == 201 ||  loginSelector?.response?.status == 401) {
        tokenGenrate()
      } else {
        setDefaultHeader("token", loginSelector?.response?.token);
      
      }
   }, [loginSelector])

  

  async function tokenGenrate() {
    //dispatch(jwtTokenGenrate())
     try {
      const { data } = await apiCall("get", apiEndPoints.JWTTOKEN, {});
      //console.log('data: ', data);
      if (data) {
        await AsyncStorage.setItem("token", data.token);
        await setDefaultHeader("token", data.token);
      }
    } catch (error) {
      // console.log(error);
    } 
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen component={SplashScreen} name="SplashScreenView" />
        {/* <Stack.Screen
          component={OnboardingScreen}
          name="OnboardingScreenView"
        />  */}
        <Stack.Screen component={LoginScreen} name="LoginScreenView" />
        <Stack.Screen
          component={RegistrationScreen}
          name="RegistrationScreenView"
        />
        <Stack.Screen
          component={ForgotPassword}
          name="ForgotPassword"
        />
        <Stack.Screen
          component={CompanyDetails}
          name="CompanyDetails"
        />
        <Stack.Screen
          component={OtpVerificationScreen}
          name="OtpVerificationScreenView"
        />
         <Stack.Screen component={UpdatePasswordScreen} name="ChangePasswordScreenView" />
        <Stack.Screen component={DrawerComponent} name="DashboardScreenView" />
        <Stack.Screen component={UserBankInfo} name="UserBankInfo" />
        <Stack.Screen component={EditBankDetails} name="EditBankDetails" />
        {/* Property Management Screens */}
        <Stack.Screen component={PropertyDetails} name="PropertyDetails" />
        <Stack.Screen component={ImageContent} name="ImageContent" />
        <Stack.Screen component={VideoContent} name="VideoContent" />
        <Stack.Screen component={CatalogueContent} name="CatalogueContent" />
        {/* Agent Management Screen */}
        <Stack.Screen name="PendingAgentList" component={PendingAgentListScreen}  />
        <Stack.Screen name="AgentDetails" component={AgentDetails}  />
        <Stack.Screen name="AddnewAgent" component={AddnewAgent}  />
        <Stack.Screen name="AgentBankInfo" component={AgentBankInfo}  />
        {/* Lead Management Screens */}
        <Stack.Screen name="BulkUpload" component={BulkUpload}  />
        <Stack.Screen name="AddNewVisitorScreen" component={AddNewVisitorScreen}  />
        <Stack.Screen name="LeadDetails" component={LeadDetails}  />
        {/* Follow up Screens */}
        <Stack.Screen name="FollowUpDetails" component={FollowUpDetails}  />
        <Stack.Screen name="EditFollowUp" component={EditFollowUp}  />
        <Stack.Screen name="AllFollowUpScreen" component={AllFollowUpScreen}  />
        <Stack.Screen name="FollUpAdd" component={FollowUpAddScreen} />
        {/* Appointment */}
        <Stack.Screen name="AppointmentDetails" component={AppointmentDetails}  />
        <Stack.Screen name="AddAppointmentScreen" component={AddAppointmentScreen}  />

        {/*Setting screen*/}
        <Stack.Screen name="profile" component={ProfileScreen}  />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}  />
        <Stack.Screen name="changePassword" component={ChangePasswordScreen}  />
        <Stack.Screen name="separateLink" component={SeparateLinkScreen}  />
        <Stack.Screen name="privacyPolicy" component={PrivacyPolicyScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
