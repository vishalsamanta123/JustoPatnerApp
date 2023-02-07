import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SupportDetailsView from './Components/SupportDetailsView'
import { useFocusEffect } from '@react-navigation/native'
import { getTicketDetails } from 'app/Redux/Actions/SupportActions'
import { useDispatch, useSelector } from 'react-redux'

const SupportScreenDetails = ({ navigation, route }: any) => {
    const {ticketid, type} = route?.params || {}
    const dispatch: any = useDispatch()
    const [ticketDetailsData, setTicketDetailsData] = useState([])
    const { response = {}, detail= false } = useSelector((state: any) => state.SupportData) || []

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getTicketDetails({
                ticket_id: ticketid?._id
            }))
            return () => { };
        }, [navigation, detail])
    )

    useEffect(() => {
        if (response?.status === 200) {
            if (ticketid?._id !== '') {
                setTicketDetailsData(response?.data)
            }
        }
    }, [response])

    const handleBackPress = () => {
        navigation.goBack()
    }
    const onPressReply = () => {
        navigation.navigate('ShowReply')
    }
    const onPressStatusUpdate = () => {
        navigation.navigate('TicketStatusUpdate', ticketDetailsData)
    }
    return (
        <SupportDetailsView
            handleBackPress={handleBackPress}
            ticketDetailsData={ticketDetailsData}
            type={type}
            onPressReply={onPressReply}
            onPressStatusUpdate={onPressStatusUpdate}
        />
    )
}

export default SupportScreenDetails