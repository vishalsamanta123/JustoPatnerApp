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
  const { data, HandleBackPress, handleEditProfilePress, onpresContent } = props || {};
  const layout = useWindowDimensions();
  const [allDetails, setAllDetails] = useState<any>({})
  const [indexData, setIndexData] = useState({
    index: 0,
    routes: [
      { key: 'first', title: strings.userInfo },
      { key: 'second', title: strings.coInfo },
    ],
  });

  const allDetailsall = useSelector((state: any) => state.agentData);

  useEffect(() => {
    checkprofile()
  }, [allDetailsall])

  const checkprofile = () => {
    if (allDetailsall?.response?.status === 200) {
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
  const handleIndexChange = (index: any) => {
    setIndexData({
      index: index,
      routes: [
        { key: 'first', title: strings.userInfo },
        { key: 'second', title: strings.coInfo },
      ],
    })
  }
  const FirstRoute = () => (
    <UserInfo allDetails={allDetails} onpresContent={onpresContent} />
  );
  const SecondRoute = () => (
    <UserBankInfo allDetails={allDetails} onpresContent={onpresContent} />
  );
  const renderScene = ({ index, route, }: any) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        headerText={data?.heading}
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
            {allDetails?.profile_base_url && allDetails?.profile_picture ?
            (<Image style={styles.userImage} source={
                { uri: `${allDetails?.profile_base_url}${allDetails?.profile_picture}` }} />)
              : 
              (<Image style={styles.userImage} source={images.dummyUser} />)
              }
            <Text style={styles.userNameText}>{allDetails?.agent_name}</Text>
          </View>
          <TouchableOpacity style={styles.editImageWrap} onPress={handleEditProfilePress}>
            <Image style={styles.editIconImage} source={images.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.userInfoTabView}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={indexData}
            onIndexChange={handleIndexChange}
            renderScene={({ index, route }: any) => renderScene({ index, route })}
            initialLayout={{ width: layout.width }}
          />
        </View>
        {/* <View style={styles.InformationView}>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>{strings.name}</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.agent_name?.toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>{strings.aadhaar}</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.adhar_no}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>{strings.pancard + " " + strings.shortNum}</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.pancard_no}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>{strings.gender}</Text>
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
              <Text style={styles.keyText}>{strings.mobileNo}</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.primary_mobile}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>{strings.whatsappNo}</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>{allDetails?.whatsapp_number}</Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>{strings.email}</Text>
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