import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR } from 'app/components/utilities/constant'
import ComingSoonScreen from 'app/components/CommonScreen/ComingSoon'
import FastImages from 'app/components/FastImage'
import { normalize, normalizeSpacing } from 'app/components/scaleFontSize'
import DealFlowFilter from './dealFlowFilter';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen'

const DealFlowView = (props: any) => {
    const renderDealFlow = (item: any, index: any) => {
        return (
            <View style={styles.mainCont}>
                <View>
                    <Image
                        source={{ uri: `${item.base_url}${item.property_image}` }}
                        style={styles.projectImgVw}
                    />
                    <View style={styles.textVws}>
                        <Text style={[styles.smallTxt, {
                            marginTop: normalizeSpacing(2),
                            fontSize: normalize(14)
                        }]}>{item.visit_score}</Text>
                        <Text style={styles.smallTxt}>{strings.visitorQualitySc}</Text>
                    </View>
                </View>
                <View style={styles.straightVw}>
                    <View style={styles.textArea}>
                        <Text style={styles.commonTxt}>{item.property_title}</Text>
                        {/* <Text style={styles.subHeadTxt}>CP Rank : {item.cp_rank}</Text> */}
                    </View>
                    <View style={styles.textArea}>
                        <View style={styles.textVws}>
                            <Text style={styles.subHeadTxt}>{strings.commissionErnd}</Text>
                            <Text style={styles.smallTxt}>{item.commissions_earned}</Text>
                        </View>
                        <View style={styles.textVws}>
                            <Text style={styles.subHeadTxt}>{strings.potentlCommission}</Text>
                            <Text style={styles.smallTxt}>{item.potential_commissions}</Text>
                        </View>
                    </View>
                    <View style={[styles.textArea, { justifyContent: 'flex-end', }]}>
                        <View style={[styles.textVws, {
                            alignItems: 'center',
                            marginRight: normalizeSpacing(30)
                        }]}>
                            <Text style={styles.subHeadTxt}>{strings.invntryLftToClose}</Text>
                            <Text>{item.total_inventry - item.total_sold_out}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.Viewbutton}
                            onPress={() => props.onPressView(item)}>
                            <Image source={images.forwardArrow} style={styles.arrow} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                rightFirstImageScr={images.filter}
                rightSecondImageScr={images.notification}
                headerText={strings.dealflowHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
                handleOnRightFirstIconPress={() => props.setFilterisVisible(true)}
            />
            {/* <ComingSoonScreen /> */}
            <FlatList
                data={props.dealFlows}
                ListEmptyComponent={<EmptyListScreen message={strings.dealflowHeader} />}
                renderItem={({ item, index }) => renderDealFlow(item, index)}
                onEndReached={() => {
                    if (props?.dealFlows?.length < props?.moreData) {
                        props.getDealFlows(props?.dealFlows?.length > 4 ?
                            props.offSET + 1 : 0, props.filterData)
                    }
                }}
                refreshing={false}
                onRefresh={() => props.onReset()}
            />
            <DealFlowFilter
                Visible={props.filterisVisible}
                setIsVisible={props.setFilterisVisible}
                setFilterData={props.setFilterData}
                filterData={props.filterData}
                handleFilter={() => props.getDealFlows(0, props.filterData)}
                onReset={props.onReset}
                setAgentList={props.setDealFlows}
            />
        </View>
    )
}

export default DealFlowView