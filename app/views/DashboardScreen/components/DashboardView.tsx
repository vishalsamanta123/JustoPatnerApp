import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Switch } from 'react-native-switch';
import React from 'react';
import Header from '../../../components/Header';
import images from '../../../assets/images';
import styles from './styles';
import strings from '../../../components/utilities/Localization';
import {
  GRAY_COLOR,
  GREEN_COLOR,
  Isios,
  PRIMARY_THEME_COLOR_DARK,
  WHITE_COLOR,
} from '../../../components/utilities/constant';

const DashboardView = (props: any) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    props.getDashboard()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }
  const targetData = props?.dashBoardData?.target || {}
  const achieveTargetData = props?.dashBoardData?.achievetargetdata || {}
  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity key={index} style={styles.headingView} onPress={() => props.onPressView(item)}>
        <Text style={styles.itemText}>{item.property_title}</Text>
        {/* <Text style={styles.itemText}>{item.visitor}</Text>
        <Text style={styles.itemText}>{item.siteVisit}</Text>
        <Text style={styles.itemText}>{item.closeLead}</Text> */}
        <Image source={images.rightArrow} style={styles.rightArrowImage} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <View style={styles.mainContainerWrap}>
        <Header
          leftImageSrc={images.menu}
          rightImageScr={images.notification}
          headerText={strings.dashboardHeader}
          handleOnLeftIconPress={props.handleDrawerPress}
          headerStyle={styles.headerStyle}
          rightSecondImageScr={images.bell}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.dashboardScroll}
          bounces={Isios ? true : false}>
          <View style={styles.dashboardWrap}>
            <View style={styles.nameView}>
              <View style={styles.statusView}>
                <Text style={styles.statusText}>Status</Text>
                <View style={styles.switchView}>
                  {/*  <Switch
                    thumbColor={PRIMARY_THEME_COLOR}
                    ios_backgroundColor={WHITE_COLOR}
                    onValueChange={handleSwitcPress}
                    value={isEnabled}
                    style={styles.switchStyle}
                  /> */}
                  <Switch
                    value={props?.isEnabled === 1 ? true : false}
                    onValueChange={(val) => props.updateStatusPress(props?.isEnabled)}
                    backgroundActive={GREEN_COLOR}
                    backgroundInactive={GRAY_COLOR}
                    circleActiveColor={WHITE_COLOR}
                    circleInActiveColor={WHITE_COLOR}
                    circleSize={25}
                    activeText={''}
                    inActiveText={''}
                    circleBorderWidth={2}
                  /*  activeText={'On'}
                   inActiveText={'Off'}
                   circleSize={30}
                   barHeight={1}
                   circleBorderWidth={3}
                   backgroundActive={'green'}
                   backgroundInactive={'gray'}
                   circleActiveColor={'#30a566'}
                   circleInActiveColor={'#000000'} */
                  />
                </View>
              </View>
              <View style={styles.welcomeView}>
                <Text style={styles.welcomeToText}>Welcome</Text>
                <Text style={styles.welcomeNameText}>{props?.dashBoardData?.user_name}</Text>
              </View>
            </View>
            {/* <View style={styles.qrCodeView}> */}
            {props?.dashBoardData?.qr_code != "" ?
              <Image source={{ uri: `${props?.dashBoardData?.qr_code}` }}
                style={styles.qrCodeImage} />
              :
              <Image source={images.qrCode} style={styles.qrCodeImage} />
            }
            {/* <TouchableOpacity style={styles.linkImageView}>
                <Image source={images.link} style={styles.linkImage} />
              </TouchableOpacity> */}
            {/* </View> */}
          </View>
          <View style={styles.secondPortion}>
            {/* <View style={styles.firstCardView}>
              <View style={styles.cardTextView}>
                <Text style={styles.cardText}>Visit Target</Text>
              </View>
              <View style={styles.numberView}>
                <Text style={styles.numberText}>
                  {achieveTargetData?.achieve_visit_target}/{targetData?.visit_target}
                </Text>
              </View>
            </View>
            <View style={styles.secondCardView}>
              <View style={styles.cardTextView}>
                <Text style={styles.cardText}>Site Visit Target</Text>
              </View>
              <View style={styles.numberView}>
                <Text style={styles.numberText}>
                  {achieveTargetData?.achieve_site_visit_target}/{targetData?.site_visit_target}
                </Text>
              </View>
            </View> */}
            {/* <View style={styles.thirdCardView}>
              <View style={styles.cardTextView}>
                <Text style={styles.cardText}>Closing Target</Text>
              </View>
              <View style={styles.numberView}>
                <Text style={styles.numberText}>
                  {achieveTargetData?.achieve_closing_target}/{targetData?.closing_target}
                </Text>
              </View>
            </View> */}
          </View>
          <View style={styles.thirdPortion}>
            <TouchableOpacity
              onPress={() => props.onpressButton('visit')}
              style={styles.thirdPortioncardView}>
              <View style={styles.thirdPortionCardTextView}>
                <Text style={styles.thirdPortionCardText}>Today Leads</Text>
              </View>
              <View style={styles.numberView}>
                <Text style={styles.thirdPortionNumberText}>{props?.dashBoardData?.total_visit}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onpressButton('appointment', 'today')}
              style={styles.thirdPortioncardView}>
              <View style={styles.thirdPortionCardTextView}>
                <Text style={styles.thirdPortionCardText} numberOfLines={2}>
                  Today Site Visit
                </Text>
              </View>
              <View style={styles.numberView}>
                <Text style={styles.thirdPortionNumberText}>{props?.dashBoardData?.total_site_visit}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onpressButton('appointment', 'todayComplete')}
              style={styles.thirdPortioncardView}>
              <View style={styles.thirdPortionCardTextView}>
                <Text style={styles.thirdPortionCardText}>
                  Today Complete Visits
                </Text>
              </View>
              <View style={styles.numberView}>
                <Text style={styles.thirdPortionNumberText}>{props?.dashBoardData?.total_close_visit}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onpressButton()}
              style={styles.thirdPortioncardView}>
              <View style={styles.thirdPortionCardTextView}>
                <Text style={styles.thirdPortionCardText}>Active Agents</Text>
              </View>
              <View style={styles.numberView}>
                <Text style={styles.thirdPortionNumberText}>{props?.dashBoardData?.total_agent}</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.thirdPortioncardView}>
              <View style={styles.thirdPortionCardTextView}>
                <Text style={styles.thirdPortionCardText}>Closing Target</Text>
              </View>
              <View style={styles.numberView}>
                <Text style={styles.thirdPortionNumberText}>{targetData?.closing_target}</Text>
              </View>
            </TouchableOpacity> */}
          </View>
          {props?.activepropertyData?.length > 0 &&
            <View style={styles.bottomSection}>
              <View style={[styles.headingView, {
                backgroundColor: PRIMARY_THEME_COLOR_DARK
              }]}>
                <Text style={[styles.headingText, {
                  color: WHITE_COLOR,
                }]}>Active Properties</Text>
                {/* <Text style={styles.headingText}>VISITOR</Text>
              <Text style={styles.headingText}>SITE VISIT</Text>
              <Text style={styles.headingText}>CLOSE LEAD</Text> */}
              </View>
              <FlatList data={props.activepropertyData} renderItem={renderItem} />
              {props.activepropertyData?.length > 4 ?
                (<TouchableOpacity
                  onPress={() => props.onPressMore()}
                  style={styles.headingView}>
                  <Text style={[styles.headingText, styles.knowMoreText]}>
                    Know More
                  </Text>
                </TouchableOpacity>)
                : null
              }
            </View>
          }
        </ScrollView>
      </View>
    </>
  );
};

export default DashboardView;
