import { useFocusEffect } from '@react-navigation/native';
import { supportForumListData } from 'app/Redux/Actions/SupportForumAction';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SupportForumView from './components/SupportForumView'

const SupportForumScreen = ({ navigation }: any) => {
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.supportForumData) || {}
    const moreData = response?.total_data || 0
    const [supportForumList, setSupportForumList] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const [filterData, setFilterData] = useState({
        search_title: '',
        start_date: '',
        end_date: '',
    })
    useFocusEffect(
        React.useCallback(() => {
            getSupportForums(0, {})
            return () => { };
        }, [navigation,list])
    );
    useEffect(() => {
        if (response?.status === 200) {
            if (offSET === 0) {
                setSupportForumList(response?.data)
            } else {
                setSupportForumList([...supportForumList, ...response?.data])
            }
        }
    }, [response])
    const getSupportForums = (offset: any, data: any) => {
        setOffset(offset)
        dispatch(supportForumListData({
            search_title: data?.search_title ? data?.search_title : '',
            start_date: data?.start_date ? data?.start_date : '',
            end_date: data?.end_date ? data?.end_date : '',
            limit: 4,
            offset: offset,
        }))
    }
    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    const onPressView = (data: any) => {
        navigation.navigate('SupportForumDetail', data);
    };
    return (
        <SupportForumView
            handleDrawerPress={handleDrawerPress}
            supportForumList={supportForumList}
            filterData={filterData}
            setFilterData={setFilterData}
            getSupportForums={getSupportForums}
            onPressView={onPressView}
            offSET={offSET}
            moreData={moreData}
        />
    )
}

export default SupportForumScreen