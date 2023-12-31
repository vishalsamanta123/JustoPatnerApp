import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import FollowUpView from './Components/FollowUpView'
import { useDispatch, useSelector } from 'react-redux'
import { allfollowupRemove, getAllFollowUpList } from 'app/Redux/Actions/FollowUpActions'
import { useFocusEffect } from '@react-navigation/native'

const FollowUpScreen = ({ navigation }: any) => {
    const [followUpList, setFollowUpList] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.followUp)
    const [filterData, setFilterData] = useState({
        start_date: '',
        end_date: '',
        followup_for: '',
        lead_id: ''
    })
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };

    useFocusEffect(
        React.useCallback(() => {
            getFollowupList(0, {})
            return () => { };
        }, [navigation, list])
    );
    useEffect(() => {
        if (list && response?.status === 200) {
            if (offSET == 0) {
                setFollowUpList(response?.data)
            } else {
                setFollowUpList([...followUpList, ...response?.data])
            }
        } else {
            setFollowUpList([])
        }
    }, [response])
    const getFollowupList = (offset: any, filterData: any) => {
        setOffset(offset)
        dispatch(getAllFollowUpList({
            offset: offset,
            limit: 3,
            start_date: filterData?.start_date ? filterData?.start_date : '',
            end_date: filterData?.end_date ? filterData?.end_date : '',
            followup_for: filterData?.followup_for ? filterData?.followup_for : '',
            lead_id: filterData?.lead_id ? filterData?.lead_id : '',
        }))
    }

    const onRefresh = () => {
        setFilterData({
            start_date: '',
            end_date: '',
            followup_for: '',
            lead_id: '',
        })
        getFollowupList(0, {})
        setFollowUpList([])
    }
    const handleFilterApply = () => {
        setFollowUpList([])
        getFollowupList(0, filterData)
    }
    return (
        <>
            <FollowUpView
                handleDrawerPress={handleDrawerPress}
                getFollowupList={getFollowupList}
                setFilterData={setFilterData}
                filterData={filterData}
                offSET={offSET}
                setFollowUpList={setFollowUpList}
                followUpList={followUpList}
                handleFilterApply={handleFilterApply}
                onRefresh={onRefresh}
            />
        </>
    )
}

export default FollowUpScreen