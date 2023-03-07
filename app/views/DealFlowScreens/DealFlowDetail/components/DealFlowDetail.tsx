import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Header from 'app/components/Header';
import images from 'app/assets/images';
import styles from './styles';
import strings from 'app/components/utilities/Localization';
import {
  FONT_FAMILY_EXTRABOLD,
  BLACK_COLOR,
  BLUE_COLOR,
  PRIMARY_THEME_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  PURPLE_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_LIGHT,
  GOLDEN_COLOR,
  YELLOW_COLOR,
  GREEN_COLOR,
  CALL_COLOR,
} from 'app/components/utilities/constant';
import { normalize } from 'app/components/scaleFontSize';

const DealFlowDetailView = (props: any) => {
  const imageRender = (item: any) => {
    return item?.document_type === 'image' && (
      <View style={styles.topImgCont}>
        <Image
          source={{ uri: `${props?.dealFlowDetail?.base_url}${item?.document}` }}
          style={styles.topImgStyl}
        />
      </View>
    )
  }
  return (
    <View style={styles.mainContainerWrap}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.dealflowHeader}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        leftImageIconStyle={styles.RightFirstIconStyle}
        RightSecondIconStyle={styles.RightFirstIconStyle}
      />
      {props?.dealFlowDetail?.property_document?.length > 0 ?
        <View style={styles.topImgVw}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {props?.dealFlowDetail?.property_document?.map((item: any) => imageRender(item))}
          </ScrollView>
        </View>
        : null
      }
      <View style={styles.txtCont}>
        <View style={styles.straightRowVw}>
          <Text style={styles.headTxt}>{props?.dealFlowDetail?.property_title}</Text>
          <Text style={[styles.smallTxt, {
            color: BLACK_COLOR
          }]}>CP Rank : {props?.dealFlowDetail?.cp_rank}</Text>
        </View>
        <View style={styles.straightRowVw}>
          <View style={[styles.boxesVw, {
            backgroundColor: BLUE_COLOR
          }]}>
            <Text style={[styles.subHeadTxt, {
              fontFamily: FONT_FAMILY_EXTRABOLD
            }]}>Commission Earned</Text>
            <Text style={styles.smallTxt}>{props?.dealFlowDetail?.commissions_earned}</Text>
          </View>
          <View style={[styles.boxesVw, {
            backgroundColor: YELLOW_COLOR
          }]}>
            <Text style={[styles.subHeadTxt, {
              fontFamily: FONT_FAMILY_EXTRABOLD
            }]}>Potential Commission</Text>
            <Text style={styles.smallTxt}>{props?.dealFlowDetail?.potential_commissions}</Text>
          </View>
        </View>
        <View style={styles.straightRowVw}>
          <View style={[styles.boxesVw, {
            paddingHorizontal: normalize(27),
            backgroundColor: PURPLE_COLOR
          }]}>
            <Text style={[styles.subHeadTxt, {
              fontFamily: FONT_FAMILY_EXTRABOLD
            }]}>Total Inventory</Text>
            <Text style={styles.smallTxt}>{props?.dealFlowDetail?.total_inventry}</Text>
          </View>
          <View style={[styles.boxesVw, {
            paddingHorizontal: normalize(14),
            backgroundColor: CALL_COLOR
          }]}>
            <Text style={[styles.subHeadTxt, {
              fontFamily: FONT_FAMILY_EXTRABOLD
            }]}>Inventory Left to Close</Text>
            <Text style={styles.smallTxt}>{props?.dealFlowDetail?.total_inventry - props?.dealFlowDetail?.total_sold_out}</Text>
          </View>
        </View>
        <View style={[styles.straightRowVw, { justifyContent: 'center' }]}>
          <View style={[styles.boxesVw, {
            backgroundColor: PRIMARY_THEME_COLOR
          }]}>
            <Text style={[styles.subHeadTxt, {
              fontFamily: FONT_FAMILY_EXTRABOLD
            }]}>Visitor Quality Score</Text>
            <Text style={styles.smallTxt}>{props?.dealFlowDetail?.visit_score}</Text>
          </View>
        </View>
        <View style={styles.straightRowVw}>
          <View style={[styles.boxesVw, {
            paddingHorizontal: normalize(30),
            backgroundColor: PRIMARY_THEME_COLOR
          }]}>
            <Text style={[styles.subHeadTxt, {
              fontFamily: FONT_FAMILY_EXTRABOLD
            }]}>Visitor</Text>
            <Text style={styles.smallTxt}>{props?.dealFlowDetail?.total_visit}</Text>
          </View>
          <View style={[styles.boxesVw, {
            paddingHorizontal: normalize(27),
            backgroundColor: PRIMARY_THEME_COLOR
          }]}>
            <Text style={[styles.subHeadTxt, {
              fontFamily: FONT_FAMILY_EXTRABOLD
            }]}>Booking</Text>
            <Text style={styles.smallTxt}>{props?.dealFlowDetail?.total_booking}</Text>
          </View>
          <View style={[styles.boxesVw, {
            backgroundColor: PRIMARY_THEME_COLOR
          }]}>
            <Text style={[styles.subHeadTxt, {
              fontFamily: FONT_FAMILY_EXTRABOLD
            }]}>Registration</Text>
            <Text style={styles.smallTxt}>{props?.dealFlowDetail?.total_registration}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DealFlowDetailView;
