import { supportForumDetailData } from 'app/Redux/Actions/SupportForumAction'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SupportForumDetail from './components/SupportForumDetail'

const SupportForumScreen = ({ navigation, route }: any) => {
    const dispatch: any = useDispatch()
    const data = route?.params
    const { response = {}, detail = "" } = useSelector((state: any) => state.supportForumData)
    const [supportForumDtl, setSupportForumDtl] = useState<any>({})
    console.log('supportForumDtl: ', supportForumDtl);

    useLayoutEffect(() => {
        if (data?._id) {
            dispatch(supportForumDetailData({
                support_forum_id: data?._id
            }))
        }
    }, [detail])
    useEffect(() => {
        if (response?.status === 200) {
            setSupportForumDtl(response.data[0])
        }
    }, [response])
    const handleBackPress = () => {
        navigation.goBack();
    };
    const onPressNotify = () => {
        navigation.navigate('notification');
    };
    return (
        <SupportForumDetail
            handleBackPress={handleBackPress}
            onPressNotify={onPressNotify}
            supportForumDtl={supportForumDtl}
        />
    )
}

export default SupportForumScreen