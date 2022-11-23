import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../../../../assets/images'
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR } from '../../../../components/utilities/constant'
import strings from '../../../../components/utilities/Localization'
import styles from './styles'
import Header from '../../../../components/Header'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import UserInfo from './UserInfo'
import UserBankInfo from './UserBankInfo'

const ProfileView = (props: any) => {
  const {data, HandleBackPress, handleEditProfilePress, onpresContent} = props;
  const layout = useWindowDimensions();


  const [allDetails , setAllDetails] = useState<any>({})
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'User Info' },
    { key: 'second', title: 'Bank Info' },
  ]);

  const allDetailsall = useSelector((state: any) => state.agentData);

  useEffect(() =>{
    checkprofile()
  },[allDetailsall])

  const checkprofile = () => {
    if(allDetailsall?.response?.status === 200){
      setAllDetails(allDetailsall?.response?.data[0])
    }
  } 

  const renderTabBar = (props: any) => (
    <TabBar
      activeColor={TABBAR_COLOR}
      //inactiveColor={'#F4F4F4'} 
      {...props}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }} />
  );

  const FirstRoute = () => (
    <UserInfo allDetails={allDetails} />
  );
  const SecondRoute = () => (
    <UserBankInfo allDetails={allDetails} onpresContent={onpresContent}/>
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  
  // console.log('allDetails========== ', allDetails);
  
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        headerText={data.heading}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={HandleBackPress}
        barStyle={'light-content'}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.ProfileView}>
        <View style={styles.roleView}>
          <Text style={styles.CPtext}>{strings.userRole} : {strings.channelPartner}</Text>
        </View>
        <View style={styles.userCardView}>
          <View style={styles.usernameWrap}>
            <Image style={styles.userImage} source={{uri: allDetails?.profile_picture}}  />
            <Text style={styles.userNameText}>{allDetails?.agent_name}</Text>
          </View>
          <TouchableOpacity style={styles.editImageWrap} onPress={handleEditProfilePress}>
            <Image style={styles.editIconImage} source={images.editIcon}/>
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoTabView}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </View>
        {/* <View style={styles.InformationView}>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Name</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.agent_name?.toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Aadhar No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.adhar_no}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Pancard No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.pancard_no}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Gender</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.gender === 1 ? strings.male : strings.female}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Date of Birth</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{moment(allDetails?.date_of_birth).format('DD/MM/YYYY')}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Mobile No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.primary_mobile}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>What'sapp No</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.whatsapp_number}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Email</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.email}</Text>
            </View>
          </View>
        </View> */}
      </View>
    </View>
  )
}

export default ProfileView