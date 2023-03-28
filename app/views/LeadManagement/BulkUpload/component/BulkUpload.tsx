import React, { useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native'
import styles from './Styles'
import images from 'app/assets/images';
import Button from 'app/components/Button';
import Header from 'app/components/Header';
import strings from 'app/components/utilities/Localization';
import { TabBar, TabView } from 'react-native-tab-view';
import { PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR } from 'app/components/utilities/constant';
import RoutingScreen from './RoutingScreen';


const BulkUploadView = (props: any) => {
    const layout = useWindowDimensions();
    const renderTabBar = (props: any) => (
        <TabBar
            activeColor={TABBAR_COLOR}
            //inactiveColor={'#F4F4F4'}
            {...props}
            indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
            style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
        />
    );

    const renderScene = ({ index, route }: any) => {
        switch (route.key) {
            case "first":
                return (
                    <RoutingScreen
                        listData={props.listData}
                        keyType={route.key}
                        getImagesList={props.getImagesList}
                        moreData={props.moreData}
                        offSET={props.offSET}
                        setListData={props.setListData}
                    />
                );
            case "second":
                return (
                    <RoutingScreen
                        listData={props.listData}
                        keyType={route.key}
                        getImagesList={props.getImagesList}
                        moreData={props.moreData}
                        offSET={props.offSET}
                        setListData={props.setListData}
                    />
                );
        }
    };
    return (
        <View style={styles.mainContainer}>
            <Header
                handleOnLeftIconPress={props.handleBackPress}
                leftImageIconStyle={styles.RightFirstIconStyle}
                leftImageSrc={images.backArrow}
                rightSecondImageScr={images.notification}
                headerText={strings.bulkupload}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
            />
            <View style={{ marginVertical: 10, alignItems: 'flex-end' }}>
                <Button
                    width={130}
                    height={30}
                    buttonText={strings.newUpload}
                    btnTxtsize={14}
                    handleBtnPress={() => props.handleNewUpload()}
                />
            </View>
            <View style={styles.listView}>
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={props.indexData}
                    renderScene={({ index, route }: any) => renderScene({ index, route })}
                    onIndexChange={props.handleIndexChange}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </View>
    )
}

export default BulkUploadView
