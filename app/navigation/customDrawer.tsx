import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import styles from './styles';
import images from '../assets/images';
import strings from '../components/utilities/Localization';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  DrawerContentScrollView,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { PRIMARY_THEME_COLOR } from '../components/utilities/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileData, userLogout } from 'app/Redux/Actions/AuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAgentDetail } from 'app/Redux/Actions/AgentActions';
import auth from '@react-native-firebase/auth';
import { getPermission } from 'app/Redux/Actions/permissionAction';

const customDrawer = ({ navigation }: any) => {
  const dispatch: any = useDispatch()
  const isDrawerOpen = useDrawerStatus() === 'open';
  const insets = useSafeAreaInsets();
  const { response = {} } = useSelector((state: any) => state.profileData)
  const permissionResponse = useSelector((state: any) => state.permissions);
  console.log('permissionResponse: ', permissionResponse);
  const [userData, setUserData] = useState<any>({})
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  useEffect(() => {
    if (response?.status === 200) {
      setUserData(response?.data[0])
    }
  }, [response, isDrawerOpen])
  useEffect(() => {
    if (isDrawerOpen) {
      getDetail()
      dispatch(getPermission({}))
    }
  }, [isDrawerOpen])
  const getDetail = async () => {
    const userData: any = await AsyncStorage.getItem("loginData");
    if (JSON.parse(userData)?.data?.cp_id) {
      dispatch(
        getProfileData({
          cp_id: JSON?.parse(userData)?.data?.cp_id,
        })
      );
    }
  };
  const ProfileSection = () => {
    return (
      <TouchableOpacity style={styles.MainContainer}>
        <View style={styles.ContainerView}>
          <View style={styles.NameContainer}>
            <Image
              style={styles.UserImge}
              source={userData?.profile_picture ?
                { uri: userData?.profile_picture }
                : images.dummyUser
              }
            />
            <View style={styles.UserNameView}>
              <Text
                numberOfLines={1}
                style={[styles.UserNameText, { width: 120 }]}>
                {userData?.agent_name}
              </Text>
              <Text numberOfLines={2} style={[styles.UserAddress, { width: 140 }]}>
                {userData?.location ?? ''}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeDrawerView}
              onPress={toggleDrawer}>
              {isDrawerOpen && (
                <Image
                  style={styles.closeDrawerImage}
                  source={images.leftArrow}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const DrawerTabSection = (props: any) => {
    return (
      <TouchableOpacity
        style={styles.drawerTouch}
        onPress={props.handleDrawerNavigation}>
        <Image source={props.iconSource} style={styles.drawerIconStyle} />
        <Text style={styles.drawerText}>{props.tabTitle}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.drawerMain}>
      <View
        style={{ backgroundColor: PRIMARY_THEME_COLOR, height: insets.top }}
      />
      <StatusBar barStyle={'light-content'} />
      <ProfileSection />
      <DrawerContentScrollView
        contentContainerStyle={{
          paddingTop: 0,
        }}>
        <DrawerTabSection
          iconSource={images.dashboard}
          tabTitle={strings.dashboardHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('DashboardScreen');
          }}
        />
        {permissionResponse?.response?.data?.length > 0 &&
          permissionResponse?.response?.data?.map((item: any, index: any) => {
            return item.permission && item.path && (
              <DrawerTabSection
                key={index}
                type={"all"}
                iconSource={item.icon}
                tabTitle={item?.title}
                handleDrawerNavigation={() => {
                  navigation.navigate(item.path, { type: item.type });
                }}
              />
            )
          })}
        {/* <DrawerTabSection
          iconSource={images.property}
          tabTitle={strings.propertyManagementHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('PropertyScreenView');
          }}
        />
        <DrawerTabSection
          iconSource={images.agency}
          tabTitle={strings.agencyHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('AgentListing');
          }}
        />
        <DrawerTabSection
          iconSource={images.lead}
          tabTitle={strings.leadManagementHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('LeadManagement');
          }}
        />
        <DrawerTabSection
          iconSource={images.event}
          tabTitle={strings.followupHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('FollowUpScreen');
          }}
        />
        <DrawerTabSection
          iconSource={images.event}
          tabTitle={strings.appointmentForVisitHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('AppointmentScreen');
          }}
        />
        <DrawerTabSection
          iconSource={images.report}
          tabTitle={strings.reportHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('Report');
          }}
        />
        <DrawerTabSection
          iconSource={images.report}
          tabTitle={strings.leaderHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('LeaderBoard');
          }}
        />
        <DrawerTabSection
          iconSource={images.report}
          tabTitle={strings.dataflowHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('DataFlow');
          }}
        />
        <DrawerTabSection
          iconSource={images.report}
          tabTitle={strings.supportforumHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('SupportForum');
          }}
        />
         <DrawerTabSection
          iconSource={images.chat}
          tabTitle={strings.chatHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('PropertyChatView');
          }}
        /> */}
        {/*<DrawerTabSection
          iconSource={images.support}
          tabTitle={strings.supportHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('Support');
          }}
        /> */}
        {/* <DrawerTabSection
          iconSource={images.setting}
          tabTitle={strings.settingHeader}
          handleDrawerNavigation={() => {
            navigation.navigate('SettingScreen');
          }}
        /> */}
        <DrawerTabSection
          iconSource={images.logout}
          tabTitle={strings.logout}
          handleDrawerNavigation={() => {
            dispatch(userLogout())
            auth().signOut();
            navigation.navigate('AuthLoading');
          }}
        />
      </DrawerContentScrollView>
      <View style={styles.versionView}>
        <View style={styles.drawerTouch}>
          <Text style={styles.drawerText}>
            {strings.versionText}
            {' 1.0'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default customDrawer;
