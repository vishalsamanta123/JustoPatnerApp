import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, Image, useWindowDimensions } from 'react-native'
import Header from '../../../../components/Header'
import { PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import { normalizeSpacing } from "../../../../components/scaleFontSize";
import styles from './styles'
import AgentDetailInfo from './AgentDetailInfo'
import AgentDetailStats from './AgentDetailStats'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux'
import moment from 'moment'

const PropertyDetailView = (props: any) => {
  const { response = {} } = useSelector((state: any) => state.agentData)
  const [allDetails, setAllDetails] = useState({ ...response?.data[0] })
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Agent Info' },
    { key: 'second', title: 'Agent Stats' },
  ]);

  const DATAINFO: any =
  {
    status: allDetails?.status ? allDetails?.status : '',
    AgentName: allDetails?.agent_name ? allDetails?.agent_name : '',
    Mobileno: allDetails?.primary_mobile ? allDetails?.primary_mobile : '',
    Email: allDetails?.email ? allDetails?.email : '',
    whatsappno: allDetails?.whatsapp_number ? allDetails?.whatsapp_number : '',
    rerano: allDetails?.rera_certificate_no ? allDetails?.rera_certificate_no : '',
    aadharno: allDetails?.adhar_no ? allDetails?.adhar_no : '',
    pancardno: allDetails?.pancard_no ? allDetails?.pancard_no : '',
    location: allDetails?.location ? allDetails?.location : '',
    workingfrom: allDetails?.createdDate ? moment(allDetails?.createdDate).format('MMM Do YY') : '',
    workinglocation: allDetails?.working_location ? allDetails?.working_location : '',
  };
  const DATASTATS: any =
  {
    closingper: allDetails?.agent_stats?.total_closing_percentage,
    visitor: allDetails?.agent_stats?.total_visit,
    siteVisit: allDetails?.agent_stats?.total_site_visit,
    closeVisit: allDetails?.agent_stats?.total_closing_percentage,
    lastlogin: allDetails?.agent_stats?.last_login ? moment(allDetails?.agent_stats?.last_login).format('llll') : '',
    lastvisit: allDetails?.agent_stats?.last_lead_crate ? moment(allDetails?.agent_stats?.last_lead_crate).format('llll') : '',
    lastsitevisit: allDetails?.agent_stats?.last_site_visit ? moment(allDetails?.agent_stats?.last_site_visit).format('llll') : '',
    lastclosevisit: allDetails?.agent_stats?.last_closing_lead ? moment(allDetails?.agent_stats?.last_closing_lead).format('llll') : '',
  };

  const FirstRoute = () => (
    <AgentDetailInfo items={DATAINFO} />
  );
  const SecondRoute = () => (
    <AgentDetailStats items={DATASTATS} />
  );
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });


  /*   const renderTabBar = props => {
      return (
        <TabBar
          {...props}
          renderLabel={({ focused, route }) => {
            return (
              <TextView
                size={20}
                category="Medium"
                color={focused ? 'BLACK' : 'GRAY3'}>
                {route.title}
              </TextView>
            );
          }}
          indicatorStyle={styles.indicatorStyle}
          style={styles.tabBar}
        />
      );
    }; */

  const renderTabBar = (props: any) => (
    <TabBar
      activeColor={TABBAR_COLOR}
      //inactiveColor={'#F4F4F4'} 
      {...props}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }} />
  );


  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR_DARK,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={'light-content'} />
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.agentdetail}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
      />
      <View style={styles.propertyListView}>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </View>
  )
}

export default PropertyDetailView