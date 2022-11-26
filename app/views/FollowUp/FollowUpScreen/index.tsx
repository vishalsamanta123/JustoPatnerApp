import { View, Text } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import FollowUpView from './Components/FollowUpView'
import { useDispatch, useSelector } from 'react-redux'
import { allfollowupRemove, getAllFollowUpList } from 'app/Redux/Actions/FollowUpActions'
import { useFocusEffect } from '@react-navigation/native'
import Loader from 'app/components/CommonScreen/Loader'

const FollowUpScreen = ({ navigation }: any) => {
    const [filter, setFilter] = useState(null)
    const [isloading, setIsloading] = useState(false)
    const [followUpList, setFollowUpList] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.followUp)
    console.log('response: ', response);
    const [filterData, setFilterData] = useState({
        start_date: '',
        end_date: '',
        followup_for: ''
    })
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };

    useFocusEffect(
        React.useCallback(() => {
            getFollowupList(offSET)
            return () => { };
        }, [navigation, list])
    );
    useEffect(() => {
        if (list || response?.status) {
            setIsloading(false)
            if (offSET == 0) {
                console.log('offSET == 0: ', offSET == 0);
                setFollowUpList(response?.data)
            } else {
                setFollowUpList([...followUpList, ...response?.data])
            }
        }
    }, [response])
    const getFollowupList = (offset: any) => {
        setIsloading(true)
        setOffset(offset)
        dispatch(getAllFollowUpList({
            offset: offset,
            limit: 3,
            start_date: filterData.start_date,
            end_date: filterData.end_date,
            followup_for: filterData.followup_for,
        }))
        // toGetDatas(array)
    }

    const onRefresh = () => {
        setFilterData({
          start_date: '',
          end_date: '',
          followup_for: ''
        })
        getFollowupList(0)
        // props.setFilter({})
      }
    const handleFilterApply = () => {
        dispatch(allfollowupRemove())
        getFollowupList(0)
    }
    return (
        <>
            {isloading ? <Loader /> : null}
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