import { View, Text, StatusBar, useWindowDimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PRIMARY_THEME_COLOR_DARK, RED_COLOR, TABBAR_COLOR } from '../../../../components/utilities/constant';
import Header from '../../../../components/Header';
import images from '../../../../assets/images';
import strings from '../../../../components/utilities/Localization';
import styles from './Styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import VisitorAppointment from './VisitorAppointment';
import SmAppointment from './SmAppointment';
import { AppointMentSmData, AppointMentVisitorData } from '../../../../components/utilities/DemoData';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FilterModal from './AppointmentModal';
import Button from '../../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppointmentList } from 'app/Redux/Actions/AppointmentActions';
import Loader from 'app/components/CommonScreen/Loader';
import ErrorMessage from 'app/components/ErrorMessage';
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen';

const AppointmentView = (props: any) => {
    const loadingref = false
    const insets = useSafeAreaInsets();
    const layout = useWindowDimensions();
    const navigation: any = useNavigation()
    const [index, setIndex] = useState(0);
    const [FilterisVisible, setFilterisVisible] = useState(false)
    const [routes] = useState([
        { key: 'first', title: strings.VisitorAppointment },
        { key: 'second', title: strings.SMAppointment },
    ]);
    const [isloading, setIsloading] = useState(false)
    const [appointmentList, setAppointmentList] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.appointment)
    console.log('response: ', response);
    const [filterData, setFilterData] = useState({
        start_date: '',
        end_date: '',
        appointment_with: ''
    })
    const renderTabBar = (props: any) => (

        <TabBar
            activeColor={TABBAR_COLOR}
            //inactiveColor={'#F4F4F4'} 
            {...props}
            indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
            style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }} />

    );
    const onPressView = (data: any) => {
        navigation.navigate('AppointmentDetails', data)
    }
    const onPressEdit = (data: any) => {
        console.log('data: ', data);
        navigation.navigate('AddAppointmentScreen', { data: data, type: strings.edit })
    }
    const onPressAddNew = () => {
        navigation.navigate('AddAppointmentScreen')
    }
    const FirstRoute = () => (
        <FlatList
            data={Array.isArray(appointmentList) ? appointmentList : []}
            renderItem={({ item }) => <VisitorAppointment items={item} onPressView={onPressView} onPressEdit={onPressEdit} />}
            ListEmptyComponent={<EmptyListScreen message={strings.VisitorAppointment} />}
            onRefresh={() => {
                getAppointmentList(0)
            }}
            refreshing={loadingref}
            onEndReached={() => {
                if (appointmentList?.length < response?.total_data) {
                    console.log('onEndReached: ');
                    getAppointmentList(appointmentList?.length > 2 ? offSET + 1 : 0)
                }
            }}
        />
    );

    useFocusEffect(
        React.useCallback(() => {
            getAppointmentList(offSET)
            return () => { };
        }, [navigation, list])
    );
    useEffect(() => {
        if (list) {
            setIsloading(false)
            if (offSET == 0) {
                console.log('offSET == 0: ', offSET == 0);
                setAppointmentList(response?.data)
            } else {
                setAppointmentList([...appointmentList, ...response?.data])
            }
        }
        else {
            ErrorMessage({
                msg: response?.data?.message,
                backgroundColor: RED_COLOR
            })
        }
    }, [response])
    const getAppointmentList = (offset: any) => {
        setIsloading(true)
        setOffset(offset)
        dispatch(getAllAppointmentList({
            offset: offset,
            limit: 3,
            start_date: filterData.start_date,
            end_date: filterData.end_date,
            appointment_with: filterData.appointment_with,
        }))
        // toGetDatas(array)
    }

    const SecondRoute = () => (
        <FlatList
            data={AppointMentSmData}
            renderItem={({ item }) => <SmAppointment items={item} onPressView={onPressView} />}
        />
    );
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });


    return (
        <View style={styles.mainContainer}>
            {isloading ? <Loader /> : null}
            <View
                style={{
                    backgroundColor: PRIMARY_THEME_COLOR_DARK,
                    height: insets.top,
                }}
            />
            <StatusBar barStyle={'light-content'} />
            <Header
                leftImageSrc={images.menu}
                rightFirstImageScr={images.filter}
                rightSecondImageScr={images.notification}
                headerText={strings.appointmnet}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                handleOnRightFirstIconPress={() => setFilterisVisible(true)}
            />
            <View style={{ marginVertical: 10, alignItems: 'flex-end' }}>
                <Button
                    width={200}
                    height={30}
                    buttonText={strings.addNewappointment}
                    btnTxtsize={14}
                    handleBtnPress={() => onPressAddNew()}
                />
            </View>
            <View style={styles.propertyListView}>
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}

                />
            </View>
            <FilterModal Visible={FilterisVisible} setIsVisible={setFilterisVisible} />
        </View>
    )
}

export default AppointmentView