import React, { useEffect, useState, } from 'react'
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
import moment from 'moment'

const agentDetailView = (props: any) => {
console.log('props: ', props.allDetails);
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const [indexData, setIndexData] = useState({
    index: 0,
    routes: [
      { key: 'first', title: 'Information' },
      { key: 'second', title: 'Stats' },
    ],
  });

  const DATAINFO: any =
  {
    status: props?.allDetails?.status ? props?.allDetails?.status : '',
    AgentName: props?.allDetails?.agent_name ? props?.allDetails?.agent_name : '',
    Mobileno: props?.allDetails?.primary_mobile ? props?.allDetails?.primary_mobile : '',
    Email: props?.allDetails?.email ? props?.allDetails?.email : '',
    whatsappno: props?.allDetails?.whatsapp_number ? props?.allDetails?.whatsapp_number : '',
    rerano: props?.allDetails?.rera_certificate_no ? props?.allDetails?.rera_certificate_no : '',
    aadharno: props?.allDetails?.adhar_no ? props?.allDetails?.adhar_no : '',
    pancardno: props?.allDetails?.pancard_no ? props?.allDetails?.pancard_no : '',
    location: props?.allDetails?.location ? props?.allDetails?.location : '',
    workingfrom: props?.allDetails?.createdDate ? moment(props?.allDetails?.createdDate).format('MMM Do YYYY') : '',
    workinglocation: props?.allDetails?.working_location ? props?.allDetails?.working_location : '',
    rera_certificate: props?.allDetails?.rera_certificate ? props?.allDetails?.rera_certificate : '',
    propidership_declaration_letter: props?.allDetails?.propidership_declaration_letter ? props?.allDetails?.propidership_declaration_letter : '',
  };
  const DATASTATS: any =
  {
    closingper: props?.allDetails?.agent_stats?.total_closing_percentage,
    visitor: props?.allDetails?.agent_stats?.total_visit,
    siteVisit: props?.allDetails?.agent_stats?.total_site_visit,
    closeVisit: props?.allDetails?.agent_stats?.lastclosevisit ?
      moment(props?.allDetails?.agent_stats?.lastclosevisit).format('llll') : '',
    lastlogin: props?.allDetails?.agent_stats?.last_login ?
      moment(props?.allDetails?.agent_stats?.last_login).format('llll') : '',
    lastvisit: props?.allDetails?.agent_stats?.last_lead_crate ?
      moment(props?.allDetails?.agent_stats?.last_lead_crate).format('llll') : '',
    lastsitevisit: props?.allDetails?.agent_stats?.last_site_visit ?
      moment(props?.allDetails?.agent_stats?.last_site_visit).format('llll') : '',
    lastclosevisit: props?.allDetails?.agent_stats?.last_closing_lead ?
      moment(props?.allDetails?.agent_stats?.last_closing_lead).format('llll') : '',
  };
  const handleIndexChange = (index: any) => {
    setIndexData({
      index: index, routes: [
        { key: 'first', title: 'Information' },
        { key: 'second', title: 'Stats' },
      ],
    })
  }
  const FirstRoute = () => (
    <AgentDetailInfo items={DATAINFO} />
  );
  const SecondRoute = () => (
    <AgentDetailStats items={DATASTATS} />
  );
  const renderScene = ({ index, route, }: any) => {
    switch (route.key) {
      case 'first':
        return <FirstRoute />;
      case 'second':
        return <SecondRoute />;
    }
  };

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
          navigationState={indexData}
          renderScene={({ index, route }: any) => renderScene({ index, route })}
          onIndexChange={handleIndexChange}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </View>
  )
}

export default agentDetailView