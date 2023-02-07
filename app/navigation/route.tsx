import React, { useEffect } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
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
import apiEndPoints from 'app/components/utilities/apiEndPoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FollowUpAddScreen from 'app/views/FollowUp/FollowUpAdd';
import EditBankDetails from 'app/views/Setting/EditProfileScreen/components/EditBankDetails';
import AppointmentAddScreen from 'app/views/Appointment/AppointmentAdd';
import ErrorMessage from 'app/components/ErrorMessage';
import { GLOBAL_URL, RED_COLOR } from 'app/components/utilities/constant';
import ReportScreen from 'app/views/Report';
import LeaderBoardScreen from 'app/views/LeaderBoard/LeaderBoardScreen';
import SupportForumScreen from 'app/views/SupportForumScreen/SupportForum';
import DataFlowScreen from 'app/views/DataFlow';
// import SupportScreen from 'app/views/Support';
import SupportScreen from 'app/views/SupportScreen/Support';
import axios from 'axios';
import Notification from 'app/views/Setting/Notification';
import SupportForumDetail from 'app/views/SupportForumScreen/SupportForumDtl';
import LeaderBoardSearchScreen from 'app/views/LeaderBoard/LeaderBoardSearch';
import PropertyChat from 'app/views/ChatManagement/PropertyChat';
import ChatViewScreen from 'app/views/ChatManagement/Chat';
import ChatScreen from 'app/views/ChatManagement/Chat/components/ChatScreen';
import auth from "@react-native-firebase/auth";
import { updateFirebase } from 'app/Redux/Actions/FirebaseActions';
import UserAppointmentDetails from 'app/views/Appointment/UserAppointmentDetails';
import ImageUpload from 'app/views/LeadManagement/LeadManagementScreen/Components/ImageUpload';
import CSVUpload from 'app/views/LeadManagement/LeadManagementScreen/Components/CSVUpload';
import SupportScreenDetails from 'app/views/SupportScreen/SupportDetails';
import AddTicketScreen from 'app/views/SupportScreen/AddTicket';
import ShowReply from 'app/views/SupportScreen/SupportDetails/Components/ShowReply';
import TicketStatusUpdate from 'app/views/SupportScreen/Support/components/TicketStatusUpdate';


const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const AuthLoading = createNativeStackNavigator();
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
      <Drawer.Screen name="PropertyScreenView" component={PropertyScreen} />
      <Drawer.Screen name="AgentListing" component={AgentListingScreen} />
      <Drawer.Screen name="LeadManagement" component={LeadManagementScreen} />
      <Drawer.Screen name="FollowUpScreen" component={FollowUpScreen} />
      <Drawer.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Drawer.Screen name="SettingScreen" component={SettingScreen} />
      <Drawer.Screen name="Report" component={ReportScreen} />
      <Drawer.Screen name="LeaderBoard" component={LeaderBoardScreen} />
      <Drawer.Screen name="SupportForum" component={SupportForumScreen} />
      <Drawer.Screen name="DataFlow" component={DataFlowScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
      <Drawer.Screen name="PropertyChatView" component={PropertyChat} />

      {/* <Stack.Screen component={PropertyScreen} name="PropertyScreenView" /> */}
    </Drawer.Navigator>
  );
};
const AuthComponent = () => {
  return (
    <AuthStack.Navigator screenOptions={screenOptions}>
      <AuthStack.Screen component={LoginScreen} name="LoginScreenView" />
      <AuthStack.Screen
        component={RegistrationScreen}
        name="RegistrationScreenView"
      />
      <AuthStack.Screen component={UserBankInfo} name="UserBankInfo" />
      <AuthStack.Screen
        component={ForgotPassword}
        name="ForgotPassword"
      />
      <AuthStack.Screen
        component={CompanyDetails}
        name="CompanyDetails"
      />
      <AuthStack.Screen
        component={OtpVerificationScreen}
        name="OtpVerificationScreenView"
      />
      <AuthStack.Screen component={UpdatePasswordScreen} name="ChangePasswordScreenView" />
      <AuthStack.Screen name="privacyPolicy" component={PrivacyPolicyScreen} />
    </AuthStack.Navigator>
  )

}

const AppComponent = () => {
  return (
    <AppStack.Navigator screenOptions={screenOptions}>
      <AppStack.Screen component={DrawerComponent} name="DashboardScreenView" />
      <AppStack.Screen component={EditBankDetails} name="EditBankDetails" />

      {/* Property Management Screens */}
      <AppStack.Screen component={PropertyDetails} name="PropertyDetails" />
      <AppStack.Screen component={ImageContent} name="ImageContent" />
      <AppStack.Screen component={VideoContent} name="VideoContent" />
      <AppStack.Screen component={CatalogueContent} name="CatalogueContent" />

      {/* Agent Management Screen */}
      <AppStack.Screen name="PendingAgentList" component={PendingAgentListScreen} />
      <AppStack.Screen name="AgentDetails" component={AgentDetails} />
      <AppStack.Screen name="AddnewAgent" component={AddnewAgent} />
      <AppStack.Screen name="AgentBankInfo" component={AgentBankInfo} />

      {/* Lead Management Screens */}
      <AppStack.Screen name="BulkUpload" component={BulkUpload} />
      <AppStack.Screen name="AddNewVisitorScreen" component={AddNewVisitorScreen} />
      <AppStack.Screen name="LeadDetails" component={LeadDetails} />
      <AppStack.Screen name="ImageUpload" component={ImageUpload} />
      <AppStack.Screen name="CSVUpload" component={CSVUpload} />

      {/* Follow up Screens */}
      <AppStack.Screen name="FollowUpDetails" component={FollowUpDetails} />
      <AppStack.Screen name="EditFollowUp" component={EditFollowUp} />
      <AppStack.Screen name="AllFollowUpScreen" component={AllFollowUpScreen} />
      <AppStack.Screen name="FollUpAdd" component={FollowUpAddScreen} />

      {/* Appointment */}
      <AppStack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <AppStack.Screen name="AddAppointmentScreen" component={AddAppointmentScreen} />
      <AppStack.Screen name="AppointmentAdd" component={AppointmentAddScreen} />
      <AppStack.Screen name="UserAppointmentDetails" component={UserAppointmentDetails} />

      {/*Setting screen*/}
      <AppStack.Screen name="profile" component={ProfileScreen} />
      <AppStack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <AppStack.Screen name="changePassword" component={ChangePasswordScreen} />
      <AppStack.Screen name="separateLink" component={SeparateLinkScreen} />
      <AppStack.Screen name="notification" component={Notification} />
      <AppStack.Screen name="SupportForumDetail" component={SupportForumDetail} />
      <AppStack.Screen name="LeaderBoardSearch" component={LeaderBoardSearchScreen} />

      {/* chat management */}
      <AppStack.Screen name="UserChatListView" component={ChatViewScreen} />
      <AppStack.Screen name="ChatScreen" component={ChatScreen} />

      {/* Raise Ticket (Support) */}
      <AppStack.Screen name="SupportScreenDetails" component={SupportScreenDetails} />
      <AppStack.Screen name="AddTicket" component={AddTicketScreen} />
      <AppStack.Screen name="ShowReply" component={ShowReply} />
      <AppStack.Screen name="TicketStatusUpdate" component={TicketStatusUpdate} />
    </AppStack.Navigator>
  )
}

const AuthLoadingComponent = () => {
  const { response, authToken = false } = useSelector((state: any) => state.login);
  const dispatch: any = useDispatch();
  useEffect(() => {
    checklogin()
  }, [response])

  const checklogin = async () => {
    if (response && authToken) {
      if (response.status === 200) {
        // await setDefaultHeader("token", response.token);
        // await AsyncStorage.setItem('loginData', JSON.stringify(response))
        if (
          typeof response?.data?.firebase_id === "undefined" || response?.data?.firebase_id === null || response?.data?.firebase_id === ""
        ) {
          console.log('if = = = = = = =>>')
          auth()
            .createUserWithEmailAndPassword(response?.data?.email, "123456")
            .then(async (res: any) => {
              console.log("User account created & signed in!");
              await setDefaultHeader("token", response.token);
              await AsyncStorage.setItem("loginData", JSON.stringify(response));
              await AsyncStorage.setItem("firebase_id", JSON.stringify(res.user.uid));
              dispatch(updateFirebase({ firebase_id: res.user.uid }));
              // checklogin()
            });
        } else {
          console.log('else = = = = = = =>>')
          auth()
            .signInWithEmailAndPassword(response?.data?.email, "123456")
            .then(async (res: any) => {
              console.log("res: IN SIGN IN", res.user.uid);
              console.log("User signed in!");
              await setDefaultHeader("token", response.token);
              await AsyncStorage.setItem("loginData", JSON.stringify(response));
              await AsyncStorage.setItem("firebase_id", JSON.stringify(res.user.uid));
            });
        }
      } else {
        ErrorMessage({
          msg: response?.message,
          backgroundColor: RED_COLOR
        })
      }
    }
  }
  async function tokenGenrate() {
    try {
      // const { data } = await apiCall("get", apiEndPoints.JWTTOKEN, {});
      const options = {
        headers: { "content-type": "application/json" }
      }
      const data = await axios.get(`${GLOBAL_URL}/api/token/jwtToken`, options)
        .then(res => {
          console.log('res', res.data)
          return res.data

        }).catch(e => {
          console.log('e', e)

        })
      if (data) {
        await AsyncStorage.setItem("token", data.token);
        await setDefaultHeader("token", data.token);
      }
    } catch (error) {
      // console.log(error);
    }
  }
  useEffect(() => {
    if (response === null || response?.status == 201 ||
      response?.status == 401 || response?.status == 400) {
      tokenGenrate()
    } else {
      setDefaultHeader("token", response?.token);
    }
  }, [response])
  return (
    <AuthLoading.Navigator screenOptions={screenOptions}>
      {!authToken ?
        <AuthLoading.Screen component={AuthComponent} name="Auth" /> :
        <AuthLoading.Screen component={AppComponent} name="App" />
      }
    </AuthLoading.Navigator>
  )

}
const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AuthLoading" component={AuthLoadingComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
