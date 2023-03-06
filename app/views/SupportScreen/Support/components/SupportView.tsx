import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK, TABBAR_COLOR } from 'app/components/utilities/constant'
import ComingSoonScreen from 'app/components/CommonScreen/ComingSoon'
import Button from 'app/components/Button'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen'
import SupportItem from './SupportItem'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import RoutingScreen from './RoutingScreen'

const SupportView = (props: any) => {
    const layout = useWindowDimensions();
    const navigation: any = useNavigation()
    const [indexData, setIndexData] = useState({
        index: 0,
        routes: [
            { key: "first", title: strings.supportrequest },
            { key: "second", title: strings.myticket },
        ],
    });
    useFocusEffect(
        React.useCallback(() => {
            if (indexData?.index === 0) {
                props.setTicketList([])
                props.TicketList(0, { type: 2 });
            } else {
                props.setTicketList([])
                props.TicketList(0, { type: 1 });
            }
            return () => { };
        }, [navigation, indexData])
    );


    const onPressView = (data: any) => {
        navigation.navigate('SupportScreenDetails', { ticketid: data, type: indexData?.index })
    }

    const renderTabBar = (props: any) => (
        <TabBar
            activeColor={TABBAR_COLOR}
            //inactiveColor={'#F4F4F4'}
            {...props}
            indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
            style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
        />
    );
    const handleIndexChange = (index: any) => {
        setIndexData({
            index: index, routes: [
                { key: "first", title: strings.supportrequest },
                { key: "second", title: strings.myticket },
            ],
        })
        props.setOffset(0)
        props.setTicketList([])
    }
    const renderScene = ({ index, route, }: any) => {
        switch (route.key) {
            case 'first':
                return <RoutingScreen
                    ticketList={props.ticketList}
                    index={indexData?.index}
                    onPressView={onPressView}
                    onPressStatusUpdate={props.onPressStatusUpdate}
                    onPressEscalate={props.onPressEscalate}
                    setFilterData={props.setFilterData}
                    TicketList={props.TicketList}
                    totalData={props.totalData}
                    offSET={props.offSET}
                    keyType={route.key}
                />;
            case 'second':
                return <RoutingScreen
                    ticketList={props.ticketList}
                    index={indexData?.index}
                    onPressView={onPressView}
                    handleEditTicket={props.handleEditTicket}
                    setFilterData={props.setFilterData}
                    TicketList={props.TicketList}
                    totalData={props.totalData}
                    offSET={props.offSET}
                    keyType={route.key}
                />;
        }
    };
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                // rightFirstImageScr={images.filter}
                rightSecondImageScr={images.notification}
                headerText={strings.supportHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <View style={{ marginVertical: 10, alignItems: "flex-end" }}>
                <Button
                    width={150}
                    height={30}
                    buttonText={strings.addticket}
                    btnTxtsize={14}
                    handleBtnPress={() => props.handleAddTicket()}
                />
            </View>
            <View style={{ flex: 1 }}>
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={indexData}
                    renderScene={({ index, route }: any) => renderScene({ index, route })}
                    onIndexChange={handleIndexChange}
                    initialLayout={{ width: layout.width }}
                />
            </View>
        </View >
    )
}

export default SupportView