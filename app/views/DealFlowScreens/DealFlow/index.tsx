import React, { useEffect, useState } from 'react'
import DealFlowView from './components/DealFlowView';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { dealFlowListData } from 'app/Redux/Actions/DealFlowAction';

const DealFlowScreen = ({ navigation }: any) => {
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.dealFlow) || {}
    const moreData = response?.total_data || 0
    const [dealFlows, setDealFlows] = useState<any>([])
    const [filterisVisible, setFilterisVisible] = useState(false)
    const [offSET, setOffset] = useState(0)
    const [filterData, setFilterData] = useState({
        property_name: '',
        start_date: '',
        end_date: '',
    })
    useFocusEffect(
        React.useCallback(() => {
            getDealFlows(0, {})
            return () => { };
        }, [navigation, list])
    );
    useEffect(() => {
        if (response?.status === 200) {
            if (offSET === 0) {
                setDealFlows(response?.data)
            } else {
                setDealFlows([...dealFlows, ...response?.data])
            }
        } else {
            setDealFlows([])
        }
    }, [response])
    const getDealFlows = (offset: any, data: any) => {
        setOffset(offset)
        dispatch(dealFlowListData({
            start_date: data?.start_date ? data?.start_date : '',
            end_date: data?.end_date ? data?.end_date : '',
            limit: offset === 0 ? 5 : 3,
            offset: offset,
            property_name: data?.property_name ? data?.property_name : '',
        }))
    }
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };

    const onPressView = (data: any) => {
        navigation.navigate('DealFlowDetail', data)
    };

    const onReset = () => {
        getDealFlows(0, {})
        setFilterisVisible(false)
        setFilterData({
            property_name: '',
            start_date: '',
            end_date: '',
        })
    }
    return (
        <>
            <DealFlowView
                handleDrawerPress={handleDrawerPress}
                dealFlows={dealFlows}
                onPressView={onPressView}
                filterData={filterData}
                setFilterData={setFilterData}
                moreData={moreData}
                filterisVisible={filterisVisible}
                setFilterisVisible={setFilterisVisible}
                setDealFlows={setDealFlows}
                getDealFlows={getDealFlows}
                onReset={onReset}
                offSET={offSET}
            />
        </>
    )
}

export default DealFlowScreen