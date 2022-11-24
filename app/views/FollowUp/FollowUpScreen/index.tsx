import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import FollowUpView from './Components/FollowUpView'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFollowUpList } from 'app/Redux/Actions/FollowUpActions'
import { useFocusEffect } from '@react-navigation/native'
import Loader from 'app/components/CommonScreen/Loader'

const FollowUpScreen = ({ navigation }: any) => {
    const [filter, setFilter] = useState(null)
    const [isloading, setIsloading] = useState(false)
    const [followUpList, setFollowUpList] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.followUp)
    const [filterData, setFilterData] = useState({
        startdate: '',
        enddate: '',
        search_by_visisor_name: '',
        search_configuration: '',
        visit_score: ''
    })
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };

    useFocusEffect(
        React.useCallback(() => {
            getFollowupList(offSET, [])
            return () => { };
        }, [navigation, list])
    );
    const getFollowupList = (offset: any, array: any) => {
        setIsloading(true)
        setOffset(offset)
        dispatch(getAllFollowUpList({
            offset: offset,
            limit: 3,
            start_date: filterData.startdate,
            end_date: filterData.enddate,
            search_by_visisor_name: filterData.search_by_visisor_name,
            search_configuration: filterData.search_configuration,
            visit_score: filterData.visit_score
        }))
        toGetDatas(array)
    }
    const toGetDatas = (array: any) => {
        if (list) {
            setIsloading(false)
            if (offSET == 0) {
                setFollowUpList(response?.data)
            } else {
                setFollowUpList([...array, ...response?.data])
            }
        }
    }
    return (
        <>
            {isloading ? <Loader /> : null}
            <FollowUpView
                handleDrawerPress={handleDrawerPress}
                getFollowupList={getFollowupList}
                setFilterData={setFilterData}
                offSET={offSET}
                setFollowUpList={setFollowUpList}
                followUpList={followUpList}
            />
        </>
    )
}

export default FollowUpScreen